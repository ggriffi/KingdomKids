import { NextResponse } from "next/server";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const safeName    = escapeHtml(String(name).slice(0, 200));
  const safeEmail   = escapeHtml(String(email).slice(0, 200));
  const safeMessage = escapeHtml(String(message).slice(0, 5000)).replace(/\n/g, "<br>");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Kingdom Kids <noreply@kingdomkidssafari.com>",
      to: ["info@kingdomkidssafari.com"],
      reply_to: safeEmail,
      subject: `New message from ${safeName}`,
      html: `<p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p>${safeMessage}</p>`,
    }),
  });

  if (!res.ok) {
    console.error("Resend error:", await res.text());
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
