import type { Metadata } from "next";
import { SITE_URL } from "@/data/site";
import { REGIONS, type RegionCode } from "@/lib/regions";

type BuildMetadataOptions = {
  title: string;
  description: string;
  /** Path without a region prefix. Use "/" for home. */
  path: string;
  region?: RegionCode;
  /** Only when the same page exists for every region. */
  regionalAlternates?: boolean;
  /** Use the title as the full document title, with no "| FOXELYX" suffix. */
  absoluteTitle?: boolean;
  noindex?: boolean;
};

export function buildMetadata(opts: BuildMetadataOptions): Metadata {
  const path = opts.path === "/" ? "/" : opts.path.replace(/\/$/, "");
  const url = opts.region
    ? `/${opts.region}${path === "/" ? "" : path}`
    : path;

  const languages: Record<string, string> = {};
  if (opts.regionalAlternates) {
    for (const region of Object.values(REGIONS)) {
      languages[region.hreflang] = `/${region.code}${path === "/" ? "" : path}`;
    }
    languages["x-default"] = path;
  }

  return {
    title: opts.absoluteTitle ? { absolute: opts.title } : opts.title,
    description: opts.description,
    alternates: {
      canonical: url,
      languages: opts.regionalAlternates ? languages : undefined,
    },
    openGraph: {
      type: "website",
      url,
      siteName: "FOXELYX",
      title: opts.title,
      description: opts.description,
      locale: opts.region ? REGIONS[opts.region].ogLocale : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
    },
    robots: opts.noindex ? { index: false, follow: true } : undefined,
    metadataBase: new URL(SITE_URL),
  };
}

export function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
