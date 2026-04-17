import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description: "Meet Timmy, Bleu, Sophie, Ian, Ms. Rose and the whole Kingdom Kids crew!",
};

const MAIN_CREW = [
  {
    name: "Timmy the Elephant",
    role: "Brave Leader",
    color: "#3ab5e6",
    img: "/images/timmy and drums.png",
    bio: "The brave and big-hearted leader of the group! Timmy is always ready to guide his friends on their next big journey. With a heart full of courage and a whole lot of love, he makes sure no explorer is ever left behind.",
  },
  {
    name: "Ian the Giraffe & Sophie the Tiger",
    role: "Closest Companions",
    color: "#f07c2a",
    img: "/images/Ian Sophie.png",
    bio: "Timmy and Bleu's closest companions! Whether they're exploring new places or solving problems together, Sophie's playful spirit and Ian's unique perspective make every single adventure better.",
  },
  {
    name: "Ms. Rose the Rhino",
    role: "Wise Mentor",
    color: "#d94f2b",
    img: "/images/Ms. Rose in vibrant cartoon style.png",
    bio: "The wise and gentle mentor of the group. No matter what obstacles the friends are facing, they can always count on running into Ms. Rose. She's always there to offer comfort, wisdom, and a timely lesson from God's Word to help them through their day.",
  },
];

const FRIENDS = [
  { name: "Bleu the Butterfly",  role: "Timmy's Best Friend",  color: "#7b3fa0", desc: "She may be small, but she has a HUGE heart and is always fluttering right by Timmy's side!" },
  { name: "Chloe",               role: "Timmy's Sweet Sister",  color: "#f5c842", desc: "Family is everything — and Chloe proves that sisters are the best adventure partners of all." },
  { name: "Rane",                role: "Bleu's Brother",        color: "#22c55e", desc: "Looking out for little sisters is serious business, and Rane takes the job very seriously!" },
  { name: "Elk the Zebra",       role: "The New Friend",        color: "#3ab5e6", desc: "Making his first appearance in Book 2 — a brand new friend with stripes AND a big personality!" },
];

export default function AboutPage() {
  return (
    <div style={{ padding: "16px 0 8px", maxWidth: "1200px", margin: "0 auto" }}>

      {/* ── WELCOME ── */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ background: "linear-gradient(135deg, #6b3f1f, #3d2008)", borderRadius: "12px 12px 0 0", padding: "10px 18px" }}>
          <h2 style={{ color: "#f5c842", fontFamily: "Georgia, serif", fontSize: "1.05rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>🌿 Welcome to the World of Kingdom Kids!</h2>
        </div>
        <div style={{ background: "linear-gradient(160deg, #fffdf5, #fef5da)", border: "2px solid #c4923a", borderTop: "none", borderRadius: "0 0 12px 12px", padding: "20px 22px", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}>
          <p style={{ color: "#3d2008", fontSize: "1rem", lineHeight: 1.8, margin: 0, fontFamily: "Georgia, serif" }}>
            Join <strong>Timmy and his colorful crew of animal friends</strong> as they explore, play, and learn together. Every grand adventure brings a new challenge — but with teamwork, friendship, and a little guidance from God&apos;s Word, they always find their way. 🌟
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", alignItems: "start" }}>

        {/* ── MAIN ADVENTURERS ── */}
        <section style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          <div style={{ background: "linear-gradient(135deg, #1a5c22, #0a2c10)", borderRadius: "12px 12px 0 0", padding: "10px 18px" }}>
            <h2 style={{ color: "#f5c842", fontFamily: "Georgia, serif", fontSize: "1.05rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>🦁 Meet the Main Adventurers</h2>
          </div>
          <div style={{ background: "linear-gradient(160deg, #fffdf5, #fef5da)", border: "2px solid #c4923a", borderTop: "none", borderRadius: "0 0 12px 12px", padding: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.12)", display: "flex", flexDirection: "column", gap: "12px" }}>
            {MAIN_CREW.map((char) => (
              <div key={char.name} style={{ display: "flex", gap: "14px", alignItems: "flex-start", background: "linear-gradient(135deg, #fffdf5, #fff8e8)", border: "1.5px solid #d4a853", borderLeft: `4px solid ${char.color}`, borderRadius: "8px", padding: "12px 14px", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
                <div style={{ flexShrink: 0, width: "68px", position: "relative" }}>
                  <Image src={char.img} alt={char.name} width={200} height={265}
                    style={{ width: "100%", height: "auto", display: "block", filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.2))" }} />
                </div>
                <div>
                  <h3 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "0.98rem", fontWeight: 900, margin: "0 0 3px" }}>{char.name}</h3>
                  <div style={{ display: "inline-block", background: `${char.color}20`, border: `1px solid ${char.color}60`, color: char.color, fontSize: "0.62rem", fontWeight: 800, padding: "2px 9px", borderRadius: "999px", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "7px" }}>{char.role}</div>
                  <p style={{ color: "#5c3d1e", fontSize: "0.82rem", lineHeight: 1.6, margin: 0 }}>{char.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FRIENDS + MISSION ── */}
        <section style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

          <div>
            <div style={{ background: "linear-gradient(135deg, #6b3f1f, #3d2008)", borderRadius: "12px 12px 0 0", padding: "10px 18px" }}>
              <h2 style={{ color: "#f5c842", fontFamily: "Georgia, serif", fontSize: "1.05rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>👋 Friends &amp; Family Along the Way</h2>
            </div>
            <div style={{ background: "linear-gradient(160deg, #fffdf5, #fef5da)", border: "2px solid #c4923a", borderTop: "none", borderRadius: "0 0 12px 12px", padding: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}>
              <p style={{ color: "#5c3d1e", fontSize: "0.88rem", lineHeight: 1.6, margin: "0 0 12px" }}>
                While Timmy, Bleu, Sophie, and Ian lead the charge, their world is filled with other fun faces you might spot along the way! 🗺️
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {FRIENDS.map((f) => (
                  <div key={f.name} style={{ display: "flex", gap: "12px", alignItems: "flex-start", background: "linear-gradient(135deg, #fffdf5, #fff8e8)", border: "1.5px solid #d4a853", borderLeft: `4px solid ${f.color}`, borderRadius: "8px", padding: "10px 14px", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
                    <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: `${f.color}20`, border: `1.5px solid ${f.color}60`, flexShrink: 0, marginTop: "2px" }} />
                    <div>
                      <p style={{ color: "#3d2008", fontWeight: 900, fontSize: "0.9rem", fontFamily: "Georgia, serif", margin: "0 0 1px" }}>{f.name}</p>
                      <p style={{ color: f.color, fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 4px" }}>{f.role}</p>
                      <p style={{ color: "#5c3d1e", fontSize: "0.8rem", lineHeight: 1.5, margin: 0 }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ background: "linear-gradient(135deg, #0a2c10, #1a4a18)", border: "2px solid #f5c842", borderRadius: "12px", padding: "22px 22px", boxShadow: "0 4px 16px rgba(0,0,0,0.2)" }}>
            <h3 style={{ color: "#f5c842", fontFamily: "Georgia, serif", fontSize: "1.1rem", fontWeight: 900, margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              🌍 Our Mission
            </h3>
            <p style={{ color: "rgba(253,246,227,0.95)", fontSize: "0.92rem", lineHeight: 1.8, margin: 0 }}>
              More than just fun stories, our adventures are designed to help young readers <strong style={{ color: "#f5c842" }}>navigate the everyday challenges of growing up</strong>. Through the wisdom of Ms. Rose, children learn alongside Timmy and his friends how to apply God&apos;s Word to their own lives — fostering faith, kindness, and strong friendships that last a lifetime. ❤️
            </p>
          </div>

        </section>

      </div>
    </div>
  );
}
