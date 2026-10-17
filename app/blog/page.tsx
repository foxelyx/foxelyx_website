import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/layout/PageIntro";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog",
  description: "FOXELYX articles on Zoho, local SEO and software projects. No posts are published yet.",
  path: "/blog",
  noindex: true,
});

const THEMES = [
  {
    category: "Zoho",
    title: "Zoho As Your Operations Layer",
    meta: "Queued · not a live post",
    href: "/services/zoho-implementation",
    image: "/images/expertise/zoho-crm-implementation-dashboard.jpg",
    imageAlt: "Business analytics dashboard used in FOXELYX Zoho CRM implementation",
  },
  {
    category: "Local SEO",
    title: "How Kerala Businesses Show Up On Search",
    meta: "Queued · not a live post",
    href: "/services/seo",
    image: "/images/expertise/seo-traffic-analytics-dashboard.jpg",
    imageAlt: "Laptop showing website traffic and SEO analytics on a desk",
  },
  {
    category: "Software",
    title: "When A Business Needs A Custom Web App",
    meta: "Queued · not a live post",
    href: "/services/web-application-development",
    image: "/images/expertise/web-mobile-app-development.jpg",
    imageAlt: "iPhone home screen showing mobile apps for FOXELYX web and mobile app development",
  },
];

const PLANNED = [
  "Zoho vs Odoo for SMEs in the UAE",
  "Zoho Books and HMRC Making Tax Digital: a UK setup guide",
  "Local SEO checklist for Kerala businesses",
];

export default function BlogPage() {
  const [feature, ...side] = THEMES;

  return (
    <article className="page">
      <PageIntro
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
        eyebrow="Blog"
        title="Latest Articles"
        lede="No articles are published yet. These are the first pieces we intend to write. They are not live posts. Until they ship, the links go to the service they belong to."
      />

      <section className="page-section" aria-labelledby="themes-heading">
        <div className="container-page">
          <div className="articles-head">
            <h2 id="themes-heading">In The Queue</h2>
            <p className="section-label">Not published</p>
          </div>
          <div className="article-feature">
            <article className="article-feature-copy">
              <p className="section-label">{feature.category}</p>
              <h3>
                <Link href={feature.href}>{feature.title}</Link>
              </h3>
              <p className="article-meta">{feature.meta}</p>
              <div className="article-author">
                <span aria-hidden="true">FX</span>
                <div>
                  <strong>FOXELYX</strong>
                  <small>Studio</small>
                </div>
              </div>
            </article>
            <Link href={feature.href} className="article-feature-media">
              <Image src={feature.image} alt={feature.imageAlt} width={1200} height={533} />
            </Link>
            <div className="article-side">
              {side.map((article) => (
                <Link key={article.title} href={article.href} className="article-side-card">
                  <div>
                    <p className="section-label">{article.category}</p>
                    <h3>{article.title}</h3>
                    <p className="article-meta">{article.meta}</p>
                  </div>
                  <Image src={article.image} alt="" width={176} height={144} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-section soft" aria-labelledby="planned-heading">
        <div className="container-page">
          <div className="section-heading">
            <h2 id="planned-heading">Titles We Intend To Write</h2>
            <p className="section-label">Planned</p>
          </div>
          <div className="showcase-rail">
            {PLANNED.map((title, index) => (
              <div key={title} className="showcase-row" data-row>
                <span className="showcase-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="showcase-copy">
                  <small>Not published</small>
                  <strong>{title}</strong>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
