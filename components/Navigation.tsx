"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "BOOKSHELF",          href: "/bookshelf" },
  { label: "CURRICULUM",         href: "/curriculum" },
  { label: "MEET THE EXPLORERS", href: "/explorers" },
  { label: "MISSIONS",           href: "/missions" },
  { label: "SHOP",               href: "/shop" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50">

      {/* ── Jungle canopy strip ─────────────────────────── */}
      <div className="relative overflow-hidden" style={{ height: "40px", background: "linear-gradient(180deg, #082808 0%, #0f4a0a 40%, #186214 80%, #1e7218 100%)" }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 40" preserveAspectRatio="none" aria-hidden>
          {/* Dense foliage clusters */}
          <ellipse cx="0"    cy="12" rx="90"  ry="36" fill="#1a6010"/>
          <ellipse cx="70"   cy="4"  rx="80"  ry="30" fill="#228018"/>
          <ellipse cx="160"  cy="10" rx="90"  ry="34" fill="#1e7012"/>
          <ellipse cx="240"  cy="2"  rx="70"  ry="26" fill="#2a9020"/>
          <ellipse cx="320"  cy="8"  rx="85"  ry="32" fill="#1a6010"/>
          <ellipse cx="420"  cy="3"  rx="80"  ry="28" fill="#228018"/>
          <ellipse cx="510"  cy="9"  rx="90"  ry="34" fill="#1e7012"/>
          <ellipse cx="600"  cy="1"  rx="75"  ry="26" fill="#2a9020"/>
          <ellipse cx="680"  cy="7"  rx="85"  ry="32" fill="#1a6010"/>
          <ellipse cx="760"  cy="2"  rx="80"  ry="30" fill="#228018"/>
          <ellipse cx="860"  cy="8"  rx="90"  ry="34" fill="#1e7012"/>
          <ellipse cx="950"  cy="1"  rx="75"  ry="28" fill="#2a9020"/>
          <ellipse cx="1040" cy="7"  rx="85"  ry="32" fill="#1a6010"/>
          <ellipse cx="1130" cy="3"  rx="80"  ry="28" fill="#228018"/>
          <ellipse cx="1220" cy="9"  rx="90"  ry="34" fill="#1e7012"/>
          <ellipse cx="1310" cy="2"  rx="75"  ry="26" fill="#2a9020"/>
          <ellipse cx="1400" cy="8"  rx="85"  ry="34" fill="#1a6010"/>
          <ellipse cx="1440" cy="4"  rx="80"  ry="30" fill="#228018"/>
          {/* Leaf tips hanging into the board */}
          <path d="M 80,40 Q 95,22 115,40"  fill="#2a9020"/>
          <path d="M 230,40 Q 248,18 268,40" fill="#1e7012"/>
          <path d="M 390,40 Q 406,20 425,40" fill="#228018"/>
          <path d="M 560,40 Q 576,16 596,40" fill="#2a9020"/>
          <path d="M 720,40 Q 738,20 758,40" fill="#1e7012"/>
          <path d="M 880,40 Q 897,18 916,40" fill="#228018"/>
          <path d="M 1040,40 Q 1057,20 1076,40" fill="#2a9020"/>
          <path d="M 1200,40 Q 1217,18 1236,40" fill="#1e7012"/>
          <path d="M 1360,40 Q 1378,22 1398,40" fill="#228018"/>
        </svg>
        {/* Shadow blending into board */}
        <div className="absolute bottom-0 left-0 right-0 h-5"
          style={{ background: "linear-gradient(180deg, transparent, rgba(30,10,0,0.45))" }}/>
      </div>

      {/* ── Wooden board ────────────────────────────────── */}
      <div className="relative select-none"
        style={{
          background: [
            "linear-gradient(180deg,",
            "  #d4884a 0%,",
            "  #b86828 6%,",
            "  #9a5018 14%,",
            "  #884510 28%,",
            "  #7a3c0e 42%,",
            "  #884510 58%,",
            "  #9a5018 72%,",
            "  #b86828 86%,",
            "  #c4784a 94%,",
            "  #6a3008 100%",
            ")"
          ].join(""),
          boxShadow:
            "0 3px 14px rgba(0,0,0,0.65)," +
            "inset 0 1px 0 rgba(220,160,80,0.35)," +
            "inset 0 -2px 6px rgba(0,0,0,0.55)",
          borderTop:    "2.5px solid #e09848",
          borderBottom: "3px solid #3a1606",
          minHeight:    "52px",
        }}>

        {/* Wood-grain texture overlay */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(180deg," +
              "transparent 0px,transparent 4px," +
              "rgba(0,0,0,0.06) 4px,rgba(0,0,0,0.06) 5px)," +
              "repeating-linear-gradient(179deg," +
              "transparent 0px,rgba(255,170,60,0.04) 50px,transparent 100px)",
            opacity: 0.9,
          }}/>

        {/* Highlight stripe (top of board) */}
        <div className="absolute top-0 left-0 right-0 h-px opacity-60"
          style={{ background: "linear-gradient(90deg,transparent,#ffe0a0 20%,#ffe0a0 80%,transparent)" }}/>

        {/* ── Desktop nav ──────────────────────────────── */}
        <div className="hidden md:flex items-center justify-center gap-0 h-[52px]">
          {NAV_ITEMS.map((item, i) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <div key={item.href} className="flex items-center h-full">
                {/* Vertical divider notch between items */}
                {i > 0 && (
                  <div className="flex flex-col items-center h-8 w-[3px] mx-1">
                    <div className="flex-1 w-px" style={{ background: "linear-gradient(180deg,transparent,#3a1606 40%,#3a1606 60%,transparent)" }}/>
                  </div>
                )}
                <Link
                  href={item.href}
                  className="relative px-5 py-2 font-black text-sm uppercase transition-all duration-150 group"
                  style={{
                    fontFamily:    "Georgia, 'Times New Roman', serif",
                    letterSpacing: "0.13em",
                    color:         active ? "#fff4a0" : "#fde8b0",
                    textShadow:    active
                      ? "0 0 14px rgba(255,240,80,0.7),0 1px 4px rgba(0,0,0,0.9)"
                      : "0 1px 4px rgba(0,0,0,0.9),0 -1px 0 rgba(255,200,80,0.12)",
                  }}
                >
                  {/* Hover glow underline */}
                  <span
                    className="absolute bottom-1.5 left-4 right-4 h-0.5 opacity-0 group-hover:opacity-80 transition-opacity duration-150 rounded-full"
                    style={{ background: "linear-gradient(90deg,transparent,#ffe878,transparent)" }}
                    aria-hidden
                  />
                  {item.label}
                </Link>
              </div>
            );
          })}
        </div>

        {/* ── Mobile header ────────────────────────────── */}
        <div className="flex md:hidden items-center justify-between h-[52px] px-4">
          <Link href="/"
            className="font-black text-base uppercase tracking-widest"
            style={{
              fontFamily:  "Georgia, serif",
              color:       "#fde8b0",
              textShadow:  "0 1px 4px rgba(0,0,0,0.9)",
            }}>
            The Kingdom Kids
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded transition-colors"
            style={{ color: "#fde8b0" }}
            aria-label="Toggle menu">
            {open ? <X size={22}/> : <Menu size={22}/>}
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown ─────────────────────────────── */}
      {open && (
        <div className="md:hidden flex flex-col gap-0.5 px-3 py-3 border-t border-[#3a1606]"
          style={{ background: "linear-gradient(180deg,#884510,#5a2a08)" }}>
          {NAV_ITEMS.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-5 py-3 rounded font-black text-sm uppercase tracking-widest transition-all"
                style={{
                  fontFamily:  "Georgia, serif",
                  color:       active ? "#fff4a0" : "#fde8b0",
                  textShadow:  "0 1px 4px rgba(0,0,0,0.9)",
                  background:  active ? "rgba(0,0,0,0.25)" : "transparent",
                }}>
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
