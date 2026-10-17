import { SITE_EMAIL, SITE_URL } from "@/data/site";
import { LegalPage } from "@/components/layout/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How the static FOXELYX website handles enquiries. No account, no analytics cookies, and email stays in your mail app.",
  path: "/privacy-policy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Privacy", path: "/privacy-policy" },
      ]}
      eyebrow="Privacy"
      title="Privacy policy"
      lede={`This policy describes ${SITE_URL} as it works today: a static website with no FOXELYX account system and no form stored on our servers.`}
      sections={[
        {
          title: "Who We Are",
          body: (
            <p>
              FOXELYX is the data controller for messages you send us. The published studio contact
              is <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>, Kerala, India. Use that address
              for access, correction, or deletion requests.
            </p>
          ),
        },
        {
          title: "What This Site Collects",
          body: (
            <>
              <p>
                The contact form does not post to FOXELYX. It opens your email application with the
                details you typed. If you send that email, we receive it like any other message:
                your name, email, phone if you added one, company, the service you chose, country,
                and the note you wrote.
              </p>
              <p>We do not run analytics or advertising cookies on this version of the site.</p>
            </>
          ),
        },
        {
          title: "Why We Keep An Email",
          body: (
            <p>
              We keep the correspondence so we can reply and, if you hire us, deliver the work. You
              can ask us to delete an enquiry if we are not in a contract that requires us to keep
              it.
            </p>
          ),
        },
        {
          title: "Laws We Write This For",
          body: (
            <p>
              Depending on where you are, that includes India&apos;s DPDP Act 2023, the UAE PDPL,
              the UK GDPR, and the EU GDPR. This page is a description of the current site, not a
              substitute for advice on your own obligations.
            </p>
          ),
        },
      ]}
    />
  );
}
