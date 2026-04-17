import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Curriculum",
  description: "36-week Bible adventure curriculum for kids ages 3–12 — download a free preview!",
};

const FEATURES = [
  { emoji: "📅", title: "36 Weeks of Adventure",  desc: "A full school-year journey packed with Bible stories, memory verses, and hands-on fun!" },
  { emoji: "🖨️", title: "Printable Everything",    desc: "Worksheets, craft templates, and parent newsletters — ready to print and go!" },
  { emoji: "👨‍👩‍👧", title: "Mixed-Age Friendly",      desc: "Every lesson adapts for little ones and big kids alike — perfect for any classroom size!" },
  { emoji: "✝️", title: "Scripture at the Heart",  desc: "Key verses woven into every lesson with memory aids, songs, and fun visual flashcards." },
];

const GRADES = [
  { label: "Preschool (Ages 3–5)",         color: "#f5c842", emoji: "🌼", desc: "Big truths in little lessons! Simple stories, sing-alongs, and hands-on crafts tiny explorers LOVE." },
  { label: "Early Elementary (K–Grade 2)", color: "#3ab5e6", emoji: "🔭", desc: "Memory verse activities, discussion questions, and take-home pages that keep adventure going all week!" },
  { label: "Upper Elementary (Gr. 3–5)",   color: "#22c55e", emoji: "🧭", desc: "Deeper dives into Bible themes, character studies, and creative writing that really gets them thinking!" },
  { label: "Middle School (Gr. 6–8)",      color: "#f07c2a", emoji: "🦁", desc: "Apologetics, worldview, and Scripture journaling — building confident young explorers of faith!" },
];

const DOWNLOADS = [
  { title: "Teacher Curriculum Preview", label: "PDF · 4.2 MB", href: "/downloads/teacher-curriculum-preview.pdf", emoji: "📋" },
  { title: "Student Workbook Preview",   label: "PDF · 2.8 MB", href: "/downloads/student-workbook-preview.pdf",   emoji: "📓" },
  { title: "Scope & Sequence Chart",     label: "PDF · 0.9 MB", href: "/downloads/scope-sequence.pdf",             emoji: "🗺️" },
];

export default function CurriculumPage() {
  return (
    <div style={{ padding: "16px 0", maxWidth: "1200px", margin: "0 auto" }}>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "32px",
        alignItems: "start"
      }}>

        {/* ── COLUMN 1: OVERVIEW + FEATURES ─────────────────── */}
        <section style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <header style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "2px solid #3d2008", paddingBottom: "8px" }}>
            <h2 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.15rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              The Explorer&apos;s Field Guide
            </h2>
          </header>

          <article style={{
            background: "linear-gradient(135deg, rgba(245,200,66,0.1), rgba(196,146,58,0.05))",
            border: "1px solid rgba(196,146,58,0.4)", borderRadius: "8px",
            padding: "16px 18px",
          }}>
            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <div style={{
                flexShrink: 0, width: "56px", height: "70px", position: "relative",
                borderRadius: "8px", overflow: "hidden",
                border: "2px solid rgba(196,146,58,0.45)",
              }}>
                <Image
                  src="/images/Ms. Rose in vibrant cartoon style.png"
                  alt="Ms. Rose"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                  sizes="56px"
                />
              </div>
              <p style={{ color: "#5c3d1e", fontSize: "0.83rem", lineHeight: 1.7, margin: 0 }}>
                The <strong style={{ color: "#3d2008" }}>Kingdom Kids Curriculum</strong> is Ms. Rose&apos;s pride and joy! 🌺 A 36-week,
                fully-graded Bible program for kids ages 4–12 — packed with adventure storytelling,
                Scripture memory, crafts, and family discussion guides.
              </p>
            </div>
          </article>

          <p style={{ color: "#8b5e3c", fontSize: "0.63rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", margin: "4px 0 -4px" }}>
            What&apos;s in the kit
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {FEATURES.map((f) => (
              <div key={f.title} style={{
                display: "flex", gap: "12px", alignItems: "center",
                background: "rgba(196,146,58,0.07)",
                border: "1px solid rgba(196,146,58,0.22)",
                padding: "10px 14px", borderRadius: "6px",
              }}>
                <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>{f.emoji}</span>
                <div>
                  <p style={{ color: "#3d2008", fontWeight: 900, fontSize: "0.8rem", margin: "0 0 2px", fontFamily: "Georgia, serif" }}>{f.title}</p>
                  <p style={{ color: "#5c3d1e", fontSize: "0.72rem", margin: 0, lineHeight: 1.4 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── COLUMN 2: GRADES + DOWNLOADS + CTA ────────────── */}
        <section style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <header style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "2px solid #3d2008", paddingBottom: "8px" }}>
            <h2 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.15rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Explorer Levels
            </h2>
          </header>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {GRADES.map((g) => (
              <div key={g.label} style={{
                display: "flex", gap: "12px", alignItems: "center",
                background: "rgba(196,146,58,0.07)",
                border: "1px solid rgba(196,146,58,0.22)",
                borderLeft: `3px solid ${g.color}`,
                padding: "10px 14px", borderRadius: "6px",
              }}>
                <span style={{ fontSize: "1.15rem", flexShrink: 0 }}>{g.emoji}</span>
                <div>
                  <p style={{ color: "#3d2008", fontWeight: 900, fontSize: "0.8rem", margin: "0 0 2px", fontFamily: "Georgia, serif" }}>{g.label}</p>
                  <p style={{ color: "#5c3d1e", fontSize: "0.72rem", margin: 0, lineHeight: 1.4 }}>{g.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p style={{ color: "#8b5e3c", fontSize: "0.63rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", margin: "4px 0 -4px" }}>
            Free downloads
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {DOWNLOADS.map((dl) => (
              <a key={dl.title} href={dl.href} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px",
                background: "rgba(196,146,58,0.07)",
                border: "1px solid rgba(196,146,58,0.22)",
                padding: "10px 14px", borderRadius: "6px", textDecoration: "none",
              }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{ fontSize: "1.2rem" }}>{dl.emoji}</span>
                  <div>
                    <p style={{ color: "#3d2008", fontWeight: 800, fontSize: "0.8rem", margin: "0 0 1px" }}>{dl.title}</p>
                    <p style={{ color: "#8b5e3c", fontSize: "0.65rem", margin: 0 }}>{dl.label}</p>
                  </div>
                </div>
                <span style={{
                  background: "linear-gradient(135deg, #f07c2a, #d94f2b)",
                  color: "white", fontSize: "0.62rem", fontWeight: 800,
                  padding: "5px 12px", borderRadius: "6px",
                  textTransform: "uppercase", letterSpacing: "0.04em", whiteSpace: "nowrap",
                }}>Download</span>
              </a>
            ))}
          </div>

          <div style={{
            borderRadius: "8px", overflow: "hidden",
            border: "1px solid rgba(196,146,58,0.35)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}>
            <Image
              src="/images/rules poster.png"
              alt="Kingdom Kids Safari Rules"
              width={800}
              height={533}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>

          <div style={{ textAlign: "center" }}>
            <Link
              href="/store"
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #f07c2a, #d94f2b)",
                color: "white", fontWeight: 800, fontSize: "0.82rem",
                padding: "10px 24px", borderRadius: "6px", textDecoration: "none",
                textTransform: "uppercase", letterSpacing: "0.07em",
                boxShadow: "0 4px 14px rgba(240,124,42,0.35)",
              }}
            >
              Order the Full Curriculum
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
