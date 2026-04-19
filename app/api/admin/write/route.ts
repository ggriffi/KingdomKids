import { NextRequest, NextResponse } from "next/server";
import { writeFileSync } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data");
const ALLOWED_FILES = ["page-content", "layout-config", "shop"];

export async function POST(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json({ error: "Admin not configured" }, { status: 503 });
  }

  const auth = req.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (token !== adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json() as { file?: string; content?: string };
  const { file, content } = body;

  if (!file || !ALLOWED_FILES.includes(file)) {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }

  if (!content) {
    return NextResponse.json({ error: "Missing content" }, { status: 400 });
  }

  try {
    JSON.parse(content);
  } catch {
    return NextResponse.json({ error: "Invalid JSON — fix syntax errors before saving." }, { status: 400 });
  }

  try {
    writeFileSync(join(DATA_DIR, `${file}.json`), content, "utf-8");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Write failed" }, { status: 500 });
  }
}
