import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, getSessionUserId, verifyTOTP } from "@/lib/admin-auth";
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

  const body = await req.json() as { totpCode?: string };
  const { totpCode = "" } = body;

  const userId = getSessionUserId(tok);
  const users  = JSON.parse(readFileSync(USERS_PATH, "utf-8"));
  const idx    = users.findIndex((u: { id: string }) => u.id === userId);
  if (idx === -1) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const user = users[idx];
  if (!user.totpSecret) {
    return NextResponse.json({ error: "No TOTP secret pending" }, { status: 400 });
  }
  if (!verifyTOTP(user.totpSecret, totpCode)) {
    return NextResponse.json({ error: "Invalid code — try again" }, { status: 400 });
  }

  users[idx].mustSetupMfa = false;
  writeFileSync(USERS_PATH, JSON.stringify(users, null, 2));

  return NextResponse.json({ success: true });
}
