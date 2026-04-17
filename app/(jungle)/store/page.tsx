import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Store",
  description: "Kingdom Kids books, curriculum & resources — grab your safari gear!",
};

const SLOTS = [
  { color: "#f07c2a", label: "Kingdom Kids Curriculum" },
  { color: "#f5c842", label: "Student Activity Book"   },
  { color: "#5a9e4e", label: "Family Devotional Guide" },
  { color: "#4a90d9", label: "Explorer Verse Cards"    },
];

export default function StorePage() {
  return (
    <div style={{ padding: "16px 0", maxWidth: "1200px", margin: "0 auto" }}>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "32px",
        alignItems: "start"
      }}>

        {/* ── COLUMN 1: STATUS ───────────────────────────────── */}
        <section style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <header style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "2px solid #3d2008", paddingBottom: "8px" }}>
            <h2 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.15rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              The Safari Trading Post
            </h2>
            <span style={{
              background: "#f5c842",
              color: "#3d2008", fontSize: "0.6rem", fontWeight: 900,
              padding: "3px 10px", borderRadius: "999px", textTransform: "uppercase", letterSpacing: "0.08em",
            }}>Coming Soon</span>
          </header>

          <article style={{
            flex: 1, display: "flex", flexDirection: "column", justifyContent: "center",
            background: "#0a2c10", border: "1px solid rgba(196,146,58,0.5)",
            padding: "32px 24px", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
          }}>
            <h3 style={{ fontFamily: "Georgia, serif", color: "#f5c842", fontSize: "1.2rem", fontWeight: 900, margin: "0 0 12px" }}>
              Loading the Carts
            </h3>
            <p style={{ color: "rgba(253,246,227,0.9)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "16px" }}>
              Our books, curriculum packs, and printable resources are on their way!
              We&apos;re hand-packing every item before the trading post opens its doors.
              Check back soon — it&apos;s going to be worth the wait.
            </p>
            <p style={{ color: "rgba(253,246,227,0.65)", fontSize: "0.8rem", lineHeight: 1.5, marginBottom: "24px" }}>
              In the meantime, follow us on Facebook to be the first to know when new resources drop.
            </p>
            <div>
              <span style={{
                background: "rgba(245,200,66,0.15)", color: "#f5c842", fontSize: "0.75rem", fontWeight: 800,
                padding: "8px 16px", borderRadius: "999px", textTransform: "uppercase", letterSpacing: "0.08em",
                border: "1px solid rgba(245,200,66,0.4)"
              }}>
                Opening Soon
              </span>
            </div>
          </article>
        </section>

        {/* ── COLUMN 2: PRODUCT SLOTS ────────────────────────── */}
        <section style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <header style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "2px solid #3d2008", paddingBottom: "8px" }}>
            <h2 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.15rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Coming to the Shelves
            </h2>
          </header>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {SLOTS.map((slot) => (
              <div key={slot.label} style={{
                borderRadius: "8px", overflow: "hidden",
                border: "1px solid rgba(196,146,58,0.3)",
                borderTop: `3px solid ${slot.color}`,
              }}>
                <div style={{
                  height: "80px",
                  background: `linear-gradient(135deg, ${slot.color}30, ${slot.color}10)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{
                    background: `${slot.color}20`, border: `1px solid ${slot.color}50`,
                    color: slot.color, fontSize: "0.6rem", fontWeight: 800,
                    padding: "4px 10px", borderRadius: "999px",
                    textTransform: "uppercase", letterSpacing: "0.05em",
                  }}>Coming Soon</span>
                </div>
                <div style={{ padding: "8px 10px", background: "rgba(196,146,58,0.05)" }}>
                  <p style={{ color: "#3d2008", fontWeight: 800, fontSize: "0.72rem", margin: 0, fontFamily: "Georgia, serif", lineHeight: 1.3 }}>
                    {slot.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <article style={{
            background: "rgba(196,146,58,0.07)",
            border: "1px solid rgba(196,146,58,0.25)", borderRadius: "8px",
            padding: "16px 18px",
          }}>
            <p style={{ color: "#3d2008", fontWeight: 800, fontSize: "0.8rem", margin: "0 0 6px" }}>
              📬 Want first access?
            </p>
            <p style={{ color: "#5c3d1e", fontSize: "0.78rem", lineHeight: 1.6, margin: 0 }}>
              Join our Facebook community and we&apos;ll let you know the moment new
              books and resources are ready!
            </p>
          </article>
        </section>

      </div>
    </div>
  );
}
