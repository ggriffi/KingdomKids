"use client";

import { useState, useCallback } from "react";
import { Save, RefreshCw, Lock, LogOut, CheckCircle, AlertCircle } from "lucide-react";

const FILES = [
  { key: "site",       label: "Site Settings",   icon: "⚙️",  description: "Name, tagline, nav links, contact, social, footer" },
  { key: "books",      label: "Books",            icon: "📚",  description: "Book catalog, Jungle News panel" },
  { key: "curriculum", label: "Curriculum",       icon: "📋",  description: "Features, grade bands, teacher downloads" },
  { key: "explorers",  label: "Explorers",        icon: "🐘",  description: "Character bios, traits, verses" },
  { key: "missions",   label: "Missions",         icon: "🗺️",  description: "Mission map points, challenge descriptions" },
  { key: "shop",       label: "Shop",             icon: "🛒",  description: "Products, categories, prices" },
] as const;

type FileKey = typeof FILES[number]["key"];

export default function AdminPage() {
  const [password,    setPassword]    = useState("");
  const [authed,      setAuthed]      = useState(false);
  const [authError,   setAuthError]   = useState("");
  const [activeFile,  setActiveFile]  = useState<FileKey>("site");
  const [content,     setContent]     = useState("");
  const [status,      setStatus]      = useState<"idle"|"loading"|"saving"|"success"|"error">("idle");
  const [statusMsg,   setStatusMsg]   = useState("");
  const [jsonError,   setJsonError]   = useState("");

  const login = useCallback(async () => {
    setAuthError("");
    const res = await fetch(`/api/admin/read?password=${encodeURIComponent(password)}&file=site`);
    if (res.ok) {
      setAuthed(true);
      // Pass password directly since loadFile reads it from closure
      const data = await res.json() as { content: string };
      try {
        setContent(JSON.stringify(JSON.parse(data.content), null, 2));
      } catch {
        setContent(data.content);
      }
      setStatus("idle");
    } else {
      setAuthError("Incorrect password. Please try again.");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  const loadFile = useCallback(async (file: FileKey, pw?: string) => {
    setStatus("loading");
    setJsonError("");
    const usePw = pw ?? password;
    const res = await fetch(`/api/admin/read?password=${encodeURIComponent(usePw)}&file=${file}`);
    if (res.ok) {
      const data = await res.json() as { content: string };
      // Pretty-print the JSON
      try {
        setContent(JSON.stringify(JSON.parse(data.content), null, 2));
      } catch {
        setContent(data.content);
      }
      setStatus("idle");
    } else {
      setStatus("error");
      setStatusMsg("Failed to load file.");
    }
  }, [password]);

  const switchFile = (file: FileKey) => {
    setActiveFile(file);
    loadFile(file);
  };

  const validateJson = (val: string) => {
    try {
      JSON.parse(val);
      setJsonError("");
      return true;
    } catch (e) {
      setJsonError((e as Error).message);
      return false;
    }
  };

  const save = async () => {
    if (!validateJson(content)) return;
    setStatus("saving");
    const res = await fetch("/api/admin/write", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ password, file: activeFile, content }),
    });
    const data = await res.json() as { success?: boolean; error?: string };
    if (data.success) {
      setStatus("success");
      setStatusMsg("Saved successfully! Reload the site to see changes.");
      setTimeout(() => setStatus("idle"), 4000);
    } else {
      setStatus("error");
      setStatusMsg(data.error ?? "Save failed.");
    }
  };

  /* ── Login screen ──────────────────────────────────── */
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "linear-gradient(135deg, #0e2d14, #1a5225)" }}>
        <div className="panel-parchment p-10 w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-[#3d2008]"
            style={{ background: "linear-gradient(135deg, #f5c842, #d4a853)" }}>
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-black text-[#3d2008] mb-2" style={{ fontFamily: "Georgia, serif" }}>
            Admin Dashboard
          </h1>
          <p className="text-[#8b5e3c] text-sm mb-8">Enter your admin password to edit site content.</p>

          {authError && (
            <div className="flex items-center gap-2 text-red-700 bg-red-100 rounded-lg px-4 py-3 mb-4 text-sm">
              <AlertCircle size={16} /> {authError}
            </div>
          )}

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            placeholder="Admin password"
            className="w-full px-4 py-3 rounded-xl border-2 border-[#d4a853] bg-[#fdf6e3] text-[#3d2008] font-semibold mb-4 outline-none focus:border-[#f07c2a]"
          />
          <button onClick={login} className="btn-cta w-full text-center">
            Sign In
          </button>

          <p className="text-[#8b5e3c]/60 text-xs mt-6">
            Default password: <code className="bg-[#f5c842]/20 px-1 rounded">kingdomkids-admin</code>
            <br />Set <code className="bg-[#f5c842]/20 px-1 rounded">ADMIN_PASSWORD</code> env var in production.
          </p>
        </div>
      </div>
    );
  }

  /* ── Dashboard ─────────────────────────────────────── */
  const currentFileMeta = FILES.find((f) => f.key === activeFile)!;

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg, #0e2d14, #1a5225)" }}>

      {/* Top bar */}
      <div className="nav-wood px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black text-white"
            style={{ background: "linear-gradient(135deg, #22c55e, #15803d)", border: "2px solid #f5c842" }}>
            KK
          </div>
          <div>
            <span className="text-[#f5c842] font-bold text-sm">Kingdom Kids</span>
            <span className="text-[#fdf6e3]/60 text-xs ml-2">Admin Dashboard</span>
          </div>
        </div>
        <button onClick={() => { setAuthed(false); setPassword(""); }}
          className="flex items-center gap-1.5 text-[#fdf6e3]/70 hover:text-[#fdf6e3] text-sm transition-colors">
          <LogOut size={14} /> Sign Out
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-60 flex-shrink-0 p-4 flex flex-col gap-2 border-r border-[#2d6a35]/40 overflow-y-auto"
          style={{ background: "rgba(0,0,0,0.2)" }}>
          <p className="text-[#f5c842]/60 text-xs font-bold uppercase tracking-widest px-3 mb-1">Content Files</p>
          {FILES.map((f) => (
            <button key={f.key}
              onClick={() => switchFile(f.key)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-150 ${
                activeFile === f.key
                  ? "bg-[#f5c842] text-[#3d2008] font-bold shadow"
                  : "text-[#fdf6e3]/80 hover:bg-white/10"
              }`}>
              <span className="mr-2">{f.icon}</span>
              <span className="font-semibold text-sm">{f.label}</span>
            </button>
          ))}

          <div className="mt-auto pt-4 border-t border-[#2d6a35]/40">
            <a href="/" target="_blank"
              className="block text-center text-[#f5c842]/70 hover:text-[#f5c842] text-xs transition-colors py-2">
              View Live Site →
            </a>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Editor header */}
          <div className="px-6 py-4 border-b border-[#2d6a35]/40 flex items-center justify-between"
            style={{ background: "rgba(0,0,0,0.15)" }}>
            <div>
              <h2 className="text-white font-bold text-lg flex items-center gap-2">
                <span>{currentFileMeta.icon}</span>
                {currentFileMeta.label}
              </h2>
              <p className="text-[#fdf6e3]/50 text-xs mt-0.5">{currentFileMeta.description}</p>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => loadFile(activeFile)}
                disabled={status === "loading"}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-[#fdf6e3]/80 hover:bg-white/10 transition-all disabled:opacity-50">
                <RefreshCw size={14} className={status === "loading" ? "animate-spin" : ""} />
                Reload
              </button>

              <button onClick={save}
                disabled={status === "saving" || !!jsonError}
                className="flex items-center gap-1.5 btn-cta !px-5 !py-2 !text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                <Save size={14} />
                {status === "saving" ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </div>

          {/* Status bar */}
          {(status === "success" || status === "error") && (
            <div className={`px-6 py-3 flex items-center gap-2 text-sm font-semibold ${
              status === "success" ? "bg-green-800/60 text-green-200" : "bg-red-800/60 text-red-200"
            }`}>
              {status === "success"
                ? <CheckCircle size={16} />
                : <AlertCircle size={16} />}
              {statusMsg}
            </div>
          )}

          {/* JSON error */}
          {jsonError && (
            <div className="px-6 py-2 bg-red-900/40 text-red-300 text-xs font-mono flex items-center gap-2">
              <AlertCircle size={12} />
              JSON Error: {jsonError}
            </div>
          )}

          {/* Guide */}
          <div className="px-6 py-3 bg-[#f5c842]/10 border-b border-[#f5c842]/20">
            <p className="text-[#f5c842]/80 text-xs">
              <strong>How to edit:</strong> Modify the JSON below, then click <strong>Save Changes</strong>.
              The file is validated before saving — red errors mean invalid JSON.
              After saving, rebuild or reload the Next.js server to apply changes.
            </p>
          </div>

          {/* Textarea */}
          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              validateJson(e.target.value);
            }}
            spellCheck={false}
            className="flex-1 w-full p-6 font-mono text-sm bg-[#0a1a0d] text-[#a8f0a8] resize-none outline-none border-0 leading-relaxed"
            style={{ minHeight: "400px" }}
            placeholder="Loading…"
          />
        </div>
      </div>
    </div>
  );
}
