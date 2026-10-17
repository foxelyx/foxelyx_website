import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { MeshBackdrop } from "@/components/motion/MeshBackdrop";

export function PageIntro({
  crumbs,
  eyebrow,
  title,
  lede,
  actions,
  aside,
}: {
  crumbs: { name: string; path: string }[];
  eyebrow: string;
  title: string;
  lede: string;
  actions?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="page-hero-card">
        <MeshBackdrop />
        <div className="page-hero-top">
          <Breadcrumbs items={crumbs} />
          <p className="section-label">{eyebrow}</p>
        </div>
        <div className="page-hero-card-inner">
          <h1>{title}</h1>
          <p className="lede">{lede}</p>
          {actions ? <div className="page-hero-actions">{actions}</div> : null}
        </div>
        {aside}
      </div>
    </section>
  );
}
