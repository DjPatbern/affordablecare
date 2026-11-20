import type { Metadata } from "next";
import Link from "next/link";
import { SearchIcon } from "@/components/icons";
import { ServiceCard } from "@/components/service-card";
import { PageContainer } from "@/components/ui/page-container";
import { services } from "@/lib/services";
export const metadata: Metadata = {
  title: "Find healthcare services",
  description: "Browse published clinic services by category and location.",
};
export default async function ServicesPage({
  searchParams,
}: PageProps<"/services">) {
  const params = await searchParams;
  const query =
    typeof params.query === "string" ? params.query.trim().toLowerCase() : "";
  const category = typeof params.category === "string" ? params.category : "";
  const location = typeof params.location === "string" ? params.location : "";
  const filteredServices = services.filter(
    (service) =>
      (!query ||
        `${service.name} ${service.description} ${service.clinic.name}`
          .toLowerCase()
          .includes(query)) &&
      (!category || service.category === category) &&
      (!location || service.clinic.location.includes(location)),
  );
  return (
    <main className="section-space bg-canvas">
      <PageContainer>
        <div className="max-w-3xl">
          <p className="section-kicker">Healthcare directory</p>
          <h1 className="section-heading">Find care that works for you.</h1>
          <p className="section-copy">
            Compare participating clinics, supplied prices, visit duration, and
            upcoming appointment times.
          </p>
        </div>
        <form
          action="/services"
          className="mt-10 grid gap-4 rounded-feature border border-border bg-surface p-5 shadow-soft lg:grid-cols-[1.5fr_1fr_1fr_auto] lg:items-end"
          aria-label="Filter healthcare services"
        >
          <label className="grid gap-2 text-sm font-bold text-forest-950">
            <span>Search services</span>
            <span className="relative">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-muted" />
              <input
                name="query"
                defaultValue={
                  typeof params.query === "string" ? params.query : ""
                }
                placeholder="e.g. consultation"
                className="min-h-12 w-full rounded-control border border-border bg-white pr-3 pl-11 text-base outline-none focus:border-forest-700"
              />
            </span>
          </label>
          <label className="grid gap-2 text-sm font-bold text-forest-950">
            <span>Category</span>
            <select
              name="category"
              defaultValue={category}
              className="min-h-12 rounded-control border border-border bg-white px-3 text-base outline-none focus:border-forest-700"
            >
              <option value="">All categories</option>
              <option>Primary care</option>
              <option>Diagnostics</option>
              <option>Wellness</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-forest-950">
            <span>Location</span>
            <select
              name="location"
              defaultValue={location}
              className="min-h-12 rounded-control border border-border bg-white px-3 text-base outline-none focus:border-forest-700"
            >
              <option value="">All locations</option>
              <option value="Lekki">Lekki</option>
              <option value="Yaba">Yaba</option>
              <option value="Ikeja">Ikeja</option>
            </select>
          </label>
          <button type="submit" className="button button-primary">
            Apply filters
          </button>
        </form>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="font-bold text-forest-950" aria-live="polite">
            {filteredServices.length}{" "}
            {filteredServices.length === 1 ? "service" : "services"} found
          </p>
          {(query || category || location) && (
            <Link href="/services" className="text-link text-sm">
              Clear all filters
            </Link>
          )}
        </div>
        {filteredServices.length > 0 ? (
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-feature border border-dashed border-border bg-surface px-6 py-16 text-center">
            <h2 className="font-display text-3xl text-forest-950">
              No matching services yet.
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted">
              Try another category or location, or clear the filters to see
              every published service.
            </p>
            <Link href="/services" className="button button-primary mt-6">
              Reset filters
            </Link>
          </div>
        )}
      </PageContainer>
    </main>
  );
}
