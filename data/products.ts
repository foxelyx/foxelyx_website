export type Product = {
  name: string;
  eyebrow: string;
  description: string;
  href: string;
  accent: string;
  logo?: string;
};

export const PRODUCTS: Product[] = [
  {
    name: "salesmarker.in",
    eyebrow: "Product ecosystem",
    description:
      "A FOXELYX product platform for sales, billing, and growth tools made for fast-moving businesses.",
    href: "https://salesmarker.in/",
    accent: "#f97316",
  },
  {
    name: "Sellx",
    eyebrow: "Sales product",
    description:
      "A focused selling workspace for managing leads, follow-ups, customer activity, and day-to-day sales motion.",
    href: "https://salesmarker.in/",
    accent: "#1f3fbf",
    logo: "/images/products/sellx-logo.png",
  },
  {
    name: "Billx",
    eyebrow: "Billing product",
    description:
      "A billing-first product for quotes, invoices, payments, and cleaner business finance operations.",
    href: "https://salesmarker.in/",
    accent: "#cd435a",
    logo: "/images/products/billx-logo.png",
  },
];
