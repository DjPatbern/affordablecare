import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AvailabilityPicker } from "@/components/availability-picker";
import {
  ArrowRightIcon,
  ClockIcon,
  LocationIcon,
  ShieldIcon,
} from "@/components/icons";
import { PageContainer } from "@/components/ui/page-container";
import { formatPrice, getService, services } from "@/lib/services";
export function generateStaticParams() {
  return services.map((service) => ({ serviceId: service.id }));
}
export async function generateMetadata({
  params,
}: PageProps<"/services/[serviceId]">): Promise<Metadata> {
  const { serviceId } = await params;
  const service = getService(serviceId);
  return service
    ? { title: service.name, description: service.description }
    : { title: "Service not found" };
}
export default async function ServiceDetailPage({
  params,
}: PageProps<"/services/[serviceId]">) {
  const { serviceId } = await params;
  const service = getService(serviceId);
  if (!service) notFound();
  return (
    <main className="bg-canvas py-8 sm:py-12 lg:py-16">
      <PageContainer>
        <Link href="/services" className="text-link text-sm">
          ← Back to all services
        </Link>
        <div className="mt-6 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
          <div className="min-w-0">
            <div className="rounded-feature border border-border bg-surface p-6 sm:p-9">
              <div className="flex flex-wrap gap-2">
                <span className="badge badge-category">{service.category}</span>
                <span className="badge badge-available">
                  {service.availability.length} upcoming times
                </span>
              </div>
              <h1 className="mt-6 break-words font-display text-4xl leading-tight text-forest-950 sm:text-6xl">
                {service.name}
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted">
                {service.longDescription}
              </p>
              <dl className="mt-8 grid gap-4 border-t border-border pt-6 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-bold tracking-wide text-muted uppercase">
                    Clinic price
                  </dt>
                  <dd className="mt-1 text-xl font-extrabold text-forest-950">
                    {formatPrice(service.priceMinor, service.currency)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold tracking-wide text-muted uppercase">
                    Visit length
                  </dt>
                  <dd className="mt-1 flex items-center gap-2 font-bold text-forest-950">
                    <ClockIcon className="size-5 text-forest-700" />{" "}
                    {service.durationMinutes} minutes
                  </dd>
                </div>
              </dl>
            </div>
            <section
              className="mt-6 rounded-feature border border-border bg-surface p-6 sm:p-9"
              aria-labelledby="clinic-heading"
            >
              <p className="section-kicker">Your clinic</p>
              <h2
                id="clinic-heading"
                className="mt-2 text-2xl font-extrabold text-forest-950"
              >
                {service.clinic.name}
              </h2>
              <p className="mt-4 flex items-start gap-3 leading-7 text-muted">
                <LocationIcon className="mt-1 size-5 shrink-0 text-forest-700" />
                <span>
                  {service.clinic.address}
                  <br />
                  {service.clinic.location}
                </span>
              </p>
              <div className="mt-6 rounded-card bg-sage-100 p-4 text-sm leading-6 text-forest-950">
                <ShieldIcon className="mr-2 inline size-5 text-forest-700" />{" "}
                The clinic supplies and maintains its service, pricing, and
                availability information.
              </div>
            </section>
          </div>
          <aside className="min-w-0 rounded-feature border border-border bg-surface p-6 shadow-soft sm:p-8 lg:sticky lg:top-28">
            <AvailabilityPicker
              slots={service.availability}
              timezone={service.clinic.timezone}
            />
          </aside>
        </div>
        <section className="mt-8 rounded-feature bg-forest-950 p-6 text-white sm:p-9">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-bold tracking-[0.14em] text-lime-400 uppercase">
                Need another option?
              </p>
              <h2 className="mt-2 font-display text-3xl">
                Compare every available service.
              </h2>
            </div>
            <Link
              href="/services"
              className="button bg-white text-forest-950 hover:bg-sage-100"
            >
              Browse directory <ArrowRightIcon className="size-5" />
            </Link>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
