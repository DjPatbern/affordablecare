import type { Metadata } from "next";

const siteName = "AffordableCare";

export function publicPageMetadata(
  title: string,
  description: string,
  { home = false, index = true } = {},
): Metadata {
  return {
    title,
    description,
    openGraph: {
      type: "website",
      siteName,
      title: home ? title : `${title} | ${siteName}`,
      description,
    },
    ...(index ? {} : { robots: { index: false, follow: true } }),
  };
}
