"use client";
import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      setName(""); setEmail(""); setMessage("");
    } catch {
      setStatus("error");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "10px 14px", borderRadius: "8px",
    border: "1.5px solid #c4923a", fontSize: "0.92rem",
    background: "#fffdf5", color: "#3d2008",
    fontFamily: "Georgia, serif", boxSizing: "border-box",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    display: "block", color: "#3d2008", fontWeight: 800,
    fontSize: "0.82rem", marginBottom: "6px", textTransform: "uppercase",
    letterSpacing: "0.05em",
  };

  return (
    <div style={{ padding: "16px 0 8px", maxWidth: "680px", margin: "0 auto" }}>

      <section style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ background: "linear-gradient(135deg, #6b3f1f, #3d2008)", borderRadius: "12px 12px 0 0", padding: "10px 18px", display: "flex", alignItems: "center", gap: "10px" }}>
          <h2 style={{ color: "#f5c842", fontFamily: "Georgia, serif", fontSize: "1.05rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>📬 Send a Message</h2>
        </div>
        <div style={{ background: "linear-gradient(160deg, #fffdf5, #fef5da)", border: "2px solid #c4923a", borderTop: "none", borderRadius: "0 0 12px 12px", padding: "28px 24px", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}>

          {status === "sent" ? (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div style={{ fontSize: "3rem", marginBottom: "12px" }}>🎉</div>
              <h3 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.2rem", fontWeight: 900, margin: "0 0 8px" }}>Message Sent!</h3>
              <p style={{ color: "#5c3d1e", fontSize: "0.9rem", lineHeight: 1.7, margin: "0 0 20px" }}>
                Thanks for reaching out! We&apos;ll get back to you soon. 🌟
              </p>
              <button onClick={() => setStatus("idle")}
                style={{ background: "linear-gradient(135deg, #f5c842, #d4a853)", color: "#3d2008", fontWeight: 900, fontSize: "0.85rem", padding: "10px 24px", borderRadius: "999px", border: "none", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div>
                <label style={labelStyle}>Your Name</label>
                <input required value={name} onChange={e => setName(e.target.value)}
                  placeholder="Explorer name..." style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Message</label>
                <textarea required value={message} onChange={e => setMessage(e.target.value)}
                  placeholder="Tell us how we can help..." rows={5}
                  style={{ ...inputStyle, resize: "vertical" }} />
              </div>

              {status === "error" && (
                <p style={{ color: "#c0392b", fontSize: "0.85rem", margin: 0, textAlign: "center" }}>
                  Something went wrong — please try again or email us directly at info@kingdomkidssafari.com
                </p>
              )}

              <button type="submit" disabled={status === "sending"}
                style={{ background: "linear-gradient(135deg, #1a5c22, #0a2c10)", color: "#f5c842", fontWeight: 900, fontSize: "0.9rem", padding: "13px 28px", borderRadius: "999px", border: "none", cursor: status === "sending" ? "not-allowed" : "pointer", textTransform: "uppercase", letterSpacing: "0.06em", boxShadow: "0 4px 16px rgba(0,0,0,0.2)", opacity: status === "sending" ? 0.7 : 1 }}>
                {status === "sending" ? "Sending... 🌿" : "Send Message 🚀"}
              </button>
            </form>
          )}

        </div>
      </section>

    </div>
  );
}
