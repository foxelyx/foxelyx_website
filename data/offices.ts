import type { RegionCode } from "@/lib/regions";

/**
 * Publish a street only when it matches the Google Business Profile exactly.
 * Incomplete offices stay out of the footer address block and out of LocalBusiness schema.
 */
export type Office = {
  region: RegionCode;
  name: string;
  country: string;
  locality?: string;
  regionName?: string;
  places?: string[];
  street?: string;
  postalCode?: string;
  phoneDisplay?: string;
  phoneTel?: string;
  phoneDisplay2?: string;
  phoneTel2?: string;
  email: string;
  hours?: string;
};

export const OFFICES: Office[] = [
  {
    region: "in",
    name: "FOXELYX India",
    country: "IN",
    locality: "Irinjalakuda, Thrissur",
    regionName: "Kerala",
    phoneDisplay: "+91 79025 66908",
    phoneTel: "+917902566908",
    phoneDisplay2: "+91 75598 31069",
    phoneTel2: "+917559831069",
    email: "info@foxelyx.com",
    hours: "Mo-Sa 09:30-18:30",
  },
  {
    region: "ae",
    name: "FOXELYX UAE",
    country: "AE",
    places: ["Dubai", "Muscat", "Doha"],
    phoneDisplay: "+968 9515 1741",
    phoneTel: "+96895151741",
    email: "info@foxelyx.com",
  },
  {
    region: "uk",
    name: "FOXELYX UK",
    country: "GB",
    email: "info@foxelyx.com",
  },
  {
    region: "ie",
    name: "FOXELYX Ireland",
    country: "IE",
    locality: "Mayo",
    phoneDisplay: "+353 89 460 5665",
    phoneTel: "+353894605665",
    email: "info@foxelyx.com",
  },
];

export function officeByRegion(region: RegionCode) {
  return OFFICES.find((office) => office.region === region);
}

export function officePlaces(office: Office) {
  if (office.places?.length) return office.places;
  return office.locality ? [office.locality] : [];
}

export function officePhones(office: Office) {
  return [
    office.phoneDisplay && office.phoneTel
      ? { display: office.phoneDisplay, tel: office.phoneTel }
      : null,
    office.phoneDisplay2 && office.phoneTel2
      ? { display: office.phoneDisplay2, tel: office.phoneTel2 }
      : null,
  ].filter((phone): phone is { display: string; tel: string } => phone !== null);
}

/** Street, city, and phone are all present, so the NAP can be marked up. */
export function officeHasNap(office: Office) {
  return Boolean(office.street && office.locality && office.phoneDisplay);
}
