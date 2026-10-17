import { CLIENTS } from "@/data/clients";
import { SITE_URL } from "@/data/site";
import { PageClose } from "@/components/layout/PageClose";
import { PageIntro } from "@/components/layout/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { WorkDirectory } from "@/components/work/WorkDirectory";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Our Work",
  description:
    "Companies FOXELYX has worked with, from Woodcastle Furniture and Mezmerix Builders in Kerala to Skybridge Freight in the UAE.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <article className="page">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "FOXELYX work",
          url: `${SITE_URL}/work`,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: CLIENTS.map((client, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: client.name,
              url: `${SITE_URL}/work/${client.slug}`,
            })),
          },
        }}
      />
      <PageIntro
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ]}
        eyebrow="Work"
        title="Our Work"
        lede={`${CLIENTS.length} companies on the FOXELYX roster. Each page uses the description published for that client. We do not add result percentages that were not on the original profile.`}
        actions={<Button href="/contact">Start a project</Button>}
      />
      <WorkDirectory />
      <PageClose />
    </article>
  );
}
