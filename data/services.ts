import type { RegionCode } from "@/lib/regions";

export type ServiceId =
  | "web-app"
  | "mobile-app"
  | "ui-ux-design"
  | "zoho"
  | "digital-marketing"
  | "seo"
  | "branding";

export type FaqItem = { question: string; answer: string };

export type Service = {
  id: ServiceId;
  slug: string;
  title: string;
  shortTitle: string;
  category: "software" | "zoho" | "growth" | "branding";
  metaTitle: string;
  metaDescription: string;
  intro: string;
  body: string[];
  deliverables: string[];
  tags: string[];
  faqs: FaqItem[];
};

export const SERVICES: Service[] = [
  {
    id: "web-app",
    slug: "web-application-development",
    title: "Web Application Development",
    shortTitle: "Web Apps",
    category: "software",
    metaTitle: "Web Application Development",
    metaDescription:
      "Custom web apps, dashboards and internal tools from FOXELYX. One team across India, UAE, UK and Ireland. Get a quote.",
    intro:
      "We design and build web applications around the way your team already works: customer portals, dashboards, and internal tools that stay fast after launch.",
    body: [
      "A marketing site and a web application solve different problems. If staff are copying data between spreadsheets, or clients keep emailing for a status that should be on screen, the useful fix is software with a clear job.",
      "FOXELYX scopes the workflow first, then the interface, then the build. You get a system your team can run, with the option to connect Zoho, payments, or the marketing site when those are part of the same operation.",
    ],
    deliverables: ["Web apps", "Dashboards", "Internal tools", "Client portals"],
    tags: ["Web apps", "Dashboards", "Internal tools"],
    faqs: [
      {
        question: "Do you only build marketing websites?",
        answer:
          "No. Marketing sites are one engagement. Web application work covers tools your staff or customers sign in to use.",
      },
      {
        question: "Can a web app connect to Zoho?",
        answer:
          "Yes, when Zoho is already the system of record. We confirm which modules and which data should move before anyone builds the integration.",
      },
    ],
  },
  {
    id: "mobile-app",
    slug: "mobile-app-development",
    title: "Mobile App Development (iOS & Android)",
    shortTitle: "Mobile Apps",
    category: "software",
    metaTitle: "Mobile App Development",
    metaDescription:
      "iOS and Android apps planned, designed and built by FOXELYX. Quote based on the workflow, not a template price.",
    intro:
      "We build iOS and Android apps when a phone is the right place for the job: field teams, bookings, customer accounts, or a product that has to work away from a desk.",
    body: [
      "The first decision is whether you need an installable app or a well-built mobile website. We recommend an app when notifications, offline use, or the home screen are part of the workflow.",
      "Design, build and release sit with the same team that handles your web and Zoho work, so the app does not become a separate product with a separate backlog.",
    ],
    deliverables: ["iOS apps", "Android apps", "Release support", "App store listings"],
    tags: ["iOS", "Android"],
    faqs: [
      {
        question: "Do you ship both iOS and Android?",
        answer:
          "Yes. The store accounts stay in your name, and we prepare the builds for both platforms unless the brief is deliberately single-platform.",
      },
      {
        question: "How is the price set?",
        answer:
          "From the screens, accounts, and integrations in scope. The public site does not list a flat app price. Ask for a quote.",
      },
    ],
  },
  {
    id: "ui-ux-design",
    slug: "ui-ux-design",
    title: "UI/UX Design",
    shortTitle: "UI/UX",
    category: "branding",
    metaTitle: "UI/UX Design",
    metaDescription:
      "UX flows, interfaces and design systems from FOXELYX, ready for a build or a Zoho screen your team will actually use.",
    intro:
      "We design the flows and screens before, or alongside, a build: websites, apps, and the Zoho screens your staff touch every day.",
    body: [
      "Useful interface work starts from the task, not a moodboard. We map who does what, where they get stuck, and what the screen has to decide for them.",
      "You can hire the design on its own, or as the front of a FOXELYX build. Files are handed over in a form your developers can implement if we are not the ones shipping it.",
    ],
    deliverables: ["UX flows", "Interface design", "Design systems", "Prototypes"],
    tags: ["UX flows", "Design systems"],
    faqs: [
      {
        question: "Can you design without building?",
        answer:
          "Yes. Design-only engagements end with flows, screens, and notes a development team can follow.",
      },
    ],
  },
  {
    id: "zoho",
    slug: "zoho-implementation",
    title: "Zoho Implementation & Consulting",
    shortTitle: "Zoho",
    category: "zoho",
    metaTitle: "Zoho Implementation & Consulting",
    metaDescription:
      "Zoho One, CRM, Books, People, Desk and Creator, implemented by FOXELYX. India GST, UAE VAT, and UK MTD covered in the brief.",
    intro:
      "We implement Zoho around your actual process: CRM, Books, People, Desk, Creator, or Zoho One, including the training your team needs to keep using it.",
    body: [
      "Most Zoho projects fail in the setup, not the subscription. Fields, pipelines, and invoices get copied from a demo and never match how the company sells or gets paid.",
      "FOXELYX starts from the process. In India that includes GST invoicing in Zoho Books. In the UAE, VAT and e-invoicing readiness. In the UK, Making Tax Digital. In Ireland, VAT and the records your accountant already expects. Local rules are part of the scope, not a footnote.",
    ],
    deliverables: ["Zoho One", "CRM", "Books", "People", "Desk", "Creator"],
    tags: ["Zoho One", "CRM", "Books"],
    faqs: [
      {
        question: "Do you compare Zoho with Odoo?",
        answer:
          "Yes, when you have not chosen a system yet. We will say if Zoho is a poor fit. We do not implement both on the same engagement.",
      },
      {
        question: "Is training included?",
        answer:
          "Yes. A setup that only the consultant can operate is not finished. Handover includes the people who will use each module.",
      },
    ],
  },
  {
    id: "digital-marketing",
    slug: "digital-marketing",
    title: "Digital Marketing (Meta, Google, Social)",
    shortTitle: "Digital Marketing",
    category: "growth",
    metaTitle: "Digital Marketing",
    metaDescription:
      "Meta ads, Google ads, social and Google Business Profile management from FOXELYX. Retainers are quoted per market.",
    intro:
      "We run the campaigns and the social presence that sit on top of a working site or CRM: Meta ads, Google ads, organic social, and your Google Business Profile.",
    body: [
      "Ads without a clear offer and a page that can take the enquiry waste the budget. We connect the campaign to the site, the form, and, where you use it, Zoho CRM, so leads do not die in an inbox.",
      "Reporting is in plain language: what was spent, what came back, and what we will change next. We do not publish guaranteed lead counts.",
    ],
    deliverables: ["Meta ads", "Google ads", "Social", "Google Business Profile"],
    tags: ["Meta ads", "Google ads", "Social"],
    faqs: [
      {
        question: "Do ad accounts stay in our name?",
        answer:
          "Yes. FOXELYX is granted access. We do not own the ad account or the pixel.",
      },
    ],
  },
  {
    id: "seo",
    slug: "seo",
    title: "Search Engine Optimization",
    shortTitle: "SEO",
    category: "growth",
    metaTitle: "Search Engine Optimization",
    metaDescription:
      "Technical SEO, on-page work, local SEO and content from FOXELYX. Built for multi-region sites with real hreflang.",
    intro:
      "We improve the pages you already have and the ones you still need: technical fixes, on-page structure, local listings, and content that matches how people search.",
    body: [
      "SEO work follows the site, not a list of keywords dropped into a footer. Titles, headings, internal links, and page speed are part of the same pass.",
      "For businesses with a real office, local SEO includes the Google Business Profile and a landing page whose name, address, and phone match that profile. We do not mark up an address we cannot publish in full.",
    ],
    deliverables: ["Technical SEO", "On-page", "Local SEO", "Content"],
    tags: ["Technical SEO", "Local SEO", "Content"],
    faqs: [
      {
        question: "How long before rankings move?",
        answer:
          "We will not promise a week count. Technical fixes can show up in crawl reports quickly. Rankings depend on the market and the competition.",
      },
    ],
  },
  {
    id: "branding",
    slug: "branding",
    title: "Brand Identity & Creative",
    shortTitle: "Branding",
    category: "branding",
    metaTitle: "Brand Identity & Creative",
    metaDescription:
      "Identity, campaign creatives and the visual system behind FOXELYX websites, apps and ads. Ask for a quote.",
    intro:
      "We build the identity and the campaign visuals your site, app, and ads can share: logo use, colour, type, and the creative that has to work in a feed and on a page.",
    body: [
      "A brand kit that never reaches the website or the ad account does not change how customers see you. We design for the places FOXELYX also builds and runs.",
      "Existing brands can hire us for a cleanup, a campaign, or a full identity. We will say which of those you actually need.",
    ],
    deliverables: ["Identity", "Campaign creatives", "Brand guidelines", "Art direction"],
    tags: ["Identity", "Campaign creatives"],
    faqs: [
      {
        question: "Do you redesign a logo on every project?",
        answer:
          "No. If the mark is sound, we document how to use it and spend the budget on the site, the campaigns, or the product.",
      },
    ],
  },
];

export function getService(slug: string) {
  return SERVICES.find((service) => service.slug === slug);
}

export const EXPERTISE_PANELS: {
  index: string;
  title: string;
  summary: string;
  chips: string[];
  href: string;
}[] = [
  {
    index: "01",
    title: "Web & Mobile Apps",
    summary: "Web apps, iOS and Android, dashboards, and the internal tools your team actually opens.",
    chips: ["Web apps", "iOS & Android", "Dashboards", "Internal tools"],
    href: "/services/web-application-development",
  },
  {
    index: "02",
    title: "Zoho Implementation",
    summary: "Zoho One, CRM, Books, People, Desk, and Creator, set up around the way you sell and invoice.",
    chips: ["Zoho One", "CRM", "Books", "People", "Desk", "Creator"],
    href: "/services/zoho-implementation",
  },
  {
    index: "03",
    title: "Digital Marketing",
    summary: "Meta ads, Google ads, social, and the Google Business Profile that should match your office.",
    chips: ["Meta Ads", "Google Ads", "Social", "Google Business Profile"],
    href: "/services/digital-marketing",
  },
  {
    index: "04",
    title: "SEO",
    summary: "Technical SEO, on-page structure, local SEO, and content written for the search.",
    chips: ["Technical SEO", "On-page", "Local SEO", "Content"],
    href: "/services/seo",
  },
  {
    index: "05",
    title: "Branding & UI/UX",
    summary: "Identity, campaign creatives, UX flows, and design systems the build can follow.",
    chips: ["Identity", "Campaign creatives", "UX flows", "Design systems"],
    href: "/services/branding",
  },
];

export const REGION_SERVICE_NOTE: Record<RegionCode, string> = {
  in: "India engagements can include GST invoicing in Zoho Books and delivery from the Kerala team.",
  ae: "UAE engagements can include VAT and e-invoicing readiness, and planning for Arabic-ready pages.",
  uk: "UK engagements can include Zoho Books with Making Tax Digital and UK GDPR in the project brief.",
  ie: "Ireland engagements can include VAT records and GDPR, with EU hosting called out when it matters.",
};
