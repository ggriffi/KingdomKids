import Image from "next/image";
import Link from "next/link";

/*
  Image source: 1536 × 1024 (3∶2 landscape)
  All cx / cy values are % of the image width / height respectively.
  The wrapper is locked to 3∶2 and filled with object-fill,
  so these percentages map 1-to-1 onto the artwork.

  Measured from the source image:
  ┌─ Top nav pills ─────────────────────────────────────────────┐
  │  Five orange pill buttons in the upper-left of the scene.   │
  │  Vertical centre ≈ 7 % from top.                            │
  │  Horizontal centres: 6 % · 14 % · 22 % · 30 % · 38 %       │
  └─────────────────────────────────────────────────────────────┘
  ┌─ Bottom circles ─────────────────────────────────────────────┐
  │  Three gold circles, centred at y ≈ 87 %.                   │
  │  Horizontal centres: 26 % · 50 % · 74 %                     │
  └──────────────────────────────────────────────────────────────┘
*/

const TOP_NAV = [
  { label: "Home",    href: "/",           cx: "6%",  cy: "7%", w: "8%",  h: "8%" },
  { label: "About",   href: "/explorers",  cx: "14%", cy: "7%", w: "8%",  h: "8%" },
  { label: "Games",   href: "/missions",   cx: "22%", cy: "7%", w: "8%",  h: "8%" },
  { label: "Videos",  href: "/bookshelf",  cx: "30%", cy: "7%", w: "8%",  h: "8%" },
  { label: "Contact", href: "/curriculum", cx: "38%", cy: "7%", w: "8%",  h: "8%" },
];

const CIRCLES = [
  { label: "Latest Video", href: "/bookshelf", cx: "26%", cy: "87%", d: "14%" },
  { label: "Fun Games",    href: "/missions",  cx: "50%", cy: "87%", d: "14%" },
  { label: "About Us",     href: "/explorers", cx: "74%", cy: "87%", d: "14%" },
];

export default function HomePage() {
  return (
    /*
      Full viewport — no nav so we own the whole screen height.
      Jungle green fills any letterbox area when the viewport
      aspect ratio doesn't match 3∶2 exactly.
    */
    <div
      className="w-full flex items-center justify-center bg-[#0a2c10]"
      style={{ minHeight: "100vh" }}
    >
      {/*
        Width is capped at whichever is smaller:
          • 100 % of the viewport width, OR
          • the width that fills 100 vh at the 3∶2 ratio
        This guarantees the full image is visible without scrolling.
      */}
      <div
        className="relative"
        style={{
          width: "min(100vw, calc(100vh * 1.5))",
          aspectRatio: "3 / 2",
        }}
      >
        {/* ── Scene ────────────────────────────────────── */}
        <Image
          src="/images/Jungle adventure with The Kingdom Kids.png"
          alt="The Kingdom Kids – Jungle Adventure"
          fill
          className="object-fill"
          priority
          sizes="100vw"
        />

        {/* ── Top nav overlays ─────────────────────────── */}
        {TOP_NAV.map((b) => (
          <Link
            key={b.label}
            href={b.href}
            aria-label={b.label}
            title={b.label}
            style={{
              position:     "absolute",
              left:         b.cx,
              top:          b.cy,
              width:        b.w,
              height:       b.h,
              transform:    "translate(-50%, -50%)",
              borderRadius: "999px",
              background:   "transparent",
            }}
            className="transition-all duration-150 cursor-pointer
                       hover:ring-2 hover:ring-white/70
                       hover:bg-white/10"
          >
            <span className="sr-only">{b.label}</span>
          </Link>
        ))}

        {/* ── Circle overlays ──────────────────────────── */}
        {CIRCLES.map((b) => (
          <Link
            key={b.label}
            href={b.href}
            aria-label={b.label}
            title={b.label}
            style={{
              position:     "absolute",
              left:         b.cx,
              top:          b.cy,
              width:        b.d,
              aspectRatio:  "1 / 1",
              transform:    "translate(-50%, -50%)",
              borderRadius: "50%",
              background:   "transparent",
            }}
            className="transition-all duration-200 cursor-pointer
                       hover:ring-4 hover:ring-white/60
                       hover:bg-white/10 hover:scale-110"
          >
            <span className="sr-only">{b.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
