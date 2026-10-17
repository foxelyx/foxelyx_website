import type { FaqItem } from "@/data/services";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqGraph } from "@/lib/schema";

export function FaqList({ faqs, labelledBy }: { faqs: FaqItem[]; labelledBy: string }) {
  return (
    <div className="faq-list" aria-labelledby={labelledBy}>
      <JsonLd data={faqGraph(faqs)} />
      {faqs.map((faq, index) => (
        <details key={faq.question}>
          <summary>
            <span>Q-{String(index + 1).padStart(2, "0")}</span>
            {faq.question}
          </summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
