import Link from "next/link";
import Stripe from "stripe";
import shopData from "@/data/shop.json";

type Product = (typeof shopData.products)[number] & { downloadFiles?: string[] };

async function getSessionProduct(sessionId: string) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") return null;
    const productId = session.metadata?.productId;
    if (!productId) return null;
    return { productId, session };
  } catch {
    return null;
  }
}

export default async function ShopSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const sessionId = session_id ?? "";
  const result = sessionId ? await getSessionProduct(sessionId) : null;

  const product = result
    ? (shopData.products.find((p) => p.id === result.productId) as Product | undefined)
    : undefined;

  const downloadFiles = product?.downloadFiles ?? [];

  return (
    <div style={{ padding: "32px 16px", maxWidth: "600px", margin: "0 auto", textAlign: "center", color: "#fff8e7" }}>

      <div style={{ fontSize: "4rem", marginBottom: "16px" }}>🎉</div>

      <h1 style={{
        fontFamily: "Georgia, serif", color: "#f5c842", fontSize: "1.6rem",
        fontWeight: 900, margin: "0 0 10px",
        textShadow: "0 2px 8px rgba(0,0,0,0.6)",
      }}>
        Order Confirmed!
      </h1>

      <p style={{ fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "8px", opacity: 0.9 }}>
        Thank you for your purchase{product ? ` of ${product.name}` : ""}!
      </p>

      {downloadFiles.length > 0 ? (
        <div style={{
          background: "#fffdf5",
          borderRadius: "30px 8px 30px 8px",
          border: "2px solid #c4923a",
          boxShadow: "8px 8px 0px rgba(0,0,0,0.3)",
          padding: "24px",
          margin: "24px 0",
          color: "#3d2008",
          textAlign: "left",
        }}>
          <h2 style={{
            fontFamily: "Georgia, serif", fontSize: "1.1rem", fontWeight: 900,
            color: "#1a5c22", margin: "0 0 16px", textAlign: "center",
          }}>
            📥 Your Downloads
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {downloadFiles.map((file, i) => {
              const label = file
                .replace(/\.pdf$/i, "")
                .replace(/-/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase());
              return (
                <a
                  key={i}
                  href={`/api/download/${result!.productId}?session_id=${sessionId}&file=${i}`}
                  style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    background: "#fef5da",
                    border: "2px solid #c4923a",
                    borderLeft: "5px solid #1a5c22",
                    borderRadius: "10px",
                    padding: "12px 16px",
                    textDecoration: "none",
                    color: "#3d2008",
                    fontWeight: 900,
                    fontSize: "0.9rem",
                    fontFamily: "Georgia, serif",
                    transition: "background 0.15s",
                  }}
                >
                  <span style={{ fontSize: "1.4rem" }}>📄</span>
                  <span>{label}</span>
                  <span style={{
                    marginLeft: "auto",
                    background: "#1a5c22",
                    color: "#f5c842",
                    fontSize: "0.68rem",
                    fontWeight: 900,
                    padding: "3px 10px",
                    borderRadius: "999px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}>Download</span>
                </a>
              );
            })}
          </div>
          <p style={{ fontSize: "0.75rem", color: "#8b5e3c", margin: "14px 0 0", textAlign: "center" }}>
            Save these links — they are tied to your purchase session.
          </p>
        </div>
      ) : (
        <div style={{
          background: "rgba(255,253,245,0.1)",
          border: "1px dashed rgba(245,200,66,0.4)",
          borderRadius: "12px",
          padding: "16px",
          margin: "20px 0",
          fontSize: "0.88rem",
          opacity: 0.85,
          lineHeight: 1.6,
        }}>
          {product && !downloadFiles.length
            ? "Your order is confirmed! Physical items will be shipped to your address."
            : "A confirmation has been sent to your email."}
        </div>
      )}

      <p style={{ fontSize: "0.82rem", lineHeight: 1.6, marginBottom: "28px", opacity: 0.7 }}>
        Questions?{" "}
        <a href="mailto:info@kingdomkidssafari.com" style={{ color: "#f5c842", fontWeight: 700 }}>
          info@kingdomkidssafari.com
        </a>
      </p>

      <Link href="/shop" style={{
        display: "inline-block",
        background: "linear-gradient(135deg, #1a5c22, #0a2c10)",
        color: "#f5c842", fontWeight: 900, fontSize: "0.88rem",
        padding: "12px 28px", borderRadius: "999px", textDecoration: "none",
        textTransform: "uppercase", letterSpacing: "0.06em",
        border: "2px solid rgba(245,200,66,0.4)",
      }}>
        ← Back to Shop
      </Link>
    </div>
  );
}
