import { RegionContact, regionContactMetadata } from "@/components/region/RegionContact";

export const metadata = regionContactMetadata("uk");

export default function Page() {
  return <RegionContact region="uk" />;
}
