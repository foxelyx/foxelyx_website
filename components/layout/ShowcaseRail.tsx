import Image from "next/image";
import Link from "next/link";

export type RailItem = {
  href: string;
  index: string;
  kicker: string;
  title: string;
  text?: string;
  image?: string;
  imageAlt?: string;
};

export function ShowcaseRail({ items }: { items: RailItem[] }) {
  return (
    <div className="showcase-rail">
      {items.map((item) => (
        <Link key={`${item.href}-${item.title}`} href={item.href} className="showcase-row" data-row>
          <span className="showcase-index">{item.index}</span>
          <span className="showcase-copy">
            <small>{item.kicker}</small>
            <strong>{item.title}</strong>
            {item.text ? <em>{item.text}</em> : null}
          </span>
          {item.image ? (
            <span className="showcase-media">
              <Image src={item.image} alt={item.imageAlt ?? ""} width={480} height={300} />
            </span>
          ) : (
            <span className="showcase-go" aria-hidden="true">
              →
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}
