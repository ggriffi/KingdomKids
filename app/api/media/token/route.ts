import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";
import { readFileSync } from "fs";
import { join } from "path";
import type { MediaEntry } from "@/app/api/admin/media/route";

export async function POST(req: NextRequest) {
  const secret = process.env.DOWNLOAD_SECRET;
  if (!secret) return NextResponse.json({ error: "DOWNLOAD_SECRET not configured" }, { status: 503 });

  const body = await req.json() as { mediaId?: string };
  const { mediaId } = body;
  if (!mediaId) return NextResponse.json({ error: "Missing mediaId" }, { status: 400 });

  const media: MediaEntry[] = JSON.parse(readFileSync(join(process.cwd(), "data", "media.json"), "utf-8"));
  const entry = media.find(m => m.id === mediaId);

  if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (entry.access !== "free-link") {
    return NextResponse.json({ error: "Item is not a free-link type" }, { status: 400 });
  }

  const hours   = entry.expiryHours ?? 24;
  const expires = Date.now() + hours * 3600 * 1000;
  const sig     = createHmac("sha256", secret).update(`${mediaId}:${expires}`).digest("hex");
  const token   = `${expires}:${sig}`;

  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
  const url  = `${base}/api/media/${mediaId}?token=${encodeURIComponent(token)}`;

  return NextResponse.json({ url, expiresAt: new Date(expires).toISOString() });
}
