import { LegalPage } from "@/components/layout/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Cookie Policy",
  description: "The FOXELYX website does not set analytics or advertising cookies in this version.",
  path: "/cookie-policy",
});

export default function CookiePage() {
  return (
    <LegalPage
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Cookie Policy", path: "/cookie-policy" },
      ]}
      eyebrow="Cookies"
      title="Cookie policy"
      lede="This version of the site does not set analytics cookies or advertising cookies. The region control is a link, not a saved preference."
      sections={[
        {
          title: "What Is Set Today",
          body: (
            <p>
              Nothing for measurement or advertising. Choosing a country in the header follows a
              link. It does not store a cookie on this version of the site.
            </p>
          ),
        },
        {
          title: "If That Changes",
          body: (
            <p>
              If a later version adds measurement, it will stay off until you opt in, and this page
              will list the cookies by name.
            </p>
          ),
        },
      ]}
    />
  );
}
