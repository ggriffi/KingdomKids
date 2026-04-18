import { NextResponse } from "next/server";
import { createHmac } from "crypto";

const FREE_IDS = ["snack-guide", "leader-guide"];

export async function POST(req: Request) {
  const { name, email } = await req.json();

  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

  // Notify via Resend
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
        reply_to: email,
        subject: `Free Download Request — ${name}`,
        html: `<p><strong>${name}</strong> (<a href="mailto:${email}">${email}</a>) submitted the free download form.</p>`,
      }),
    }).catch(() => null);
  }

  // Sign tokens — 24 h expiry, product-scoped
  const secret = process.env.DOWNLOAD_SECRET ?? "change-me";
  const expires = Date.now() + 24 * 60 * 60 * 1000;

  const tokens: Record<string, string> = {};
  for (const id of FREE_IDS) {
    const sig = createHmac("sha256", secret).update(`${id}:${expires}`).digest("hex");
    tokens[id] = `${expires}:${sig}`;
  }

  return NextResponse.json({ tokens });
}
