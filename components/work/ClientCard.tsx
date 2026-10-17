import Image from "next/image";
import Link from "next/link";
import type { Client } from "@/data/clients";

export function ClientCard({ client, index }: { client: Client; index: number }) {
  return (
    <Link href={`/work/${client.slug}`} className="showcase-row" data-row>
      <span className="showcase-index">{String(index + 1).padStart(2, "0")}</span>
      <span className="showcase-copy">
        <small>{client.industries[0]}</small>
        <strong>{client.name}</strong>
        <em>{client.services.join(" · ")}</em>
      </span>
      <span className="logo-plate">
        <Image
          className="logo-plate-img"
          src={client.logo}
          alt=""
          width={320}
          height={160}
        />
      </span>
    </Link>
  );
}
