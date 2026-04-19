import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, getSessionUserId, hashPassword } from "@/lib/admin-auth";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const USERS_PATH = join(process.cwd(), "data", "users.json");

function sessionSecret() {
  return process.env.SESSION_SECRET ?? process.env.ADMIN_PASSWORD ?? "";
}

export async function POST(req: NextRequest) {
  const secret = sessionSecret();
  const raw    = req.headers.get("authorization") ?? "";
  const tok    = raw.startsWith("Bearer ") ? raw.slice(7) : "";
  if (!verifySessionToken(tok, secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json() as { newPassword?: string };
  const { newPassword = "" } = body;
  if (newPassword.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  }

  const userId = getSessionUserId(tok);
  const users  = JSON.parse(readFileSync(USERS_PATH, "utf-8"));
  const idx    = users.findIndex((u: { id: string }) => u.id === userId);
  if (idx === -1) return NextResponse.json({ error: "User not found" }, { status: 404 });

  users[idx].passwordHash       = hashPassword(newPassword);
  users[idx].mustChangePassword = false;
  writeFileSync(USERS_PATH, JSON.stringify(users, null, 2));

  return NextResponse.json({ success: true });
}
