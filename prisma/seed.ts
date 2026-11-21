
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting AffordableCare database seeding...");

  // 1. Create provider accounts
  const provider1 = await prisma.user.upsert({
    where: { email: "doctor1@affordablecare.test" },
    update: {},
    create: {
      name: "Dr. James Peter",
      email: "doctor1@affordablecare.test",
      phone: "+211900000001",
      role: "PROVIDER",
    },
  });

  const provider2 = await prisma.user.upsert({
    where: { email: "doctor2@affordablecare.test" },
    update: {},
    create: {
      name: "Dr. Mary Joseph",
      email: "doctor2@affordablecare.test",
      phone: "+211900000002",
      role: "PROVIDER",
    },
  });

  // 2. Create sample clinics
  const clinic1 = await prisma.clinic.upsert({
    where: { slug: "juba-community-clinic" },
    update: {},
    create: {
      name: "Juba Community Clinic",
      slug: "juba-community-clinic",
      description:
        "Affordable primary healthcare services for the Juba community.",
      addressLine1: "Hai Cinema",
      city: "Juba",
      region: "Central Equatoria",
      country: "South Sudan",
      phone: "+211900000010",
      email: "juba@affordablecare.test",
      timezone: "Africa/Juba",
      status: "PUBLISHED",
    },
  });

  const clinic2 = await prisma.clinic.upsert({
    where: { slug: "juba-family-health-centre" },
    update: {},
    create: {
      name: "Juba Family Health Centre",
      slug: "juba-family-health-centre",
      description:
        "Family healthcare, consultations and preventive medical services.",
      addressLine1: "Munuki",
      city: "Juba",
      region: "Central Equatoria",
      country: "South Sudan",
      phone: "+211900000020",
      email: "family@affordablecare.test",
      timezone: "Africa/Juba",
      status: "PUBLISHED",
    },
  });

  // 3. Link providers to clinics
  await prisma.providerMembership.upsert({
    where: {
      userId_clinicId: {
        userId: provider1.id,
        clinicId: clinic1.id,
      },
    },
    update: {},
    create: {
      userId: provider1.id,
      clinicId: clinic1.id,
      role: "PROVIDER",
    },
  });

  await prisma.providerMembership.upsert({
    where: {
      userId_clinicId: {
        userId: provider2.id,
        clinicId: clinic2.id,
      },
    },
    update: {},
    create: {
      userId: provider2.id,
      clinicId: clinic2.id,
      role: "PROVIDER",
    },
  });

  // 4. Create published medical services
  const service1 = await prisma.service.upsert({
    where: {
      clinicId_slug: {
        clinicId: clinic1.id,
        slug: "general-consultation",
      },
    },
    update: {},
    create: {
      clinicId: clinic1.id,
      name: "General Consultation",
      slug: "general-consultation",
      category: "GENERAL_MEDICINE",
      description:
        "General medical assessment, diagnosis and treatment advice.",
      durationMinutes: 30,
      priceMinor: 500000,
      currency: "SSP",
      status: "PUBLISHED",
    },
  });

  await prisma.service.upsert({
    where: {
      clinicId_slug: {
        clinicId: clinic1.id,
        slug: "maternal-health",
      },
    },
    update: {},
    create: {
      clinicId: clinic1.id,
      name: "Maternal Health Consultation",
      slug: "maternal-health",
      category: "MATERNAL_HEALTH",
      description:
        "Maternal health assessment and pregnancy-related consultation.",
      durationMinutes: 45,
      priceMinor: 750000,
      currency: "SSP",
      status: "PUBLISHED",
    },
  });

  const service3 = await prisma.service.upsert({
    where: {
      clinicId_slug: {
        clinicId: clinic2.id,
        slug: "child-health",
      },
    },
    update: {},
    create: {
      clinicId: clinic2.id,
      name: "Child Health Consultation",
      slug: "child-health",
      category: "PEDIATRICS",
      description:
        "Basic child health assessment and preventive care.",
      durationMinutes: 30,
      priceMinor: 400000,
      currency: "SSP",
      status: "PUBLISHED",
    },
  });

  // 5. Create a sample patient
  await prisma.user.upsert({
    where: { email: "patient@affordablecare.test" },
    update: {},
    create: {
      name: "John Patient",
      email: "patient@affordablecare.test",
      phone: "+211900000030",
      role: "PATIENT",
    },
  });

  // 6. Create sample availability slots
  const tomorrow = new Date();
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  tomorrow.setUTCHours(9, 0, 0, 0);

  const services = [
    { service: service1, provider: provider1 },
    { service: service3, provider: provider2 },
  ];

  for (const item of services) {
    for (let i = 0; i < 3; i++) {
      const startsAt = new Date(
        tomorrow.getTime() + i * 60 * 60 * 1000
      );

      const endsAt = new Date(
        startsAt.getTime() +
          item.service.durationMinutes * 60 * 1000
      );

      const existingSlot = await prisma.availabilitySlot.findFirst({
        where: {
          serviceId: item.service.id,
          startsAt,
        },
      });

      if (!existingSlot) {
        await prisma.availabilitySlot.create({
          data: {
            serviceId: item.service.id,
            startsAt,
            endsAt,
            status: "OPEN",
            createdById: item.provider.id,
          },
        });
      }
    }
  }

  console.log("AffordableCare database seeding completed!");
  console.log("Created/verified:");
  console.log("- 2 clinics");
  console.log("- 2 healthcare providers");
  console.log("- 3 published medical services");
  console.log("- 1 patient");
  console.log("- 6 availability slots (when newly created)");
}

main()
  .catch((error) => {
    console.error("Database seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
