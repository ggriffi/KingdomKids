import Image from "next/image";
import pageContent from "@/data/page-content.json";

export const dynamic = "force-dynamic";

const { crew: MAIN_CREW, friends: FRIENDS, mission } = pageContent.about;

export default function AboutPage() {
  return (
    <div style={{ padding: "40px 20px", maxWidth: "1100px", margin: "0 auto", color: "#fff8e7" }}>

      {/* ── HERO ── */}
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "16px", color: "#f5c842", textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}>
          🌿 Welcome to the Kingdom
        </h1>
        <p style={{ maxWidth: "680px", margin: "0 auto", fontSize: "1.05rem", lineHeight: 1.7, fontStyle: "italic", textShadow: "0 1px 4px rgba(0,0,0,0.7)" }}>
          &ldquo;{mission.quote}&rdquo;
        </p>
        <div style={{ fontSize: "22px", marginTop: "16px" }}>✨ ••• 🐾 ••• ✨</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px" }}>

        {/* ── CHARACTER CARDS ── */}
        <section>
          <h2 style={{ fontSize: "1.4rem", marginBottom: "24px", display: "inline-block", color: "#f5c842", borderBottom: "3px solid #f5c842", textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}>
            The Main Adventurers
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {MAIN_CREW.map((char, i) => (
              <div key={char.name} style={{
                background: "#fffdf5",
                padding: "20px",
                borderRadius: i % 2 === 0 ? "30px 8px 30px 8px" : "8px 30px 8px 30px",
                boxShadow: "8px 8px 0px rgba(0,0,0,0.3)",
                border: "2px solid #3d2008",
                transform: `rotate(${i % 2 === 0 ? "1" : "-1"}deg)`,
                display: "flex", gap: "18px", color: "#3d2008",
              }}>
                <div style={{ width: "76px", flexShrink: 0 }}>
                  <Image src={char.img} alt={char.name} width={80} height={100}
                    style={{ width: "100%", height: "auto", borderRadius: "10px", objectFit: "cover" }} />
                </div>
                <div>
                  <h3 style={{ margin: "0 0 4px", fontSize: "1.15rem", fontFamily: "Georgia, serif", fontWeight: 900 }}>{char.name}</h3>
                  <span style={{ fontSize: "0.68rem", fontWeight: 900, background: char.color, color: "white", padding: "2px 10px", borderRadius: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {char.role}
                  </span>
                  <p style={{ fontSize: "0.88rem", marginTop: "10px", lineHeight: 1.6, margin: "10px 0 0" }}
                    dangerouslySetInnerHTML={{ __html: char.bio }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── RIGHT COLUMN ── */}
        <section style={{ display: "flex", flexDirection: "column", gap: "32px" }}>

          {/* Mission card */}
          <div style={{
            background: "#1a5c22",
            color: "#fff",
            padding: "28px",
            borderRadius: "40px 8px",
            border: "2px solid #f5c842",
            boxShadow: "8px 8px 0px rgba(0,0,0,0.35)",
            backgroundImage: "radial-gradient(#ffffff18 2px, transparent 2px)",
            backgroundSize: "20px 20px",
            transform: "rotate(-0.5deg)",
          }}>
            <h3 style={{ color: "#f5c842", fontSize: "1.3rem", marginBottom: "14px", fontFamily: "Georgia, serif", fontWeight: 900 }}>🌍 Why We Do This</h3>
            <p style={{ lineHeight: 1.75, fontSize: "0.95rem", marginBottom: "12px" }}>
              {mission.body1}
            </p>
            <p style={{ lineHeight: 1.75, fontSize: "0.95rem", marginBottom: "12px" }}
              dangerouslySetInnerHTML={{ __html: mission.body2 }} />
            <p style={{ lineHeight: 1.75, fontSize: "0.95rem", color: "#f5c842", fontWeight: 800, margin: 0 }}>
              {mission.cta}
            </p>
          </div>

          {/* Friends card */}
          <div style={{
            background: "#fffdf5",
            padding: "24px",
            borderRadius: "8px 30px 8px 30px",
            border: "2px dashed #c4923a",
            boxShadow: "8px 8px 0px rgba(0,0,0,0.2)",
            transform: "rotate(0.8deg)",
            color: "#3d2008",
          }}>
            <h3 style={{ marginBottom: "18px", fontFamily: "Georgia, serif", fontWeight: 900, fontSize: "1.1rem" }}>👋 More Friends in the Crew</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {FRIENDS.map((f) => (
                <div key={f.name} style={{ textAlign: "center" }}>
                  <div style={{ width: "14px", height: "14px", background: f.color, borderRadius: "50%", margin: "0 auto 6px", border: "2px solid #3d2008" }} />
                  <p style={{ fontWeight: 900, fontSize: "0.9rem", margin: "0 0 2px", fontFamily: "Georgia, serif" }}>{f.name}</p>
                  <p style={{ fontSize: "0.72rem", opacity: 0.75, margin: 0 }}>{f.role}</p>
                </div>
              ))}
            </div>
          </div>

        </section>
      </div>
    </div>
  );
}
