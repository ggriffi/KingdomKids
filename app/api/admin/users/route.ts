import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, getSessionUserId, hashPassword } from "@/lib/admin-auth";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { randomBytes } from "crypto";

export const dynamic = "force-dynamic";

interface User {
  id: string; name: string; username: string; passwordHash: string;
  totpSecret: string | null; mustChangePassword: boolean; mustSetupMfa: boolean;
  role: string; createdAt: string; lastLogin: string | null;
}

const USERS_PATH = join(process.cwd(), "data", "users.json");

function sessionSecret() {
  return process.env.SESSION_SECRET ?? process.env.ADMIN_PASSWORD ?? "";
}

function readUsers(): User[] {
  try { return JSON.parse(readFileSync(USERS_PATH, "utf-8")); } catch { return []; }
}
function writeUsers(u: User[]) { writeFileSync(USERS_PATH, JSON.stringify(u, null, 2)); }

function checkAuth(req: NextRequest): string | false {
  const secret = sessionSecret();
  if (!secret) return false;
  const raw = req.headers.get("authorization") ?? "";
  const tok = raw.startsWith("Bearer ") ? raw.slice(7) : "";
  if (!verifySessionToken(tok, secret)) return false;
  return getSessionUserId(tok);
}

function safeUser(u: User) {
  return {
    id: u.id, name: u.name, username: u.username, role: u.role,
    mustChangePassword: u.mustChangePassword, mustSetupMfa: u.mustSetupMfa,
    mfaEnabled: !!u.totpSecret && !u.mustSetupMfa,
    createdAt: u.createdAt, lastLogin: u.lastLogin,
  };
}

// List users
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ users: readUsers().map(safeUser) });
}

// Create user
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json() as { name?: string; username?: string; role?: string };
  const name     = (body.name     ?? "").trim();
  const username = (body.username ?? "").trim().toLowerCase();
  const role     = body.role === "viewer" ? "viewer" : "admin";

  if (!name || !username) {
    return NextResponse.json({ error: "Name and username are required" }, { status: 400 });
  }
  if (!/^[a-z0-9_-]+$/.test(username)) {
    return NextResponse.json({ error: "Username may only contain letters, numbers, - and _" }, { status: 400 });
  }

  const users = readUsers();
  if (users.find(u => u.username === username)) {
    return NextResponse.json({ error: "Username already exists" }, { status: 409 });
  }

  // Generate one-time password
  const words = ["Safari", "Jungle", "Kingdom", "Lions", "Savanna", "Rhino", "Zebra"];
  const word  = words[randomBytes(1)[0] % words.length];
  const num   = 10 + (randomBytes(1)[0] % 90);
  const sym   = ["!", "@", "#"][randomBytes(1)[0] % 3];
  const tempPw = `${word}${num}${sym}${randomBytes(2).toString("hex").toUpperCase()}`;

  const newUser: User = {
    id: randomBytes(8).toString("hex"),
    name, username,
    passwordHash: hashPassword(tempPw),
    totpSecret: null,
    mustChangePassword: true,
    mustSetupMfa: true,
    role,
    createdAt: new Date().toISOString(),
    lastLogin: null,
  };

  users.push(newUser);
  writeUsers(users);

  return NextResponse.json({ success: true, user: safeUser(newUser), tempPassword: tempPw });
}

// Delete user
export async function DELETE(req: NextRequest) {
  const callerId = checkAuth(req);
  if (!callerId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  if (id === callerId) return NextResponse.json({ error: "Cannot delete your own account" }, { status: 400 });

  const users = readUsers();
  const idx   = users.findIndex(u => u.id === id);
  if (idx === -1) return NextResponse.json({ error: "User not found" }, { status: 404 });

  users.splice(idx, 1);
  writeUsers(users);
  return NextResponse.json({ success: true });
}

// Reset password
export async function PATCH(req: NextRequest) {
  const callerId = checkAuth(req);
  if (!callerId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json() as { id?: string };
  const { id } = body;
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const users = readUsers();
  const idx   = users.findIndex(u => u.id === id);
  if (idx === -1) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const words = ["Safari", "Jungle", "Kingdom", "Lions", "Savanna", "Rhino", "Zebra"];
  const word  = words[randomBytes(1)[0] % words.length];
  const num   = 10 + (randomBytes(1)[0] % 90);
  const sym   = ["!", "@", "#"][randomBytes(1)[0] % 3];
  const tempPw = `${word}${num}${sym}${randomBytes(2).toString("hex").toUpperCase()}`;

  users[idx].passwordHash       = hashPassword(tempPw);
  users[idx].mustChangePassword = true;
  writeUsers(users);

  return NextResponse.json({ success: true, tempPassword: tempPw });
}
