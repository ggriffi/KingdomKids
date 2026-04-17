import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Store",
  description: "Kingdom Kids books, curriculum & resources — grab your safari gear!",
};

const SLOTS = [
  { color: "#f07c2a", label: "Kingdom Kids Curriculum",  note: "The full 36-week adventure guide" },
  { color: "#f5c842", label: "Student Activity Book",    note: "Crafts, puzzles & memory verses" },
  { color: "#5a9e4e", label: "Family Devotional Guide",  note: "Take the safari home every week" },
  { color: "#4a90d9", label: "Explorer Verse Cards",     note: "Flash cards kids actually love" },
];

export default function StorePage() {
  return (
    <div style={{ padding: "16px 0 8px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", alignItems: "start" }}>

        <section>
          <div style={{ background: "linear-gradient(135deg, #1a5c22, #0a2c10)", borderRadius: "12px 12px 0 0", padding: "10px 18px", display: "flex", alignItems: "center", gap: "10px" }}>
            <h2 style={{ color: "#f5c842", fontFamily: "Georgia, serif", fontSize: "1.05rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>🛖 The Safari Trading Post</h2>
            <span style={{ background: "#f5c842", color: "#3d2008", fontSize: "0.6rem", fontWeight: 900, padding: "3px 10px", borderRadius: "999px", textTransform: "uppercase" }}>Opening Soon</span>
          </div>
          <div style={{ background: "linear-gradient(135deg, #0a2c10, #1a4a18)", border: "2px solid #f5c842", borderTop: "none", borderRadius: "0 0 12px 12px", padding: "28px 24px", boxShadow: "0 4px 16px rgba(0,0,0,0.2)" }}>
            <p style={{ color: "#f5c842", fontFamily: "Georgia, serif", fontSize: "1.2rem", fontWeight: 900, margin: "0 0 12px", lineHeight: 1.3 }}>Loading up the carts!</p>
            <p style={{ color: "rgba(253,246,227,0.9)", fontSize: "0.92rem", lineHeight: 1.7, marginBottom: "12px" }}>
              Amazing books, curriculum packs, and printable resources are on their way to the trading post! Every item is hand-packed with love for families just like yours. 🎒
            </p>
            <p style={{ color: "rgba(253,246,227,0.65)", fontSize: "0.82rem", lineHeight: 1.6, marginBottom: "20px" }}>
              Follow us on Facebook to be the very first to know when the doors open!
            </p>
            <div style={{ background: "rgba(245,200,66,0.1)", border: "1px solid rgba(245,200,66,0.3)", borderRadius: "8px", padding: "12px 14px" }}>
              <p style={{ color: "#f5c842", fontWeight: 800, fontSize: "0.82rem", margin: 0 }}>📬 Want first access? Join our Facebook community!</p>
            </div>
          </div>
        </section>

        <section>
          <div style={{ background: "linear-gradient(135deg, #6b3f1f, #3d2008)", borderRadius: "12px 12px 0 0", padding: "10px 18px" }}>
            <h2 style={{ color: "#f5c842", fontFamily: "Georgia, serif", fontSize: "1.05rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>📦 Coming to the Shelves</h2>
          </div>
          <div style={{ background: "linear-gradient(160deg, #fffdf5, #fef5da)", border: "2px solid #c4923a", borderTop: "none", borderRadius: "0 0 12px 12px", padding: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}>
            <p style={{ color: "#5c3d1e", fontSize: "0.88rem", lineHeight: 1.6, margin: "0 0 14px" }}>
              Here&apos;s a peek at what&apos;s being packed up for your family! 🌟
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {SLOTS.map((slot) => (
                <div key={slot.label} style={{ display: "flex", gap: "14px", alignItems: "center", background: "linear-gradient(135deg, #fffdf5, #fff8e8)", border: "1.5px solid #d4a853", borderLeft: `4px solid ${slot.color}`, borderRadius: "8px", padding: "12px 14px", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: `${slot.color}20`, border: `1.5px solid ${slot.color}50`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: slot.color, fontSize: "0.6rem", fontWeight: 900, textTransform: "uppercase" }}>Soon</span>
                  </div>
                  <div>
                    <p style={{ color: "#3d2008", fontWeight: 900, fontSize: "0.9rem", fontFamily: "Georgia, serif", margin: "0 0 2px" }}>{slot.label}</p>
                    <p style={{ color: "#8b5e3c", fontSize: "0.75rem", margin: 0 }}>{slot.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
