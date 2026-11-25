import Link from "next/link";
import { PageContainer } from "@/components/ui/page-container";
export default function NotFound() {
  return (
    <main className="section-space bg-canvas">
      <PageContainer className="text-center">
        <p className="section-kicker">404</p>
        <h1 className="section-heading">We couldn’t find that page.</h1>
        <p className="section-copy mx-auto">
          The service may have moved or is no longer published.
        </p>
        <Link href="/services" className="button button-primary mt-8">
          Browse healthcare services
        </Link>
      </PageContainer>
    </main>
  );
}
