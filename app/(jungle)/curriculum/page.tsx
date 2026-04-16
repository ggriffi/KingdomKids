import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Curriculum",
  description: "36-week Bible adventure curriculum for kids ages 3–12 — download a free preview!",
};

const FEATURES = [
  { emoji: "📅", title: "36 Weeks of Adventure",      desc: "A full school-year journey packed with Bible stories, memory verses, and hands-on fun!" },
  { emoji: "🖨️", title: "Printable Everything",        desc: "Worksheets, craft templates, and parent newsletters included — ready to print and go!" },
  { emoji: "👨‍👩‍👧", title: "Mixed-Age Friendly",          desc: "Every lesson adapts for little ones and big kids alike — perfect for any classroom size!" },
  { emoji: "✝️", title: "Scripture at the Heart",      desc: "Key verses woven into every lesson with memory aids, songs, and fun visual flashcards." },
];

const GRADES = [
  { label: "Preschool (Ages 3–5)",          color: "#f5c842", emoji: "🌼", desc: "Big truths in little lessons! Simple stories, sing-alongs, and hands-on crafts that tiny explorers LOVE." },
  { label: "Early Elementary (K–Grade 2)",   color: "#3ab5e6", emoji: "🔭", desc: "Memory verse activities, discussion questions, and take-home pages that keep the adventure going all week!" },
  { label: "Upper Elementary (Grades 3–5)", color: "#22c55e", emoji: "🧭", desc: "Deeper dives into Bible themes, character studies, and creative writing that really gets them thinking!" },
  { label: "Middle School (Grades 6–8)",    color: "#f07c2a", emoji: "🦁", desc: "Apologetics, worldview, and Scripture journaling — building confident young explorers of faith!" },
];

const DOWNLOADS = [
  { title: "Teacher Curriculum Preview",  label: "PDF · 4.2 MB", href: "/downloads/teacher-curriculum-preview.pdf",  emoji: "📋" },
  { title: "Student Workbook Preview",    label: "PDF · 2.8 MB", href: "/downloads/student-workbook-preview.pdf",    emoji: "📓" },
  { title: "Scope & Sequence Chart",      label: "PDF · 0.9 MB", href: "/downloads/scope-sequence.pdf",              emoji: "🗺️" },
];

export default function CurriculumPage() {
  return (
    <div style={{ padding: "4px 0" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <div style={{ fontSize: "2.8rem", marginBottom: "6px" }}>📖</div>
        <h1 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.4rem", fontWeight: 900, margin: "0 0 6px" }}>
          The Explorer&apos;s Field Guide
        </h1>
        <p style={{ color: "#8b5e3c", fontSize: "0.85rem", lineHeight: 1.5, margin: 0 }}>
          36 weeks of Bible adventure — designed for every<br />
          <strong>classroom, home, and little explorer out there!</strong>
        </p>
      </div>

      {/* Ms. Rose intro */}
      <div style={{
        background: "linear-gradient(135deg, rgba(245,200,66,0.22), rgba(196,146,58,0.1))",
        border: "2px solid rgba(196,146,58,0.5)", borderRadius: "16px",
        padding: "14px", marginBottom: "14px",
      }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
          <div style={{
            flexShrink: 0, width: "60px", height: "74px", position: "relative",
            borderRadius: "10px", overflow: "hidden",
            border: "2px solid rgba(196,146,58,0.5)",
          }}>
            <Image
              src="/images/Ms. Rose in vibrant cartoon style.png"
              alt="Ms. Rose"
              fill
              style={{ objectFit: "cover", objectPosition: "center top" }}
              sizes="60px"
            />
          </div>
          <p style={{ color: "#5c3d1e", fontSize: "0.78rem", lineHeight: 1.7, margin: 0 }}>
            The <strong>Kingdom Kids Curriculum</strong> is Ms. Rose&apos;s pride and joy! 🌺 It&apos;s a 36-week,
            fully-graded Bible program for kids ages 4–12 — packed with adventure storytelling,
            Scripture memory, crafts, and family discussion guides. Every lesson is a new expedition!
          </p>
        </div>
      </div>

      {/* Features */}
      <h2 style={{
        fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1rem", fontWeight: 900,
        margin: "0 0 8px", display: "flex", alignItems: "center", gap: "6px",
      }}>
        🎒 What&apos;s in the Explorer&apos;s Kit?
      </h2>
      <div className="kk-grid-2" style={{ marginBottom: "14px" }}>
        {FEATURES.map((f) => (
          <div key={f.title} style={{
            background: "rgba(196,146,58,0.13)", borderRadius: "12px",
            border: "1px solid rgba(196,146,58,0.45)",
            padding: "10px 12px", display: "flex", gap: "8px", alignItems: "flex-start",
          }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "50%", flexShrink: 0,
              background: "linear-gradient(135deg, #f5c842, #d4a853)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem",
            }}>{f.emoji}</div>
            <div>
              <p style={{ color: "#3d2008", fontWeight: 900, fontSize: "0.75rem", margin: "0 0 2px", fontFamily: "Georgia, serif" }}>{f.title}</p>
              <p style={{ color: "#5c3d1e", fontSize: "0.68rem", margin: 0, lineHeight: 1.45 }}>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Grade Levels */}
      <h2 style={{
        fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1rem", fontWeight: 900,
        margin: "0 0 8px", display: "flex", alignItems: "center", gap: "6px",
      }}>
        🏕️ Explorer Levels
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "7px", marginBottom: "14px" }}>
        {GRADES.map((g) => (
          <div key={g.label} style={{
            background: "rgba(196,146,58,0.13)", borderRadius: "12px",
            border: "1px solid rgba(196,146,58,0.45)",
            borderLeft: `4px solid ${g.color}`,
            padding: "10px 14px", display: "flex", gap: "10px", alignItems: "center",
          }}>
            <div style={{
              width: "34px", height: "34px", borderRadius: "50%", flexShrink: 0,
              background: `${g.color}22`, border: `2px solid ${g.color}55`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem",
            }}>{g.emoji}</div>
            <div>
              <p style={{ color: "#3d2008", fontWeight: 900, fontSize: "0.78rem", margin: "0 0 2px", fontFamily: "Georgia, serif" }}>{g.label}</p>
              <p style={{ color: "#5c3d1e", fontSize: "0.7rem", margin: 0, lineHeight: 1.45 }}>{g.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Free Downloads */}
      <h2 style={{
        fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1rem", fontWeight: 900,
        margin: "0 0 8px", display: "flex", alignItems: "center", gap: "6px",
      }}>
        🎁 Free Downloads — Grab a Sneak Peek!
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "14px" }}>
        {DOWNLOADS.map((dl) => (
          <a key={dl.title} href={dl.href} style={{
            background: "rgba(196,146,58,0.13)", borderRadius: "12px",
            border: "1px solid rgba(196,146,58,0.45)",
            padding: "10px 14px", textDecoration: "none",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px",
          }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <span style={{ fontSize: "1.3rem" }}>{dl.emoji}</span>
              <div>
                <p style={{ color: "#3d2008", fontWeight: 800, fontSize: "0.77rem", margin: "0 0 1px" }}>{dl.title}</p>
                <p style={{ color: "#8b5e3c", fontSize: "0.63rem", margin: 0 }}>{dl.label}</p>
              </div>
            </div>
            <span style={{
              background: "linear-gradient(135deg, #f07c2a, #d94f2b)",
              color: "white", fontSize: "0.62rem", fontWeight: 800,
              padding: "5px 12px", borderRadius: "999px",
              textTransform: "uppercase", letterSpacing: "0.04em", whiteSpace: "nowrap",
            }}>Download</span>
          </a>
        ))}
      </div>

      {/* Safari Rules Poster */}
      <h2 style={{
        fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1rem", fontWeight: 900,
        margin: "0 0 8px", display: "flex", alignItems: "center", gap: "6px",
      }}>
        🗺️ The Safari Rules
      </h2>
      <div style={{ borderRadius: "12px", overflow: "hidden", border: "2px solid rgba(196,146,58,0.4)", marginBottom: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}>
        <Image
          src="/images/rules poster.png"
          alt="Kingdom Kids Safari Rules"
          width={800}
          height={533}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center" }}>
        <Link
          href="/store"
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #f07c2a, #d94f2b)",
            color: "white", fontWeight: 800, fontSize: "0.82rem",
            padding: "10px 24px", borderRadius: "999px", textDecoration: "none",
            textTransform: "uppercase", letterSpacing: "0.07em",
            boxShadow: "0 4px 14px rgba(240,124,42,0.4)",
          }}
        >
          Order the Full Curriculum 🛒
        </Link>
      </div>
    </div>
  );
}
