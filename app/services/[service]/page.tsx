import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, REGION_SERVICE_NOTE, SERVICES } from "@/data/services";
import { PageClose } from "@/components/layout/PageClose";
import { PageIntro } from "@/components/layout/PageIntro";
import { ShowcaseRail } from "@/components/layout/ShowcaseRail";
import { Statement } from "@/components/layout/Statement";
import { Process } from "@/components/sections/Process";
import { FaqList } from "@/components/sections/FaqList";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { serviceGraph } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { REGION_CODES, REGIONS } from "@/lib/regions";

const SERVICE_IMAGES: Record<string, string> = {
  "web-app": "/images/services/web-apps.jpg",
  "mobile-app": "/images/services/mobile-apps.jpg",
  "ui-ux-design": "/images/services/ui-ux-design.jpg",
  zoho: "/images/services/zoho-crm.jpg",
  "digital-marketing": "/images/services/digital-marketing.jpg",
  seo: "/images/services/seo.jpg",
  branding: "/images/services/branding.jpg",
};

export function generateStaticParams() {
  return SERVICES.map((service) => ({ service: service.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title, path: `/services/${service.slug}` },
  ];
  const image = SERVICE_IMAGES[service.id];
  const others = SERVICES.filter((item) => item.id !== service.id);

  return (
    <article className="page">
      <JsonLd
        data={serviceGraph({
          title: service.title,
          description: service.metaDescription,
          path: `/services/${service.slug}`,
        })}
      />
      <PageIntro
        crumbs={crumbs}
        eyebrow={service.shortTitle}
        title={service.title}
        lede={service.intro}
        actions={
          <>
            <Button href={`/contact?service=${service.id}`}>Get a quote</Button>
            <Link href="/services" className="text-link">
              All services
            </Link>
          </>
        }
        aside={
          image ? (
            <div className="page-hero-media" data-reveal>
              <Image src={image} alt="" width={1400} height={640} priority />
            </div>
          ) : null
        }
      />

      <section className="band">
        <div className="container-page">
          <Statement text={service.body[0] ?? service.intro} />
          {service.body.slice(1).map((paragraph) => (
            <p key={paragraph} className="lede" style={{ marginTop: 18 }}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="page-section" aria-labelledby="deliverables-heading">
        <div className="container-page">
          <div className="section-heading">
            <h2 id="deliverables-heading">Deliverables</h2>
            <p className="section-label">Included</p>
          </div>
          <div className="deliver-row">
            {service.deliverables.map((item, index) => (
              <article key={item} data-reveal>
                <span>({String(index + 1).padStart(2, "0")})</span>
                <strong>{item}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Process />

      <section className="page-section" aria-labelledby="regions-heading">
        <div className="container-page">
          <div className="section-heading">
            <h2 id="regions-heading">Available in</h2>
            <p className="section-label">Countries</p>
          </div>
          <ShowcaseRail
            items={REGION_CODES.map((code, index) => ({
              href: `/${code}`,
              index: String(index + 1).padStart(2, "0"),
              kicker: REGIONS[code].country,
              title: REGIONS[code].country,
              text: REGION_SERVICE_NOTE[code],
            }))}
          />
          <p className="lede" style={{ marginTop: 20 }}>
            Regional service URLs are published when that country has its own copy. Until then,
            these links go to the regional home, and this page stays the canonical service page.
          </p>
        </div>
      </section>

      <section className="page-section" aria-labelledby="service-faq">
        <div className="container-page">
          <div className="section-heading">
            <h2 id="service-faq">Questions</h2>
            <p className="section-label">FAQ</p>
          </div>
          <FaqList faqs={service.faqs} labelledBy="service-faq" />
        </div>
      </section>

      <section className="page-section soft" aria-labelledby="related-heading">
        <div className="container-page">
          <div className="section-heading">
            <h2 id="related-heading">Other services</h2>
            <p className="section-label">Also from the studio</p>
          </div>
          <ShowcaseRail
            items={others.map((item, index) => ({
              href: `/services/${item.slug}`,
              index: String(index + 1).padStart(2, "0"),
              kicker: item.shortTitle,
              title: item.title,
              text: item.tags.join(" · "),
              image: SERVICE_IMAGES[item.id],
              imageAlt: item.title,
            }))}
          />
        </div>
      </section>

      <PageClose href={`/contact?service=${service.id}`} action="Get a quote" />
    </article>
  );
}
