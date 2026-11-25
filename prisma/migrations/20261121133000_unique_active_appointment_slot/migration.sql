CREATE UNIQUE INDEX "appointments_slot_id_active_unique"
ON "appointments" ("slotId")
WHERE "status" <> 'CANCELLED';
