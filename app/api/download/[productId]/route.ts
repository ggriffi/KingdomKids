import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import Stripe from "stripe";
import fs from "fs";
import path from "path";
import shopData from "@/data/shop.json";

type Product = (typeof shopData.products)[number] & {
  downloadFiles?: string[];
  freeDownload?: boolean;
};

function verifyFreeToken(token: string, productId: string): boolean {
  const parts = token.split(":");
  if (parts.length !== 2) return false;
  const [expiresStr, sig] = parts;
  const expires = parseInt(expiresStr, 10);
  if (isNaN(expires) || Date.now() > expires) return false;
  const secret = process.env.DOWNLOAD_SECRET ?? "change-me";
  const expected = createHmac("sha256", secret).update(`${productId}:${expires}`).digest("hex");
  try {
    return timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  const { productId } = await params;
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");
  const token = searchParams.get("token");
  const fileIndex = Math.max(0, parseInt(searchParams.get("file") ?? "0", 10));

  const product = shopData.products.find((p) => p.id === productId) as Product | undefined;
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  // ── Free download: verify HMAC token ──
  if (product.freeDownload) {
    if (!token || !verifyFreeToken(token, productId)) {
      return NextResponse.json({ error: "Invalid or expired download link" }, { status: 403 });
    }
  }
  // ── Paid download: verify Stripe session ──
  else {
    if (!sessionId) {
      return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
    }
    let session: Stripe.Checkout.Session;
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
      session = await stripe.checkout.sessions.retrieve(sessionId);
    } catch {
      return NextResponse.json({ error: "Could not verify payment" }, { status: 403 });
    }
    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 403 });
    }
    if (session.metadata?.productId !== productId) {
      return NextResponse.json({ error: "Product mismatch" }, { status: 403 });
    }
  }

  // ── Resolve file ──
  const downloadFiles = product.downloadFiles;
  if (!downloadFiles || fileIndex >= downloadFiles.length) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const filename = downloadFiles[fileIndex];
  if (!/^[\w-]+\.pdf$/i.test(filename)) {
    return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), "private", "downloads", filename);
  if (!fs.existsSync(filePath)) {
    return NextResponse.json(
      { error: "File not yet available — please email info@kingdomkidssafari.com" },
      { status: 404 }
    );
  }

  const fileBuffer = fs.readFileSync(filePath);
  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
