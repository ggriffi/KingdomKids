import { createHmac, timingSafeEqual, scryptSync, randomBytes } from "crypto";

const BASE32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
const SESSION_MS = 24 * 60 * 60 * 1000;

// ── Password hashing ──────────────────────────────────────────────────────
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  try {
    const derived = scryptSync(password, salt, 64).toString("hex");
    const a = Buffer.from(derived, "hex");
    const b = Buffer.from(hash, "hex");
    return a.length === b.length && timingSafeEqual(a, b);
  } catch { return false; }
}

// ── Session tokens ─────────────────────────────────────────────────────────
// Format: userId:timestamp:nonce:hmac(userId:timestamp:nonce, key=SESSION_SECRET)
export function generateSessionToken(userId: string, secret: string): string {
  const ts    = Date.now().toString();
  const nonce = randomBytes(16).toString("hex");
  const payload = `${userId}:${ts}:${nonce}`;
  const sig   = createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}:${sig}`;
}

export function verifySessionToken(token: string, secret: string): boolean {
  const parts = token.split(":");
  // Legacy 3-part tokens (pre-multi-user) are rejected; require 4 parts.
  if (parts.length !== 4) return false;
  const [userId, ts, nonce, sig] = parts;
  const payload  = `${userId}:${ts}:${nonce}`;
  const expected = createHmac("sha256", secret).update(payload).digest("hex");
  const sigBuf   = Buffer.from(sig, "hex");
  const expBuf   = Buffer.from(expected, "hex");
  if (sigBuf.length !== expBuf.length) return false;
  if (!timingSafeEqual(sigBuf, expBuf)) return false;
  const age = Date.now() - parseInt(ts, 10);
  return age >= 0 && age < SESSION_MS;
}

export function getSessionUserId(token: string): string {
  return token.split(":")[0] ?? "";
}

// ── TOTP (RFC 6238) ───────────────────────────────────────────────────────
function base32Decode(input: string): Buffer {
  const str = input.replace(/[\s=]+/g, "").toUpperCase();
  let bits = 0, value = 0;
  const output: number[] = [];
  for (const char of str) {
    const idx = BASE32.indexOf(char);
    if (idx === -1) throw new Error(`Invalid base32 char: ${char}`);
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) { output.push((value >>> (bits - 8)) & 0xff); bits -= 8; }
  }
  return Buffer.from(output);
}

function hotp(key: Buffer, counter: number): string {
  const buf = Buffer.alloc(8);
  buf.writeBigUInt64BE(BigInt(counter));
  const mac    = createHmac("sha1", key).update(buf).digest();
  const offset = mac[mac.length - 1] & 0x0f;
  const code   =
    ((mac[offset]     & 0x7f) << 24) |
    ((mac[offset + 1] & 0xff) << 16) |
    ((mac[offset + 2] & 0xff) << 8)  |
     (mac[offset + 3] & 0xff);
  return String(code % 1_000_000).padStart(6, "0");
}

export function verifyTOTP(secret: string, code: string, windowSteps = 1): boolean {
  if (!/^\d{6}$/.test(code)) return false;
  try {
    const key     = base32Decode(secret);
    const counter = Math.floor(Date.now() / 1000 / 30);
    for (let i = -windowSteps; i <= windowSteps; i++) {
      if (hotp(key, counter + i) === code) return true;
    }
    return false;
  } catch { return false; }
}

export function generateTOTPSecret(): string {
  const bytes = randomBytes(20);
  let secret = "";
  let bits = 0, value = 0;
  for (const byte of bytes) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) { bits -= 5; secret += BASE32[(value >> bits) & 31]; }
  }
  return secret;
}

export function safeCompare(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) { timingSafeEqual(ab, ab); return false; }
  return timingSafeEqual(ab, bb);
}
