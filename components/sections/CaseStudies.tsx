import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { getClient } from "@/data/clients";
import CaseStudyStack from "@/components/motion/CaseStudyStack";

const CASE_STUDIES = [
  {
    slug: "woodcastle-furniture",
    title: "Conversion-Led Catalogue Experience",
    result: "Positioned a 44-year teak furniture workshop for modern product discovery.",
    summary:
      "We turned a legacy retail story into a structured digital catalogue with clearer product paths, SEO-ready copy, and enquiry flows built for furniture buyers across Kerala.",
    author: "Mrs. Femi & Mr. Allwin",
    initials: "FA",
    role: "Woodcastle",
    visualLabel: "Retail launch",
  },
  {
    slug: "mezmerix-builders",
    title: "Trust-First Construction Portfolio",
    result: "Showcased 35+ years of homes, villas, interiors, and turnkey projects.",
    summary:
      "The experience reframed Mezmerix around proof: regional coverage, project clarity, service depth, and a visual portfolio that helps high-intent homeowners move faster.",
    author: "Mr. Sagar",
    initials: "SA",
    role: "Mezmerix",
    visualLabel: "Builder growth",
  },
  {
    slug: "amico-care-education",
    title: "Recruitment Funnel for Overseas Education",
    result: "Built a digital path for study, work, immigration, IELTS, and OET enquiries.",
    summary:
      "We connected campaigns, service architecture, and website conversion points so students can understand the offer and contact the team with less friction.",
    author: "Mr. Amal Raj",
    initials: "AR",
    role: "Amico Care",
    visualLabel: "Student pipeline",
  },
  {
    slug: "sg-solar",
    title: "Solar Enquiry Site for Kerala Installs",
    result: "Set up residential, commercial, and industrial plans with subsidy guidance.",
    summary:
      "The site gives homeowners and businesses a clear path through services, projects, pricing, and a calculator, so solar enquiries from Thrissur reach the team with less back and forth.",
    author: "Mr. Shaji",
    initials: "SH",
    role: "SG Solar",
    visualLabel: "Solar installs",
  },
] as const;

type CaseStudyStyle = CSSProperties & {
  "--case-index": number;
  "--case-color": string;
};

export function CaseStudies() {
  return (
    <section className="case-studies-section band" aria-labelledby="case-heading">
      <div className="case-neon" aria-hidden="true">
        <div className="case-neon-stage">
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="container-page">
        <CaseStudyStack>
          {CASE_STUDIES.map((study, index) => {
            const client = getClient(study.slug);
            if (!client) return null;

            const colorLogo =
              client.slug === "woodcastle-furniture" ||
              client.slug === "sg-solar" ||
              client.slug === "amico-care-education";
            const studyLogo =
              client.slug === "amico-care-education" ? "/images/clients/amico-care-mark.png" : client.logo;

            const number = String(index + 1).padStart(2, "0");

            return (
              <article
                key={study.slug}
                className="case-study-sticky"
                style={
                  {
                    "--case-index": index,
                    "--case-color": client.color ?? "var(--brand)",
                  } as CaseStudyStyle
                }
              >
                {index === 0 ? (
                  <div className="section-heading case-study-heading">
                    <h2 id="case-heading">Case Studies</h2>
                    <p className="section-label">Performance</p>
                  </div>
                ) : null}
                <div className="case-study-card">
                  <header className="case-study-card-head">
                    <Link href={`/work/${client.slug}`} className="case-study-brand" aria-label={`${client.name} case study`}>
                      <span className="case-study-logo-mark" aria-hidden="true">
                        {client.initials}
                      </span>
                      <Image src={studyLogo} alt="" width={176} height={64} />
                    </Link>
                    <p className="step-index">CASE ({number})</p>
                  </header>

                  <div className="case-study-grid">
                    <div
                      className={
                        client.slug === "woodcastle-furniture"
                          ? "case-study-visual case-study-visual-light"
                          : "case-study-visual"
                      }
                      aria-label={`${client.name} ${study.visualLabel}`}
                    >
                      <span>{study.visualLabel}</span>
                      <Image
                        src={
                          client.slug === "amico-care-education"
                            ? "/images/clients/amico-care-white.png"
                            : client.slug === "sg-solar"
                              ? "/images/clients/sg-solar-logo.png"
                              : studyLogo
                        }
                        alt=""
                        width={260}
                        height={96}
                        className={colorLogo ? "case-study-logo-color" : undefined}
                      />
                      <i aria-hidden="true" />
                    </div>

                    <div className="case-study-core">
                      <div>
                        <p className="case-study-kicker">{client.services.join(" / ")}</p>
                        <h3>{study.title}</h3>
                        <p>{study.result}</p>
                      </div>
                      <Link href={`/work/${client.slug}`} className="text-link">
                        Learn More
                      </Link>
                    </div>

                    <div className="case-study-detail">
                      <p>{study.summary}</p>
                      <div className="case-study-author">
                        <span aria-hidden="true">{study.initials}</span>
                        <div>
                          <strong>{study.author}</strong>
                          <small>{study.role}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </CaseStudyStack>
      </div>
    </section>
  );
}
