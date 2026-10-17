"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { REGIONS, REGION_CODES, type RegionCode } from "@/lib/regions";
import { hrefForRegion, regionFromPath } from "@/lib/paths";

export function RegionSwitcher() {
  const pathname = usePathname();
  const current = regionFromPath(pathname);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const label = current ? current.toUpperCase() : "IN";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="region-switcher desktop-only">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        🌐 {label}
      </button>
      {open ? (
        <div id={menuId} className="region-menu" role="navigation" aria-label="Region">
          {REGION_CODES.map((code) => (
            <RegionLink key={code} code={code} pathname={pathname} current={current} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function RegionLink({
  code,
  pathname,
  current,
}: {
  code: RegionCode;
  pathname: string;
  current?: RegionCode;
}) {
  const region = REGIONS[code];
  return (
    <Link
      href={hrefForRegion(pathname, code)}
      aria-current={current === code ? "page" : undefined}
    >
      {region.country}
    </Link>
  );
}
