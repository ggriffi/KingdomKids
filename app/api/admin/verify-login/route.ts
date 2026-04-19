import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, verifyTOTP, generateSessionToken, generateTOTPSecret, getSessionUserId } from "@/lib/admin-auth";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

export const dynamic = "force-dynamic";

interface User {
  id: string; name: string; username: string; passwordHash: string;
  totpSecret: string | null; mustChangePassword: boolean; mustSetupMfa: boolean;
  role: string; createdAt: string; lastLogin: string | null;
}

const USERS_PATH = join(process.cwd(), "data", "users.json");

function readUsers(): User[] {
  try { return JSON.parse(readFileSync(USERS_PATH, "utf-8")); } catch { return []; }
}
function writeUsers(users: User[]) {
  writeFileSync(USERS_PATH, JSON.stringify(users, null, 2));
}

function sessionSecret() {
  return process.env.SESSION_SECRET ?? process.env.ADMIN_PASSWORD ?? "";
}

export async function POST(req: NextRequest) {
  const secret = sessionSecret();
  if (!secret) return NextResponse.json({ error: "Server not configured" }, { status: 503 });

  const body = await req.json() as { username?: string; password?: string; totpCode?: string };
  const { username = "", password = "", totpCode = "" } = body;

  const users = readUsers();
  const idx   = users.findIndex(u => u.username.toLowerCase() === username.toLowerCase().trim());
  if (idx === -1) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const user = users[idx];
  if (!verifyPassword(password, user.passwordHash)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // If user has active MFA, require TOTP code
  if (user.totpSecret && !user.mustSetupMfa) {
    if (!verifyTOTP(user.totpSecret, totpCode)) {
      return NextResponse.json({ error: "Invalid MFA code" }, { status: 401 });
    }
  }

  // Update lastLogin
  users[idx].lastLogin = new Date().toISOString();
  writeUsers(users);

  const sessionToken = generateSessionToken(user.id, secret);

  // If MFA setup needed, pre-generate TOTP secret and return URI
  let totpSetupUri: string | null = null;
  if (user.mustSetupMfa) {
    if (!user.totpSecret) {
      users[idx].totpSecret = generateTOTPSecret();
      writeUsers(users);
    }
    const label = encodeURIComponent(`Kingdom Kids (${user.username})`);
    totpSetupUri = `otpauth://totp/${label}?secret=${users[idx].totpSecret}&issuer=KingdomKids`;
  }

  return NextResponse.json({
    sessionToken,
    user: { id: user.id, name: user.name, username: user.username, role: user.role },
    mustChangePassword: user.mustChangePassword,
    mustSetupMfa:       user.mustSetupMfa,
    totpSetupUri,
    totpSecret:         user.mustSetupMfa ? users[idx].totpSecret : null,
  });
}

// Health-check probe used by restart polling
export async function GET(req: NextRequest) {
  const secret = sessionSecret();
  if (!secret) return NextResponse.json({ ok: false }, { status: 503 });

  // Optionally return current user info if token present
  const raw = req.headers.get("authorization") ?? "";
  const tok = raw.startsWith("Bearer ") ? raw.slice(7) : "";
  if (tok) {
    const userId = getSessionUserId(tok);
    const user   = readUsers().find(u => u.id === userId);
    if (user) return NextResponse.json({ ok: true, user: { name: user.name, role: user.role } });
  }
  return NextResponse.json({ ok: true });
}
