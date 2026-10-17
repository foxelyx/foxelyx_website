import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { EdgeBlur } from "@/components/layout/EdgeBlur";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { PageMotion } from "@/components/motion/PageMotion";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { JsonLd } from "@/components/seo/JsonLd";
import { HOME_DESCRIPTION, HOME_TITLE, SITE_URL } from "@/data/site";
import { organizationGraph } from "@/lib/schema";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: "%s | FOXELYX",
  },
  description: HOME_DESCRIPTION,
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body id="top">
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <JsonLd data={organizationGraph()} />
        <SmoothScroll />
        <PageMotion />
        <CustomCursor />
        <a href="#content" className="sr-only">
          Skip to content
        </a>
        <Header />
        <EdgeBlur side="bottom" />
        <main id="content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
