import { RegionContact, regionContactMetadata } from "@/components/region/RegionContact";

export const metadata = regionContactMetadata("ie");

export default function Page() {
  return <RegionContact region="ie" />;
}
