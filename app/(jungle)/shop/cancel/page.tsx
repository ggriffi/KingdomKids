import Link from "next/link";

export default function ShopCancelPage() {
  return (
    <div style={{ padding: "32px 16px", maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
      <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🛖</div>
      <h1 style={{ fontFamily: "Georgia, serif", color: "#3d2008", fontSize: "1.4rem", fontWeight: 900, margin: "0 0 10px" }}>
        No worries!
      </h1>
      <p style={{ color: "#5c3d1e", fontSize: "0.92rem", lineHeight: 1.7, marginBottom: "28px" }}>
        Your order was cancelled and nothing was charged. Head back to the shop anytime you&apos;re ready!
      </p>
      <Link href="/shop" style={{
        display: "inline-block",
        background: "linear-gradient(135deg, #f5c842, #d4a853)",
        color: "#3d2008", fontWeight: 900, fontSize: "0.88rem",
        padding: "12px 28px", borderRadius: "999px", textDecoration: "none",
        textTransform: "uppercase", letterSpacing: "0.06em",
      }}>
        Return to Shop
      </Link>
    </div>
  );
}
