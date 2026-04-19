"use client";

import { useState, useCallback } from "react";
import {
  Save, RefreshCw, Lock, LogOut, CheckCircle, AlertCircle, Plus, Trash2,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
interface CrewMember { name: string; role: string; color: string; img: string; bio: string; }
interface Friend     { name: string; role: string; color: string; }
interface PromiseItem { emoji: string; color: string; text: string; }
interface Song        { file: string; title: string; note: string; }
interface PageContent {
  about: {
    crew: CrewMember[];
    friends: Friend[];
    mission: { quote: string; body1: string; body2: string; cta: string; };
  };
  rhinoCorner: {
    msRose: { bio: string };
    promise: PromiseItem[];
  };
  bookshelf: { songs: Song[]; };
}

// ── Sidebar file list ──────────────────────────────────────────────────────
const FILES = [
  { key: "page-content",  label: "Page Content",  icon: "📝", description: "About, Rhino Corner, Bookshelf" },
  { key: "shop",          label: "Shop",           icon: "🛒", description: "Products, categories, prices" },
  { key: "layout-config", label: "Layout Config",  icon: "⚙️", description: "Nav links, circle positions" },
] as const;
type FileKey = typeof FILES[number]["key"];
type PageSection = "about" | "rhinoCorner" | "bookshelf";

// ── Shared form primitives ─────────────────────────────────────────────────
function Field({ label, value, onChange, multiline = false }: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean;
}) {
  const cls = "w-full px-3 py-2 rounded-lg border border-[#2d6a35]/60 bg-[#071209] text-[#e8f5e9] text-sm outline-none focus:border-[#f5c842] transition-colors";
  return (
    <div className="mb-3">
      <label className="block text-[10px] font-bold text-[#f5c842]/70 uppercase tracking-wider mb-1">{label}</label>
      {multiline
        ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={3} className={`${cls} resize-y`} />
        : <input type="text" value={value} onChange={e => onChange(e.target.value)} className={cls} />}
    </div>
  );
}

function ItemCard({ title, onRemove, children }: {
  title: string; onRemove?: () => void; children: React.ReactNode;
}) {
  return (
    <div className="border border-[#2d6a35]/40 rounded-xl p-4 mb-3 bg-black/20">
      <div className="flex items-center justify-between mb-3">
        <span className="text-white font-semibold text-sm">{title}</span>
        {onRemove && (
          <button onClick={onRemove}
            className="flex items-center gap-1 text-red-400 hover:text-red-300 text-xs transition-colors">
            <Trash2 size={11} /> Remove
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function AddBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="flex items-center gap-1.5 text-[#f5c842]/60 hover:text-[#f5c842] text-sm mb-6 transition-colors">
      <Plus size={13} /> {label}
    </button>
  );
}

// ── Section editors ────────────────────────────────────────────────────────
function AboutEditor({ data, onChange }: {
  data: PageContent["about"]; onChange: (d: PageContent["about"]) => void;
}) {
  const setCrew = (crew: CrewMember[]) => onChange({ ...data, crew });
  const setFriends = (friends: Friend[]) => onChange({ ...data, friends });
  const setMission = (k: keyof typeof data.mission, v: string) =>
    onChange({ ...data, mission: { ...data.mission, [k]: v } });

  const updCrew = (i: number, k: keyof CrewMember, v: string) => {
    const a = [...data.crew]; a[i] = { ...a[i], [k]: v }; setCrew(a);
  };
  const updFriend = (i: number, k: keyof Friend, v: string) => {
    const a = [...data.friends]; a[i] = { ...a[i], [k]: v }; setFriends(a);
  };

  return (
    <div>
      <SectionHeading>Crew Members</SectionHeading>
      {data.crew.map((m, i) => (
        <ItemCard key={i} title={m.name || `Crew ${i + 1}`}
          onRemove={() => setCrew(data.crew.filter((_, j) => j !== i))}>
          <div className="grid grid-cols-2 gap-x-3">
            <Field label="Name"       value={m.name}  onChange={v => updCrew(i, "name",  v)} />
            <Field label="Role"       value={m.role}  onChange={v => updCrew(i, "role",  v)} />
            <Field label="Color"      value={m.color} onChange={v => updCrew(i, "color", v)} />
            <Field label="Image path" value={m.img}   onChange={v => updCrew(i, "img",   v)} />
          </div>
          <Field label="Bio" value={m.bio} onChange={v => updCrew(i, "bio", v)} multiline />
        </ItemCard>
      ))}
      <AddBtn label="Add Crew Member"
        onClick={() => setCrew([...data.crew, { name: "", role: "", color: "#f07c2a", img: "", bio: "" }])} />

      <SectionHeading>Friends</SectionHeading>
      {data.friends.map((f, i) => (
        <ItemCard key={i} title={f.name || `Friend ${i + 1}`}
          onRemove={() => setFriends(data.friends.filter((_, j) => j !== i))}>
          <div className="grid grid-cols-3 gap-x-3">
            <Field label="Name"  value={f.name}  onChange={v => updFriend(i, "name",  v)} />
            <Field label="Role"  value={f.role}  onChange={v => updFriend(i, "role",  v)} />
            <Field label="Color" value={f.color} onChange={v => updFriend(i, "color", v)} />
          </div>
        </ItemCard>
      ))}
      <AddBtn label="Add Friend"
        onClick={() => setFriends([...data.friends, { name: "", role: "", color: "#3ab5e6" }])} />

      <SectionHeading>Mission Text</SectionHeading>
      <div className="border border-[#2d6a35]/40 rounded-xl p-4 bg-black/20">
        <Field label="Quote"           value={data.mission.quote}  onChange={v => setMission("quote",  v)} multiline />
        <Field label="Body paragraph 1" value={data.mission.body1}  onChange={v => setMission("body1",  v)} multiline />
        <Field label="Body paragraph 2" value={data.mission.body2}  onChange={v => setMission("body2",  v)} multiline />
        <Field label="Call to action"   value={data.mission.cta}   onChange={v => setMission("cta",    v)} />
      </div>
    </div>
  );
}

function RhinoCornerEditor({ data, onChange }: {
  data: PageContent["rhinoCorner"]; onChange: (d: PageContent["rhinoCorner"]) => void;
}) {
  const setPromise = (promise: PromiseItem[]) => onChange({ ...data, promise });
  const updPromise = (i: number, k: keyof PromiseItem, v: string) => {
    const a = [...data.promise]; a[i] = { ...a[i], [k]: v }; setPromise(a);
  };

  return (
    <div>
      <SectionHeading>Ms. Rose Bio</SectionHeading>
      <div className="border border-[#2d6a35]/40 rounded-xl p-4 mb-6 bg-black/20">
        <Field label="Bio text" value={data.msRose.bio}
          onChange={v => onChange({ ...data, msRose: { bio: v } })} multiline />
      </div>

      <SectionHeading>Promise List</SectionHeading>
      {data.promise.map((p, i) => (
        <ItemCard key={i} title={`${p.emoji} ${p.text.slice(0, 35) || `Promise ${i + 1}`}`}
          onRemove={() => setPromise(data.promise.filter((_, j) => j !== i))}>
          <div className="grid grid-cols-3 gap-x-3">
            <Field label="Emoji" value={p.emoji} onChange={v => updPromise(i, "emoji", v)} />
            <Field label="Color" value={p.color} onChange={v => updPromise(i, "color", v)} />
            <Field label="Text"  value={p.text}  onChange={v => updPromise(i, "text",  v)} />
          </div>
        </ItemCard>
      ))}
      <AddBtn label="Add Promise Item"
        onClick={() => setPromise([...data.promise, { emoji: "⭐", color: "#f5c842", text: "" }])} />
    </div>
  );
}

function BookshelfEditor({ data, onChange }: {
  data: PageContent["bookshelf"]; onChange: (d: PageContent["bookshelf"]) => void;
}) {
  const setSongs = (songs: Song[]) => onChange({ ...data, songs });
  const updSong = (i: number, k: keyof Song, v: string) => {
    const a = [...data.songs]; a[i] = { ...a[i], [k]: v }; setSongs(a);
  };

  return (
    <div>
      <SectionHeading>Songs</SectionHeading>
      {data.songs.map((s, i) => (
        <ItemCard key={i} title={s.title || `Song ${i + 1}`}
          onRemove={() => setSongs(data.songs.filter((_, j) => j !== i))}>
          <Field label="File path" value={s.file}  onChange={v => updSong(i, "file",  v)} />
          <Field label="Title"     value={s.title} onChange={v => updSong(i, "title", v)} />
          <Field label="Note"      value={s.note}  onChange={v => updSong(i, "note",  v)} />
        </ItemCard>
      ))}
      <AddBtn label="Add Song"
        onClick={() => setSongs([...data.songs, { file: "", title: "", note: "" }])} />
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[#f5c842] font-bold text-sm uppercase tracking-wider mb-3 mt-2 pb-1.5
      border-b border-[#f5c842]/20">
      {children}
    </h3>
  );
}

// ── Main admin page ────────────────────────────────────────────────────────
export default function AdminPage() {
  const [password,     setPassword]     = useState("");
  const [authed,       setAuthed]       = useState(false);
  const [authError,    setAuthError]    = useState("");
  const [activeFile,   setActiveFile]   = useState<FileKey>("page-content");
  const [pageContent,  setPageContent]  = useState<PageContent | null>(null);
  const [rawContent,   setRawContent]   = useState("");
  const [section,      setSection]      = useState<PageSection>("about");
  const [status,       setStatus]       = useState<"idle"|"loading"|"saving"|"success"|"error">("idle");
  const [statusMsg,    setStatusMsg]    = useState("");
  const [jsonError,    setJsonError]    = useState("");

  const authHeaders = useCallback(() => ({
    "Authorization": `Bearer ${password}`,
    "Content-Type": "application/json",
  }), [password]);

  const login = useCallback(async () => {
    setAuthError("");
    const res = await fetch("/api/admin/read?file=page-content", { headers: authHeaders() });
    if (res.ok) {
      const data = await res.json() as { content: string };
      setPageContent(JSON.parse(data.content) as PageContent);
      setAuthed(true);
    } else {
      setAuthError("Incorrect password. Please try again.");
    }
  }, [authHeaders]);

  const loadFile = useCallback(async (file: FileKey) => {
    setStatus("loading");
    setJsonError("");
    const res = await fetch(`/api/admin/read?file=${file}`, { headers: authHeaders() });
    if (res.ok) {
      const data = await res.json() as { content: string };
      const parsed = JSON.parse(data.content);
      if (file === "page-content") {
        setPageContent(parsed as PageContent);
      } else {
        setRawContent(JSON.stringify(parsed, null, 2));
      }
      setStatus("idle");
    } else {
      setStatus("error");
      setStatusMsg("Failed to load file.");
    }
  }, [authHeaders]);

  const switchFile = (file: FileKey) => {
    setActiveFile(file);
    setJsonError("");
    loadFile(file);
  };

  const validateRaw = (val: string) => {
    try { JSON.parse(val); setJsonError(""); return true; }
    catch (e) { setJsonError((e as Error).message); return false; }
  };

  const save = async () => {
    let content: string;
    if (activeFile === "page-content") {
      content = JSON.stringify(pageContent, null, 2);
    } else {
      if (!validateRaw(rawContent)) return;
      content = rawContent;
    }
    setStatus("saving");
    const res = await fetch("/api/admin/write", {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ file: activeFile, content }),
    });
    const data = await res.json() as { success?: boolean; error?: string };
    if (data.success) {
      setStatus("success");
      setStatusMsg("Saved! Restart the Next.js server to apply changes.");
      setTimeout(() => setStatus("idle"), 4000);
    } else {
      setStatus("error");
      setStatusMsg(data.error ?? "Save failed.");
    }
  };

  // ── Login screen ───────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "linear-gradient(135deg, #0e2d14, #1a5225)" }}>
        <div className="panel-parchment p-10 w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "linear-gradient(135deg, #f5c842, #d4a853)" }}>
            <Lock size={32} className="text-[#3d2008]" />
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
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && login()}
            placeholder="Admin password"
            className="w-full px-4 py-3 rounded-xl border-2 border-[#d4a853] bg-[#fdf6e3] text-[#3d2008]
              font-semibold mb-4 outline-none focus:border-[#f07c2a]"
          />
          <button onClick={login} className="btn-cta w-full text-center">Sign In</button>
          <p className="text-[#8b5e3c]/60 text-xs mt-6">
            Set via <code className="bg-[#f5c842]/20 px-1 rounded">ADMIN_PASSWORD</code> env var.
          </p>
        </div>
      </div>
    );
  }

  // ── Dashboard ──────────────────────────────────────────────────────────
  const fileMeta = FILES.find(f => f.key === activeFile)!;

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg, #0e2d14, #1a5225)" }}>

      {/* Top bar */}
      <div className="nav-wood px-6 py-4 flex items-center justify-between flex-shrink-0">
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

      <div className="flex flex-1 min-h-0">

        {/* Sidebar */}
        <div className="w-56 flex-shrink-0 p-4 flex flex-col gap-1 border-r border-[#2d6a35]/40 overflow-y-auto"
          style={{ background: "rgba(0,0,0,0.2)" }}>
          <p className="text-[#f5c842]/50 text-[10px] font-bold uppercase tracking-widest px-3 mb-2">Files</p>
          {FILES.map(f => (
            <button key={f.key} onClick={() => switchFile(f.key)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all text-sm ${
                activeFile === f.key
                  ? "bg-[#f5c842] text-[#3d2008] font-bold shadow"
                  : "text-[#fdf6e3]/80 hover:bg-white/10"
              }`}>
              <span className="mr-2">{f.icon}</span>
              <span className="font-semibold">{f.label}</span>
              <p className={`text-[10px] mt-0.5 ${activeFile === f.key ? "text-[#3d2008]/60" : "text-[#fdf6e3]/40"}`}>
                {f.description}
              </p>
            </button>
          ))}
          <div className="mt-auto pt-4 border-t border-[#2d6a35]/40">
            <a href="/" target="_blank"
              className="block text-center text-[#f5c842]/60 hover:text-[#f5c842] text-xs transition-colors py-2">
              View Live Site →
            </a>
          </div>
        </div>

        {/* Editor pane */}
        <div className="flex-1 flex flex-col min-w-0">

          {/* Pane header */}
          <div className="px-6 py-4 border-b border-[#2d6a35]/40 flex items-center justify-between flex-shrink-0"
            style={{ background: "rgba(0,0,0,0.15)" }}>
            <div>
              <h2 className="text-white font-bold text-lg flex items-center gap-2">
                <span>{fileMeta.icon}</span> {fileMeta.label}
              </h2>
              <p className="text-[#fdf6e3]/40 text-xs mt-0.5">{fileMeta.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => loadFile(activeFile)} disabled={status === "loading"}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold
                  text-[#fdf6e3]/70 hover:bg-white/10 transition-all disabled:opacity-50">
                <RefreshCw size={13} className={status === "loading" ? "animate-spin" : ""} />
                Reload
              </button>
              <button onClick={save}
                disabled={status === "saving" || (activeFile !== "page-content" && !!jsonError)}
                className="flex items-center gap-1.5 btn-cta !px-5 !py-2 !text-sm
                  disabled:opacity-50 disabled:cursor-not-allowed">
                <Save size={13} />
                {status === "saving" ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </div>

          {/* Status / error bars */}
          {(status === "success" || status === "error") && (
            <div className={`px-6 py-3 flex items-center gap-2 text-sm font-semibold flex-shrink-0 ${
              status === "success" ? "bg-green-800/60 text-green-200" : "bg-red-800/60 text-red-200"
            }`}>
              {status === "success" ? <CheckCircle size={15} /> : <AlertCircle size={15} />}
              {statusMsg}
            </div>
          )}
          {jsonError && (
            <div className="px-6 py-2 bg-red-900/40 text-red-300 text-xs font-mono
              flex items-center gap-2 flex-shrink-0">
              <AlertCircle size={11} /> JSON Error: {jsonError}
            </div>
          )}

          {/* Content area */}
          <div className="flex-1 overflow-y-auto">

            {/* ── Page Content: form editor with section tabs ── */}
            {activeFile === "page-content" && pageContent ? (
              <div className="p-6">
                {/* Section tabs */}
                <div className="flex gap-2 mb-6">
                  {(["about", "rhinoCorner", "bookshelf"] as const).map(s => (
                    <button key={s} onClick={() => setSection(s)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                        section === s
                          ? "bg-[#f5c842] text-[#3d2008]"
                          : "bg-white/10 text-[#fdf6e3]/70 hover:bg-white/20"
                      }`}>
                      {s === "about" ? "About" : s === "rhinoCorner" ? "Rhino Corner" : "Bookshelf"}
                    </button>
                  ))}
                </div>

                {section === "about" && (
                  <AboutEditor data={pageContent.about}
                    onChange={a => setPageContent({ ...pageContent, about: a })} />
                )}
                {section === "rhinoCorner" && (
                  <RhinoCornerEditor data={pageContent.rhinoCorner}
                    onChange={r => setPageContent({ ...pageContent, rhinoCorner: r })} />
                )}
                {section === "bookshelf" && (
                  <BookshelfEditor data={pageContent.bookshelf}
                    onChange={b => setPageContent({ ...pageContent, bookshelf: b })} />
                )}
              </div>
            ) : activeFile !== "page-content" ? (
              /* ── Raw JSON editor for shop / layout-config ── */
              <textarea
                value={rawContent}
                onChange={e => { setRawContent(e.target.value); validateRaw(e.target.value); }}
                spellCheck={false}
                className="w-full h-full p-6 font-mono text-sm bg-[#071209] text-[#a8f0a8]
                  resize-none outline-none border-0 leading-relaxed"
                style={{ minHeight: "400px" }}
                placeholder="Loading…"
              />
            ) : (
              <div className="p-6 text-[#fdf6e3]/40 text-sm">Loading…</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
