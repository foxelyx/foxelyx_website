import { RegionHome, regionMetadata } from "@/components/region/RegionHome";

export const metadata = regionMetadata("ie");

export default function Page() {
  return <RegionHome region="ie" />;
}
