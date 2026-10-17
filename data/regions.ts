import type { RegionCode } from "@/lib/regions";

export const REGION_COPY: Record<
  RegionCode,
  { title: string; description: string; lede: string; points: string[] }
> = {
  in: {
    title: "Software, Zoho & Marketing Agency In India",
    description:
      "FOXELYX in India: custom software, Zoho with GST invoicing, SEO and ads. Kerala team. Call +91 79025 66908 or +91 75598 31069.",
    lede:
      "FOXELYX India is the Kerala team behind the studio: web and mobile software, Zoho (including GST invoicing in Zoho Books), SEO, ads, and brand.",
    points: [
      "Call the India lines on +91 79025 66908 or +91 75598 31069, Monday to Saturday.",
      "Zoho Books setups can include GST invoicing.",
      "The street address is published only when it can match our Google Business Profile exactly.",
    ],
  },
  ae: {
    title: "Software, Zoho & Marketing Agency In The UAE",
    description:
      "FOXELYX in the UAE: Zoho with VAT and e-invoicing readiness, Arabic-ready sites, software, SEO and ads. Dubai, Muscat and Doha: +968 9515 1741.",
    lede:
      "FOXELYX UAE covers companies that need software, Zoho, or marketing with UAE tax rules in the brief, including VAT and e-invoicing readiness.",
    points: [
      "Zoho Books can be set up with UAE VAT in mind.",
      "We can plan Arabic-ready pages. The Arabic site itself is a later release.",
      "Call Dubai, Muscat and Doha on +968 9515 1741. A street address is published only when it can match a Google Business Profile exactly.",
    ],
  },
  uk: {
    title: "Software, Zoho & Marketing Agency In The UK",
    description:
      "FOXELYX in the UK: Zoho Books with Making Tax Digital, UK GDPR, custom software, SEO and ads.",
    lede:
      "FOXELYX UK helps companies that want a build, a Zoho rollout, or ongoing marketing with UK rules in scope, including Making Tax Digital and UK GDPR.",
    points: [
      "Zoho Books setups can follow HMRC Making Tax Digital.",
      "Project briefs for UK clients include UK GDPR.",
      "A UK street address and phone go on this page when they are confirmed.",
    ],
  },
  ie: {
    title: "Software, Zoho & Marketing Agency In Ireland",
    description:
      "FOXELYX in Mayo, Ireland: Zoho and software with Irish VAT and GDPR in the brief, plus SEO, ads and brand. Call +353 89 460 5665.",
    lede:
      "FOXELYX Ireland is based in Mayo, for companies that want software, Zoho, or marketing handled with Irish VAT, GDPR, and EU hosting called out when the project needs it.",
    points: [
      "Zoho and finance scopes can include Irish VAT records.",
      "Personal data in a brief is handled with GDPR in mind.",
      "The Ireland studio is in Mayo. Call +353 89 460 5665.",
      "An Irish street address goes on this page when it can match a Google Business Profile exactly.",
    ],
  },
};
