import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ clinicId: string }>;
};

export async function GET(
  _request: Request,
  context: RouteContext
) {
  try {
    const { clinicId } = await context.params;

    const uuidPattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidPattern.test(clinicId)) {
      return NextResponse.json(
        {
          data: null,
          error: {
            code: "INVALID_CLINIC_ID",
            message: "A valid clinic ID is required.",
          },
          meta: null,
        },
        { status: 400 }
      );
    }

    const clinic = await prisma.clinic.findFirst({
      where: {
        id: clinicId,
        status: "PUBLISHED",
      },
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
        services: {
          where: {
            status: "PUBLISHED",
          },
          orderBy: {
            name: "asc",
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
          },
        },
      },
    });

    if (!clinic) {
      return NextResponse.json(
        {
          data: null,
          error: {
            code: "CLINIC_NOT_FOUND",
            message: "The requested clinic was not found.",
          },
          meta: null,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: clinic,
      error: null,
      meta: {
        serviceCount: clinic.services.length,
      },
    });
  } catch (error) {
    console.error(
      "GET /api/clinics/[clinicId] failed:",
      error instanceof Error ? error.message : "Unknown error"
    );

    return NextResponse.json(
      {
        data: null,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to retrieve this clinic at this time.",
        },
        meta: null,
      },
      { status: 500 }
    );
  }
}
