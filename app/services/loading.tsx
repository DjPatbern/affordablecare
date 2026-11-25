import { PageContainer } from "@/components/ui/page-container";
export default function ServicesLoading() {
  return (
    <main className="section-space bg-canvas">
      <PageContainer>
        <div className="h-12 w-2/3 animate-pulse rounded-control bg-sage-200" />
        <div className="mt-10 h-32 animate-pulse rounded-feature bg-sage-100" />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-80 animate-pulse rounded-card bg-sage-100"
            />
          ))}
        </div>
        <p className="sr-only">Loading healthcare services</p>
      </PageContainer>
    </main>
  );
}
