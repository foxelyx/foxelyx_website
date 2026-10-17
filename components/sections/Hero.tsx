import Link from "next/link";
import { Bricolage_Grotesque } from "next/font/google";
import { SERVICES } from "@/data/services";
import { ChipRail } from "@/components/motion/ChipRail";
import { HeroMotion } from "@/components/motion/HeroMotion";
import { WordRotator } from "@/components/motion/WordRotator";
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
  variable: "--font-display",
});

const ROTATING_WORDS = [
  "Custom Software",
  "Zoho Implementation",
  "Digital Marketing",
  "SEO",
  "Branding",
  "UI/UX Design",
];

const HEADLINE = ["We", "Build", "Digital", "Services"];

export function Hero() {
  const chips = SERVICES.map((service) => ({
    href: `/services/${service.slug}`,
    label: service.shortTitle,
  }));

  return (
    <section className={`hero ${display.variable}`} data-hero aria-labelledby="hero-heading">
      <HeroMotion />
      <div className="hero-card" data-hero-card>
        <div className="hero-glow" aria-hidden="true">
          <span className="hero-orb-shift hero-orb-shift-a" data-orb-shift>
            <span className="hero-orb hero-orb-a" />
          </span>
          <span className="hero-orb-shift hero-orb-shift-b" data-orb-shift>
            <span className="hero-orb hero-orb-b" />
          </span>
          <span className="hero-orb-shift hero-orb-shift-c" data-orb-shift>
            <span className="hero-orb hero-orb-c" />
          </span>
        </div>
        <div className="hero-vignette" aria-hidden="true" />
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-card-inner">
          <div className="hero-copy">
          <div className="hero-meta">
            <p className="hero-tag" data-hero-rise aria-hidden="true">
              <span className="hero-tag-mark" />
              India, UAE, UK and Ireland
            </p>
          </div>
          <h1 id="hero-heading">
            <span className="hero-line hero-static">
              {HEADLINE.map((word) => (
                <span className="hero-word" key={word}>
                  <span data-hero-word>{word}</span>
                </span>
              ))}
              <span className="hero-word">
                <span data-hero-word>with</span>
              </span>
            </span>
            <span className="hero-line hero-rotator">
              <span className="sr-only">Custom Software</span>
              <span className="hero-word hero-emphasis">
                <span data-hero-word>
                  <WordRotator words={ROTATING_WORDS} />
                </span>
              </span>
            </span>
            <span className="sr-only">
              {" "}
              — software, Zoho, marketing and branding studio in India, UAE, UK and Ireland
            </span>
          </h1>
          <div className="hero-foot" data-hero-rise>
            <p className="hero-action-wrap">
              <Link href="/contact" className="hero-action">
                Start a project
                <span className="hero-action-arrow" aria-hidden="true">
                  <svg viewBox="0 0 16 16">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </Link>
            </p>
            <ChipRail chips={chips} />
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
