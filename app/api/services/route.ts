import { NextResponse } from "next/server";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function GET(request: Request) {
  await connection();

  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page") ?? "1");
    const limit = Number(searchParams.get("limit") ?? "12");

    if (
      !Number.isInteger(page) ||
      !Number.isInteger(limit) ||
      page < 1 ||
      limit < 1 ||
      limit > 100
    ) {
      return NextResponse.json(
        {
          data: null,
          error: {
            code: "INVALID_PAGINATION",
            message: "Page must be positive and limit must be between 1 and 100.",
          },
          meta: null,
        },
        { status: 400 }
      );
    }

    const category = searchParams.get("category")?.trim();
    const city = searchParams.get("city")?.trim();
    const country = searchParams.get("country")?.trim();
    const clinicId = searchParams.get("clinicId")?.trim();

    if (
      [category, city, country].some(
        (value) => value !== undefined && value.length > 100
      )
    ) {
      return NextResponse.json(
        {
          data: null,
          error: {
            code: "INVALID_FILTER",
            message: "Filter values cannot exceed 100 characters.",
          },
          meta: null,
        },
        { status: 400 }
      );
    }

    if (clinicId && !uuidPattern.test(clinicId)) {
      return NextResponse.json(
        {
          data: null,
          error: {
            code: "INVALID_CLINIC_ID",
            message: "The clinicId must be a valid UUID.",
          },
          meta: null,
        },
        { status: 400 }
      );
    }

    const where = {
      status: "PUBLISHED" as const,
      clinic: {
        status: "PUBLISHED" as const,
        ...(clinicId ? { id: clinicId } : {}),
        ...(city
          ? { city: { contains: city, mode: "insensitive" as const } }
          : {}),
        ...(country
          ? { country: { equals: country, mode: "insensitive" as const } }
          : {}),
      },
      ...(category
        ? { category: { equals: category, mode: "insensitive" as const } }
        : {}),
    };

    const skip = (page - 1) * limit;

    const [services, total] = await Promise.all([
      prisma.service.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          slug: true,
          category: true,
          description: true,
          durationMinutes: true,
          priceMinor: true,
          currency: true,
          clinic: {
            select: {
              id: true,
              name: true,
              slug: true,
              addressLine1: true,
              city: true,
              region: true,
              country: true,
              timezone: true,
            },
          },
        },
      }),
      prisma.service.count({ where }),
    ]);

    return NextResponse.json({
      data: services,
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
      "GET /api/services failed:",
      error instanceof Error ? error.message : "Unknown error"
    );

    return NextResponse.json(
      {
        data: null,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to retrieve services at this time.",
        },
        meta: null,
      },
      { status: 500 }
    );
  }
}
