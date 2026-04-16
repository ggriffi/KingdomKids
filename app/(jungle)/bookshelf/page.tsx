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

      {/* Hero image */}
      <div style={{ borderRadius: "14px", overflow: "hidden", marginBottom: "16px", boxShadow: "0 6px 24px rgba(0,0,0,0.35)", border: "2px solid rgba(196,146,58,0.5)" }}>
        <Image
          src="/images/Jungle adventure with The Kingdom Kids.png"
          alt="Kingdom Kids — Jungle Adventure"
          width={1200}
          height={800}
          style={{ width: "100%", height: "auto", display: "block" }}
          priority
        />
      </div>

      {/* ── VIDEO ────────────────────────────────────────── */}
      <div style={{ marginBottom: "18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
          <h2 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.1rem", fontWeight: 900, margin: 0 }}>
            🎬 Latest Video
          </h2>
          <span style={{
            background: "linear-gradient(135deg, #f07c2a, #d94f2b)",
            color: "white", fontSize: "0.58rem", fontWeight: 900,
            padding: "2px 9px", borderRadius: "999px", textTransform: "uppercase", letterSpacing: "0.06em",
          }}>New</span>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "10px" }}>
          <div style={{ flexShrink: 0, width: "80px" }}>
            <Image
              src="/images/Ian Sophie.png"
              alt="Ian and Sophie"
              width={400}
              height={530}
              style={{ width: "100%", height: "auto", display: "block", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.25))" }}
            />
          </div>
          <div>
            <h3 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "0.95rem", fontWeight: 900, margin: "0 0 4px" }}>
              Welcome to Kingdom Kids!
            </h3>
            <p style={{ color: "#5c3d1e", fontSize: "0.76rem", lineHeight: 1.6, margin: 0 }}>
              Join Ian &amp; Sophie as they kick off the safari adventure!
              Meet the crew, explore the jungle, and discover what Kingdom Kids is all about. 🌿
            </p>
          </div>
        </div>

        <div style={{ borderRadius: "12px", overflow: "hidden", border: "2px solid rgba(196,146,58,0.5)", boxShadow: "0 4px 18px rgba(0,0,0,0.3)" }}>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            src="/videos/Welcome Kingdom Kids.mp4"
            controls
            preload="metadata"
            style={{ width: "100%", display: "block", background: "#0a2c10" }}
          />
        </div>
      </div>

      {/* ── MUSIC ────────────────────────────────────────── */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
          <h2 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.1rem", fontWeight: 900, margin: 0 }}>
            🎵 Kingdom Kids Songs
          </h2>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "12px" }}>
          <div style={{ flexShrink: 0, width: "72px" }}>
            <Image
              src="/images/timmy and drums.png"
              alt="Timmy playing drums"
              width={400}
              height={530}
              style={{ width: "100%", height: "auto", display: "block", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.25))" }}
            />
          </div>
          <div>
            <h3 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "0.95rem", fontWeight: 900, margin: "0 0 4px" }}>
              Timmy&apos;s Got the Beat!
            </h3>
            <p style={{ color: "#5c3d1e", fontSize: "0.76rem", lineHeight: 1.6, margin: 0 }}>
              Original Kingdom Kids worship songs — the kind kids hum all week
              and parents secretly love. Hit play and join the jam! 🥁
            </p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {SONGS.map((song) => (
            <div key={song.file} style={{
              background: "rgba(196,146,58,0.14)",
              border: "1px solid rgba(196,146,58,0.45)",
              borderRadius: "12px", padding: "12px 14px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <span style={{ fontSize: "1.2rem" }}>{song.emoji}</span>
                <p style={{ color: "#3d2008", fontWeight: 900, fontSize: "0.85rem", fontFamily: "Georgia, serif", margin: 0 }}>
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
      </div>

      {/* More coming */}
      <div style={{
        marginTop: "16px",
        background: "rgba(26,92,34,0.12)", border: "1.5px dashed rgba(90,158,78,0.5)",
        borderRadius: "12px", padding: "12px 16px", textAlign: "center",
      }}>
        <p style={{ color: "#3d6b2e", fontWeight: 800, fontSize: "0.8rem", margin: "0 0 2px" }}>
          🌿 More videos &amp; songs on the way!
        </p>
        <p style={{ color: "#5c3d1e", fontSize: "0.72rem", margin: 0 }}>
          Follow us on Facebook so you never miss a new drop.
        </p>
      </div>

    </div>
  );
}
