import { RegionHome, regionMetadata } from "@/components/region/RegionHome";

export const metadata = regionMetadata("in");

export default function Page() {
  return <RegionHome region="in" />;
}
