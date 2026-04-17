import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Curriculum",
  description: "36-week Bible adventure curriculum for kids ages 3–12 — download a free preview!",
};

const FEATURES = [
  { emoji: "📅", color: "#f07c2a", title: "36 Weeks of Adventure",  desc: "A full school-year journey packed with Bible stories, memory verses, and hands-on fun!" },
  { emoji: "🖨️", color: "#3ab5e6", title: "Printable Everything",    desc: "Worksheets, craft templates, and parent newsletters — ready to print and go!" },
  { emoji: "👨‍👩‍👧", color: "#22c55e", title: "Mixed-Age Friendly",      desc: "Every lesson adapts for little ones and big kids alike — perfect for any classroom!" },
  { emoji: "✝️", color: "#d94f2b", title: "Scripture at the Heart",  desc: "Key verses woven into every lesson with memory aids, songs, and visual flashcards." },
];

const GRADES = [
  { label: "Preschool (Ages 3–5)",         color: "#f5c842", emoji: "🌼", desc: "Big truths in little lessons! Simple stories, sing-alongs, and crafts tiny explorers LOVE." },
  { label: "Early Elementary (K–Grade 2)", color: "#3ab5e6", emoji: "🔭", desc: "Memory verse activities, discussion questions, and take-home pages that keep adventure going!" },
  { label: "Upper Elementary (Gr. 3–5)",   color: "#22c55e", emoji: "🧭", desc: "Deeper Bible dives, character studies, and creative writing that really gets them thinking!" },
  { label: "Middle School (Gr. 6–8)",      color: "#f07c2a", emoji: "🦁", desc: "Apologetics, worldview, and Scripture journaling — building confident young explorers of faith!" },
];

const DOWNLOADS = [
  { title: "Teacher Curriculum Preview", note: "PDF · 4.2 MB", href: "/downloads/teacher-curriculum-preview.pdf", emoji: "📋" },
  { title: "Student Workbook Preview",   note: "PDF · 2.8 MB", href: "/downloads/student-workbook-preview.pdf",   emoji: "📓" },
  { title: "Scope & Sequence Chart",     note: "PDF · 0.9 MB", href: "/downloads/scope-sequence.pdf",             emoji: "🗺️" },
];

export default function CurriculumPage() {
  return (
    <div style={{ padding: "16px 0 8px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", alignItems: "start" }}>

        <section style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <div style={{ background: "linear-gradient(135deg, #6b3f1f, #3d2008)", borderRadius: "12px 12px 0 0", padding: "10px 18px" }}>
              <h2 style={{ color: "#f5c842", fontFamily: "Georgia, serif", fontSize: "1.05rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>📖 The Explorer&apos;s Field Guide</h2>
            </div>
            <div style={{ background: "linear-gradient(160deg, #fffdf5, #fef5da)", border: "2px solid #c4923a", borderTop: "none", borderRadius: "0 0 12px 12px", padding: "18px", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}>
              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start", marginBottom: "14px" }}>
                <div style={{ flexShrink: 0, width: "64px", height: "80px", position: "relative", borderRadius: "10px", overflow: "hidden", border: "2px solid #c4923a" }}>
                  <Image src="/images/Ms. Rose in vibrant cartoon style.png" alt="Ms. Rose" fill style={{ objectFit: "cover", objectPosition: "center top" }} sizes="64px" />
                </div>
                <p style={{ color: "#5c3d1e", fontSize: "0.88rem", lineHeight: 1.75, margin: 0 }}>
                  The <strong style={{ color: "#3d2008" }}>Kingdom Kids Curriculum</strong> is Ms. Rose&apos;s pride and joy! 🌺 A 36-week, fully-graded Bible program for ages 4–12 — packed with adventure storytelling, Scripture memory, crafts, and family guides. Every lesson is a new expedition!
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {FEATURES.map((f) => (
                  <div key={f.title} style={{ display: "flex", gap: "12px", alignItems: "center", background: "linear-gradient(135deg, #fffdf5, #fff8e8)", border: "1.5px solid #d4a853", borderLeft: `4px solid ${f.color}`, borderRadius: "8px", padding: "10px 14px", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
                    <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>{f.emoji}</span>
                    <div>
                      <p style={{ color: "#3d2008", fontWeight: 900, fontSize: "0.88rem", margin: "0 0 2px", fontFamily: "Georgia, serif" }}>{f.title}</p>
                      <p style={{ color: "#5c3d1e", fontSize: "0.76rem", margin: 0, lineHeight: 1.4 }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

          <div>
            <div style={{ background: "linear-gradient(135deg, #1a5c22, #0a2c10)", borderRadius: "12px 12px 0 0", padding: "10px 18px" }}>
              <h2 style={{ color: "#f5c842", fontFamily: "Georgia, serif", fontSize: "1.05rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>🏕️ Explorer Levels</h2>
            </div>
            <div style={{ background: "linear-gradient(160deg, #fffdf5, #fef5da)", border: "2px solid #c4923a", borderTop: "none", borderRadius: "0 0 12px 12px", padding: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {GRADES.map((g) => (
                  <div key={g.label} style={{ display: "flex", gap: "12px", alignItems: "center", background: "linear-gradient(135deg, #fffdf5, #fff8e8)", border: "1.5px solid #d4a853", borderLeft: `4px solid ${g.color}`, borderRadius: "8px", padding: "10px 14px", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
                    <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>{g.emoji}</span>
                    <div>
                      <p style={{ color: "#3d2008", fontWeight: 900, fontSize: "0.88rem", margin: "0 0 2px", fontFamily: "Georgia, serif" }}>{g.label}</p>
                      <p style={{ color: "#5c3d1e", fontSize: "0.76rem", margin: 0, lineHeight: 1.4 }}>{g.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div style={{ background: "linear-gradient(135deg, #6b3f1f, #3d2008)", borderRadius: "12px 12px 0 0", padding: "10px 18px" }}>
              <h2 style={{ color: "#f5c842", fontFamily: "Georgia, serif", fontSize: "1.05rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>🎁 Free Downloads</h2>
            </div>
            <div style={{ background: "linear-gradient(160deg, #fffdf5, #fef5da)", border: "2px solid #c4923a", borderTop: "none", borderRadius: "0 0 12px 12px", padding: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}>
              <p style={{ color: "#5c3d1e", fontSize: "0.88rem", lineHeight: 1.6, margin: "0 0 12px" }}>Take a sneak peek before you commit — on us! 🎉</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
                {DOWNLOADS.map((dl) => (
                  <a key={dl.title} href={dl.href} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", background: "linear-gradient(135deg, #fffdf5, #fff8e8)", border: "1.5px solid #d4a853", borderRadius: "8px", padding: "10px 14px", textDecoration: "none", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <span style={{ fontSize: "1.3rem" }}>{dl.emoji}</span>
                      <div>
                        <p style={{ color: "#3d2008", fontWeight: 800, fontSize: "0.88rem", margin: "0 0 1px" }}>{dl.title}</p>
                        <p style={{ color: "#8b5e3c", fontSize: "0.68rem", margin: 0 }}>{dl.note}</p>
                      </div>
                    </div>
                    <span style={{ background: "linear-gradient(135deg, #f07c2a, #d94f2b)", color: "white", fontSize: "0.62rem", fontWeight: 800, padding: "5px 12px", borderRadius: "6px", textTransform: "uppercase", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>Download</span>
                  </a>
                ))}
              </div>
              <div style={{ textAlign: "center" }}>
                <Link href="/store" style={{ display: "inline-block", background: "linear-gradient(135deg, #f07c2a, #d94f2b)", color: "white", fontWeight: 800, fontSize: "0.88rem", padding: "11px 26px", borderRadius: "8px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.07em", boxShadow: "0 4px 14px rgba(240,124,42,0.4)" }}>
                  Order the Full Curriculum
                </Link>
              </div>
            </div>
          </div>

        </section>

      </div>
    </div>
  );
}
