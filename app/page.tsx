import Image from "next/image";
import Link from "next/link";

/*
  All positions are (cx, cy) = center of the clickable zone,
  expressed as a % of the 1536 × 1024 source image.
  The container is locked to 3∶2 so these % values are exact.
*/

const TOP_NAV = [
  { label: "Home",    href: "/",           cx: "7%",   cy: "7%",  w: "9%",  h: "9%"  },
  { label: "About",   href: "/explorers",  cx: "17%",  cy: "7%",  w: "9%",  h: "9%"  },
  { label: "Games",   href: "/missions",   cx: "27%",  cy: "7%",  w: "9%",  h: "9%"  },
  { label: "Videos",  href: "/bookshelf",  cx: "37%",  cy: "7%",  w: "9%",  h: "9%"  },
  { label: "Contact", href: "/curriculum", cx: "47%",  cy: "7%",  w: "9.5%",h: "9%"  },
];

const CIRCLES = [
  { label: "Latest Video", href: "/bookshelf", cx: "22%", cy: "86%", d: "15%" },
  { label: "Fun Games",    href: "/missions",  cx: "50%", cy: "86%", d: "15%" },
  { label: "About Us",     href: "/explorers", cx: "78%", cy: "86%", d: "15%" },
];

export default function HomePage() {
  return (
    /*
      Outer container fills the viewport below the sticky nav.
      Dark jungle green shows in the letterbox area when the screen
      aspect ratio doesn't match 3:2 exactly.
    */
    <div
      className="w-full flex items-center justify-center bg-[#0a2c10]"
      style={{ minHeight: "calc(100vh - 72px)" }}
    >
      {/*
        Image wrapper – constrained so the image never overflows the
        available height.  CSS min() picks whichever is smaller:
          • 100% of the parent width, OR
          • the width that exactly fills the available height at 3∶2
        Result: image fills the screen without clipping or scrolling.
      */}
      <div
        className="relative"
        style={{
          width: "min(100%, calc((100vh - 72px) * 1.5))",
          aspectRatio: "3 / 2",
        }}
      >
        {/* ── Background scene ─────────────────────────── */}
        <Image
          src="/images/Jungle adventure with The Kingdom Kids.png"
          alt="The Kingdom Kids – Jungle Adventure"
          fill
          className="object-fill"
          priority
          sizes="100vw"
        />

        {/* ── Top navigation overlays ──────────────────── */}
        {TOP_NAV.map((b) => (
          <Link
            key={b.label}
            href={b.href}
            aria-label={b.label}
            title={b.label}
            style={{
              position:  "absolute",
              left:      b.cx,
              top:       b.cy,
              width:     b.w,
              height:    b.h,
              transform: "translate(-50%, -50%)",
              borderRadius: "999px",
              /* transparent – image artwork is the visual */
              background: "transparent",
            }}
            /* On hover: faint white ring + brightness boost */
            className="transition-all duration-150 cursor-pointer
                       hover:ring-[3px] hover:ring-white/60
                       hover:bg-white/[0.08]"
          >
            <span className="sr-only">{b.label}</span>
          </Link>
        ))}

        {/* ── Circle button overlays ───────────────────── */}
        {CIRCLES.map((b) => (
          <Link
            key={b.label}
            href={b.href}
            aria-label={b.label}
            title={b.label}
            style={{
              position:    "absolute",
              left:        b.cx,
              top:         b.cy,
              width:       b.d,
              aspectRatio: "1 / 1",
              transform:   "translate(-50%, -50%)",
              borderRadius: "50%",
              background:  "transparent",
            }}
            className="transition-all duration-200 cursor-pointer
                       hover:ring-4 hover:ring-white/55
                       hover:bg-white/[0.10]
                       hover:scale-110"
          >
            <span className="sr-only">{b.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
