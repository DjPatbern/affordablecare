import Link from "next/link";
import { PageContainer } from "@/components/ui/page-container";
export function AppFooter() {
  return (
    <footer className="border-t border-border bg-surface py-12">
      <PageContainer>
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="font-display text-2xl font-bold text-forest-950"
            >
              affordable<span className="text-forest-700">care</span>
              <span className="ml-1 text-lime-400" aria-hidden="true">
                ✦
              </span>
            </Link>
            <p className="mt-4 max-w-md leading-7 text-muted">
              Clearer healthcare discovery and appointment scheduling for
              patients and local clinics.
            </p>
          </div>
          <div>
            <h2 className="text-sm font-extrabold tracking-[0.12em] text-forest-950 uppercase">
              Patients
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li>
                <Link
                  href="/services"
                  className="hover:text-forest-700 hover:underline"
                >
                  Find services
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="hover:text-forest-700 hover:underline"
                >
                  Patient sign in
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-extrabold tracking-[0.12em] text-forest-950 uppercase">
              Providers
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li>
                <Link
                  href="/login"
                  className="hover:text-forest-700 hover:underline"
                >
                  Provider sign in
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs leading-5 text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 AffordableCare. Healthcare discovery and scheduling only.
          </p>
          <p>Not for emergencies, diagnosis, or medical advice.</p>
        </div>
      </PageContainer>
    </footer>
  );
}
