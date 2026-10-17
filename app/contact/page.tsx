import { ContactScreen } from "@/components/contact/ContactScreen";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Start A Project",
  description:
    "Tell FOXELYX what you need to ship. The form opens your email app. India: +91 79025 66908 or +91 75598 31069. Dubai, Muscat and Doha: +968 9515 1741.",
  path: "/contact",
  regionalAlternates: true,
});

export default function ContactPage() {
  return (
    <ContactScreen
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ]}
      title="Let's Talk"
      lede="Got a question, challenge, or idea? Fill out the form. It opens your email app addressed to FOXELYX. We reply from info@foxelyx.com."
    />
  );
}
