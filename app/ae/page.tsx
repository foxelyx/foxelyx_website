import { RegionHome, regionMetadata } from "@/components/region/RegionHome";

export const metadata = regionMetadata("ae");

export default function Page() {
  return <RegionHome region="ae" />;
}
