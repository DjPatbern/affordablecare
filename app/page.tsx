import Link from "next/link";
import {
  ArrowRightIcon,
  CalendarIcon,
  ShieldIcon,
  SparkIcon,
} from "@/components/icons";
import { ServiceCard } from "@/components/service-card";
import { PageContainer } from "@/components/ui/page-container";
import { getFeaturedServices } from "@/lib/services";

export default function HomePage() {
  const featuredServices = getFeaturedServices();
  return (
    <main>
      <section className="border-b border-border bg-canvas py-10 sm:py-14 lg:py-20">
        <PageContainer>
          <div className="grid min-w-0 items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
            <div className="min-w-0">
              <div className="eyebrow">
                <span
                  className="size-2 rounded-full bg-lime-400"
                  aria-hidden="true"
                />
                Care that fits real life
              </div>
              <h1 className="mt-7 max-w-3xl font-display text-5xl leading-[0.98] font-medium tracking-[-0.045em] text-forest-950 sm:text-6xl lg:text-[5rem]">
                Find care that feels{" "}
                <span className="text-forest-700 italic">within reach.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
                Compare local clinic services, understand supplied costs, and
                choose an appointment time—without the phone-call runaround.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/services" className="button button-primary">
                  Explore healthcare services
                  <ArrowRightIcon className="size-5" />
                </Link>
                <Link href="#how-it-works" className="button button-secondary">
                  See how it works
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold text-forest-950">
                <span className="inline-flex items-center gap-2">
                  <ShieldIcon className="size-5 text-forest-700" /> Clear clinic
                  information
                </span>
                <span className="inline-flex items-center gap-2">
                  <CalendarIcon className="size-5 text-forest-700" /> Online
                  appointment times
                </span>
              </div>
            </div>
            <div className="relative min-h-[430px] min-w-0 overflow-hidden rounded-[2rem] bg-sage-100 p-6 sm:min-h-[520px] sm:p-9">
              <div
                className="absolute -top-20 -right-16 size-72 rounded-full border-[44px] border-sage-200/80"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-32 -left-20 size-80 rounded-full bg-lime-400/30"
                aria-hidden="true"
              />
              <SparkIcon className="absolute top-20 left-10 size-14 text-forest-700" />
              <SparkIcon className="absolute right-10 bottom-24 size-10 text-forest-700" />
              <div className="relative mx-auto mt-16 max-w-sm rotate-[-4deg] rounded-3xl bg-surface p-7 shadow-soft sm:mt-24 sm:p-9">
                <span className="badge badge-available">
                  Appointments available
                </span>
                <p className="mt-8 font-display text-4xl leading-tight text-forest-950">
                  Your next step to feeling better.
                </p>
                <div className="mt-8 space-y-4 border-t border-border pt-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-muted">
                      General consultation
                    </span>
                    <strong className="text-forest-950">From ₦8,000</strong>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-muted">Next opening</span>
                    <strong className="text-forest-950">Today, 2:30 PM</strong>
                  </div>
                </div>
              </div>
              <div className="absolute right-5 bottom-5 left-5 rounded-2xl border border-white/80 bg-white/90 p-5 backdrop-blur sm:right-8 sm:bottom-8 sm:left-8">
                <p className="text-xs font-bold tracking-[0.16em] text-muted uppercase">
                  AffordableCare promise
                </p>
                <p className="mt-2 font-semibold text-forest-950">
                  Useful information. Clear choices. No hidden platform fees.
                </p>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>
      <section className="border-b border-border bg-surface py-7">
        <PageContainer className="grid gap-5 sm:grid-cols-3">
          {[
            "Local clinics and services",
            "Supplied costs shown clearly",
            "Timezone-aware appointments",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 text-sm font-bold text-forest-950"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-sage-100 text-forest-800">
                ✓
              </span>
              {item}
            </div>
          ))}
        </PageContainer>
      </section>
      <section
        className="section-space bg-canvas"
        aria-labelledby="featured-heading"
      >
        <PageContainer>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="section-kicker">Care near you</p>
              <h2 id="featured-heading" className="section-heading">
                Start with a service.
              </h2>
              <p className="section-copy">
                Browse clear information from participating clinics and choose
                what fits your needs.
              </p>
            </div>
            <Link href="/services" className="text-link shrink-0">
              View all services <ArrowRightIcon className="size-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </PageContainer>
      </section>
      <section
        id="how-it-works"
        className="section-space border-y border-border bg-surface"
        aria-labelledby="steps-heading"
      >
        <PageContainer>
          <p className="section-kicker">A simpler path</p>
          <h2 id="steps-heading" className="section-heading">
            From search to scheduled.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              [
                "01",
                "Explore services",
                "Filter by category and location, then compare clinic-supplied information.",
              ],
              [
                "02",
                "Choose a time",
                "See future availability in the clinic timezone before you confirm.",
              ],
              [
                "03",
                "Manage your visit",
                "Keep upcoming and past appointments together in one secure place.",
              ],
            ].map(([number, title, copy]) => (
              <article
                key={number}
                className="rounded-card border border-border bg-canvas p-6 sm:p-8"
              >
                <span className="font-display text-3xl text-forest-700">
                  {number}
                </span>
                <h3 className="mt-8 text-xl font-bold text-forest-950">
                  {title}
                </h3>
                <p className="mt-3 leading-7 text-muted">{copy}</p>
              </article>
            ))}
          </div>
        </PageContainer>
      </section>
      <section className="section-space bg-forest-950 text-white">
        <PageContainer className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-bold tracking-[0.16em] text-lime-400 uppercase">
              Important to know
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-5xl">
              AffordableCare helps you discover and schedule care.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">
              It does not provide diagnosis, medical advice, or emergency
              support. If you may be experiencing an emergency, contact local
              emergency services.
            </p>
          </div>
          <Link
            href="/services"
            className="button bg-white text-forest-950 hover:bg-sage-100"
          >
            Find a service <ArrowRightIcon className="size-5" />
          </Link>
        </PageContainer>
      </section>
    </main>
  );
}
