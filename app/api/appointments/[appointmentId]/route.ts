
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type RouteContext = {
  params: Promise<{ appointmentId: string }>;
};

export async function GET(
  _request: Request,
  context: RouteContext
) {
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

    const { appointmentId } = await context.params;

    if (!uuidPattern.test(appointmentId)) {
      return NextResponse.json(
        {
          data: null,
          error: {
            code: "INVALID_APPOINTMENT_ID",
            message: "A valid appointment ID is required.",
          },
          meta: null,
        },
        { status: 400 }
      );
    }

    const appointment = await prisma.appointment.findFirst({
      where: {
        id: appointmentId,
        patientId: patient.id,
      },
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
    });

    if (!appointment) {
      return NextResponse.json(
        {
          data: null,
          error: {
            code: "APPOINTMENT_NOT_FOUND",
            message: "Appointment not found.",
          },
          meta: null,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: appointment,
      error: null,
      meta: null,
    });
  } catch (error) {
    console.error("GET appointment failed:", error);

    return NextResponse.json(
      {
        data: null,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to retrieve appointment.",
        },
        meta: null,
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  _request: Request,
  context: RouteContext
) {
  try {
    const patient = await getCurrentUser();

    if (!patient) {
      return NextResponse.json(
        {
          data: null,
          error: {
            code: "UNAUTHORIZED",
            message: "Please log in to cancel an appointment.",
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
            message: "Only patients can cancel appointments.",
          },
          meta: null,
        },
        { status: 403 }
      );
    }

    const { appointmentId } = await context.params;

    if (!uuidPattern.test(appointmentId)) {
      return NextResponse.json(
        {
          data: null,
          error: {
            code: "INVALID_APPOINTMENT_ID",
            message: "A valid appointment ID is required.",
          },
          meta: null,
        },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      const existing = await tx.appointment.findFirst({
        where: {
          id: appointmentId,
          patientId: patient.id,
        },
        select: {
          id: true,
          slotId: true,
          status: true,
        },
      });

      if (!existing) {
        return { kind: "NOT_FOUND" as const };
      }

      if (
        existing.status !== "SCHEDULED" &&
        existing.status !== "CONFIRMED"
      ) {
        return { kind: "NOT_CANCELLABLE" as const };
      }

      const cancelled = await tx.appointment.updateMany({
        where: {
          id: appointmentId,
          patientId: patient.id,
          status: {
            in: ["SCHEDULED", "CONFIRMED"],
          },
        },
        data: {
          status: "CANCELLED",
          cancelledAt: new Date(),
          cancelledById: patient.id,
        },
      });

      if (cancelled.count !== 1) {
        return { kind: "NOT_CANCELLABLE" as const };
      }

      const now = new Date();

      await tx.availabilitySlot.updateMany({
        where: {
          id: existing.slotId,
          status: "BOOKED",
          startsAt: {
            gt: now,
          },
        },
        data: {
          status: "OPEN",
        },
      });

      const appointment = await tx.appointment.findUnique({
        where: { id: appointmentId },
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

      return { kind: "SUCCESS" as const, appointment };
    });

    if (result.kind === "NOT_FOUND") {
      return NextResponse.json(
        {
          data: null,
          error: {
            code: "APPOINTMENT_NOT_FOUND",
            message: "Appointment not found.",
          },
          meta: null,
        },
        { status: 404 }
      );
    }

    if (result.kind === "NOT_CANCELLABLE") {
      return NextResponse.json(
        {
          data: null,
          error: {
            code: "APPOINTMENT_NOT_CANCELLABLE",
            message: "This appointment cannot be cancelled.",
          },
          meta: null,
        },
        { status: 409 }
      );
    }

    return NextResponse.json({
      data: result.appointment,
      error: null,
      meta: {
        message: "Appointment cancelled successfully.",
      },
    });
  } catch (error) {
    console.error("PATCH appointment failed:", error);

    return NextResponse.json(
      {
        data: null,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to cancel appointment.",
        },
        meta: null,
      },
      { status: 500 }
    );
  }
}
