import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "kingdomkids-admin";
const DATA_DIR = join(process.cwd(), "data");
const ALLOWED_FILES = ["site", "books", "curriculum", "explorers", "missions", "shop"];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const password = searchParams.get("password");
  const file     = searchParams.get("file");

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
