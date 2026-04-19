import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { createReadStream, statSync, readFileSync } from "fs";
import { join } from "path";
import Stripe from "stripe";
import type { MediaEntry } from "@/app/api/admin/media/route";

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",  ".jpeg": "image/jpeg", ".png": "image/png",
  ".webp": "image/webp", ".gif": "image/gif",   ".svg": "image/svg+xml",
  ".mp3": "audio/mpeg",  ".ogg": "audio/ogg",   ".wav": "audio/wav",
  ".m4a": "audio/mp4",   ".aac": "audio/aac",
  ".mp4": "video/mp4",   ".webm": "video/webm", ".mov": "video/quicktime",
  ".avi": "video/x-msvideo",
};

function getMime(filename: string): string {
  const ext = filename.slice(filename.lastIndexOf(".")).toLowerCase();
  return MIME[ext] ?? "application/octet-stream";
}

function verifyHmacToken(token: string, mediaId: string, secret: string): boolean {
  const parts = token.split(":");
  if (parts.length !== 2) return false;
  const [expiresStr, sig] = parts;
  const expires = parseInt(expiresStr, 10);
  if (isNaN(expires) || Date.now() > expires) return false;
  const expected = createHmac("sha256", secret).update(`${mediaId}:${expires}`).digest("hex");
  try {
    const a = Buffer.from(sig, "hex");
    const b = Buffer.from(expected, "hex");
    return a.length === b.length && timingSafeEqual(a, b);
  } catch { return false; }
}

function nodeToWebStream(readable: NodeJS.ReadableStream): ReadableStream<Uint8Array> {
  return new ReadableStream({
    start(controller) {
      readable.on("data", (chunk: Buffer) => controller.enqueue(new Uint8Array(chunk)));
      readable.on("end", () => controller.close());
      readable.on("error", (err) => controller.error(err));
    },
    cancel() { (readable as NodeJS.ReadableStream & { destroy?: () => void }).destroy?.(); },
  });
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ mediaId: string }> }
) {
  const { mediaId } = await params;

  let media: MediaEntry[];
  try {
    media = JSON.parse(readFileSync(join(process.cwd(), "data", "media.json"), "utf-8"));
  } catch {
    return NextResponse.json({ error: "Media registry unavailable" }, { status: 503 });
  }

  const entry = media.find(m => m.id === mediaId);
  if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Public — redirect to static asset
  if (entry.access === "public" && entry.publicPath) {
    return NextResponse.redirect(new URL(entry.publicPath, req.url));
  }

  // Free with timed link — verify HMAC token
  if (entry.access === "free-link") {
    const secret = process.env.DOWNLOAD_SECRET;
    if (!secret) return NextResponse.json({ error: "Download secret not configured" }, { status: 503 });
    const token = req.nextUrl.searchParams.get("token") ?? "";
    if (!verifyHmacToken(token, mediaId, secret)) {
      return NextResponse.json({ error: "Invalid or expired link" }, { status: 403 });
    }
  }

  // Paid — verify Stripe checkout session
  if (entry.access === "paid") {
    const sessionId = req.nextUrl.searchParams.get("session_id") ?? "";
    if (!sessionId) return NextResponse.json({ error: "Payment required" }, { status: 402 });
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
    try {
      const stripe = new Stripe(stripeKey);
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.payment_status !== "paid") {
        return NextResponse.json({ error: "Payment not completed" }, { status: 402 });
      }
    } catch {
      return NextResponse.json({ error: "Invalid payment session" }, { status: 403 });
    }
  }

  const filePath = join(process.cwd(), "private", "media", entry.type, entry.filename);
  let fileSize: number;
  try {
    fileSize = statSync(filePath).size;
  } catch {
    return NextResponse.json({ error: "File not found on disk" }, { status: 404 });
  }

  const mimeType    = getMime(entry.filename);
  const rangeHeader = req.headers.get("range");

  // Range request — required for video seeking in browsers
  if (rangeHeader) {
    const [startStr, endStr] = rangeHeader.replace(/bytes=/, "").split("-");
    const start     = parseInt(startStr, 10);
    const end       = endStr ? parseInt(endStr, 10) : fileSize - 1;
    const chunkSize = end - start + 1;

    const nodeStream = createReadStream(filePath, { start, end });
    return new NextResponse(nodeToWebStream(nodeStream), {
      status: 206,
      headers: {
        "Content-Range":  `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges":  "bytes",
        "Content-Length": String(chunkSize),
        "Content-Type":   mimeType,
        "Cache-Control":  "no-store",
      },
    });
  }

  // Full file — stream it
  const nodeStream = createReadStream(filePath);
  return new NextResponse(nodeToWebStream(nodeStream), {
    headers: {
      "Content-Type":        mimeType,
      "Content-Length":      String(fileSize),
      "Accept-Ranges":       "bytes",
      "Content-Disposition": `inline; filename="${entry.filename}"`,
      "Cache-Control":       "no-store",
    },
  });
}
