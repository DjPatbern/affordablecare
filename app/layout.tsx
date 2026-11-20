import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { AppFooter } from "@/components/app-footer";
import { AppHeader } from "@/components/app-header";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AffordableCare | Care within reach",
    template: "%s | AffordableCare",
  },
  description:
    "Discover affordable healthcare services, compare clinic information, and choose appointment times online.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${fraunces.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-canvas text-ink">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <AppHeader />
        <div id="main-content" className="flex-1">
          {children}
        </div>
        <AppFooter />
      </body>
    </html>
  );
}
