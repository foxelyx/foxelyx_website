import Link from "next/link";
import { HOME_FAQS } from "@/data/faqs";
import { SERVICES } from "@/data/services";
import { PageClose } from "@/components/layout/PageClose";
import { PageIntro } from "@/components/layout/PageIntro";
import { ShowcaseRail } from "@/components/layout/ShowcaseRail";
import { Statement } from "@/components/layout/Statement";
import { FaqList } from "@/components/sections/FaqList";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Web apps, mobile apps, UI/UX, Zoho, digital marketing, SEO and branding from one FOXELYX team. Tell us what you need to ship.",
  path: "/services",
});

const VISUALS: Record<string, string> = {
  "web-app": "/images/services/web-apps.jpg",
  "mobile-app": "/images/services/mobile-apps.jpg",
  "ui-ux-design": "/images/services/ui-ux-design.jpg",
  zoho: "/images/services/zoho-crm.jpg",
  "digital-marketing": "/images/services/digital-marketing.jpg",
  seo: "/images/services/seo.jpg",
  branding: "/images/services/branding.jpg",
};

export default function ServicesPage() {
  return (
    <article className="page">
      <PageIntro
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
        eyebrow="Services"
        title="One team for build, automate and grow"
        lede="Seven services, hired on their own or together. Software, Zoho, marketing and brand stay in one backlog so the site, the CRM and the ads describe the same company."
        actions={
          <>
            <Button href="/contact">Tell us what you need</Button>
            <Link href="/products" className="text-link">
              See products
            </Link>
          </>
        }
      />

      <section className="band">
        <div className="container-page">
          <Statement text="Software, Zoho, marketing and brand stay with one team, so the work describes the same company." />
        </div>
      </section>

      <section className="page-section" aria-labelledby="services-heading">
        <div className="container-page">
          <div className="section-heading">
            <h2 id="services-heading">What We Ship</h2>
            <p className="section-label">Capabilities</p>
          </div>
          <ShowcaseRail
            items={SERVICES.map((service, index) => ({
              href: `/services/${service.slug}`,
              index: String(index + 1).padStart(2, "0"),
              kicker: service.shortTitle,
              title: service.title,
              text: service.intro,
              image: VISUALS[service.id],
              imageAlt: service.title,
            }))}
          />
        </div>
      </section>

      <section className="page-section" aria-labelledby="services-faq">
        <div className="container-page">
          <div className="section-heading">
            <h2 id="services-faq">Questions</h2>
            <p className="section-label">FAQ</p>
          </div>
          <FaqList faqs={HOME_FAQS} labelledBy="services-faq" />
        </div>
      </section>

      <PageClose action="Tell us what you need to ship" />
    </article>
  );
}
