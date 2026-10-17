import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { EXPERTISE } from "@/data/expertise";
import ExpertiseScroll from "@/components/motion/ExpertiseScroll";

const EXPERTISE_OUTCOMES = [
  {
    label: "Audit",
    text: "We map the current gaps, channels, workflows and customer journey before planning the build.",
  },
  {
    label: "Build",
    text: "Design, content, automation and development move together so every service ships with purpose.",
  },
  {
    label: "Grow",
    text: "After launch, we measure performance and improve the parts that create leads, clarity and speed.",
  },
];

export function Expertise() {
  return (
    <section id="expertise" className="expertise section band" aria-labelledby="expertise-title">
      <div className="container-page">
        <ExpertiseScroll>
          <div className="exp-pin">
            <div className="section-heading">
              <h2 id="expertise-title">Our Expertise</h2>
              <p className="section-label">Service</p>
            </div>

            <ol className="exp-row">
              {EXPERTISE.map((service, index) => {
                const number = String(index + 1).padStart(2, "0");

                return (
                  <li
                    key={service.slug}
                    className="exp-panel"
                    data-panel={index}
                    data-open={index === 0 ? "true" : undefined}
                    style={{ "--i": index } as CSSProperties}
                  >
                    <button
                      type="button"
                      className="exp-head"
                      data-panel-btn={index}
                      aria-expanded={index === 0}
                      aria-controls={`exp-body-${index}`}
                    >
                      <span>SERVICE</span>
                      <span className="exp-num">({number})</span>
                    </button>

                    <p className="exp-vtitle" aria-hidden="true">
                      {service.title}
                    </p>

                    <div className="exp-body" id={`exp-body-${index}`}>
                      <div className="exp-body-inner">
                        <div className="exp-img">
                          <Image
                            src={service.image}
                            alt={service.alt}
                            width={1200}
                            height={533}
                            sizes="(min-width: 1024px) 520px, 100vw"
                          />
                        </div>
                        <h3>
                          <Link href={`/services/${service.slug}`}>{service.title}</Link>
                        </h3>
                        <p>{service.text}</p>
                        <ul className="exp-tags">
                          {service.tags.map((tag) => (
                            <li key={tag}>{tag}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="exp-progress" aria-hidden="true">
              <span className="exp-count">01</span>
              <span> / {String(EXPERTISE.length).padStart(2, "0")}</span>
              <i>
                <b />
              </i>
            </div>

            <div className="exp-support" aria-label="How FOXELYX delivers expertise">
              {EXPERTISE_OUTCOMES.map((item) => (
                <article key={item.label}>
                  <span>{item.label}</span>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </ExpertiseScroll>
      </div>
    </section>
  );
}
