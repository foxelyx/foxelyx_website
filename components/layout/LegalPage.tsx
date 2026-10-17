import type { ReactNode } from "react";
import { PageIntro } from "@/components/layout/PageIntro";

export function LegalPage({
  crumbs,
  eyebrow,
  title,
  lede,
  sections,
}: {
  crumbs: { name: string; path: string }[];
  eyebrow: string;
  title: string;
  lede: string;
  sections: { title: string; body: ReactNode }[];
}) {
  return (
    <article className="page">
      <PageIntro crumbs={crumbs} eyebrow={eyebrow} title={title} lede={lede} />
      <section className="page-section">
        <div className="container-page legal-copy">
          <ol className="index-list">
            {sections.map((section, index) => (
              <li key={section.title} data-row>
                <span>({String(index + 1).padStart(2, "0")})</span>
                <div>
                  <h2>{section.title}</h2>
                  {section.body}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </article>
  );
}
