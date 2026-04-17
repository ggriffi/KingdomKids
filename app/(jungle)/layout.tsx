"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const FB = "https://www.facebook.com/";

const TOP_NAV = [
  { label: "Home",    href: "/",           ext: false },
  { label: "About",   href: FB,            ext: true  },
  { label: "Games",   href: "/games",      ext: false },
  { label: "Videos",  href: "/bookshelf",  ext: false },
  { label: "Contact", href: "/contact",    ext: false },
];

const EXTRA_NAV = [
  { label: "Rhino Corner", href: "/rhino-corner", ext: false },
  { label: "Store",        href: "/store",         ext: false },
];

const CIRCLES = [
  { label: "Latest Video", href: "/bookshelf", ext: false },
  { label: "Fun Games",    href: "/games",     ext: false },
  { label: "About Us",     href: FB,           ext: true  },
];


function PanelHeader() {
  return (
    <>
      <div style={{ height: "5px", background: "linear-gradient(90deg, #7a4520, #c4923a, #f5c842, #c4923a, #7a4520)", borderRadius: "14px 14px 0 0" }} />
      <div style={{ display: "flex", justifyContent: "center", padding: "5px 0 4px", borderBottom: "1px solid rgba(196,146,58,0.25)" }}>
        <Image src="/images/circle logo.png" alt="The Kingdom Kids" width={48} height={38} style={{ objectFit: "contain" }} />
      </div>
    </>
  );
}

const MOB_LINK: React.CSSProperties = {
  color: "#f7d88d", textDecoration: "none", textTransform: "uppercase",
  fontWeight: 900, fontSize: "clamp(0.58rem, 3vw, 0.8rem)", letterSpacing: "0.02em",
  padding: "12px 2px", whiteSpace: "nowrap",
  textShadow: "0 1px 0 #5f3617, 0 2px 0 #5f3617",
  fontFamily: '"Trebuchet MS", Arial, sans-serif',
  display: "block", textAlign: "center", flex: 1,
};

function VbsLightbox({ onClose }: { onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 2000,
        background: "rgba(0,0,0,0.88)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <div
        style={{ position: "relative" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 940×788 PNG has white side margins — 3:4 portrait crop removes them */}
        <div style={{
          position: "relative", width: "min(68vw, 400px)", aspectRatio: "3 / 4",
          overflow: "hidden", borderRadius: "14px", boxShadow: "0 12px 48px rgba(0,0,0,0.6)",
        }}>
          <Image
            src="/images/VBS Annoucement.png"
            alt="VBS Announcement"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            sizes="400px"
          />
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute", top: "-14px", right: "-14px",
            width: "34px", height: "34px", borderRadius: "50%",
            background: "#f07c2a", color: "white", border: "none",
            cursor: "pointer", fontSize: "1.1rem", fontWeight: 900,
            boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
          }}
        >✕</button>
      </div>
    </div>
  );
}

export default function JungleLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [lightbox, setLightbox] = useState(false);

  return (
    <>
      {lightbox && <VbsLightbox onClose={() => setLightbox(false)} />}

      <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", background: "#0a2c10" }}>

        {/* Image header — cropped to show characters only, no bottom circles */}
        <div style={{ position: "relative", height: "195px", flexShrink: 0, overflow: "hidden" }}>
          <Image src="/images/Jungle adventure with The Kingdom Kids.png"
            alt="The Kingdom Kids" fill style={{ objectFit: "cover", objectPosition: "50% 0%" }}
            priority sizes="100vw" />
        </div>

        {/* Wooden nav — row 1 */}
        <nav style={{
          display: "flex", alignItems: "stretch", justifyContent: "space-around",
          background: "linear-gradient(180deg, #a86a36 0%, #8b5327 40%, #6e3f1d 100%)",
          borderTop: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.4)", flexShrink: 0
        }}>
          {TOP_NAV.map((b) => b.ext
            ? <a key={b.label} href={b.href} target="_blank" rel="noopener noreferrer" style={MOB_LINK}>{b.label}</a>
            : <Link key={b.label} href={b.href} style={MOB_LINK}>{b.label}</Link>
          )}
        </nav>
        {/* Wooden nav — row 2 (Rhino Corner + Store) */}
        <nav style={{
          display: "flex", alignItems: "stretch", justifyContent: "center", gap: "0",
          background: "linear-gradient(180deg, #8b5327 0%, #6e3f1d 60%, #5a3318 100%)",
          borderBottom: "3px solid #3d2008",
          boxShadow: "0 4px 12px rgba(0,0,0,0.5)", flexShrink: 0
        }}>
          {EXTRA_NAV.map((b) => (
            <Link key={b.label} href={b.href} style={MOB_LINK}>{b.label}</Link>
          ))}
        </nav>

        {/* Content */}
        {isHome ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "18px 16px 28px", gap: "16px" }}>
            {/* Quick-links row */}
            <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
              {CIRCLES.map((b) => {
                const icon = b.label === "Latest Video" ? "📺" : b.label === "Fun Games" ? "🎮" : "👥";
                const inner = (
                  <>
                    <div style={{
                      width: "76px", height: "76px", borderRadius: "50%",
                      background: "linear-gradient(135deg, #f5c842, #d4a853)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.4)", border: "3px solid rgba(255,255,255,0.3)",
                      fontSize: "1.7rem"
                    }}>{icon}</div>
                    <span style={{
                      color: "#f7d88d", fontSize: "0.62rem", fontWeight: 800,
                      textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "center",
                      marginTop: "6px"
                    }}>{b.label}</span>
                  </>
                );
                return b.ext
                  ? <a key={b.label} href={b.href} target="_blank" rel="noopener noreferrer"
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", textDecoration: "none" }}>{inner}</a>
                  : <Link key={b.label} href={b.href}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", textDecoration: "none" }}>{inner}</Link>;
              })}
            </div>

            {/* Announcements — no border, tap to enlarge */}
            <button
              onClick={() => setLightbox(true)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0, width: "min(300px, 85vw)" }}
              aria-label="View Announcements"
            >
              <Image
                src="/images/Announcements.png"
                alt="Announcements — tap to enlarge"
                width={1536}
                height={1024}
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "8px", boxShadow: "0 4px 18px rgba(0,0,0,0.5)" }}
                sizes="300px"
              />
            </button>

            {/* Life of Faith watermark */}
            <a href="https://lifeoffaith.net/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <Image
                src="/images/LifeofFaithlogo.png"
                alt="Life of Faith"
                width={1536}
                height={1024}
                style={{ width: "min(120px, 34vw)", height: "auto", display: "block", opacity: 0.55 }}
                sizes="120px"
              />
            </a>
          </div>
        ) : (
          <div style={{ flex: 1, overflowY: "auto", background: "rgba(253,246,227,0.98)", display: "flex", flexDirection: "column" }}>
            <PanelHeader />
            <div style={{ padding: "12px 14px 20px" }}>{children}</div>
          </div>
        )}
      </div>
    </>
  );
}
