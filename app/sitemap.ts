import type { MetadataRoute } from "next";
import { CLIENTS } from "@/data/clients";
import { JOBS } from "@/data/jobs";
import { SERVICES } from "@/data/services";
import { SITE_URL } from "@/data/site";
import { REGION_CODES, REGIONS } from "@/lib/regions";

export const dynamic = "force-static";

function absolute(path: string) {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

function cluster(path: "/" | "/contact") {
  const languages: Record<string, string> = {
    "x-default": absolute(path),
  };
  for (const code of REGION_CODES) {
    languages[REGIONS[code].hreflang] = absolute(
      `/${code}${path === "/" ? "" : path}`,
    );
  }
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const dated = new Date();
  const singles = [
    "/about",
    "/services",
    ...SERVICES.map((service) => `/services/${service.slug}`),
    "/work",
    ...CLIENTS.map((client) => `/work/${client.slug}`),
    "/products",
    "/careers",
    ...JOBS.map((job) => `/careers/${job.slug}`),
    "/privacy-policy",
    "/terms",
    "/cookie-policy",
  ];

  const entries: MetadataRoute.Sitemap = [
    { url: absolute("/"), lastModified: dated, alternates: cluster("/") },
    { url: absolute("/contact"), lastModified: dated, alternates: cluster("/contact") },
    ...REGION_CODES.map((code) => ({
      url: absolute(`/${code}`),
      lastModified: dated,
      alternates: cluster("/"),
    })),
    ...REGION_CODES.map((code) => ({
      url: absolute(`/${code}/contact`),
      lastModified: dated,
      alternates: cluster("/contact"),
    })),
    ...singles.map((path) => ({ url: absolute(path), lastModified: dated })),
  ];

  return entries;
}
