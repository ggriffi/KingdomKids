import { NextResponse } from "next/server";
import Stripe from "stripe";
import fs from "fs";
import path from "path";
import shopData from "@/data/shop.json";

type Product = (typeof shopData.products)[number] & { downloadFiles?: string[] };

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");
  const fileIndex = parseInt(searchParams.get("file") ?? "0", 10);

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  // Verify payment with Stripe
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

  if (session.metadata?.productId !== params.productId) {
    return NextResponse.json({ error: "Product mismatch" }, { status: 403 });
  }

  // Look up file
  const product = shopData.products.find((p) => p.id === params.productId) as Product | undefined;
  const downloadFiles = product?.downloadFiles;

  if (!downloadFiles || isNaN(fileIndex) || fileIndex < 0 || fileIndex >= downloadFiles.length) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const filename = downloadFiles[fileIndex];

  // Security: reject any path traversal attempts
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
