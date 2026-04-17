import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Videos & Music",
  description: "Watch Kingdom Kids videos and listen to original songs — straight from the safari!",
};

const SONGS = [
  { file: "/music/Kingdom Kids Humble Heart.mp3",         title: "Humble Heart",         emoji: "🙏" },
  { file: "/music/Kingdom Kids Jesus Makes Us Whole.mp3", title: "Jesus Makes Us Whole", emoji: "✝️" },
];

export default function BookshelfPage() {
  return (
    <div style={{ padding: "4px 0" }}>

      {/* ── VIDEO ────────────────────────────────────────── */}
      <header style={{ display: "flex", alignItems: "center", gap: "8px", borderBottom: "2px solid #3d2008", paddingBottom: "8px", marginBottom: "12px" }}>
        <h2 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Featured Video
        </h2>
        <span style={{
          background: "linear-gradient(135deg, #f07c2a, #d94f2b)",
          color: "white", fontSize: "0.58rem", fontWeight: 900,
          padding: "2px 9px", borderRadius: "999px", textTransform: "uppercase", letterSpacing: "0.08em",
        }}>New</span>
      </header>

      {/* Video player */}
      <div style={{ borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(196,146,58,0.5)", boxShadow: "0 2px 10px rgba(0,0,0,0.2)", background: "#0a2c10", marginBottom: "10px" }}>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          src="/videos/Welcome Kingdom Kids.mp4"
          controls
          preload="metadata"
          style={{ width: "100%", display: "block" }}
        />
      </div>

      {/* Video description */}
      <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", background: "rgba(196,146,58,0.1)", border: "1px solid rgba(196,146,58,0.3)", borderRadius: "8px", padding: "12px", marginBottom: "20px" }}>
        <div style={{ flexShrink: 0, width: "60px" }}>
          <Image src="/images/Ian Sophie.png" alt="Ian and Sophie" width={200} height={265}
            style={{ width: "100%", height: "auto", display: "block", filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.2))" }} />
        </div>
        <div>
          <h3 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "0.9rem", fontWeight: 900, margin: "0 0 4px" }}>
            Welcome to Kingdom Kids!
          </h3>
          <p style={{ color: "#5c3d1e", fontSize: "0.76rem", lineHeight: 1.55, margin: 0 }}>
            Join Ian &amp; Sophie as they kick off the safari adventure — meet the crew and discover what Kingdom Kids is all about! 🌿
          </p>
        </div>
      </div>

      {/* ── MUSIC ────────────────────────────────────────── */}
      <header style={{ display: "flex", alignItems: "center", gap: "8px", borderBottom: "2px solid #3d2008", paddingBottom: "8px", marginBottom: "12px" }}>
        <h2 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          The Playlist
        </h2>
      </header>

      {/* Music description */}
      <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", background: "rgba(196,146,58,0.1)", border: "1px solid rgba(196,146,58,0.3)", borderRadius: "8px", padding: "12px", marginBottom: "10px" }}>
        <div style={{ flexShrink: 0, width: "54px" }}>
          <Image src="/images/timmy and drums.png" alt="Timmy playing drums" width={200} height={265}
            style={{ width: "100%", height: "auto", display: "block", filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.2))" }} />
        </div>
        <div>
          <h3 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "0.9rem", fontWeight: 900, margin: "0 0 4px" }}>
            Timmy&apos;s Got the Beat!
          </h3>
          <p style={{ color: "#5c3d1e", fontSize: "0.76rem", lineHeight: 1.55, margin: 0 }}>
            Original worship songs kids hum all week — and parents secretly love. 🥁
          </p>
        </div>
      </div>

      {/* Track list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
        {SONGS.map((song) => (
          <div key={song.file} style={{
            background: "rgba(196,146,58,0.1)", border: "1px solid rgba(196,146,58,0.35)",
            borderRadius: "8px", padding: "10px 12px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "8px" }}>
              <span style={{ fontSize: "1.1rem" }}>{song.emoji}</span>
              <p style={{ color: "#3d2008", fontWeight: 900, fontSize: "0.82rem", fontFamily: "Georgia, serif", margin: 0 }}>
                {song.title}
              </p>
            </div>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <audio controls preload="metadata" style={{ width: "100%", display: "block" }}>
              <source src={song.file} type="audio/mpeg" />
            </audio>
          </div>
        ))}
      </div>

      {/* More coming */}
      <div style={{
        background: "rgba(26,92,34,0.1)", border: "1.5px dashed rgba(90,158,78,0.45)",
        borderRadius: "10px", padding: "12px 14px", textAlign: "center",
      }}>
        <p style={{ color: "#3d6b2e", fontWeight: 800, fontSize: "0.78rem", margin: "0 0 2px" }}>
          🌿 More videos &amp; songs on the way!
        </p>
        <p style={{ color: "#5c3d1e", fontSize: "0.72rem", margin: 0 }}>
          Follow us on Facebook so you never miss a new drop.
        </p>
      </div>

    </div>
  );
}
