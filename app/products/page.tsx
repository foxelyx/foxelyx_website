import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { PageClose } from "@/components/layout/PageClose";
import { PageIntro } from "@/components/layout/PageIntro";
import { Statement } from "@/components/layout/Statement";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Products",
  description:
    "FOXELYX products: salesmarker.in, with Sellx for sales operations and Billx for billing workflows.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <article className="page">
      <PageIntro
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
        ]}
        eyebrow="Products"
        title="salesmarker.in, Sellx and Billx"
        lede="salesmarker.in is the FOXELYX product ecosystem. Sellx runs the sales motion. Billx runs quotes, invoices and payments."
        actions={<Button href="https://salesmarker.in/">Explore salesmarker.in</Button>}
      />

      <section className="band">
        <div className="container-page">
          <Statement text="Three products from the studio. Sales, billing and the platform they sit on." />
        </div>
      </section>

      <section className="page-section" aria-labelledby="products-heading">
        <div className="container-page">
          <div className="section-heading">
            <h2 id="products-heading">The Suite</h2>
            <p className="section-label">Products</p>
          </div>
          <div className="product-suite">
            {PRODUCTS.map((product, index) => (
              <Link
                key={product.name}
                href={product.href}
                className={index === 0 ? "product-card product-card-main" : "product-card"}
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
        </div>
      </section>

      <PageClose action="Talk about a product" />
    </article>
  );
}
