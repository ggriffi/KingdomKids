import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach out to the Kingdom Kids team — we'd love to hear from you!",
};

export default function ContactPage() {
  return (
    <div style={{ padding: "16px 0 8px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", alignItems: "stretch" }}>

        <section style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ background: "linear-gradient(135deg, #6b3f1f, #3d2008)", borderRadius: "12px 12px 0 0", padding: "10px 18px", display: "flex", alignItems: "center", gap: "10px" }}>
            <h2 style={{ color: "#f5c842", fontFamily: "Georgia, serif", fontSize: "1.05rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>📬 Send a Message</h2>
            <span style={{ background: "#f5c842", color: "#3d2008", fontSize: "0.6rem", fontWeight: 900, padding: "3px 10px", borderRadius: "999px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Coming Soon</span>
          </div>
          <div style={{ flex: 1, background: "linear-gradient(160deg, #fffdf5, #fef5da)", border: "2px solid #c4923a", borderTop: "none", borderRadius: "0 0 12px 12px", padding: "28px 24px", boxShadow: "0 4px 16px rgba(0,0,0,0.12)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: "14px" }}>🏕️</div>
            <h3 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.2rem", fontWeight: 900, margin: "0 0 10px" }}>Setting Up Base Camp!</h3>
            <p style={{ color: "#5c3d1e", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>
              We&apos;re almost ready! Our safari messengers are working hard to get the base camp communication system fully up and running. Very soon you&apos;ll be able to send us notes right from this page. 💌
            </p>
          </div>
        </section>

        <section style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ background: "linear-gradient(135deg, #1a5c22, #0a2c10)", borderRadius: "12px 12px 0 0", padding: "10px 18px" }}>
            <h2 style={{ color: "#f5c842", fontFamily: "Georgia, serif", fontSize: "1.05rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>🔥 Join the Campfire</h2>
          </div>
          <div style={{ flex: 1, background: "linear-gradient(160deg, #fffdf5, #fef5da)", border: "2px solid #c4923a", borderTop: "4px solid #1877F2", borderRadius: "0 0 12px 12px", padding: "28px 24px", boxShadow: "0 4px 16px rgba(0,0,0,0.12)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", textAlign: "center", gap: "20px" }}>
            <div>
              <div style={{ fontSize: "3rem", marginBottom: "14px" }}>👨‍👩‍👧‍👦</div>
              <h3 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.2rem", fontWeight: 900, margin: "0 0 10px" }}>We&apos;d Love to Meet You!</h3>
              <p style={{ color: "#5c3d1e", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>
                Our Facebook community is where parents, teachers, and ministry leaders come together around the campfire. Share ideas, get updates, ask questions, and cheer each other on. Pull up a log and join us! 🌟
              </p>
            </div>
            <a href="https://www.facebook.com/groups/kingdomkids" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-block", background: "linear-gradient(135deg, #1877F2, #0c5bc7)", color: "white", fontWeight: 800, fontSize: "0.88rem", padding: "13px 28px", borderRadius: "999px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.06em", boxShadow: "0 4px 16px rgba(24,119,242,0.35)" }}>
              Visit Our Facebook Group
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
