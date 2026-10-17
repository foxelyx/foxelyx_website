import { REGION_COPY } from "@/data/regions";
import { ContactScreen } from "@/components/contact/ContactScreen";
import type { ContactCountry } from "@/components/contact/ContactForm";
import { REGIONS, type RegionCode } from "@/lib/regions";
import { buildMetadata } from "@/lib/seo";

export function regionContactMetadata(region: RegionCode) {
  const country = REGIONS[region].country;
  return buildMetadata({
    title: `Contact FOXELYX In ${country}`,
    description: REGION_COPY[region].description,
    path: "/contact",
    region,
    regionalAlternates: true,
  });
}

export function RegionContact({ region }: { region: RegionCode }) {
  const meta = REGIONS[region];
  return (
    <ContactScreen
      country={meta.countryCode as ContactCountry}
      crumbs={[
        { name: "Home", path: "/" },
        { name: meta.country, path: `/${region}` },
        { name: "Contact", path: `/${region}/contact` },
      ]}
      title={`Let's talk — ${meta.country}`}
      lede={REGION_COPY[region].lede}
    />
  );
}
