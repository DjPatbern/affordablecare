import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function isUniqueConstraintError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "P2002"
  );
}
export async function GET(request: Request) {
  try {
    const patient = await getCurrentUser();

    if (!patient) {
      return NextResponse.json(
        {
          data: null,
          error: {
            code: "UNAUTHORIZED",
            message: "Please log in to view your appointments.",
          },
          meta: null,
        },
        { status: 401 }
      );
    }

    if (patient.role !== "PATIENT") {
      return NextResponse.json(
        {
          data: null,
          error: {
            code: "FORBIDDEN",
            message: "Only patients can access this endpoint.",
          },
          meta: null,
        },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);

    const pageValue = searchParams.get("page") ?? "1";
    const limitValue = searchParams.get("limit") ?? "10";
    const status = searchParams.get("status");

    if (!/^\d+$/.test(pageValue) || !/^\d+$/.test(limitValue)) {
      return NextResponse.json(
        {
          data: null,
          error: {
            code: "INVALID_PAGINATION",
            message: "Page and limit must be positive integers.",
          },
          meta: null,
        },
        { status: 400 }
      );
    }

    const page = Number(pageValue);
    const limit = Number(limitValue);

    if (
      !Number.isSafeInteger(page) ||
      !Number.isSafeInteger(limit) ||
      page < 1 ||
      limit < 1 ||
      limit > 50
    ) {
      return NextResponse.json(
        {
          data: null,
          error: {
            code: "INVALID_PAGINATION",
            message: "Page must be positive and limit must be between 1 and 50.",
          },
          meta: null,
        },
        { status: 400 }
      );
    }

    const allowedStatuses = [
      "SCHEDULED",
      "CONFIRMED",
      "COMPLETED",
      "CANCELLED",
      "NO_SHOW",
    ] as const;

    if (
      status !== null &&
      !allowedStatuses.includes(
        status as (typeof allowedStatuses)[number]
      )
    ) {
      return NextResponse.json(
        {
          data: null,
          error: {
            code: "INVALID_STATUS",
            message: "The requested appointment status is invalid.",
          },
          meta: null,
        },
        { status: 400 }
      );
    }

    const where = {
      patientId: patient.id,
      ...(status
        ? { status: status as (typeof allowedStatuses)[number] }
        : {}),
    };

    const [appointments, total] = await prisma.$transaction([
      prisma.appointment.findMany({
        where,
        orderBy: {
          createdAt: "desc",
        },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          service: {
            select: {
              id: true,
              name: true,
              category: true,
              durationMinutes: true,
              priceMinor: true,
              currency: true,
            },
          },
          slot: {
            select: {
              id: true,
              startsAt: true,
              endsAt: true,
              status: true,
            },
          },
        },
      }),
      prisma.appointment.count({ where }),
    ]);

    return NextResponse.json({
      data: appointments,
      error: null,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(
      "GET /api/appointments failed:",
      error instanceof Error ? error.message : "Unknown error"
    );

    return NextResponse.json(
      {
        data: null,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to retrieve appointments.",
        },
        meta: null,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const patient = await getCurrentUser();

    if (!patient) {
      return NextResponse.json(
        {
          data: null,
          error: {
            code: "UNAUTHORIZED",
            message: "Please log in before booking an appointment.",
          },
          meta: null,
        },
        { status: 401 }
      );
    }

    if (patient.role !== "PATIENT") {
      return NextResponse.json(
        {
          data: null,
          error: {
            code: "FORBIDDEN",
            message: "Only patients can book appointments.",
          },
          meta: null,
        },
        { status: 403 }
      );
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          data: null,
          error: {
            code: "INVALID_JSON",
            message: "Request body must contain valid JSON.",
          },
          meta: null,
        },
        { status: 400 }
      );
    }

    if (
      typeof body !== "object" ||
      body === null ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        {
          data: null,
          error: {
            code: "INVALID_REQUEST_BODY",
            message: "Request body must be a JSON object.",
          },
          meta: null,
        },
        { status: 400 }
      );
    }

    const payload = body as Record<string, unknown>;

    const serviceId =
      typeof payload.serviceId === "string"
        ? payload.serviceId.trim()
        : "";

    const slotId =
      typeof payload.slotId === "string"
        ? payload.slotId.trim()
        : "";

    if (!uuidPattern.test(serviceId) || !uuidPattern.test(slotId)) {
      return NextResponse.json(
        {
          data: null,
          error: {
            code: "INVALID_ID",
            message: "A valid serviceId and slotId are required.",
          },
          meta: null,
        },
        { status: 400 }
      );
    }

    let patientNote: string | null = null;

    if (payload.patientNote !== undefined && payload.patientNote !== null) {
      if (typeof payload.patientNote !== "string") {
        return NextResponse.json(
          {
            data: null,
            error: {
              code: "INVALID_PATIENT_NOTE",
              message: "Patient note must be text.",
            },
            meta: null,
          },
          { status: 400 }
        );
      }

      patientNote = payload.patientNote.trim();

      if (patientNote.length > 1000) {
        return NextResponse.json(
          {
            data: null,
            error: {
              code: "INVALID_PATIENT_NOTE",
              message: "Patient note cannot exceed 1000 characters.",
            },
            meta: null,
          },
          { status: 400 }
        );
      }
    }

    const service = await prisma.service.findFirst({
      where: {
        id: serviceId,
        status: "PUBLISHED",
        clinic: {
          status: "PUBLISHED",
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!service) {
      return NextResponse.json(
        {
          data: null,
          error: {
            code: "SERVICE_NOT_FOUND",
            message: "The requested published service was not found.",
          },
          meta: null,
        },
        { status: 404 }
      );
    }

    const slot = await prisma.availabilitySlot.findFirst({
      where: {
        id: slotId,
        serviceId,
      },
      select: {
        id: true,
        status: true,
        startsAt: true,
      },
    });

    if (!slot) {
      return NextResponse.json(
        {
          data: null,
          error: {
            code: "SLOT_NOT_FOUND",
            message: "The requested slot does not belong to this service.",
          },
          meta: null,
        },
        { status: 404 }
      );
    }

    if (slot.status !== "OPEN" || slot.startsAt <= new Date()) {
      return NextResponse.json(
        {
          data: null,
          error: {
            code: "SLOT_UNAVAILABLE",
            message: "This appointment slot is no longer available.",
          },
          meta: null,
        },
        { status: 409 }
      );
    }

    const appointment = await prisma.$transaction(async (tx) => {
      const claimedSlot = await tx.availabilitySlot.updateMany({
        where: {
          id: slotId,
          serviceId,
          status: "OPEN",
          startsAt: {
            gt: new Date(),
          },
        },
        data: {
          status: "BOOKED",
        },
      });

      if (claimedSlot.count !== 1) {
        return null;
      }

      return tx.appointment.create({
        data: {
          patientId: patient.id,
          serviceId,
          slotId,
          patientNote,
          status: "SCHEDULED",
        },
        include: {
          service: {
            select: {
              id: true,
              name: true,
            },
          },
          slot: {
            select: {
              id: true,
              startsAt: true,
              endsAt: true,
              status: true,
            },
          },
        },
      });
    });

    if (!appointment) {
      return NextResponse.json(
        {
          data: null,
          error: {
            code: "SLOT_UNAVAILABLE",
            message:
              "This slot has already been booked or is no longer available.",
          },
          meta: null,
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        data: appointment,
        error: null,
        meta: {
          message: "Appointment booked successfully.",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return NextResponse.json(
        {
          data: null,
          error: {
            code: "SLOT_UNAVAILABLE",
            message: "This appointment slot has already been booked.",
          },
          meta: null,
        },
        { status: 409 }
      );
    }

    console.error(
      "POST /api/appointments failed:",
      error instanceof Error ? error.message : "Unknown error"
    );

    return NextResponse.json(
      {
        data: null,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to create the appointment at this time.",
        },
        meta: null,
      },
      { status: 500 }
    );
  }
}
