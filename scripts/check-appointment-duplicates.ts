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
  const duplicates = await prisma.$queryRaw<
    { slotId: string; appointment_count: bigint }[]
  >`
    SELECT
      "slotId",
      COUNT(*) AS appointment_count
    FROM "appointments"
    WHERE "status" <> 'CANCELLED'
    GROUP BY "slotId"
    HAVING COUNT(*) > 1
  `;

  console.log("\n--- ACTIVE APPOINTMENT DUPLICATE CHECK ---");
  console.log("Duplicate slots found:", duplicates.length);

  if (duplicates.length === 0) {
    console.log("PASS: No duplicate active appointments found.");
  } else {
    console.log("WARNING: Duplicate active appointments found:");

    for (const item of duplicates) {
      console.log({
        slotId: item.slotId,
        appointmentCount: Number(item.appointment_count),
      });
    }
  }
}

main()
  .catch((error) => {
    console.error("Verification failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
