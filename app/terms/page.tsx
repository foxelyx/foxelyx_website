import { SITE_EMAIL } from "@/data/site";
import { LegalPage } from "@/components/layout/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms",
  description: "Terms for using the FOXELYX website. A form submission is an enquiry, not a contract.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Terms", path: "/terms" },
      ]}
      eyebrow="Terms"
      title="Terms"
      lede="By using this website you agree to these terms. Project work starts only when both sides have agreed a written scope."
      sections={[
        {
          title: "The Site",
          body: (
            <p>
              Pages describe FOXELYX services. They are not a promise of a price, a ranking, or a
              delivery date. Figures appear only when they come from a real engagement we are
              allowed to publish.
            </p>
          ),
        },
        {
          title: "Enquiries",
          body: (
            <p>
              Sending a message to <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a> asks us to
              reply. It does not create a contract.
            </p>
          ),
        },
        {
          title: "Our Material",
          body: (
            <p>
              The FOXELYX name, the mark on this site, and the copy we wrote belong to FOXELYX. You
              may link to public pages. You may not copy the site and present it as your own.
            </p>
          ),
        },
      ]}
    />
  );
}
