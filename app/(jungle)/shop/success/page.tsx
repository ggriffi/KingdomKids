import Link from "next/link";

export default function ShopSuccessPage() {
  return (
    <div style={{ padding: "32px 16px", maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
      <div style={{ fontSize: "4rem", marginBottom: "16px" }}>🎉</div>
      <h1 style={{ fontFamily: "Georgia, serif", color: "#1a5c22", fontSize: "1.5rem", fontWeight: 900, margin: "0 0 10px" }}>
        Order Confirmed!
      </h1>
      <p style={{ color: "#3d2008", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "8px" }}>
        Thank you for your purchase! A confirmation and any download links have been sent to your email.
      </p>
      <p style={{ color: "#8b5e3c", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "28px" }}>
        Questions? Reach us at{" "}
        <a href="mailto:info@kingdomkidssafari.com" style={{ color: "#d94f2b", fontWeight: 700 }}>
          info@kingdomkidssafari.com
        </a>
      </p>
      <Link href="/shop" style={{
        display: "inline-block",
        background: "linear-gradient(135deg, #1a5c22, #0a2c10)",
        color: "#f5c842", fontWeight: 900, fontSize: "0.88rem",
        padding: "12px 28px", borderRadius: "999px", textDecoration: "none",
        textTransform: "uppercase", letterSpacing: "0.06em",
      }}>
        Back to Shop
      </Link>
    </div>
  );
}
