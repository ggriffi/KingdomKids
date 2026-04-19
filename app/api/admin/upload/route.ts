import { NextRequest, NextResponse } from "next/server";
import { writeFileSync, mkdirSync, readFileSync } from "fs";
import { join, extname } from "path";
import { randomBytes } from "crypto";
import { verifySessionToken } from "@/lib/admin-auth";

interface MediaEntry {
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

const ALLOWED_TYPES: Record<string, string[]> = {
  images: ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"],
  audio:  ["audio/mpeg", "audio/ogg", "audio/wav", "audio/mp4", "audio/aac", "audio/x-m4a"],
  video:  ["video/mp4", "video/webm", "video/ogg", "video/quicktime", "video/x-msvideo"],
};

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "file";
}

export async function POST(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return NextResponse.json({ error: "Admin not configured" }, { status: 503 });

  const auth = req.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!verifySessionToken(token, adminPassword)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const title       = ((formData.get("title") as string) || file.name).trim();
  const description = ((formData.get("description") as string) || "").trim();
  const category    = (formData.get("category") as string) || "images";
  const access      = (formData.get("access") as string) || "public";
  const expiryHours = parseInt((formData.get("expiryHours") as string) || "24", 10);
  const rawPrice    = formData.get("price") as string | null;
  const price       = rawPrice ? Math.round(parseFloat(rawPrice) * 100) : null;
  const stripePriceId = ((formData.get("stripePriceId") as string) || "").trim() || null;

  if (!["images", "audio", "video"].includes(category)) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }
  if (!["public", "free-link", "paid"].includes(access)) {
    return NextResponse.json({ error: "Invalid access type" }, { status: 400 });
  }
  if (!ALLOWED_TYPES[category].includes(file.type)) {
    return NextResponse.json(
      { error: `File type "${file.type}" is not allowed for ${category}` },
      { status: 400 }
    );
  }

  const ext      = extname(file.name);
  const nameBase = slugify(file.name.slice(0, file.name.length - ext.length));
  const uid      = randomBytes(6).toString("hex");
  const filename = `${nameBase}-${uid}${ext}`;

  const isPublic = access === "public";
  const destDir  = isPublic
    ? join(process.cwd(), "public", "media", category)
    : join(process.cwd(), "private", "media", category);

  mkdirSync(destDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  writeFileSync(join(destDir, filename), buffer);

  const mediaPath = join(process.cwd(), "data", "media.json");
  let media: MediaEntry[] = [];
  try { media = JSON.parse(readFileSync(mediaPath, "utf-8")); } catch { /* starts empty */ }

  const entry: MediaEntry = {
    id:           randomBytes(8).toString("hex"),
    filename,
    originalName: file.name,
    title,
    description,
    type:         category as MediaEntry["type"],
    access:       access as MediaEntry["access"],
    expiryHours:  access === "free-link" ? expiryHours : null,
    price:        access === "paid" ? price : null,
    stripePriceId: access === "paid" ? stripePriceId : null,
    size:         buffer.length,
    uploadedAt:   new Date().toISOString(),
    publicPath:   isPublic ? `/media/${category}/${filename}` : null,
  };

  media.push(entry);
  writeFileSync(mediaPath, JSON.stringify(media, null, 2));

  return NextResponse.json({ success: true, entry });
}
