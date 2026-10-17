import Link from "next/link";
import { notFound } from "next/navigation";
import { getJob, JOBS } from "@/data/jobs";
import { SITE_EMAIL } from "@/data/site";
import { PageIntro } from "@/components/layout/PageIntro";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return JOBS.map((job) => ({ slug: job.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) return {};
  return buildMetadata({
    title: `${job.title} — ${job.location}`,
    description: job.description.slice(0, 155),
    path: `/careers/${job.slug}`,
  });
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

  const subject = encodeURIComponent(`Application: ${job.title}`);
  const body = encodeURIComponent(`Role: ${job.title}\nLocation: ${job.location}\n\n`);
  const others = JOBS.filter((item) => item.slug !== job.slug);

  return (
    <article className="page">
      <PageIntro
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
          { name: job.title, path: `/careers/${job.slug}` },
        ]}
        eyebrow={`${job.department} · ${job.location} · ${job.type}`}
        title={job.title}
        lede={job.description}
        actions={
          <a className="btn-primary" href={`mailto:${SITE_EMAIL}?subject=${subject}&body=${body}`}>
            <span>Apply via email</span>
            <span className="btn-icon" aria-hidden="true">
              ›
            </span>
          </a>
        }
      />

      <section className="page-section">
        <div className="container-page">
          <div className="section-heading">
            <h2>The Role</h2>
            <p className="section-label">{job.location}</p>
          </div>
          <p className="lede">
            Hands-on work for students and early-career talent. Stipend and duration are discussed
            with shortlisted candidates.
          </p>
          <ol className="index-list" style={{ marginTop: 28 }}>
            <li data-row>
              <span>(01)</span>
              <p className="lede" style={{ margin: 0 }}>
                Department: {job.department}
              </p>
            </li>
            <li data-row>
              <span>(02)</span>
              <p className="lede" style={{ margin: 0 }}>
                Location: {job.location}
              </p>
            </li>
            <li data-row>
              <span>(03)</span>
              <p className="lede" style={{ margin: 0 }}>
                Type: {job.type}. Apply by emailing {SITE_EMAIL}.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {others.length > 0 ? (
        <section className="page-section soft" aria-labelledby="other-roles-heading">
          <div className="container-page">
            <div className="section-heading">
              <h2 id="other-roles-heading">Other Open Roles</h2>
              <p className="section-label">Careers</p>
            </div>
            <div className="showcase-rail">
              {others.map((item, index) => (
                <Link key={item.slug} href={`/careers/${item.slug}`} className="showcase-row">
                  <span className="showcase-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="showcase-copy">
                    <small>
                      {item.department} · {item.type}
                    </small>
                    <strong>{item.title}</strong>
                    <em>{item.location}</em>
                  </span>
                  <span className="showcase-go" aria-hidden="true">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}
