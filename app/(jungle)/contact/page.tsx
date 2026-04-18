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
    width: "100%", padding: "10px 14px",
    borderRadius: "10px", border: "2px solid #c4923a",
    fontSize: "0.92rem", background: "#fef5da",
    color: "#3d2008", fontFamily: "Georgia, serif",
    boxSizing: "border-box", outline: "none",
  };

  return (
    <div style={{ padding: "32px 20px", maxWidth: "680px", margin: "0 auto", color: "#fff8e7" }}>

      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "2rem", color: "#f5c842", textShadow: "0 2px 8px rgba(0,0,0,0.6)", margin: "0 0 8px", fontFamily: "Georgia, serif", fontWeight: 900 }}>
          📬 Drop Us a Note
        </h1>
        <p style={{ fontSize: "0.95rem", opacity: 0.85, textShadow: "0 1px 4px rgba(0,0,0,0.6)", margin: 0 }}>
          Questions, ideas, or just want to say hi? We&apos;d love to hear from you!
        </p>
      </div>

      <div style={{
        background: "#fffdf5",
        borderRadius: "30px 8px 30px 8px",
        border: "2px solid #3d2008",
        boxShadow: "10px 10px 0px rgba(0,0,0,0.3)",
        transform: "rotate(-0.5deg)",
        overflow: "hidden",
        color: "#3d2008",
      }}>
        <div style={{ background: "linear-gradient(135deg, #6b3f1f, #3d2008)", padding: "12px 20px" }}>
          <h2 style={{ color: "#f5c842", fontFamily: "Georgia, serif", fontSize: "1.05rem", fontWeight: 900, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            📬 Send a Message
          </h2>
        </div>

        <div style={{ padding: "28px 24px" }}>
          {status === "sent" ? (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div style={{ fontSize: "3.5rem", marginBottom: "12px" }}>🎉</div>
              <h3 style={{ fontFamily: "Georgia, serif", color: "#1a5c22", fontSize: "1.3rem", fontWeight: 900, margin: "0 0 10px" }}>
                Your message is on its way!
              </h3>
              <p style={{ color: "#5c3d1e", fontSize: "0.92rem", lineHeight: 1.7, margin: "0 0 20px" }}>
                Thanks for reaching out — we&apos;ll get back to you as soon as we can. 🌿
              </p>
              <button onClick={() => setStatus("idle")} style={{
                background: "linear-gradient(135deg, #f5c842, #d4a853)",
                color: "#3d2008", fontWeight: 900, fontSize: "0.85rem",
                padding: "10px 26px", borderRadius: "999px", border: "2px solid #3d2008",
                cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.06em",
              }}>
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div>
                <label style={{ display: "block", color: "#1a5c22", fontWeight: 900, fontSize: "0.8rem", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Your Name
                </label>
                <input required value={name} onChange={e => setName(e.target.value)}
                  placeholder="Explorer name..." style={inputStyle} />
              </div>
              <div>
                <label style={{ display: "block", color: "#1a5c22", fontWeight: 900, fontSize: "0.8rem", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Email Address
                </label>
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: "block", color: "#1a5c22", fontWeight: 900, fontSize: "0.8rem", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Message
                </label>
                <textarea required value={message} onChange={e => setMessage(e.target.value)}
                  placeholder="Tell us how we can help..." rows={5}
                  style={{ ...inputStyle, resize: "vertical" }} />
              </div>

              {status === "error" && (
                <div style={{ background: "#fef5da", border: "2px dashed #d94f2b", borderRadius: "10px", padding: "12px 16px", textAlign: "center" }}>
                  <p style={{ color: "#d94f2b", fontSize: "0.85rem", margin: 0, fontWeight: 700 }}>
                    Something went wrong — please try again or email us at{" "}
                    <a href="mailto:info@kingdomkidssafari.com" style={{ color: "#d94f2b" }}>info@kingdomkidssafari.com</a>
                  </p>
                </div>
              )}

              <button type="submit" disabled={status === "sending"} style={{
                background: "linear-gradient(135deg, #1a5c22, #0a2c10)",
                color: "#f5c842", fontWeight: 900, fontSize: "0.92rem",
                padding: "13px 28px", borderRadius: "999px",
                border: "2px solid #f5c842", cursor: status === "sending" ? "not-allowed" : "pointer",
                textTransform: "uppercase", letterSpacing: "0.06em",
                boxShadow: "4px 4px 0px rgba(0,0,0,0.3)",
                opacity: status === "sending" ? 0.7 : 1,
              }}>
                {status === "sending" ? "Sending... 🌿" : "Send Message 🚀"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
