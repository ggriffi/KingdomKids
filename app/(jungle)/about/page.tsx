// 1. Add a fun, rounded font to your globals.css or import here
// 2. We'll use "soft" shadows and asymmetrical borders

export default function AboutPage() {
  return (
    <div style={{ padding: "40px 20px", maxWidth: "1100px", margin: "0 auto", color: "#3d2008" }}>

      {/* ── HERO SECTION: Less boxy, more like a book intro ── */}
      <div style={{ textAlign: "center", marginBottom: "60px", position: "relative" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "16px", color: "#1a5c22" }}>
          🌿 Welcome to the Kingdom
        </h1>
        <p style={{ maxWidth: "700px", margin: "0 auto", fontSize: "1.1rem", lineHeight: 1.6, fontStyle: "italic" }}>
          "Join Timmy and his colorful crew as they explore, play, and learn together.
          Every grand adventure brings a new challenge — and a lesson from God's Word."
        </p>
        {/* Decorative divider instead of a solid line */}
        <div style={{ fontSize: "24px", marginTop: "20px" }}>✨ ••• 🐾 ••• ✨</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px" }}>

        {/* ── CHARACTER CARDS: Asymmetrical & "Taped" look ── */}
        <section>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "24px", borderBottom: "3px solid #f5c842", display: "inline-block" }}>
            The Main Adventurers
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            {MAIN_CREW.map((char, index) => (
              <div key={char.name} style={{
                position: "relative",
                background: "#fff",
                padding: "20px",
                borderRadius: "30px 10px 30px 10px", // Asymmetrical corners
                boxShadow: "10px 10px 0px #fef5da", // Solid offset shadow for "sticker" look
                border: "2px solid #3d2008",
                transform: `rotate(${index % 2 === 0 ? '1' : '-1'}deg)`, // Random tilt
                display: "flex",
                gap: "20px"
              }}>
                <div style={{ width: "80px", flexShrink: 0 }}>
                  <Image src={char.img} alt={char.name} width={80} height={100} style={{ borderRadius: "12px" }} />
                </div>
                <div>
                  <h3 style={{ margin: "0 0 5px", fontSize: "1.2rem" }}>{char.name}</h3>
                  <span style={{ fontSize: "0.7rem", fontWeight: "bold", background: char.color, color: "#white", padding: "2px 8px", borderRadius: "4px", textTransform: "uppercase" }}>
                    {char.role}
                  </span>
                  <p style={{ fontSize: "0.9rem", marginTop: "10px", lineHeight: "1.5" }}>{char.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── RIGHT COLUMN: Mission & Secondary Characters ── */}
        <section style={{ display: "flex", flexDirection: "column", gap: "40px" }}>

          <div style={{
            background: "#1a5c22",
            color: "#fff",
            padding: "30px",
            borderRadius: "50px 5px",
            backgroundImage: "radial-gradient(#ffffff20 2px, transparent 2px)",
            backgroundSize: "20px 20px" // Polka dot pattern for texture
          }}>
            <h3 style={{ color: "#f5c842", fontSize: "1.4rem", marginBottom: "15px" }}>🌍 Our Mission</h3>
            <p style={{ lineHeight: "1.7", fontSize: "1rem" }}>
              Through the wisdom of Ms. Rose, children learn alongside Timmy and his friends
              how to apply God's Word to their own lives.
            </p>
          </div>

          <div style={{ background: "#fef5da", padding: "25px", borderRadius: "20px", border: "2px dashed #c4923a" }}>
            <h3 style={{ marginBottom: "20px" }}>👋 More Friends</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              {FRIENDS.map((f) => (
                <div key={f.name} style={{ textAlign: "center" }}>
                  <div style={{ width: "12px", height: "12px", background: f.color, borderRadius: "50%", margin: "0 auto 5px" }} />
                  <p style={{ fontWeight: "bold", fontSize: "0.85rem", margin: 0 }}>{f.name}</p>
                  <p style={{ fontSize: "0.7rem", opacity: 0.8 }}>{f.role}</p>
                </div>
              ))}
            </div>
          </div>

        </section>
      </div>
    </div>
  );
}