"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { PRIMARY_NAV } from "@/data/nav";
import { OFFICES, officePlaces } from "@/data/offices";
import { SOCIALS } from "@/data/site";
import { REGIONS } from "@/lib/regions";
import { homeHrefForPath, hrefForRegion } from "@/lib/paths";
import { MeshBackdrop } from "@/components/motion/MeshBackdrop";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { RegionSwitcher } from "@/components/layout/RegionSwitcher";

function isCurrent(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [previewHref, setPreviewHref] = useState<string>(PRIMARY_NAV[0].href);
  const menuId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const current =
    PRIMARY_NAV.find((item) => isCurrent(item.href, pathname)) ?? PRIMARY_NAV[0];
  const preview =
    PRIMARY_NAV.find((item) => item.href === previewHref) ?? current;
  const previewIndex = PRIMARY_NAV.findIndex((item) => item.href === preview.href);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const onScroll = () => {
      const hero = document.querySelector(".hero");
      const headerBottom = bar.getBoundingClientRect().bottom;
      const heroRect = hero?.getBoundingClientRect();
      const overHero = Boolean(
        heroRect && heroRect.top < headerBottom && heroRect.bottom > headerBottom,
      );
      bar.dataset.overHero = overHero ? "true" : "false";
      bar.dataset.scrolled = !overHero && window.scrollY > 12 ? "true" : "false";
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setPreviewHref(current.href);
  }, [pathname, current.href]);

  useEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    window.__lenis?.stop();
    document.body.style.overflow = "hidden";
    const focusable = menu
      ? Array.from(menu.querySelectorAll<HTMLElement>("a[href], button"))
      : [];
    const currentLink = menu?.querySelector<HTMLElement>('[aria-current="page"]');
    (currentLink ?? focusable[0])?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (event.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.__lenis?.start();
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="site-header">
      <div ref={barRef} className="site-bar" data-scrolled="false">
        <Link href={homeHrefForPath(pathname)} className="logo-link" aria-label="FOXELYX">
          <Image
            src="/images/foxelyx-wordmark.png"
            alt=""
            width={1600}
            height={419}
          />
        </Link>
        <div className="bar-actions">
          <SocialLinks className="header-socials" />
          <span className="desktop-only">
            <Button href="/contact" variant="ghost">Start a project</Button>
          </span>
          <RegionSwitcher />
          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>
      <div
        id={menuId}
        ref={menuRef}
        className="site-menu"
        data-open={open ? "true" : "false"}
        inert={open ? undefined : true}
      >
        <div className="menu-stage">
          <div className="menu-main">
            <p className="menu-kicker">
              <span className="section-label">Navigate</span>
              <span>Esc to close</span>
            </p>
            <nav aria-label="Primary" className="menu-nav">
              {PRIMARY_NAV.map((item, index) => {
                const active = isCurrent(item.href, pathname);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="menu-link"
                    style={{ "--i": index } as CSSProperties}
                    aria-current={active ? "page" : undefined}
                    tabIndex={open ? 0 : -1}
                    onMouseEnter={() => setPreviewHref(item.href)}
                    onFocus={() => setPreviewHref(item.href)}
                  >
                    <span className="menu-index">{String(index + 1).padStart(2, "0")}</span>
                    <strong>{item.label}</strong>
                  </Link>
                );
              })}
            </nav>
            <div className="menu-meta">
              <div className="menu-offices">
                {OFFICES.map((office) => {
                  const region = REGIONS[office.region];
                  return (
                    <Link
                      key={office.region}
                      href={hrefForRegion(pathname, office.region)}
                      className="office-card"
                      tabIndex={open ? 0 : -1}
                    >
                      <strong>{region.country}</strong>
                      <span>
                        {officePlaces(office).join(" · ") || office.phoneDisplay || "Studio"}
                      </span>
                    </Link>
                  );
                })}
              </div>
              <div className="menu-socials">
                {SOCIALS.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    className="menu-social"
                    target="_blank"
                    rel="noreferrer"
                    tabIndex={open ? 0 : -1}
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <aside className="menu-aside" aria-label="Page preview">
            <MeshBackdrop />
            <span className="menu-watermark" aria-hidden="true">
              {String(previewIndex + 1).padStart(2, "0")}
            </span>
            <div className="menu-preview" key={preview.href}>
              <div className="menu-shot">
                <Image src={preview.image} alt="" width={900} height={1120} />
              </div>
              <p className="step-index">
                ({String(previewIndex + 1).padStart(2, "0")})
                {preview.href === current.href ? " You are here" : ""}
              </p>
              <h2>{preview.label}</h2>
              <p>{preview.description}</p>
              <Button href={preview.href} tabIndex={open ? 0 : -1}>
                Enter
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
