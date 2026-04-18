import { NextResponse } from "next/server";
import { createHmac } from "crypto";

const FREE_IDS = ["snack-guide", "leader-guide"];

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export async function POST(req: Request) {
  const secret = process.env.DOWNLOAD_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  const { name, email } = await req.json();
  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

  const safeName  = escapeHtml(String(name).slice(0, 200));
  const safeEmail = escapeHtml(String(email).slice(0, 200));

  if (process.env.RESEND_API_KEY) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Kingdom Kids <noreply@kingdomkidssafari.com>",
        to: ["info@kingdomkidssafari.com"],
        reply_to: safeEmail,
        subject: `Free Download Request — ${safeName}`,
        html: `<p><strong>${safeName}</strong> (<a href="mailto:${safeEmail}">${safeEmail}</a>) submitted the free download form.</p>`,
      }),
    }).catch(() => null);
  }

  // Sign tokens — 24 h expiry, product-scoped
  const expires = Date.now() + 24 * 60 * 60 * 1000;
  const tokens: Record<string, string> = {};
  for (const id of FREE_IDS) {
    const sig = createHmac("sha256", secret).update(`${id}:${expires}`).digest("hex");
    tokens[id] = `${expires}:${sig}`;
  }

  return NextResponse.json({ tokens });
}
