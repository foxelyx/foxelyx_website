import Link from "next/link";
import { OFFICES, officePhones, officePlaces } from "@/data/offices";
import { SITE_EMAIL } from "@/data/site";
import { PageClose } from "@/components/layout/PageClose";
import { PageIntro } from "@/components/layout/PageIntro";
import { ShowcaseRail } from "@/components/layout/ShowcaseRail";
import { Statement } from "@/components/layout/Statement";
import { Process } from "@/components/sections/Process";
import { Button } from "@/components/ui/Button";
import { CLIENTS } from "@/data/clients";
import { JOBS } from "@/data/jobs";
import { SERVICES } from "@/data/services";
import { REGION_CODES, REGIONS } from "@/lib/regions";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About FOXELYX",
  description:
    "FOXELYX builds and runs the digital side of a business: custom software, Zoho, marketing and brand, from Kerala and for clients in the UAE, UK and Ireland.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <article className="page">
      <PageIntro
        crumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
        eyebrow="About us"
        title="One team to build, automate and grow"
        lede="FOXELYX builds and runs the digital side of your business. We design custom web and mobile products, grow brands with marketing and SEO, implement Zoho, and handle branding from identity to campaign assets."
        actions={
          <>
            <Button href="/contact">Start a project</Button>
            <Link href="/services" className="text-link">
              View services
            </Link>
          </>
        }
      />

      <section className="band">
        <div className="container-page">
          <Statement text="The studio works with companies in Kerala and beyond, from the first product sketch to the system that runs the office." />
        </div>
      </section>

      <section className="stats-band" aria-label="FOXELYX at a glance">
        <div className="container-page stats-grid">
          {[
            { value: `${CLIENTS.length}+`, label: "Brands partnered" },
            { value: String(REGION_CODES.length), label: "Countries served" },
            { value: String(SERVICES.length), label: "Services under one roof" },
            { value: String(JOBS.length), label: "Open roles" },
          ].map((stat) => (
            <div key={stat.label} className="stat-card" data-row>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <Process />

      <section className="page-section" aria-labelledby="offices-heading">
        <div className="container-page">
          <div className="section-heading">
            <h2 id="offices-heading">Where We Work</h2>
            <p className="section-label">Offices</p>
          </div>
          <p className="lede">
            The studio publishes India numbers,{" "}
            <a href="tel:+917902566908">+91 79025 66908</a> and{" "}
            <a href="tel:+917559831069">+91 75598 31069</a>, a Dubai, Muscat and Doha number,{" "}
            <a href="tel:+96895151741">+968 9515 1741</a>, and an Ireland number,{" "}
            <a href="tel:+353894605665">+353 89 460 5665</a>. The UK page is live for local
            briefs. Street addresses are added when they can match each Google Business Profile
            exactly. Email{" "}
            <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>.
          </p>
          <ShowcaseRail
            items={OFFICES.map((office, index) => {
              const region = REGIONS[office.region];
              return {
                href: `/${office.region}`,
                index: String(index + 1).padStart(2, "0"),
                kicker: officePlaces(office).join(" · ") || "Studio",
                title: region.country,
                text: officePhones(office).map((phone) => phone.display).join(" · ") ||
                  "Contact via the India studio",
              };
            })}
          />
        </div>
      </section>

      <PageClose />
    </article>
  );
}
