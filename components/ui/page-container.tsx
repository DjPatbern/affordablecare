import type { ReactNode } from "react";
export function PageContainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto min-w-0 w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
}
