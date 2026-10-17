import { OFFICES, officePhones } from "@/data/offices";
import { SITE_EMAIL, SITE_NAME, SITE_PHONE_DISPLAY, SITE_URL, SOCIALS } from "@/data/site";
import { REGIONS } from "@/lib/regions";

export function organizationGraph() {
  const india = OFFICES.find((office) => office.region === "in");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        email: SITE_EMAIL,
        telephone: india?.phoneDisplay ?? SITE_PHONE_DISPLAY,
        logo: `${SITE_URL}/images/foxelyx-logo.png`,
        image: `${SITE_URL}/images/foxelyx-logo.png`,
        sameAs: SOCIALS.map((social) => social.href),
        address: {
          "@type": "PostalAddress",
          addressRegion: "Kerala",
          addressCountry: "IN",
        },
        areaServed: Object.values(REGIONS).map((region) => ({
          "@type": "Country",
          name: region.country,
        })),
        contactPoint: OFFICES.flatMap((office) =>
          officePhones(office).map((phone) => ({
            "@type": "ContactPoint",
            telephone: phone.display,
            contactType: "customer service",
            areaServed: office.places?.some((place) => place === "Muscat" || place === "Doha")
              ? ["AE", "OM", "QA"]
              : office.country,
            availableLanguage: ["English"],
            email: SITE_EMAIL,
          })),
        ),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en",
      },
    ],
  };
}

export function breadcrumbGraph(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function faqGraph(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function serviceGraph(service: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: `${SITE_URL}${service.path}`,
    serviceType: service.title,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: Object.values(REGIONS).map((region) => ({
      "@type": "Country",
      name: region.country,
    })),
  };
}
