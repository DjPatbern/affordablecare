import type { Metadata } from "next";
import Link from "next/link";
import { ShieldIcon } from "@/components/icons";
import { PageContainer } from "@/components/ui/page-container";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Sign in to manage AffordableCare appointments and clinic services.",
};

export default function LoginPage() {
  return (
    <main className="section-space bg-canvas">
      <PageContainer>
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-feature border border-border bg-surface shadow-soft lg:grid-cols-[0.9fr_1.1fr]">
          <section className="bg-forest-950 p-7 text-white sm:p-10">
            <p className="text-sm font-extrabold tracking-[0.14em] text-lime-400 uppercase">
              Welcome back
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
              Your care, organized in one place.
            </h1>
            <p className="mt-5 leading-7 text-white/70">
              Patients can manage appointments, while authorized providers can
              maintain services and clinic schedules.
            </p>
            <div className="mt-8 flex items-start gap-3 rounded-card bg-white/10 p-4 text-sm leading-6">
              <ShieldIcon className="mt-0.5 size-5 shrink-0 text-lime-400" />
              Authentication and protected account access are being connected in
              Week 04 issue #14.
            </div>
          </section>

          <section className="p-7 sm:p-10" aria-labelledby="sign-in-heading">
            <p className="section-kicker">Secure account access</p>
            <h2
              id="sign-in-heading"
              className="mt-2 text-3xl font-extrabold text-forest-950"
            >
              Sign in
            </h2>
            <div className="mt-7 grid gap-5">
              <label className="grid gap-2 text-sm font-bold text-forest-950">
                Email address
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="min-h-12 rounded-control border border-border bg-white px-3 text-base outline-none focus:border-forest-700"
                />
              </label>
              <label className="grid gap-2 text-sm font-bold text-forest-950">
                Password
                <input
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="min-h-12 rounded-control border border-border bg-white px-3 text-base outline-none focus:border-forest-700"
                />
              </label>
              <button
                type="button"
                disabled
                className="button button-primary cursor-not-allowed opacity-60"
              >
                Sign-in connection in progress
              </button>
            </div>
            <p className="mt-6 text-sm leading-6 text-muted">
              Looking for care now?{" "}
              <Link
                href="/services"
                className="font-bold text-forest-800 underline underline-offset-4"
              >
                Browse available services
              </Link>
              .
            </p>
          </section>
        </div>
      </PageContainer>
    </main>
  );
}
