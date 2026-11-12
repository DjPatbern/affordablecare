"use client";
import { useState } from "react";
import { CalendarIcon } from "@/components/icons";
import type { AvailabilitySlot } from "@/lib/services";
export function AvailabilityPicker({
  slots,
  timezone,
}: {
  slots: AvailabilitySlot[];
  timezone: string;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = slots.find((slot) => slot.id === selectedId);
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-extrabold text-forest-950">
          Choose an appointment time
        </h2>
        <span className="text-xs font-bold text-muted">{timezone}</span>
      </div>
      <p className="mt-2 text-sm leading-6 text-muted">
        Times are shown in the clinic timezone. Selecting a time does not
        reserve it until booking is confirmed.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {slots.map((slot) => (
          <button
            key={slot.id}
            type="button"
            onClick={() => setSelectedId(slot.id)}
            aria-pressed={selectedId === slot.id}
            className={`min-h-16 rounded-control border p-3 text-left transition ${selectedId === slot.id ? "border-forest-800 bg-sage-100 ring-2 ring-forest-800/15" : "border-border bg-white hover:border-forest-700"}`}
          >
            <span className="block text-xs font-bold tracking-wide text-muted uppercase">
              {slot.dateLabel}
            </span>
            <span className="mt-1 block font-extrabold text-forest-950">
              {slot.label}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-6 rounded-card bg-sage-100 p-4">
        {selected ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-3 font-bold text-forest-950">
              <CalendarIcon className="size-5 text-forest-700" />{" "}
              {selected.dateLabel} at {selected.label}
            </p>
            <button
              type="button"
              className="button button-primary"
              onClick={() =>
                window.alert(
                  "Sign-in and booking API integration will be connected in issues #14 and #18.",
                )
              }
            >
              Continue to book
            </button>
          </div>
        ) : (
          <p className="text-sm font-semibold text-muted">
            Select a time to continue.
          </p>
        )}
      </div>
    </div>
  );
}
