import Image from "next/image";

const MAIN_CREW = [
  {
    name: "Timmy",
    role: "The Leader",
    color: "#f07c2a",
    img: "/images/timmy and drums.png",
    bio: "Timmy is brave, curious, and always ready for the next adventure. He leads the crew with heart and a big love for God.",
  },
  {
    name: "Ian & Sophie",
    role: "The Dynamic Duo",
    color: "#3ab5e6",
    img: "/images/Ian Sophie.png",
    bio: "Ian and Sophie bring energy and teamwork to every mission. Together they always find a way through.",
  },
  {
    name: "Ms. Rose",
    role: "Lead Explorer",
    color: "#22c55e",
    img: "/images/Ms. Rose in vibrant cartoon style.png",
    bio: "Ms. Rose is the heart and soul of Kingdom Kids! She brings the Bible alive with energy, creativity, and a whole lot of love.",
  },
];

const FRIENDS = [
  { name: "Bleu",  role: "The Loyal Sidekick",  color: "#3ab5e6" },
  { name: "Chloe", role: "The Encourager",       color: "#f5c842" },
  { name: "Rane",  role: "The Creative One",     color: "#d94f2b" },
  { name: "Elk",   role: "The New Friend",       color: "#9b8db0" },
];

export default function AboutPage() {
  return (
    <div style={{ padding: "40px 20px", maxWidth: "1100px", margin: "0 auto", color: "#fff8e7" }}>

      {/* ── HERO SECTION ── */}
      <div style={{ textAlign: "center", marginBottom: "60px", position: "relative" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "16px", color: "#f5c842", textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}>
          🌿 Welcome to the Kingdom
        </h1>
        <p style={{ maxWidth: "700px", margin: "0 auto", fontSize: "1.1rem", lineHeight: 1.6, fontStyle: "italic", textShadow: "0 1px 4px rgba(0,0,0,0.7)" }}>
          &ldquo;Join Timmy and his colorful crew as they explore, play, and learn together.
          Every grand adventure brings a new challenge &mdash; and a lesson from God&apos;s Word.&rdquo;
        </p>
        <div style={{ fontSize: "24px", marginTop: "20px" }}>✨ ••• 🐾 ••• ✨</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px" }}>

        {/* ── CHARACTER CARDS ── */}
        <section>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "24px", borderBottom: "3px solid #f5c842", display: "inline-block", color: "#f5c842", textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}>
            The Main Adventurers
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            {MAIN_CREW.map((char, index) => (
              <div key={char.name} style={{
                position: "relative",
                background: "#fff",
                padding: "20px",
                borderRadius: index % 2 === 0 ? "30px 10px 30px 10px" : "10px 30px 10px 30px",
                boxShadow: "10px 10px 0px rgba(0,0,0,0.3)",
                border: "2px solid #3d2008",
                transform: `rotate(${index % 2 === 0 ? "1" : "-1"}deg)`,
                display: "flex",
                gap: "20px",
                color: "#3d2008",
              }}>
                <div style={{ width: "80px", flexShrink: 0 }}>
                  <Image src={char.img} alt={char.name} width={80} height={100} style={{ borderRadius: "12px", objectFit: "cover" }} />
                </div>
                <div>
                  <h3 style={{ margin: "0 0 5px", fontSize: "1.2rem" }}>{char.name}</h3>
                  <span style={{ fontSize: "0.7rem", fontWeight: "bold", background: char.color, color: "white", padding: "2px 8px", borderRadius: "4px", textTransform: "uppercase" }}>
                    {char.role}
                  </span>
                  <p style={{ fontSize: "0.9rem", marginTop: "10px", lineHeight: 1.5 }}>{char.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── RIGHT COLUMN ── */}
        <section style={{ display: "flex", flexDirection: "column", gap: "40px" }}>

          <div style={{
            background: "#1a5c22",
            color: "#fff",
            padding: "30px",
            borderRadius: "50px 5px",
            backgroundImage: "radial-gradient(#ffffff20 2px, transparent 2px)",
            backgroundSize: "20px 20px",
          }}>
            <h3 style={{ color: "#f5c842", fontSize: "1.4rem", marginBottom: "15px" }}>🌍 Our Mission</h3>
            <p style={{ lineHeight: 1.7, fontSize: "1rem" }}>
              Through the wisdom of Ms. Rose, children learn alongside Timmy and his friends
              how to apply God&apos;s Word to their own lives.
            </p>
          </div>

          <div style={{ background: "#fffdf5", padding: "25px", borderRadius: "20px", border: "2px dashed #c4923a", color: "#3d2008" }}>
            <h3 style={{ marginBottom: "20px" }}>👋 More Friends</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              {FRIENDS.map((f) => (
                <div key={f.name} style={{ textAlign: "center" }}>
                  <div style={{ width: "12px", height: "12px", background: f.color, borderRadius: "50%", margin: "0 auto 5px" }} />
                  <p style={{ fontWeight: "bold", fontSize: "0.85rem", margin: 0 }}>{f.name}</p>
                  <p style={{ fontSize: "0.7rem", opacity: 0.8, margin: 0 }}>{f.role}</p>
                </div>
              ))}
            </div>
          </div>

        </section>
      </div>
    </div>
  );
}
