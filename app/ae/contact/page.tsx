import { RegionContact, regionContactMetadata } from "@/components/region/RegionContact";

export const metadata = regionContactMetadata("ae");

export default function Page() {
  return <RegionContact region="ae" />;
}
