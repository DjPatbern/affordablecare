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
  const indexes = await prisma.$queryRaw<
    { indexname: string; indexdef: string }[]
  >`
    SELECT indexname, indexdef
    FROM pg_indexes
    WHERE schemaname = current_schema()
      AND indexname = 'appointments_slot_id_active_unique'
  `;

  console.log("\n--- UNIQUE INDEX VERIFICATION ---");
  console.log(indexes);

  const duplicates = await prisma.$queryRaw<
    { slotId: string; appointment_count: bigint }[]
  >`
    SELECT "slotId", COUNT(*) AS appointment_count
    FROM "appointments"
    WHERE "status" <> 'CANCELLED'
    GROUP BY "slotId"
    HAVING COUNT(*) > 1
  `;

  console.log("\n--- ACTIVE APPOINTMENT DUPLICATES ---");
  console.log("Duplicate slots:", duplicates.length);

  if (indexes.length !== 1) {
    throw new Error("The expected unique index was not found.");
  }

  if (duplicates.length !== 0) {
    throw new Error("Duplicate active appointments were found.");
  }

  console.log("\nPASS: Unique index exists and no active duplicates were found.");
}

main()
  .catch((error) => {
    console.error("Verification failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
