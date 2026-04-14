import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Games",
  description: "Kingdom Kids interactive Bible games — coming soon!",
};

export default function GamesPage() {
  return (
    <div
      style={{
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        minHeight:      "180px",
        padding:        "24px 16px",
      }}
    >
      <div
        style={{
          background:   "linear-gradient(135deg, #1a5c22 0%, #0e3d16 100%)",
          borderRadius: "20px",
          padding:      "28px 36px",
          border:       "3px solid #f5c842",
          boxShadow:    "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1)",
          maxWidth:     "380px",
          width:        "100%",
          textAlign:    "center",
        }}
      >
        <div style={{ fontSize: "2.5rem", marginBottom: "10px" }}>🎮</div>

        <h1
          style={{
            fontFamily:  "Georgia, serif",
            color:       "#f5c842",
            fontSize:    "1.6rem",
            fontWeight:  900,
            margin:      "0 0 10px",
            textShadow:  "0 2px 8px rgba(0,0,0,0.4)",
          }}
        >
          Games Coming Soon!
        </h1>

        <p
          style={{
            color:      "rgba(253,246,227,0.85)",
            fontSize:   "0.9rem",
            lineHeight: 1.65,
            margin:     "0 0 18px",
          }}
        >
          We&apos;re building exciting Bible-based games for Kingdom Kids explorers.
          Check back soon for adventures in God&apos;s Word!
        </p>

        <div
          style={{
            display:       "inline-block",
            padding:       "6px 18px",
            background:    "rgba(245,200,66,0.15)",
            borderRadius:  "999px",
            border:        "1px solid rgba(245,200,66,0.4)",
            color:         "#f5c842",
            fontSize:      "0.75rem",
            fontWeight:    700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          🌟 Stay Tuned
        </div>
      </div>
    </div>
  );
}
