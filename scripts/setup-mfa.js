#!/usr/bin/env node
"use strict";

const { randomBytes } = require("crypto");
const { existsSync, readFileSync, writeFileSync } = require("fs");
const { join } = require("path");

const BASE32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

function base32Encode(buf) {
  let bits = 0, value = 0, output = "";
  for (const byte of buf) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      output += BASE32[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) output += BASE32[(value << (5 - bits)) & 31];
  return output;
}

const secret = base32Encode(randomBytes(20));
const issuer = "KingdomKids";
const otpauthUrl =
  `otpauth://totp/${encodeURIComponent(issuer)}:Admin` +
  `?secret=${secret}&issuer=${encodeURIComponent(issuer)}&algorithm=SHA1&digits=6&period=30`;

// Update .env.local
const envPath = join(__dirname, "..", ".env.local");
let envContent = existsSync(envPath) ? readFileSync(envPath, "utf-8") : "";
if (envContent.includes("ADMIN_TOTP_SECRET=")) {
  envContent = envContent.replace(/^ADMIN_TOTP_SECRET=.*$/m, `ADMIN_TOTP_SECRET=${secret}`);
} else {
  if (!envContent.endsWith("\n")) envContent += "\n";
  envContent += `\n# ── MFA (TOTP) ───────────────────────────────────────\nADMIN_TOTP_SECRET=${secret}\n`;
}
writeFileSync(envPath, envContent, "utf-8");

console.log("\n✅  MFA secret generated and saved to .env.local\n");
console.log(`Secret key:  ${secret}`);
console.log(`\notpauth:// URL (paste into authenticator app):\n`);
console.log(`  ${otpauthUrl}`);
console.log(`
To add to Google Authenticator / Authy / 1Password:
  1. Open your authenticator app
  2. Add account → Enter setup key manually
  3. Account name: Admin
  4. Key: ${secret}
  5. Type: Time-based
  6. Save

⚠️  Restart the Next.js server to pick up the new env variable:
     pm2 restart kingdomkids   (if using PM2)
     — or restart the process manually
`);
