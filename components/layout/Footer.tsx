import Link from "next/link";
import { COMPANY_LINKS, RESOURCE_LINKS } from "@/data/nav";
import { OFFICES, officeHasNap, officePhones, officePlaces } from "@/data/offices";
import { SERVICES } from "@/data/services";
import { SITE_EMAIL, SITE_NAME } from "@/data/site";
import { REGIONS } from "@/lib/regions";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Footer() {
  const year = new Date().getFullYear();
  const publishedOffices = OFFICES.filter(officeHasNap);

  return (
    <footer className="site-footer" aria-label="Footer">
      <div className="container-page">
        <div className="footer-grid">
          <FooterCard title="Company" links={COMPANY_LINKS} />
          <FooterCard
            title="Services"
            links={SERVICES.map((service) => ({
              href: `/services/${service.slug}`,
              label: service.shortTitle,
            }))}
          />
          <FooterCard
            title="Locations"
            links={Object.values(REGIONS).map((region) => ({
              href: `/${region.code}`,
              label: region.country,
            }))}
          />
          <FooterCard title="Resources" links={RESOURCE_LINKS} />
        </div>

        {publishedOffices.length > 0 ? (
          <div>
            {publishedOffices.map((office) => (
              <address key={office.region} className="nap">
                <strong>{office.name}</strong>
                <br />
                {office.street}, {office.locality}
                <br />
                {officePhones(office).map((phone, index) => (
                  <span key={phone.tel}>
                    {index > 0 ? <br /> : null}
                    <a href={`tel:${phone.tel}`}>{phone.display}</a>
                  </span>
                ))}
              </address>
            ))}
          </div>
        ) : (
          <p className="nap">
            {OFFICES.filter((office) => office.phoneDisplay && office.phoneTel).map((office) => (
              <span key={office.region}>
                {office.name}
                {officePlaces(office).length ? ` · ${officePlaces(office).join(" · ")}` : ""}
                {" · "}
                {officePhones(office).map((phone, index) => (
                  <span key={phone.tel}>
                    {index > 0 ? " · " : null}
                    <a href={`tel:${phone.tel}`}>{phone.display}</a>
                  </span>
                ))}
                {" · "}
              </span>
            ))}
            <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
          </p>
        )}

        <div className="footer-bottom">
          <SocialLinks className="social-row" />
          <small>
            Copyright © {year} {SITE_NAME}. All Rights Reserved.
          </small>
        </div>
      </div>
    </footer>
  );
}

function FooterCard({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <section className="footer-card">
      <h2>{title}</h2>
      {links.map((link) => (
        <Link key={link.href + link.label} href={link.href} data-row>
          {link.label}
          <i aria-hidden="true">›</i>
        </Link>
      ))}
    </section>
  );
}
