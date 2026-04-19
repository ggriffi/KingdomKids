import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync, unlinkSync, existsSync } from "fs";
import { join } from "path";
import { verifySessionToken } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export interface MediaEntry {
  id: string;
  filename: string;
  originalName: string;
  title: string;
  description: string;
  type: "images" | "audio" | "video";
  access: "public" | "free-link" | "paid";
  expiryHours: number | null;
  price: number | null;
  stripePriceId: string | null;
  size: number;
  uploadedAt: string;
  publicPath: string | null;
}

const MEDIA_PATH = join(process.cwd(), "data", "media.json");

function readMedia(): MediaEntry[] {
  try { return JSON.parse(readFileSync(MEDIA_PATH, "utf-8")); } catch { return []; }
}

function writeMedia(media: MediaEntry[]): void {
  writeFileSync(MEDIA_PATH, JSON.stringify(media, null, 2));
}

function checkAuth(req: NextRequest): boolean {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return false;
  const raw = req.headers.get("authorization") ?? "";
  const tok = raw.startsWith("Bearer ") ? raw.slice(7) : "";
  return verifySessionToken(tok, pw);
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ media: readMedia() });
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const media = readMedia();
  const idx = media.findIndex(m => m.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const entry = media[idx];
  const filePath = entry.publicPath
    ? join(process.cwd(), "public", "media", entry.type, entry.filename)
    : join(process.cwd(), "private", "media", entry.type, entry.filename);
  if (existsSync(filePath)) unlinkSync(filePath);

  media.splice(idx, 1);
  writeMedia(media);
  return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json() as Partial<MediaEntry> & { id: string };
  const { id, ...updates } = body;
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const media = readMedia();
  const idx = media.findIndex(m => m.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const EDITABLE = ["title", "description", "access", "expiryHours", "price", "stripePriceId"] as const;
  for (const key of EDITABLE) {
    if (key in updates) (media[idx] as unknown as Record<string, unknown>)[key] = updates[key];
  }

  writeMedia(media);
  return NextResponse.json({ success: true, entry: media[idx] });
}
