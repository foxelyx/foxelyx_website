import { RegionContact, regionContactMetadata } from "@/components/region/RegionContact";

export const metadata = regionContactMetadata("in");

export default function Page() {
  return <RegionContact region="in" />;
}
