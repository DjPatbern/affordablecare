import Link from "next/link";
import { ArrowRightIcon, ClockIcon, LocationIcon } from "@/components/icons";
import { formatPrice, type Service } from "@/lib/services";
export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group relative flex h-full flex-col rounded-card border border-border bg-surface p-5 transition hover:-translate-y-1 hover:shadow-soft sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <span className="badge badge-category">{service.category}</span>
        <span className="badge badge-available">
          {service.availability.length} times
        </span>
      </div>
      <h3 className="mt-6 text-xl font-extrabold text-forest-950">
        <Link
          href={`/services/${service.id}`}
          className="after:absolute after:inset-0"
        >
          {service.name}
        </Link>
      </h3>
      <p className="mt-3 flex-1 leading-7 text-muted">{service.description}</p>
      <div className="relative mt-6 space-y-3 border-t border-border pt-5 text-sm">
        <p className="flex items-center gap-2 text-ink">
          <LocationIcon className="size-4 text-forest-700" />{" "}
          {service.clinic.name} · {service.clinic.location}
        </p>
        <p className="flex items-center gap-2 text-ink">
          <ClockIcon className="size-4 text-forest-700" />{" "}
          {service.durationMinutes} minutes
        </p>
      </div>
      <div className="relative mt-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-wide text-muted uppercase">
            Clinic price
          </p>
          <p className="mt-1 text-lg font-extrabold text-forest-950">
            {formatPrice(service.priceMinor, service.currency)}
          </p>
        </div>
        <span
          className="grid size-11 place-items-center rounded-full bg-forest-800 text-white transition group-hover:bg-forest-950"
          aria-hidden="true"
        >
          <ArrowRightIcon className="size-5" />
        </span>
      </div>
    </article>
  );
}
