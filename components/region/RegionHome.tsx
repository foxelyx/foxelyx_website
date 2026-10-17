import Link from "next/link";
import { clientsInRegion } from "@/data/clients";
import { officeByRegion, officePhones, officePlaces } from "@/data/offices";
import { REGION_COPY } from "@/data/regions";
import { SERVICES } from "@/data/services";
import { SITE_EMAIL } from "@/data/site";
import { PageClose } from "@/components/layout/PageClose";
import { PageIntro } from "@/components/layout/PageIntro";
import { ShowcaseRail } from "@/components/layout/ShowcaseRail";
import { Statement } from "@/components/layout/Statement";
import { Button } from "@/components/ui/Button";
import { ClientCard } from "@/components/work/ClientCard";
import { REGIONS, type RegionCode } from "@/lib/regions";
import { buildMetadata } from "@/lib/seo";

const SERVICE_IMAGES: Record<string, string> = {
  "web-app": "/images/services/web-apps.jpg",
  "mobile-app": "/images/services/mobile-apps.jpg",
  "ui-ux-design": "/images/services/ui-ux-design.jpg",
  zoho: "/images/services/zoho-crm.jpg",
  "digital-marketing": "/images/services/digital-marketing.jpg",
  seo: "/images/services/seo.jpg",
  branding: "/images/services/branding.jpg",
};

export function regionMetadata(region: RegionCode) {
  const copy = REGION_COPY[region];
  return buildMetadata({
    title: copy.title,
    description: copy.description,
    path: "/",
    region,
    regionalAlternates: true,
    absoluteTitle: true,
  });
}

export function RegionHome({ region }: { region: RegionCode }) {
  const copy = REGION_COPY[region];
  const office = officeByRegion(region);
  const india = officeByRegion("in");
  const indiaPhones = india ? officePhones(india) : [];
  const meta = REGIONS[region];
  const clients = clientsInRegion(region);

  return (
    <article className="page">
      <PageIntro
        crumbs={[
          { name: "Home", path: "/" },
          { name: meta.country, path: `/${region}` },
        ]}
        eyebrow={`FOXELYX ${meta.country}`}
        title={copy.title}
        lede={copy.lede}
        actions={<Button href={`/${region}/contact`}>Contact {meta.country}</Button>}
      />

      <section className="band">
        <div className="container-page">
          <Statement text={copy.points.join(" ")} />
        </div>
      </section>

      <section className="page-section" aria-labelledby="region-services-heading">
        <div className="container-page">
          <div className="section-heading">
            <h2 id="region-services-heading">Services</h2>
            <p className="section-label">Same studio</p>
          </div>
          <ShowcaseRail
            items={SERVICES.map((service, index) => ({
              href: `/services/${service.slug}`,
              index: String(index + 1).padStart(2, "0"),
              kicker: service.shortTitle,
              title: service.title,
              text: service.tags.join(" · "),
              image: SERVICE_IMAGES[service.id],
              imageAlt: service.title,
            }))}
          />
        </div>
      </section>

      <section className="page-section soft" aria-labelledby="region-work-heading">
        <div className="container-page">
          <div className="section-heading">
            <h2 id="region-work-heading">Local Work</h2>
            <p className="section-label">
              {clients.length > 0 ? `${clients.length} profiles` : "Roster"}
            </p>
          </div>
          {clients.length > 0 ? (
            <div className="showcase-rail">
              {clients.map((client, index) => (
                <ClientCard key={client.slug} client={client} index={index} />
              ))}
            </div>
          ) : (
            <p className="lede">
              No local client profiles are published for {meta.country} yet. The global work is on
              the <Link href="/work">work page</Link>.
            </p>
          )}
        </div>
      </section>

      <section className="page-section soft" aria-labelledby="region-office-heading">
        <div className="container-page">
          <div className="section-heading">
            <h2 id="region-office-heading">Office</h2>
            <p className="section-label">Contact</p>
          </div>
          {office?.phoneDisplay ? (
            <p className="lede">
              {office.name}
              {officePlaces(office).length ? ` · ${officePlaces(office).join(" · ")}` : ""}
              {office.regionName ? `, ${office.regionName}` : ""}
              <br />
              {officePhones(office).map((phone, index) => (
                <span key={phone.tel}>
                  {index > 0 ? " · " : null}
                  <a href={`tel:${phone.tel}`}>{phone.display}</a>
                </span>
              ))}
            </p>
          ) : (
            <p className="lede">
              {office?.name ?? meta.country} does not have a public street address or local phone
              on this site yet. Write to <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a> or call
              the India studio on{" "}
              {indiaPhones.map((phone, index) => (
                <span key={phone.tel}>
                  {index > 0 ? " or " : null}
                  <a href={`tel:${phone.tel}`}>{phone.display}</a>
                  {index === indiaPhones.length - 1 ? "." : null}
                </span>
              ))}
            </p>
          )}
        </div>
      </section>

      <PageClose
        href={`/${region}/contact`}
        action={`Contact ${meta.country}`}
        lede={copy.lede}
      />
    </article>
  );
}
