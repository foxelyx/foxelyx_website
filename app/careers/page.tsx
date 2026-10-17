import Image from "next/image";
import { JOBS } from "@/data/jobs";
import { SITE_EMAIL } from "@/data/site";
import { PageClose } from "@/components/layout/PageClose";
import { PageIntro } from "@/components/layout/PageIntro";
import { ShowcaseRail } from "@/components/layout/ShowcaseRail";
import { Statement } from "@/components/layout/Statement";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Careers",
  description:
    "Open FOXELYX internships in Kerala: graphic design, digital marketing, and content writing. Hybrid. Apply by email.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <article className="page">
      <PageIntro
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ]}
        eyebrow="Careers"
        title="Build products, systems and brands"
        lede="Join a team that ships software, implements Zoho, and grows companies through marketing and branding. These are the openings published on foxelyx.com. Stipend and duration are discussed with shortlisted candidates."
        aside={
          <div className="page-hero-media">
            <Image src="/images/services/ui-ux-design.jpg" alt="" width={900} height={560} />
          </div>
        }
      />

      <section className="band">
        <div className="container-page">
          <Statement text="Hands-on internships with the Kerala studio. Apply by email. Nothing is stored on a form." />
        </div>
      </section>

      <section className="page-section" aria-labelledby="roles-heading">
        <div className="container-page">
          <div className="section-heading">
            <h2 id="roles-heading">Open Roles</h2>
            <p className="section-label">{JOBS.length} internships</p>
          </div>
          <ShowcaseRail
            items={JOBS.map((job, index) => ({
              href: `/careers/${job.slug}`,
              index: String(index + 1).padStart(2, "0"),
              kicker: `${job.department} · ${job.location}`,
              title: job.title,
              text: job.description,
            }))}
          />
        </div>
      </section>

      <section className="page-section soft">
        <div className="container-page">
          <div className="section-heading">
            <h2>Don&apos;t See A Fit?</h2>
            <p className="section-label">Studio</p>
          </div>
          <p className="lede">
            We are a technology and brand studio — software, Zoho, marketing, and design. If you
            can bring something specific, email{" "}
            <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a> with a resume and portfolio.
          </p>
        </div>
      </section>

      <PageClose
        title="Apply"
        lede="Each role opens an email to the studio. Nothing is stored on a FOXELYX form."
        href="/contact"
        action="Ask about a role"
      />
    </article>
  );
}
