import { NextRequest, NextResponse } from "next/server";
import { writeFileSync } from "fs";
import { join } from "path";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "kingdomkids-admin";
const DATA_DIR = join(process.cwd(), "data");
const ALLOWED_FILES = ["site", "books", "curriculum", "explorers", "missions", "shop"];

export async function POST(req: NextRequest) {
  const body = await req.json() as { password?: string; file?: string; content?: string };
  const { password, file, content } = body;

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!file || !ALLOWED_FILES.includes(file)) {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }

  if (!content) {
    return NextResponse.json({ error: "Missing content" }, { status: 400 });
  }

  // Validate JSON before saving
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
