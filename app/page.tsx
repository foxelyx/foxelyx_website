import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { CLIENTS } from "@/data/clients";
import { PRODUCTS } from "@/data/products";
import { HOME_DESCRIPTION, HOME_TITLE } from "@/data/site";
import { HOME_FAQS } from "@/data/faqs";
import { SERVICES } from "@/data/services";
import { ParticleHero } from "@/components/motion/ParticleHero";
import { Expertise } from "@/components/sections/Expertise";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Hero } from "@/components/sections/Hero";
import { FaqList } from "@/components/sections/FaqList";
import { Process } from "@/components/sections/Process";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
  regionalAlternates: true,
});

const ABOUT_COPY =
  "FOXELYX Designs, Builds, And Grows The Digital Systems Behind Your Business.";

const ABOUT_POINTS = [
  "Web & mobile products",
  "Marketing & SEO",
  "Zoho implementation",
  "Branding & campaign assets",
];

const ARTICLES = [
  {
    category: "Zoho",
    title: "Zoho As Your Operations Layer",
    meta: "Launch article · 5 min read",
    image: "/images/expertise/zoho-crm-implementation-dashboard.jpg",
    imageAlt: "Business analytics dashboard used in FOXELYX Zoho CRM implementation",
  },
  {
    category: "Local SEO",
    title: "How Kerala Businesses Show Up On Search",
    meta: "Launch article · 4 min read",
    image: "/images/expertise/seo-traffic-analytics-dashboard.jpg",
    imageAlt: "Laptop showing website traffic and SEO analytics on a desk",
  },
  {
    category: "Software",
    title: "When A Business Needs A Custom Web App",
    meta: "Launch article · 6 min read",
    image: "/images/expertise/web-mobile-app-development.jpg",
    imageAlt: "iPhone home screen showing mobile apps for FOXELYX web and mobile app development",
  },
];

export default function HomePage() {
  const indiaClients = CLIENTS.filter(
    (client) => client.region === "in",
  ).length;
  const uaeClients = CLIENTS.filter((client) => client.region === "ae").length;

  return (
    <>
      <ParticleHero />
      <div className="home-after-particles">
      <Hero />

      <section className="band" aria-labelledby="about-heading">
        <div className="container-page">
          <div className="about-grid">
            <div className="about-copy">
              <p className="section-label">About Us</p>
              <h2 id="about-heading" className="sr-only">
                About FOXELYX
              </h2>
              <p className="scroll-copy" aria-label={ABOUT_COPY}>
                {ABOUT_COPY.split(" ").map((word, index) => (
                  <span key={`${word}-${index}`} data-color-word>
                    {word}{" "}
                  </span>
                ))}
              </p>
              <ul className="about-points" aria-label="FOXELYX capabilities">
                {ABOUT_POINTS.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <Button href="/about">Read more</Button>
            </div>
            <div className="image-duo" aria-hidden="true">
              <div />
              <div />
            </div>
          </div>
        </div>
      </section>

      <section className="stats-band" aria-label="FOXELYX stats">
        <div className="container-page stats-grid">
          {[
            { value: CLIENTS.length, suffix: "+", label: "Brands partnered" },
            { value: 4, suffix: "", label: "Countries served" },
            {
              value: SERVICES.length,
              suffix: "",
              label: "Services under one roof",
            },
            {
              value: indiaClients + uaeClients,
              suffix: "",
              label: "Published client profiles",
            },
          ].map((stat) => (
            <div key={stat.label} className="stat-card" data-row>
              <strong>
                {stat.value}
                {stat.suffix}
              </strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="band soft" aria-labelledby="products-heading">
        <div className="container-page">
          <div className="section-heading">
            <h2 id="products-heading">Our Products</h2>
            <p className="section-label">Product suite</p>
          </div>
          <div className="product-suite">
            {PRODUCTS.map((product, index) => (
              <Link
                key={product.name}
                href={product.href}
                className={
                  index === 0
                    ? "product-card product-card-main"
                    : "product-card"
                }
                style={{ "--product-accent": product.accent } as CSSProperties}
                target="_blank"
                rel="noreferrer"
              >
                <span className="step-index">
                  ({String(index + 1).padStart(2, "0")}) {product.eyebrow}
                </span>
                <div className="product-card-copy">
                  {product.logo ? (
                    <Image
                      src={product.logo}
                      alt={`${product.name} logo`}
                      width={520}
                      height={190}
                      className="product-logo"
                    />
                  ) : (
                    <h2>{product.name}</h2>
                  )}
                  <p>{product.description}</p>
                </div>
                <small>Visit product</small>
              </Link>
            ))}
          </div>
          <p className="lede" style={{ marginTop: 20 }}>
            salesmarker.in is our product ecosystem, with Sellx for sales
            operations and Billx for billing workflows.
          </p>
          <div style={{ marginTop: 20 }}>
            <Button href="https://salesmarker.in/">
              Explore salesmarker.in
            </Button>
          </div>
        </div>
      </section>

      <Expertise />

      <Process />

      <CaseStudies />

      <section className="band" aria-labelledby="faq-heading">
        <div className="container-page">
          <div className="section-heading">
            <h2 id="faq-heading">Have Questions?</h2>
            <p className="section-label">FAQ</p>
          </div>
          <FaqList faqs={HOME_FAQS} labelledBy="faq-heading" />
        </div>
      </section>

      <section className="band" aria-labelledby="articles-heading">
        <div className="container-page">
          <div className="articles-head">
            <h2 id="articles-heading">Latest Article</h2>
            <p className="section-label">Blog</p>
          </div>
          <div className="article-feature">
            <article className="article-feature-copy">
              <p className="section-label">{ARTICLES[0].category}</p>
              <h3>
                <Link href="/blog">{ARTICLES[0].title}</Link>
              </h3>
              <p className="article-meta">{ARTICLES[0].meta}</p>
              <div className="article-author">
                <span aria-hidden="true">FX</span>
                <div>
                  <strong>FOXELYX</strong>
                  <small>Studio</small>
                </div>
              </div>
            </article>
            <Link href="/blog" className="article-feature-media">
              <Image
                src={ARTICLES[0].image}
                alt={ARTICLES[0].imageAlt}
                width={1200}
                height={533}
              />
            </Link>
            <div className="article-side">
              {ARTICLES.slice(1).map((article) => (
                <Link key={article.title} href="/blog" className="article-side-card">
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

      <section className="band soft" aria-labelledby="talk-heading">
        <div className="container-page">
          <h2 id="talk-heading">Let&apos;s Talk</h2>
          <p className="lede">
            Tell us what you need to ship. The form opens your email app and
            sends nothing to a FOXELYX server.
          </p>
          <div style={{ marginTop: 24 }}>
            <Button href="/contact" icon="play">
              Start a project
            </Button>
          </div>
        </div>
      </section>

      </div>
    </>
  );
}
