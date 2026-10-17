import { OFFICES, officePhones, officePlaces, type Office } from "@/data/offices";
import { SITE_EMAIL } from "@/data/site";
import { ContactForm, type ContactCountry } from "@/components/contact/ContactForm";
import { PageIntro } from "@/components/layout/PageIntro";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { REGIONS } from "@/lib/regions";

function contactRows(office: Office) {
  const phones = officePhones(office);
  const places = officePlaces(office);
  if (!phones.length) return [];
  if (places.length > 1) {
    return [{ key: office.region, places, phones }];
  }
  const country = REGIONS[office.region].country;
  const place = office.regionName ?? places[0];
  return [{
    key: office.region,
    places: [place ? `${country} · ${place}` : country],
    phones,
  }];
}

export function ContactScreen({
  country = "IN",
  crumbs,
  title,
  lede,
}: {
  country?: ContactCountry;
  crumbs: { name: string; path: string }[];
  title: string;
  lede: string;
}) {
  const rows = OFFICES.flatMap(contactRows);
  const unpublished = OFFICES.filter((office) => officePhones(office).length === 0);
  return (
    <article className="page">
      <PageIntro
        crumbs={crumbs}
        eyebrow="Contact"
        title={title}
        lede={lede}
        actions={<SocialLinks className="social-row" />}
      />

      <section className="page-section">
        <div className="container-page contact-layout">
          <div>
            <div className="section-heading">
              <h2>Studio</h2>
              <p className="section-label">Reach us</p>
            </div>
            <a className="contact-fact" href={`mailto:${SITE_EMAIL}`}>
              <span>Email</span>
              <strong>{SITE_EMAIL}</strong>
            </a>
            {rows.map((row) => (
              <div className="contact-fact" key={row.key}>
                <ul className="contact-places">
                  {row.places.map((place) => (
                    <li key={place}>{place}</li>
                  ))}
                </ul>
                <span className="contact-phones">
                  {row.phones.map((phone) => (
                    <a key={phone.tel} href={`tel:${phone.tel}`}>
                      {phone.display}
                    </a>
                  ))}
                </span>
              </div>
            ))}
            {unpublished.length > 0 ? (
              <p className="lede">
                {unpublished.map((office) => REGIONS[office.region].country).join(" and ")} contact
                details are added when that office has a confirmed number.
              </p>
            ) : null}
          </div>
          <div className="contact-panel" data-reveal>
            <p className="section-label">Project form</p>
            <h2>Send A Note</h2>
            <p className="lede" style={{ marginTop: 0 }}>
              The form opens your email app. It does not post to a FOXELYX server.
            </p>
            <ContactForm defaultCountry={country} />
          </div>
        </div>
      </section>
    </article>
  );
}
