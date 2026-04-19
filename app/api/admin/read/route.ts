import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data");
const ALLOWED_FILES = ["page-content", "layout-config", "shop"];

export async function GET(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json({ error: "Admin not configured" }, { status: 503 });
  }

  const auth = req.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (token !== adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const file = searchParams.get("file");

  if (!file || !ALLOWED_FILES.includes(file)) {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }

  try {
    const content = readFileSync(join(DATA_DIR, `${file}.json`), "utf-8");
    return NextResponse.json({ content });
  } catch {
    return NextResponse.json({ error: "Read failed" }, { status: 500 });
  }
}
