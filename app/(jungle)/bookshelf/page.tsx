import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Videos & Music",
  description: "Watch Kingdom Kids videos and listen to original songs — straight from the safari!",
};

const SONGS = [
  { file: "/music/Kingdom Kids Humble Heart.mp3",        title: "Humble Heart",          note: "A song about choosing kindness every day 🌸" },
  { file: "/music/Kingdom Kids Jesus Makes Us Whole.mp3", title: "Jesus Makes Us Whole",   note: "Because with Jesus, nothing is missing ✝️"    },
];

const woodHeader = (label: string, badge?: string) => (
  <div style={{
    background: "linear-gradient(135deg, #6b3f1f, #3d2008)",
    borderRadius: "12px 12px 0 0", padding: "10px 18px",
    display: "flex", alignItems: "center", gap: "10px",
  }}>
    <h2 style={{ color: "#f5c842", fontFamily: "Georgia, serif", fontSize: "1.05rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>
      {label}
    </h2>
    {badge && (
      <span style={{ background: "linear-gradient(135deg, #f07c2a, #d94f2b)", color: "white", fontSize: "0.6rem", fontWeight: 900, padding: "3px 10px", borderRadius: "999px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
        {badge}
      </span>
    )}
  </div>
);

export default function BookshelfPage() {
  return (
    <div style={{ padding: "16px 0 8px", maxWidth: "1200px", margin: "0 auto" }}>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", alignItems: "start" }}>

        {/* ── VIDEO ── */}
        <section>
          {woodHeader("🎬 Watch & Learn", "New")}
          <div style={{ background: "linear-gradient(160deg, #fffdf5, #fef5da)", border: "2px solid #c4923a", borderTop: "none", borderRadius: "0 0 12px 12px", overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video src="/videos/Welcome Kingdom Kids.mp4" controls preload="metadata"
              style={{ width: "100%", maxHeight: "260px", display: "block", objectFit: "contain", background: "#0a2c10" }} />

            <div style={{ padding: "14px 16px", display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <div style={{ flexShrink: 0, width: "80px" }}>
                <Image src="/images/Ian Sophie.png" alt="Ian and Sophie" width={200} height={265}
                  style={{ width: "100%", height: "auto", display: "block", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))" }} />
              </div>
              <div>
                <h3 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.05rem", fontWeight: 900, margin: "0 0 6px" }}>
                  Welcome to Kingdom Kids!
                </h3>
                <p style={{ color: "#5c3d1e", fontSize: "0.88rem", lineHeight: 1.6, margin: 0 }}>
                  Meet Ian &amp; Sophie and the whole safari crew! They&apos;re SO excited to take you on this Bible adventure. Hit play and let the fun begin! 🌿
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── MUSIC ── */}
        <section>
          {woodHeader("🎵 Sing Along!")}
          <div style={{ background: "linear-gradient(160deg, #fffdf5, #fef5da)", border: "2px solid #c4923a", borderTop: "none", borderRadius: "0 0 12px 12px", padding: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}>

            <div style={{ display: "flex", gap: "14px", alignItems: "flex-start", marginBottom: "16px" }}>
              <div style={{ flexShrink: 0, width: "72px" }}>
                <Image src="/images/timmy and drums.png" alt="Timmy" width={200} height={265}
                  style={{ width: "100%", height: "auto", display: "block", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))" }} />
              </div>
              <div>
                <h3 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.05rem", fontWeight: 900, margin: "0 0 6px" }}>
                  Timmy&apos;s Got the Beat!
                </h3>
                <p style={{ color: "#5c3d1e", fontSize: "0.88rem", lineHeight: 1.6, margin: 0 }}>
                  These are the songs kids hum ALL week long — and parents secretly love them too. Turn it up and sing your heart out! 🥁
                </p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {SONGS.map((song) => (
                <div key={song.file} style={{
                  background: "linear-gradient(135deg, #fffdf5, #fff8e8)",
                  border: "1.5px solid #d4a853", borderLeft: "4px solid #f07c2a",
                  borderRadius: "8px", padding: "10px 14px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                }}>
                  <p style={{ color: "#3d2008", fontWeight: 900, fontSize: "0.9rem", fontFamily: "Georgia, serif", margin: "0 0 3px" }}>
                    {song.title}
                  </p>
                  <p style={{ color: "#8b5e3c", fontSize: "0.75rem", margin: "0 0 8px", lineHeight: 1.4 }}>{song.note}</p>
                  {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                  <audio controls preload="metadata" style={{ width: "100%", height: "32px" }}>
                    <source src={song.file} type="audio/mpeg" />
                  </audio>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>

      <div style={{ marginTop: "20px", background: "linear-gradient(135deg, #1a5c22, #0a2c10)", border: "2px solid #f5c842", borderRadius: "12px", padding: "14px 18px", textAlign: "center" }}>
        <p style={{ color: "#f5c842", fontWeight: 900, fontSize: "0.95rem", margin: "0 0 4px", fontFamily: "Georgia, serif" }}>
          🌿 More videos &amp; songs coming soon!
        </p>
        <p style={{ color: "rgba(253,246,227,0.8)", fontSize: "0.82rem", margin: 0 }}>
          Follow us on Facebook so you never miss a new adventure!
        </p>
      </div>

    </div>
  );
}
