import { RegionHome, regionMetadata } from "@/components/region/RegionHome";

export const metadata = regionMetadata("uk");

export default function Page() {
  return <RegionHome region="uk" />;
}
