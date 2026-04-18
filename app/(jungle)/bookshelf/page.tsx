import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Videos & Music",
  description: "Watch Kingdom Kids videos and listen to original songs — straight from the safari!",
};

const SONGS = [
  { file: "/music/Kingdom Kids Humble Heart.mp3",         title: "Humble Heart",        note: "A song about choosing kindness every day 🌸" },
  { file: "/music/Kingdom Kids Jesus Makes Us Whole.mp3", title: "Jesus Makes Us Whole", note: "Because with Jesus, nothing is missing ✝️"    },
];

export default function BookshelfPage() {
  return (
    <div style={{ padding: "32px 20px", maxWidth: "1100px", margin: "0 auto", color: "#fff8e7" }}>

      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <h1 style={{ fontSize: "2rem", color: "#f5c842", textShadow: "0 2px 8px rgba(0,0,0,0.6)", margin: "0 0 8px", fontFamily: "Georgia, serif", fontWeight: 900 }}>
          🎬 Watch &amp; Listen
        </h1>
        <p style={{ fontSize: "0.95rem", opacity: 0.85, textShadow: "0 1px 4px rgba(0,0,0,0.6)", margin: 0 }}>
          Songs kids hum all week &amp; videos the whole family will love.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "36px", alignItems: "start" }}>

        {/* ── VIDEO CARD ── */}
        <div style={{
          background: "#fffdf5",
          borderRadius: "30px 8px 30px 8px",
          border: "2px solid #3d2008",
          boxShadow: "10px 10px 0px rgba(0,0,0,0.3)",
          transform: "rotate(-1deg)",
          overflow: "hidden",
          color: "#3d2008",
        }}>
          <div style={{ background: "linear-gradient(135deg, #1a5c22, #0a2c10)", padding: "12px 18px" }}>
            <h2 style={{ color: "#f5c842", fontFamily: "Georgia, serif", fontSize: "1.05rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              🎬 Welcome Video
              <span style={{ marginLeft: "10px", background: "#f07c2a", color: "white", fontSize: "0.55rem", padding: "2px 8px", borderRadius: "999px", verticalAlign: "middle" }}>NEW</span>
            </h2>
          </div>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video src="/videos/Welcome Kingdom Kids.mp4" controls preload="metadata"
            style={{ width: "100%", maxHeight: "240px", display: "block", objectFit: "contain", background: "#0a2c10" }} />
          <div style={{ padding: "16px 18px", display: "flex", gap: "14px", alignItems: "flex-start" }}>
            <div style={{ flexShrink: 0, width: "72px" }}>
              <Image src="/images/Ian Sophie.png" alt="Ian and Sophie" width={200} height={265}
                style={{ width: "100%", height: "auto", display: "block", filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.2))" }} />
            </div>
            <div>
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1rem", fontWeight: 900, margin: "0 0 6px" }}>
                Come meet the crew!
              </h3>
              <p style={{ fontSize: "0.86rem", lineHeight: 1.6, margin: 0, color: "#5c3d1e" }}>
                Ian &amp; Sophie are SO ready for this adventure — and they&apos;ve been waiting for YOU. Hit play, explorers! 🌿
              </p>
            </div>
          </div>
        </div>

        {/* ── MUSIC CARD ── */}
        <div style={{
          background: "#fffdf5",
          borderRadius: "8px 30px 8px 30px",
          border: "2px solid #3d2008",
          boxShadow: "10px 10px 0px rgba(0,0,0,0.3)",
          transform: "rotate(1deg)",
          overflow: "hidden",
          color: "#3d2008",
        }}>
          <div style={{ background: "linear-gradient(135deg, #6b3f1f, #3d2008)", padding: "12px 18px" }}>
            <h2 style={{ color: "#f5c842", fontFamily: "Georgia, serif", fontSize: "1.05rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              🎵 Sing Along!
            </h2>
          </div>

          <div style={{ padding: "16px 18px" }}>
            <div style={{ display: "flex", gap: "14px", alignItems: "flex-start", marginBottom: "18px" }}>
              <div style={{ flexShrink: 0, width: "68px" }}>
                <Image src="/images/timmy and drums.png" alt="Timmy" width={200} height={265}
                  style={{ width: "100%", height: "auto", display: "block", filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.2))" }} />
              </div>
              <div>
                <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1rem", fontWeight: 900, margin: "0 0 6px" }}>
                  Timmy&apos;s Got the Beat!
                </h3>
                <p style={{ fontSize: "0.86rem", lineHeight: 1.6, margin: 0, color: "#5c3d1e" }}>
                  These are the bangers kids hum all week — and parents secretly love them too. Turn it up! 🥁
                </p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {SONGS.map((song, i) => (
                <div key={song.file} style={{
                  background: "#fef5da",
                  border: "2px dashed #c4923a",
                  borderLeft: `4px solid ${i === 0 ? "#f07c2a" : "#3ab5e6"}`,
                  borderRadius: "10px",
                  padding: "10px 14px",
                }}>
                  <p style={{ color: "#3d2008", fontWeight: 900, fontSize: "0.88rem", fontFamily: "Georgia, serif", margin: "0 0 2px" }}>
                    🎵 {song.title}
                  </p>
                  <p style={{ color: "#8b5e3c", fontSize: "0.73rem", margin: "0 0 8px" }}>{song.note}</p>
                  {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                  <audio controls preload="metadata" style={{ width: "100%", height: "32px" }}>
                    <source src={song.file} type="audio/mpeg" />
                  </audio>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ── COMING SOON BANNER ── */}
      <div style={{
        marginTop: "36px",
        background: "#1a5c22",
        borderRadius: "8px 30px",
        border: "2px solid #f5c842",
        boxShadow: "8px 8px 0px rgba(0,0,0,0.3)",
        padding: "20px 24px",
        textAlign: "center",
        backgroundImage: "radial-gradient(#ffffff18 2px, transparent 2px)",
        backgroundSize: "20px 20px",
        transform: "rotate(-0.5deg)",
      }}>
        <p style={{ color: "#f5c842", fontWeight: 900, fontSize: "1rem", margin: "0 0 4px", fontFamily: "Georgia, serif" }}>
          🌿 More videos &amp; songs on the way!
        </p>
        <p style={{ color: "rgba(253,246,227,0.8)", fontSize: "0.85rem", margin: 0 }}>
          Follow us on Facebook so you never miss a new drop!
        </p>
      </div>

    </div>
  );
}
