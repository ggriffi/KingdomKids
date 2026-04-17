import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Videos & Music",
  description: "Watch Kingdom Kids videos and listen to original songs — straight from the safari!",
};

const SONGS = [
  { file: "/music/Kingdom Kids Humble Heart.mp3", title: "Humble Heart", emoji: "🙏" },
  { file: "/music/Kingdom Kids Jesus Makes Us Whole.mp3", title: "Jesus Makes Us Whole", emoji: "✝️" },
];

export default function BookshelfPage() {
  return (
    <div style={{ padding: "16px 0", maxWidth: "1200px", margin: "0 auto" }}>

      {/* ── EDITORIAL GRID LAYOUT ────────────────────────────────────────── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "32px",
        alignItems: "start"
      }}>

        {/* ── VIDEO COLUMN ────────────────────────────────────────── */}
        <section style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          <header style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "2px solid #3d2008", paddingBottom: "8px" }}>
            <h2 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.15rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Featured Video
            </h2>
            <span style={{
              background: "linear-gradient(135deg, #f07c2a, #d94f2b)",
              color: "white", fontSize: "0.6rem", fontWeight: 900,
              padding: "3px 10px", borderRadius: "999px", textTransform: "uppercase", letterSpacing: "0.08em",
            }}>New</span>
          </header>

          <div style={{ borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(196,146,58,0.5)", boxShadow: "0 2px 10px rgba(0,0,0,0.15)", backgroundColor: "#0a2c10" }}>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              src="/videos/Welcome Kingdom Kids.mp4"
              controls
              preload="metadata"
              style={{ width: "100%", maxHeight: "280px", display: "block", objectFit: "contain" }}
            />
          </div>

          <article style={{ display: "flex", gap: "16px", alignItems: "flex-start", background: "rgba(196,146,58,0.05)", padding: "12px", borderRadius: "8px" }}>
            <div style={{ flexShrink: 0, width: "70px" }}>
              <Image
                src="/images/Ian Sophie.png"
                alt="Ian and Sophie"
                width={200}
                height={265}
                style={{ width: "100%", height: "auto", display: "block", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.15))" }}
              />
            </div>
            <div>
              <h3 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "0.95rem", fontWeight: 900, margin: "0 0 6px" }}>
                Welcome to Kingdom Kids!
              </h3>
              <p style={{ color: "#5c3d1e", fontSize: "0.8rem", lineHeight: 1.5, margin: 0 }}>
                Join Ian &amp; Sophie as they kick off the safari adventure!
                Meet the crew, explore the jungle, and discover what Kingdom Kids is all about. 🌿
              </p>
            </div>
          </article>
        </section>

        {/* ── MUSIC COLUMN ────────────────────────────────────────── */}
        <section style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          <header style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "2px solid #3d2008", paddingBottom: "8px" }}>
            <h2 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.15rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              The Playlist
            </h2>
          </header>

          <article style={{ display: "flex", gap: "16px", alignItems: "flex-start", background: "rgba(196,146,58,0.05)", padding: "12px", borderRadius: "8px" }}>
            <div style={{ flexShrink: 0, width: "64px" }}>
              <Image
                src="/images/timmy and drums.png"
                alt="Timmy playing drums"
                width={200}
                height={265}
                style={{ width: "100%", height: "auto", display: "block", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.15))" }}
              />
            </div>
            <div>
              <h3 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "0.95rem", fontWeight: 900, margin: "0 0 6px" }}>
                Timmy&apos;s Got the Beat!
              </h3>
              <p style={{ color: "#5c3d1e", fontSize: "0.8rem", lineHeight: 1.5, margin: 0 }}>
                Original Kingdom Kids worship songs — the kind kids hum all week
                and parents secretly love. Hit play and join the jam! 🥁
              </p>
            </div>
          </article>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {SONGS.map((song) => (
              <div key={song.file} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px",
                background: "rgba(196,146,58,0.1)",
                border: "1px solid rgba(196,146,58,0.3)",
                borderRadius: "6px", padding: "6px 12px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "1.1rem" }}>{song.emoji}</span>
                  <p style={{ color: "#3d2008", fontWeight: 800, fontSize: "0.8rem", fontFamily: "Georgia, serif", margin: 0, whiteSpace: "nowrap" }}>
                    {song.title}
                  </p>
                </div>
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <audio controls preload="metadata" style={{ height: "30px", maxWidth: "160px" }}>
                  <source src={song.file} type="audio/mpeg" />
                </audio>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* ── FOOTER NOTIFICATION ────────────────────────────────────────── */}
      <div style={{
        marginTop: "32px",
        background: "rgba(26,92,34,0.08)", borderTop: "1px solid rgba(90,158,78,0.3)", borderBottom: "1px solid rgba(90,158,78,0.3)",
        padding: "16px", textAlign: "center",
      }}>
        <p style={{ color: "#3d6b2e", fontWeight: 800, fontSize: "0.85rem", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          🌿 More videos &amp; songs on the way!
        </p>
        <p style={{ color: "#5c3d1e", fontSize: "0.75rem", margin: 0 }}>
          Follow us on Facebook so you never miss a new drop.
        </p>
      </div>

    </div>
  );
}