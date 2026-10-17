"use client";

import { useMemo, useState } from "react";
import { CLIENTS } from "@/data/clients";
import { REGIONS, type RegionCode } from "@/lib/regions";
import { ClientCard } from "@/components/work/ClientCard";

const FILTERS = [
  { id: "all" as const, label: "All" },
  ...Object.values(REGIONS).map((region) => ({
    id: region.code,
    label: region.country,
  })),
];

export function WorkDirectory() {
  const [filter, setFilter] = useState<"all" | RegionCode>("all");
  const clients = useMemo(
    () => CLIENTS.filter((client) => filter === "all" || client.region === filter),
    [filter],
  );

  return (
    <section className="page-section" aria-labelledby="roster-heading">
      <div className="container-page">
        <div className="section-heading">
          <h2 id="roster-heading">Roster</h2>
          <p className="section-label">
            {clients.length} {clients.length === 1 ? "profile" : "profiles"}
          </p>
        </div>
        <div className="filter-row" role="toolbar" aria-label="Filter by country">
          {FILTERS.map((item) => {
            const count =
              item.id === "all"
                ? CLIENTS.length
                : CLIENTS.filter((client) => client.region === item.id).length;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={filter === item.id}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
                <span>{count}</span>
              </button>
            );
          })}
        </div>
        {clients.length === 0 ? (
          <p className="lede">No published profiles for this country yet.</p>
        ) : (
          <div className="showcase-rail">
            {clients.map((client, index) => (
              <ClientCard key={client.slug} client={client} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
