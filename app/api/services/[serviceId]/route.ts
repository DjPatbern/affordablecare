import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ serviceId: string }>;
};

export async function GET(
  _request: Request,
  context: RouteContext
) {
  try {
    const { serviceId } = await context.params;

    // Validate UUID before querying PostgreSQL.
    const uuidPattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidPattern.test(serviceId)) {
      return NextResponse.json(
        {
          data: null,
          error: {
            code: "INVALID_SERVICE_ID",
            message: "A valid service ID is required.",
          },
          meta: null,
        },
        { status: 400 }
      );
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
        slug: true,
        category: true,
        description: true,
        durationMinutes: true,
        priceMinor: true,
        currency: true,
        createdAt: true,
        clinic: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            addressLine1: true,
            city: true,
            region: true,
            country: true,
            phone: true,
            email: true,
            timezone: true,
          },
        },
        availability: {
          where: {
            status: "OPEN",
            startsAt: {
              gt: new Date(),
            },
          },
          orderBy: {
            startsAt: "asc",
          },
          take: 20,
          select: {
            id: true,
            startsAt: true,
            endsAt: true,
            status: true,
          },
        },
      },
    });

    if (!service) {
      return NextResponse.json(
        {
          data: null,
          error: {
            code: "SERVICE_NOT_FOUND",
            message: "The requested service was not found.",
          },
          meta: null,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: service,
      error: null,
      meta: {
        availableSlots: service.availability.length,
      },
    });
  } catch (error) {
    console.error(
      "GET /api/services/[serviceId] failed:",
      error instanceof Error ? error.message : "Unknown error"
    );

    return NextResponse.json(
      {
        data: null,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to retrieve this service at this time.",
        },
        meta: null,
      },
      { status: 500 }
    );
  }
}
