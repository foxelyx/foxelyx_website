import { isRegionCode, type RegionCode } from "@/lib/regions";

/** Where the region switcher should send someone for the page they are on. */
export function hrefForRegion(pathname: string, region: RegionCode) {
  const path = pathname.replace(/\/$/, "") || "/";
  const contact = path.match(/^\/(?:in|ae|uk|ie)\/contact$/) || path === "/contact";
  if (contact) return `/${region}/contact`;
  return `/${region}`;
}

export function regionFromPath(pathname: string): RegionCode | undefined {
  const match = pathname.match(/^\/(in|ae|uk|ie)(?:\/|$)/);
  if (!match) return undefined;
  return isRegionCode(match[1]) ? match[1] : undefined;
}

export function homeHrefForPath(pathname: string) {
  const region = regionFromPath(pathname);
  return region ? `/${region}` : "/";
}
