"use client";
import Link from "next/link";
import { useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { PageContainer } from "@/components/ui/page-container";
const navigation = [
  { href: "/services", label: "Find care" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/services?category=Wellness", label: "Wellness" },
];
export function AppHeader() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur">
      <PageContainer className="flex min-h-20 items-center justify-between gap-5">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center font-display text-2xl font-bold tracking-[-0.04em] text-forest-950"
          onClick={() => setIsOpen(false)}
        >
          affordable<span className="text-forest-700">care</span>
          <span className="ml-1 text-lime-400" aria-hidden="true">
            ✦
          </span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-bold text-ink transition-colors hover:text-forest-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="button px-4 text-forest-950 hover:bg-sage-100"
          >
            Sign in
          </Link>
          <Link href="/services" className="button button-primary">
            Book care
          </Link>
        </div>
        <button
          type="button"
          className="grid size-11 place-items-center rounded-control border border-border text-forest-950 md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? (
            <CloseIcon className="size-6" />
          ) : (
            <MenuIcon className="size-6" />
          )}
        </button>
      </PageContainer>
      {isOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-border bg-surface px-4 py-5 md:hidden"
        >
          <div className="mx-auto flex max-w-[1200px] flex-col gap-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex min-h-12 items-center rounded-control px-3 font-bold text-forest-950 hover:bg-sage-100"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="button button-secondary"
              >
                Sign in
              </Link>
              <Link
                href="/services"
                onClick={() => setIsOpen(false)}
                className="button button-primary"
              >
                Book care
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
