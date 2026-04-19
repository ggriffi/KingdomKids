import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/admin-auth";
import { exec } from "child_process";

export async function POST(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json({ error: "Admin not configured" }, { status: 503 });
  }

  const auth = req.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!verifySessionToken(token, adminPassword)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  exec("pm2 restart kingdomkids 2>&1", (err, stdout) => {
    if (err) {
      console.log("[restart] PM2 not available, exiting for process manager to restart:", err.message);
      setTimeout(() => process.exit(0), 200);
    } else {
      console.log("[restart] PM2 restart triggered:", stdout.trim());
    }
  });

  return NextResponse.json({ success: true, message: "Server restart initiated" });
}
