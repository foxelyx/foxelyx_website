import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbGraph } from "@/lib/schema";

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="crumbs">
          {items.map((item, index) => {
            const last = index === items.length - 1;
            return (
              <li key={item.path}>
                {last ? (
                  <span aria-current="page">{item.name}</span>
                ) : (
                  <Link href={item.path}>{item.name}</Link>
                )}
                {last ? null : <span aria-hidden="true"> / </span>}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbGraph(items)} />
    </>
  );
}
