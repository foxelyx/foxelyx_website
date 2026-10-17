export const REGIONS = {
  in: {
    code: "in",
    hreflang: "en-IN",
    ogLocale: "en_IN",
    country: "India",
    countryCode: "IN",
    currency: "INR",
    symbol: "₹",
  },
  ae: {
    code: "ae",
    hreflang: "en-AE",
    ogLocale: "en_AE",
    country: "United Arab Emirates",
    countryCode: "AE",
    currency: "AED",
    symbol: "AED ",
  },
  uk: {
    code: "uk",
    hreflang: "en-GB",
    ogLocale: "en_GB",
    country: "United Kingdom",
    countryCode: "GB",
    currency: "GBP",
    symbol: "£",
  },
  ie: {
    code: "ie",
    hreflang: "en-IE",
    ogLocale: "en_IE",
    country: "Ireland",
    countryCode: "IE",
    currency: "EUR",
    symbol: "€",
  },
} as const;

export type RegionCode = keyof typeof REGIONS;

export const REGION_CODES = Object.keys(REGIONS) as RegionCode[];

export function isRegionCode(value: string): value is RegionCode {
  return Object.prototype.hasOwnProperty.call(REGIONS, value);
}
