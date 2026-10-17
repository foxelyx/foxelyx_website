import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CLIENTS, getClient } from "@/data/clients";
import { PageClose } from "@/components/layout/PageClose";
import { PageIntro } from "@/components/layout/PageIntro";
import { Button } from "@/components/ui/Button";
import { ClientCard } from "@/components/work/ClientCard";
import { REGIONS } from "@/lib/regions";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return CLIENTS.map((client) => ({ slug: client.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const client = getClient(slug);
  if (!client) return {};
  const description = client.description.slice(0, 155);
  return buildMetadata({
    title: `${client.name} — ${client.services.join(", ")}`,
    description,
    path: `/work/${client.slug}`,
  });
}

export default async function ClientPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const client = getClient(slug);
  if (!client) notFound();

  const index = CLIENTS.findIndex((item) => item.slug === client.slug);
  const next = CLIENTS[(index + 1) % CLIENTS.length];
  const region = REGIONS[client.region];

  return (
    <article className="page">
      <PageIntro
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: client.name, path: `/work/${client.slug}` },
        ]}
        eyebrow={client.industries.join(" · ")}
        title={client.name}
        lede={client.description}
        actions={<Button href="/contact">Start a project</Button>}
        aside={
          <div className="logo-stage">
            <span className="logo-plate logo-plate-hero">
              <Image
                className="logo-plate-img"
                src={client.logo}
                alt={`${client.name} logo`}
                width={480}
                height={240}
              />
            </span>
          </div>
        }
      />

      <section className="stats-band" aria-label="Client facts">
        <div className="container-page stats-grid">
          {[
            { value: region.country, label: "Country" },
            { value: client.services[0] ?? "Studio", label: "Lead service" },
            { value: String(client.services.length), label: "Services on the profile" },
            { value: String(index + 1).padStart(2, "0"), label: "Roster index" },
          ].map((stat) => (
            <div key={stat.label} className="stat-card" data-row>
              <strong className={stat.value.length > 3 ? "stat-text" : undefined}>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="page-section" aria-labelledby="did-heading">
        <div className="container-page">
          <div className="section-heading">
            <h2 id="did-heading">What We Did</h2>
            <p className="section-label">{client.services.join(" · ")}</p>
          </div>
          <ol className="index-list">
            {client.highlights.map((item, itemIndex) => (
              <li key={item} data-row>
                <span>({String(itemIndex + 1).padStart(2, "0")})</span>
                <p className="lede" style={{ margin: 0 }}>
                  {item}
                </p>
              </li>
            ))}
          </ol>
          <p style={{ marginTop: 22 }}>
            {client.website ? (
              <a href={client.website} rel="noreferrer" className="text-link">
                {client.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </a>
            ) : null}
            {client.instagram.map((profile) => (
              <span key={profile.url}>
                {" · "}
                <a href={profile.url} rel="noreferrer" className="text-link">
                  {profile.label}
                </a>
              </span>
            ))}
          </p>
        </div>
      </section>

      {client.aboutPoints.length > 0 ? (
        <section className="page-section soft" aria-labelledby="glance-heading">
          <div className="container-page">
            <div className="section-heading">
              <h2 id="glance-heading">At A Glance</h2>
              <p className="section-label">Profile</p>
            </div>
            <dl className="glance">
              {client.aboutPoints.map((point) => (
                <div key={point.label} data-row>
                  <dt>{point.label}</dt>
                  <dd>{point.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}

      <section className="page-section" aria-labelledby="next-heading">
        <div className="container-page">
          <div className="section-heading">
            <h2 id="next-heading">Next Profile</h2>
            <p className="section-label">Continue</p>
          </div>
          <div className="showcase-rail">
            <ClientCard client={next} index={0} />
          </div>
        </div>
      </section>

      <PageClose />
    </article>
  );
}
