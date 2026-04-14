"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Bookshelf",          href: "/bookshelf" },
  { label: "Curriculum",         href: "/curriculum" },
  { label: "Meet the Explorers", href: "/explorers" },
  { label: "Missions",           href: "/missions" },
  { label: "Shop",               href: "/shop" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full px-3 pt-[10px] pb-0"
      style={{ background: "#0a2c10" }}>

      {/* Rope hooks */}
      <span className="kk-rope left"  aria-hidden="true" />
      <span className="kk-rope right" aria-hidden="true" />

      <nav
        className={`kk-board${open ? " open" : ""}`}
        aria-label="Primary navigation"
      >
        {/* Mobile toggle */}
        <button
          className="kk-menu-btn"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="kkNavLinks"
        >
          {open ? "✕ Close" : "☰ Menu"}
        </button>

        {/* Links */}
        <div className="kk-nav-links" id="kkNavLinks">
          {NAV_ITEMS.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "active" : ""}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
