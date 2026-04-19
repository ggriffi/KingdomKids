"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  Save, RefreshCw, Lock, LogOut, CheckCircle, AlertCircle,
  Plus, Trash2, RotateCw, Upload, Link, Copy, Film, Music, Image, ChevronDown,
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
  rhinoCorner: { msRose: { bio: string }; promise: PromiseItem[]; };
  bookshelf: { songs: Song[]; };
}

interface MediaEntry {
  id: string;
  filename: string;
  originalName: string;
  title: string;
  description: string;
  type: "images" | "audio" | "video";
  access: "public" | "free-link" | "paid";
  expiryHours: number | null;
  price: number | null;
  stripePriceId: string | null;
  size: number;
  uploadedAt: string;
  publicPath: string | null;
}

// ── Shop types ────────────────────────────────────────────────────────────
interface ShopProduct {
  id: string; name: string; category: string; price: number; description: string;
  badge: string; inStock: boolean; coverColor: string; image?: string; plusShipping?: boolean;
}
interface ShopData { heading: string; subheading: string; categories: string[]; products: ShopProduct[]; }

// ── Layout config types ────────────────────────────────────────────────────
interface NavItem   { label: string; href: string; cx: string; cy: string; w: string; h: string; }
interface CircleItem { label: string; href: string; cx: string; cy: string; d: string; }
interface LayoutData {
  topNav: NavItem[];
  circles: CircleItem[];
  vbsZone: { right: string; top: string; width: string; };
}

// ── Sidebar sections ───────────────────────────────────────────────────────
const FILES = [
  { key: "page-content",  label: "Page Content",  icon: "📝", description: "About, Rhino Corner, Bookshelf" },
  { key: "shop",          label: "Shop",           icon: "🛒", description: "Products, categories, prices" },
  { key: "layout-config", label: "Layout Config",  icon: "⚙️", description: "Nav links, circle positions" },
  { key: "media",         label: "Media Library",  icon: "🎬", description: "Images, Audio, Video" },
  { key: "users",         label: "Users",          icon: "👥", description: "Manage admin accounts" },
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

function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <span className="text-[10px] font-bold text-[#f5c842]/70 uppercase tracking-wider">{label}</span>
      <div onClick={() => onChange(!value)}
        className={`relative w-10 h-5 rounded-full transition-colors flex-shrink-0 ${value ? "bg-[#22c55e]" : "bg-white/20"}`}>
        <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${value ? "translate-x-5" : ""}`} />
      </div>
    </label>
  );
}

function ColorPicker({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="mb-3">
      <label className="block text-[10px] font-bold text-[#f5c842]/70 uppercase tracking-wider mb-1">{label}</label>
      <div className="flex items-center gap-2">
        <input type="color" value={value} onChange={e => onChange(e.target.value)}
          className="w-10 h-9 rounded-lg border border-[#2d6a35]/60 bg-transparent cursor-pointer p-0.5" />
        <input type="text" value={value} onChange={e => onChange(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg border border-[#2d6a35]/60 bg-[#071209] text-[#e8f5e9] text-sm outline-none focus:border-[#f5c842] transition-colors font-mono" />
      </div>
    </div>
  );
}

// ── Section editors ────────────────────────────────────────────────────────
function AboutEditor({ data, onChange }: { data: PageContent["about"]; onChange: (d: PageContent["about"]) => void; }) {
  const setCrew    = (crew: CrewMember[]) => onChange({ ...data, crew });
  const setFriends = (friends: Friend[]) => onChange({ ...data, friends });
  const setMission = (k: keyof typeof data.mission, v: string) =>
    onChange({ ...data, mission: { ...data.mission, [k]: v } });
  const updCrew   = (i: number, k: keyof CrewMember, v: string) => {
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
        <Field label="Quote"            value={data.mission.quote} onChange={v => setMission("quote", v)} multiline />
        <Field label="Body paragraph 1" value={data.mission.body1} onChange={v => setMission("body1", v)} multiline />
        <Field label="Body paragraph 2" value={data.mission.body2} onChange={v => setMission("body2", v)} multiline />
        <Field label="Call to action"   value={data.mission.cta}  onChange={v => setMission("cta",   v)} />
      </div>
    </div>
  );
}

function RhinoCornerEditor({ data, onChange }: { data: PageContent["rhinoCorner"]; onChange: (d: PageContent["rhinoCorner"]) => void; }) {
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

function BookshelfEditor({ data, onChange }: { data: PageContent["bookshelf"]; onChange: (d: PageContent["bookshelf"]) => void; }) {
  const setSongs = (songs: Song[]) => onChange({ ...data, songs });
  const updSong  = (i: number, k: keyof Song, v: string) => {
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
      border-b border-[#f5c842]/20">{children}</h3>
  );
}

// ── Shop GUI editor ────────────────────────────────────────────────────────
const BADGE_OPTIONS = ["Digital", "Print", "New", "Fan Favorite", "Sale", "Coming Soon"];

function ShopEditor({ data, onChange }: { data: ShopData; onChange: (d: ShopData) => void }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [newCat,     setNewCat]     = useState("");

  const setProducts = (products: ShopProduct[]) => onChange({ ...data, products });
  const updProduct  = (id: string, patch: Partial<ShopProduct>) =>
    setProducts(data.products.map(p => p.id === id ? { ...p, ...patch } : p));

  const addProduct = () => {
    const id   = `product-${Date.now()}`;
    const newP: ShopProduct = {
      id, name: "New Product", category: data.categories.find(c => c !== "All") ?? "Gifts",
      price: 0, description: "", badge: "New", inStock: true, coverColor: "#1a5c22",
    };
    setProducts([...data.products, newP]);
    setExpandedId(id);
  };

  const removeProduct = (id: string) => {
    if (!confirm("Remove this product?")) return;
    setProducts(data.products.filter(p => p.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  const addCategory = () => {
    const cat = newCat.trim();
    if (!cat || data.categories.includes(cat)) return;
    onChange({ ...data, categories: [...data.categories, cat] });
    setNewCat("");
  };

  const productCategories = data.categories.filter(c => c !== "All");

  return (
    <div>
      <SectionHeading>Shop Header</SectionHeading>
      <div className="border border-[#2d6a35]/40 rounded-xl p-4 mb-6 bg-black/20">
        <Field label="Heading"    value={data.heading}    onChange={v => onChange({ ...data, heading: v })} />
        <Field label="Subheading" value={data.subheading} onChange={v => onChange({ ...data, subheading: v })} />
      </div>

      <SectionHeading>Categories</SectionHeading>
      <div className="border border-[#2d6a35]/40 rounded-xl p-4 mb-6 bg-black/20">
        <div className="flex flex-wrap gap-2 mb-3">
          {data.categories.map(cat => (
            <span key={cat} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#2d6a35]/40 text-[#e8f5e9] text-sm">
              {cat}
              {cat !== "All" && (
                <button onClick={() => onChange({ ...data, categories: data.categories.filter(c => c !== cat) })}
                  className="text-red-400 hover:text-red-300 ml-0.5 font-bold leading-none">&times;</button>
              )}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input value={newCat} onChange={e => setNewCat(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addCategory(); } }}
            placeholder="New category…" className={FIELD_CLS} />
          <button onClick={addCategory}
            className="flex items-center gap-1 px-4 py-2 rounded-lg bg-[#f5c842]/20 border border-[#f5c842]/30 text-[#f5c842] text-sm font-semibold hover:bg-[#f5c842]/30 transition-colors">
            <Plus size={13} /> Add
          </button>
        </div>
      </div>

      <SectionHeading>Products ({data.products.length})</SectionHeading>
      <div className="space-y-2 mb-4">
        {data.products.map(p => {
          const isOpen = expandedId === p.id;
          return (
            <div key={p.id} className="border border-[#2d6a35]/30 rounded-xl overflow-hidden bg-black/20">
              <div className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                onClick={() => setExpandedId(isOpen ? null : p.id)}>
                <div className="w-7 h-7 rounded-lg flex-shrink-0" style={{ background: p.coverColor }} />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{p.name}</p>
                  <p className="text-[#fdf6e3]/35 text-xs">{p.category} · ${p.price.toFixed(2)} · {p.badge}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0 ${
                  p.inStock ? "bg-green-800/60 text-green-300 border-green-700/40" : "bg-red-900/60 text-red-300 border-red-800/40"
                }`}>{p.inStock ? "In Stock" : "Out of Stock"}</span>
                <button onClick={e => { e.stopPropagation(); removeProduct(p.id); }}
                  className="p-1.5 text-red-500/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all flex-shrink-0">
                  <Trash2 size={13} />
                </button>
                <ChevronDown size={14} className={`text-[#fdf6e3]/40 flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
              </div>
              {isOpen && (
                <div className="border-t border-[#2d6a35]/20 px-4 pb-4 pt-3 bg-black/10">
                  <div className="grid grid-cols-2 gap-x-4">
                    <Field label="Product Name" value={p.name} onChange={v => updProduct(p.id, { name: v })} />
                    <div className="mb-3">
                      <label className="block text-[10px] font-bold text-[#f5c842]/70 uppercase tracking-wider mb-1">Category</label>
                      <select value={p.category} onChange={e => updProduct(p.id, { category: e.target.value })} className={FIELD_CLS}>
                        {productCategories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="block text-[10px] font-bold text-[#f5c842]/70 uppercase tracking-wider mb-1">Price (USD)</label>
                      <input type="number" min="0" step="0.01" value={p.price}
                        onChange={e => updProduct(p.id, { price: parseFloat(e.target.value) || 0 })} className={FIELD_CLS} />
                    </div>
                    <div className="mb-3">
                      <label className="block text-[10px] font-bold text-[#f5c842]/70 uppercase tracking-wider mb-1">Badge</label>
                      <select value={p.badge} onChange={e => updProduct(p.id, { badge: e.target.value })} className={FIELD_CLS}>
                        {BADGE_OPTIONS.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                  </div>
                  <Field label="Description" value={p.description} onChange={v => updProduct(p.id, { description: v })} multiline />
                  <Field label="Image path (optional, e.g. /images/my-cover.png)" value={p.image ?? ""} onChange={v => updProduct(p.id, { image: v || undefined })} />
                  <ColorPicker label="Cover Color" value={p.coverColor} onChange={v => updProduct(p.id, { coverColor: v })} />
                  <div className="flex gap-6 mt-2">
                    <Toggle label="In Stock"   value={p.inStock}         onChange={v => updProduct(p.id, { inStock: v })} />
                    <Toggle label="+ Shipping" value={!!p.plusShipping}  onChange={v => updProduct(p.id, { plusShipping: v || undefined })} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <AddBtn label="Add Product" onClick={addProduct} />
    </div>
  );
}

// ── Layout Config GUI editor ───────────────────────────────────────────────
function LayoutConfigEditor({ data, onChange }: { data: LayoutData; onChange: (d: LayoutData) => void }) {
  const updNav    = (i: number, patch: Partial<NavItem>) => {
    const a = [...data.topNav]; a[i] = { ...a[i], ...patch }; onChange({ ...data, topNav: a });
  };
  const updCircle = (i: number, patch: Partial<CircleItem>) => {
    const a = [...data.circles]; a[i] = { ...a[i], ...patch }; onChange({ ...data, circles: a });
  };
  const updVbs = (patch: Partial<LayoutData["vbsZone"]>) =>
    onChange({ ...data, vbsZone: { ...data.vbsZone, ...patch } });

  return (
    <div>
      <SectionHeading>Navigation Links</SectionHeading>
      <p className="text-[#fdf6e3]/40 text-xs mb-3 -mt-1">Label and destination for each top-nav button on the homepage image.</p>
      <div className="space-y-2 mb-6">
        {data.topNav.map((item, i) => (
          <div key={i} className="border border-[#2d6a35]/30 rounded-xl overflow-hidden bg-black/20">
            <div className="grid grid-cols-2 gap-3 px-4 py-3">
              <Field label="Label" value={item.label} onChange={v => updNav(i, { label: v })} />
              <Field label="Link (href)" value={item.href} onChange={v => updNav(i, { href: v })} />
            </div>
            <details className="px-4 pb-3">
              <summary className="text-[10px] font-bold text-[#f5c842]/40 uppercase tracking-wider cursor-pointer hover:text-[#f5c842]/70 transition-colors">
                Advanced — Position &amp; Size on image
              </summary>
              <div className="grid grid-cols-4 gap-3 mt-3">
                <Field label="Center X" value={item.cx} onChange={v => updNav(i, { cx: v })} />
                <Field label="Center Y" value={item.cy} onChange={v => updNav(i, { cy: v })} />
                <Field label="Width"    value={item.w}  onChange={v => updNav(i, { w: v })} />
                <Field label="Height"   value={item.h}  onChange={v => updNav(i, { h: v })} />
              </div>
            </details>
          </div>
        ))}
      </div>

      <SectionHeading>Homepage Circles</SectionHeading>
      <p className="text-[#fdf6e3]/40 text-xs mb-3 -mt-1">The three clickable circles at the bottom of the homepage hero image.</p>
      <div className="space-y-2 mb-6">
        {data.circles.map((c, i) => (
          <div key={i} className="border border-[#2d6a35]/30 rounded-xl overflow-hidden bg-black/20">
            <div className="grid grid-cols-2 gap-3 px-4 py-3">
              <Field label="Label" value={c.label} onChange={v => updCircle(i, { label: v })} />
              <Field label="Link (href)" value={c.href} onChange={v => updCircle(i, { href: v })} />
            </div>
            <details className="px-4 pb-3">
              <summary className="text-[10px] font-bold text-[#f5c842]/40 uppercase tracking-wider cursor-pointer hover:text-[#f5c842]/70 transition-colors">
                Advanced — Position &amp; Size on image
              </summary>
              <div className="grid grid-cols-3 gap-3 mt-3">
                <Field label="Center X"   value={c.cx} onChange={v => updCircle(i, { cx: v })} />
                <Field label="Center Y"   value={c.cy} onChange={v => updCircle(i, { cy: v })} />
                <Field label="Diameter"   value={c.d}  onChange={v => updCircle(i, { d: v })} />
              </div>
            </details>
          </div>
        ))}
      </div>

      <SectionHeading>VBS Zone Button</SectionHeading>
      <p className="text-[#fdf6e3]/40 text-xs mb-3 -mt-1">Position of the VBS banner/button on the homepage hero. Values are percentages of the image size.</p>
      <div className="border border-[#2d6a35]/40 rounded-xl p-4 bg-black/20">
        <div className="grid grid-cols-3 gap-3">
          <Field label="From Right (%)" value={data.vbsZone.right} onChange={v => updVbs({ right: v })} />
          <Field label="From Top (%)"   value={data.vbsZone.top}   onChange={v => updVbs({ top: v })} />
          <Field label="Width (%)"      value={data.vbsZone.width} onChange={v => updVbs({ width: v })} />
        </div>
      </div>
    </div>
  );
}

// ── Media Library ──────────────────────────────────────────────────────────
const EXPIRY_OPTIONS = [
  { value: "1",   label: "1 hour" },
  { value: "24",  label: "24 hours" },
  { value: "72",  label: "3 days" },
  { value: "168", label: "7 days" },
  { value: "720", label: "30 days" },
];

const FIELD_CLS = "w-full px-3 py-2 rounded-lg border border-[#2d6a35]/60 bg-[#071209] text-[#e8f5e9] text-sm outline-none focus:border-[#f5c842] transition-colors";

function formatBytes(bytes: number): string {
  if (bytes < 1024)               return `${bytes} B`;
  if (bytes < 1024 * 1024)        return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
}

function accessBadgeCls(access: string): string {
  return access === "public"    ? "bg-green-800/60 text-green-300 border-green-700/40"
       : access === "free-link" ? "bg-blue-800/60 text-blue-300 border-blue-700/40"
       :                          "bg-amber-800/60 text-amber-300 border-amber-700/40";
}

function accessLabel(e: MediaEntry): string {
  if (e.access === "public")    return "Public";
  if (e.access === "free-link") return `Free · ${e.expiryHours ?? 24}h`;
  if (e.access === "paid")      return e.price ? `Paid · $${(e.price / 100).toFixed(2)}` : "Paid";
  return e.access;
}

function TypeIcon({ type }: { type: string }) {
  if (type === "audio") return <Music size={18} className="flex-shrink-0 text-blue-400" />;
  if (type === "video") return <Film  size={18} className="flex-shrink-0 text-purple-400" />;
  return <Image size={18} className="flex-shrink-0 text-green-400" />;
}

function InlineEditPanel({ entry, sessionToken, onSaved }: {
  entry: MediaEntry;
  sessionToken: string;
  onSaved: (updated: MediaEntry) => void;
}) {
  const [access,        setAccess]        = useState(entry.access);
  const [expiryHours,   setExpiryHours]   = useState(String(entry.expiryHours ?? 24));
  const [price,         setPrice]         = useState(entry.price ? String(entry.price / 100) : "");
  const [stripePriceId, setStripePriceId] = useState(entry.stripePriceId ?? "");
  const [saving,        setSaving]        = useState(false);

  const save = async () => {
    setSaving(true);
    const patch = {
      id: entry.id,
      access,
      expiryHours:  access === "free-link" ? parseInt(expiryHours, 10) : null,
      price:        access === "paid" && price ? Math.round(parseFloat(price) * 100) : null,
      stripePriceId: access === "paid" ? stripePriceId || null : null,
    };
    const res = await fetch("/api/admin/media", {
      method: "PATCH",
      headers: { "Authorization": `Bearer ${sessionToken}`, "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (res.ok) {
      const data = await res.json() as { entry: MediaEntry };
      onSaved(data.entry);
    }
    setSaving(false);
  };

  return (
    <div className="px-4 pb-4 pt-3 border-t border-[#2d6a35]/20 bg-black/10">
      <div className="grid grid-cols-2 gap-3 max-w-lg">
        <div>
          <label className="block text-[10px] font-bold text-[#f5c842]/60 uppercase tracking-wider mb-1">Access</label>
          <select value={access} onChange={e => setAccess(e.target.value as "public" | "free-link" | "paid")} className={FIELD_CLS}>
            <option value="public">Public — no restrictions</option>
            <option value="free-link">Free — timed link</option>
            <option value="paid">Paid — Stripe checkout</option>
          </select>
        </div>
        {access === "free-link" && (
          <div>
            <label className="block text-[10px] font-bold text-[#f5c842]/60 uppercase tracking-wider mb-1">Link Expiry</label>
            <select value={expiryHours} onChange={e => setExpiryHours(e.target.value)} className={FIELD_CLS}>
              {EXPIRY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        )}
        {access === "paid" && (
          <>
            <div>
              <label className="block text-[10px] font-bold text-[#f5c842]/60 uppercase tracking-wider mb-1">Price (USD)</label>
              <input type="number" min="0" step="0.01" value={price}
                onChange={e => setPrice(e.target.value)} placeholder="9.99" className={FIELD_CLS} />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[#f5c842]/60 uppercase tracking-wider mb-1">Stripe Price ID</label>
              <input type="text" value={stripePriceId}
                onChange={e => setStripePriceId(e.target.value)} placeholder="price_..." className={FIELD_CLS} />
            </div>
          </>
        )}
      </div>
      <button onClick={save} disabled={saving}
        className="mt-3 flex items-center gap-1.5 btn-cta !px-4 !py-1.5 !text-xs disabled:opacity-50">
        {saving ? <><RefreshCw size={11} className="animate-spin" /> Saving…</> : <><Save size={11} /> Save Changes</>}
      </button>
    </div>
  );
}

function MediaLibrary({ sessionToken }: { sessionToken: string }) {
  const [tab,          setTab]          = useState<"upload" | "browse">("browse");
  const [mediaList,    setMediaList]    = useState<MediaEntry[]>([]);
  const [loading,      setLoading]      = useState(false);
  const [filterType,   setFilterType]   = useState("all");
  const [filterAccess, setFilterAccess] = useState("all");
  const [links,        setLinks]        = useState<Record<string, string>>({});
  const [copiedId,     setCopiedId]     = useState<string | null>(null);
  const [editingId,    setEditingId]    = useState<string | null>(null);

  const [file,      setFile]      = useState<File | null>(null);
  const [objUrl,    setObjUrl]    = useState<string | null>(null);
  const [dragOver,  setDragOver]  = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [form, setForm] = useState({
    title: "", description: "",
    category: "images" as MediaEntry["type"],
    access:   "public"  as MediaEntry["access"],
    expiryHours: "24", price: "", stripePriceId: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const authBearer   = `Bearer ${sessionToken}`;

  const loadMedia = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media", {
        cache: "no-store",
        headers: { "Authorization": `Bearer ${sessionToken}` },
      });
      if (res.ok) {
        const data = await res.json() as { media: MediaEntry[] };
        setMediaList(data.media.slice().reverse());
      } else {
        console.error("Media API error", res.status, await res.text());
      }
    } catch (e) {
      console.error("Media fetch failed", e);
    }
    setLoading(false);
  }, [sessionToken]);

  useEffect(() => { loadMedia(); }, [loadMedia]);

  useEffect(() => {
    const prev = objUrl;
    const next = file ? URL.createObjectURL(file) : null;
    setObjUrl(next);
    return () => { if (prev) URL.revokeObjectURL(prev); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const detectCategory = (f: File): MediaEntry["type"] =>
    f.type.startsWith("image/") ? "images" : f.type.startsWith("audio/") ? "audio" : "video";

  const pickFile = (f: File) => {
    setFile(f);
    setForm(p => ({ ...p, category: detectCategory(f), title: p.title || f.name.replace(/\.[^.]+$/, "") }));
  };

  const upload = async () => {
    if (!file) return;
    setUploading(true);
    setUploadMsg(null);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("title", form.title || file.name);
    fd.append("description", form.description);
    fd.append("category", form.category);
    fd.append("access", form.access);
    if (form.access === "free-link") fd.append("expiryHours", form.expiryHours);
    if (form.access === "paid") {
      if (form.price) fd.append("price", form.price);
      if (form.stripePriceId) fd.append("stripePriceId", form.stripePriceId);
    }
    const res  = await fetch("/api/admin/upload", { method: "POST", headers: { "Authorization": authBearer }, body: fd });
    const data = await res.json() as { success?: boolean; error?: string };
    if (data.success) {
      setUploadMsg({ ok: true, text: "Uploaded successfully!" });
      setFile(null);
      setForm({ title: "", description: "", category: "images", access: "public", expiryHours: "24", price: "", stripePriceId: "" });
      await loadMedia();
      setTab("browse");
    } else {
      setUploadMsg({ ok: false, text: data.error ?? "Upload failed" });
    }
    setUploading(false);
  };

  const deleteEntry = async (entry: MediaEntry) => {
    if (!confirm(`Delete "${entry.title}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/admin/media?id=${entry.id}`, { method: "DELETE", headers: { "Authorization": authBearer } });
    if (res.ok) setMediaList(l => l.filter(m => m.id !== entry.id));
  };

  const generateLink = async (id: string) => {
    const res = await fetch("/api/media/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mediaId: id }),
    });
    if (res.ok) {
      const data = await res.json() as { url: string };
      setLinks(l => ({ ...l, [id]: data.url }));
    }
  };

  const copyText = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = mediaList.filter(m =>
    (filterType   === "all" || m.type   === filterType) &&
    (filterAccess === "all" || m.access === filterAccess)
  );

  const tabBtn = (t: "browse" | "upload") => (
    <button onClick={() => { setTab(t); if (t === "browse") loadMedia(); }}
      className={`px-5 py-2 rounded-t-lg text-sm font-bold transition-all -mb-px ${
        tab === t
          ? "bg-[#071209] border border-b-[#071209] border-[#2d6a35]/40 text-[#f5c842]"
          : "text-[#fdf6e3]/50 hover:text-[#fdf6e3]/80"
      }`}>
      {t === "browse" ? `Browse (${mediaList.length})` : "Upload"}
    </button>
  );

  const chipCls = (val: string, cur: string) =>
    `px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
      val === cur ? "bg-[#f5c842] text-[#3d2008]" : "bg-white/10 text-[#fdf6e3]/60 hover:bg-white/20"
    }`;

  return (
    <div className="flex flex-col flex-1 min-h-0">

      {/* Tab bar */}
      <div className="flex gap-1 px-6 pt-4 border-b border-[#2d6a35]/40 flex-shrink-0">
        {tabBtn("browse")}
        {tabBtn("upload")}
      </div>

      {/* ── Upload tab ──────────────────────────────────────────────────── */}
      {tab === "upload" && (
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-xl mx-auto space-y-4">
            {uploadMsg && (
              <div className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold ${
                uploadMsg.ok ? "bg-green-800/60 text-green-200" : "bg-red-800/60 text-red-200"
              }`}>
                {uploadMsg.ok ? <CheckCircle size={15} /> : <AlertCircle size={15} />}
                {uploadMsg.text}
              </div>
            )}

            {/* Drop zone */}
            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) pickFile(f); }}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all select-none ${
                dragOver ? "border-[#f5c842] bg-[#f5c842]/10"
                : file   ? "border-[#22c55e]/60 bg-[#22c55e]/5"
                :          "border-[#2d6a35]/50 hover:border-[#f5c842]/40 hover:bg-white/5"
              }`}>
              <input ref={fileInputRef} type="file" accept="image/*,audio/*,video/*" className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) pickFile(f); e.target.value = ""; }} />
              {file ? (
                <>
                  <p className="text-[#22c55e] font-bold text-base mb-0.5 truncate">{file.name}</p>
                  <p className="text-[#fdf6e3]/40 text-sm">{formatBytes(file.size)}</p>
                  <p className="text-[#f5c842]/50 text-xs mt-2">Click or drop to replace</p>
                </>
              ) : (
                <>
                  <Upload size={28} className="mx-auto text-[#fdf6e3]/30 mb-3" />
                  <p className="text-[#fdf6e3]/70 font-semibold mb-1">Drop a file or click to browse</p>
                  <p className="text-[#fdf6e3]/30 text-sm">Images · Audio · Video</p>
                </>
              )}
            </div>

            {/* Preview */}
            {file && objUrl && (
              <div className="rounded-xl overflow-hidden border border-[#2d6a35]/30 bg-black/30">
                {file.type.startsWith("image/") && (
                  <img src={objUrl} alt="Preview" className="w-full max-h-52 object-contain" />
                )}
                {file.type.startsWith("audio/") && (
                  <audio controls src={objUrl} className="w-full p-2" />
                )}
                {file.type.startsWith("video/") && (
                  <video controls src={objUrl} className="w-full max-h-52" />
                )}
              </div>
            )}

            {/* Form fields */}
            {file && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-[#f5c842]/70 uppercase tracking-wider mb-1">Title</label>
                  <input type="text" value={form.title} placeholder={file.name}
                    onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className={FIELD_CLS} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-[#f5c842]/70 uppercase tracking-wider mb-1">Category</label>
                    <select value={form.category}
                      onChange={e => setForm(p => ({ ...p, category: e.target.value as MediaEntry["type"] }))}
                      className={FIELD_CLS}>
                      <option value="images">Images</option>
                      <option value="audio">Audio</option>
                      <option value="video">Video</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#f5c842]/70 uppercase tracking-wider mb-1">Access</label>
                    <select value={form.access}
                      onChange={e => setForm(p => ({ ...p, access: e.target.value as "public" | "free-link" | "paid" }))}
                      className={FIELD_CLS}>
                      <option value="public">Public — no restrictions</option>
                      <option value="free-link">Free — timed link</option>
                      <option value="paid">Paid — Stripe checkout</option>
                    </select>
                  </div>
                </div>

                {form.access === "free-link" && (
                  <div>
                    <label className="block text-[10px] font-bold text-[#f5c842]/70 uppercase tracking-wider mb-1">Link expires after</label>
                    <select value={form.expiryHours}
                      onChange={e => setForm(p => ({ ...p, expiryHours: e.target.value }))} className={FIELD_CLS}>
                      {EXPIRY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                )}

                {form.access === "paid" && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-[#f5c842]/70 uppercase tracking-wider mb-1">Price (USD)</label>
                      <input type="number" min="0" step="0.01" value={form.price}
                        onChange={e => setForm(p => ({ ...p, price: e.target.value }))}
                        placeholder="9.99" className={FIELD_CLS} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#f5c842]/70 uppercase tracking-wider mb-1">Stripe Price ID</label>
                      <input type="text" value={form.stripePriceId}
                        onChange={e => setForm(p => ({ ...p, stripePriceId: e.target.value }))}
                        placeholder="price_..." className={FIELD_CLS} />
                    </div>
                    <p className="col-span-2 text-[#fdf6e3]/30 text-xs -mt-1">
                      Create the product in Stripe Dashboard → copy the Price ID here.
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-bold text-[#f5c842]/70 uppercase tracking-wider mb-1">Description (optional)</label>
                  <textarea rows={2} value={form.description}
                    onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                    className={`${FIELD_CLS} resize-none`} />
                </div>

                <button onClick={upload} disabled={uploading}
                  className="btn-cta w-full flex items-center justify-center gap-2 !py-3 disabled:opacity-50 disabled:cursor-not-allowed">
                  {uploading
                    ? <><RefreshCw size={14} className="animate-spin" /> Uploading…</>
                    : <><Upload size={14} /> Upload File</>}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Browse tab ──────────────────────────────────────────────────── */}
      {tab === "browse" && (
        <div className="flex-1 overflow-y-auto p-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-5 items-center">
            <div className="flex gap-1">
              {["all", "images", "audio", "video"].map(t => (
                <button key={t} onClick={() => setFilterType(t)} className={chipCls(t, filterType)}>
                  {t === "all" ? "All" : t === "images" ? "🖼 Images" : t === "audio" ? "🎵 Audio" : "🎬 Video"}
                </button>
              ))}
            </div>
            <div className="flex gap-1">
              {["all", "public", "free-link", "paid"].map(a => (
                <button key={a} onClick={() => setFilterAccess(a)} className={chipCls(a, filterAccess)}>
                  {a === "all" ? "Any Access" : a === "public" ? "Public" : a === "free-link" ? "Free Link" : "Paid"}
                </button>
              ))}
            </div>
            <button onClick={loadMedia} disabled={loading} title="Refresh"
              className="ml-auto p-1.5 text-[#fdf6e3]/40 hover:text-[#fdf6e3]/70 transition-colors">
              <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
            </button>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-[#fdf6e3]/20">
              <p className="text-5xl mb-4">📂</p>
              <p className="text-sm">
                {mediaList.length === 0 ? "No files uploaded yet — use the Upload tab." : "No files match the current filters."}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map(entry => (
                <div key={entry.id}
                  className="rounded-xl border border-[#2d6a35]/30 bg-black/20 overflow-hidden">
                  <div className="flex items-center gap-3 px-4 py-3">
                    <TypeIcon type={entry.type} />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-semibold truncate">{entry.title}</p>
                      <p className="text-[#fdf6e3]/35 text-xs truncate">
                        {entry.originalName} · {formatBytes(entry.size)} · {new Date(entry.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0 ${accessBadgeCls(entry.access)}`}>
                      {accessLabel(entry)}
                    </span>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {entry.access === "public" && entry.publicPath && (
                        <button onClick={() => copyText(entry.publicPath!, `url-${entry.id}`)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold
                            border border-[#2d6a35]/40 text-[#fdf6e3]/60 hover:text-[#fdf6e3] hover:border-[#f5c842]/40 transition-all">
                          <Copy size={11} />
                          {copiedId === `url-${entry.id}` ? "Copied!" : "URL"}
                        </button>
                      )}
                      {entry.access === "free-link" && !links[entry.id] && (
                        <button onClick={() => generateLink(entry.id)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold
                            border border-blue-700/40 text-blue-300 hover:text-blue-200 transition-all">
                          <Link size={11} /> Generate Link
                        </button>
                      )}
                      {entry.access === "free-link" && links[entry.id] && (
                        <button onClick={() => copyText(links[entry.id], `link-${entry.id}`)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold
                            border border-blue-700/40 text-blue-300 hover:text-blue-200 transition-all">
                          <Copy size={11} />
                          {copiedId === `link-${entry.id}` ? "Copied!" : "Copy Link"}
                        </button>
                      )}
                      {entry.access === "paid" && (
                        <span className="px-2.5 py-1 rounded-lg text-xs border border-amber-700/40 text-amber-300/70">
                          Stripe
                        </span>
                      )}
                      <button
                        onClick={() => setEditingId(editingId === entry.id ? null : entry.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                          editingId === entry.id
                            ? "border-[#f5c842]/40 text-[#f5c842] bg-[#f5c842]/10"
                            : "border-[#2d6a35]/40 text-[#fdf6e3]/40 hover:text-[#fdf6e3] hover:border-[#f5c842]/30"
                        }`}>
                        Edit
                      </button>
                      <button onClick={() => deleteEntry(entry)}
                        className="p-1.5 rounded-lg text-red-500/40 hover:text-red-400 hover:bg-red-500/10 transition-all">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  {editingId === entry.id && (
                    <InlineEditPanel entry={entry} sessionToken={sessionToken}
                      onSaved={updated => {
                        setMediaList(l => l.map(m => m.id === updated.id ? updated : m));
                        setEditingId(null);
                      }} />
                  )}

                  {links[entry.id] && (
                    <div className="px-4 pb-3">
                      <p className="text-[10px] text-blue-400/60 uppercase tracking-wider mb-1">Shareable link (expires)</p>
                      <code className="block text-xs text-blue-300 break-all bg-black/30 px-3 py-2 rounded-lg">
                        {links[entry.id]}
                      </code>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Users manager ─────────────────────────────────────────────────────────
interface AdminUser {
  id: string; name: string; username: string; role: string;
  mustChangePassword: boolean; mustSetupMfa: boolean; mfaEnabled: boolean;
  createdAt: string; lastLogin: string | null;
}

function UsersManager({ sessionToken, currentUserId }: { sessionToken: string; currentUserId: string }) {
  const [users,    setUsers]    = useState<AdminUser[]>([]);
  const [loading,  setLoading]  = useState(false);
  const [showAdd,  setShowAdd]  = useState(false);
  const [addForm,  setAddForm]  = useState({ name: "", username: "" });
  const [addErr,   setAddErr]   = useState("");
  const [tempPw,   setTempPw]   = useState<{ name: string; pw: string } | null>(null);
  const [copiedPw, setCopiedPw] = useState(false);

  const authHdr = `Bearer ${sessionToken}`;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users", { cache: "no-store", headers: { Authorization: authHdr } });
      if (res.ok) setUsers((await res.json() as { users: AdminUser[] }).users);
    } catch { /* ignore */ }
    setLoading(false);
  }, [sessionToken]);

  useEffect(() => { load(); }, [load]);

  const addUser = async () => {
    setAddErr("");
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { Authorization: authHdr, "Content-Type": "application/json" },
      body: JSON.stringify({ name: addForm.name.trim(), username: addForm.username.trim() }),
    });
    const data = await res.json() as { success?: boolean; error?: string; tempPassword?: string; user?: AdminUser };
    if (data.success) {
      setTempPw({ name: addForm.name, pw: data.tempPassword! });
      setAddForm({ name: "", username: "" });
      setShowAdd(false);
      load();
    } else { setAddErr(data.error ?? "Failed to create user"); }
  };

  const deleteUser = async (u: AdminUser) => {
    if (!confirm(`Remove ${u.name}? This cannot be undone.`)) return;
    await fetch(`/api/admin/users?id=${u.id}`, { method: "DELETE", headers: { Authorization: authHdr } });
    setUsers(list => list.filter(x => x.id !== u.id));
  };

  const resetPw = async (u: AdminUser) => {
    if (!confirm(`Reset ${u.name}'s password? They will get a new one-time password.`)) return;
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { Authorization: authHdr, "Content-Type": "application/json" },
      body: JSON.stringify({ id: u.id }),
    });
    const data = await res.json() as { success?: boolean; tempPassword?: string };
    if (data.success) setTempPw({ name: u.name, pw: data.tempPassword! });
  };

  const copyPw = async () => {
    if (!tempPw) return;
    await navigator.clipboard.writeText(tempPw.pw);
    setCopiedPw(true);
    setTimeout(() => setCopiedPw(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-2xl mx-auto">

        {/* Temp password reveal */}
        {tempPw && (
          <div className="mb-6 p-5 rounded-xl bg-[#1a5c22]/40 border border-[#22c55e]/30">
            <p className="text-green-300 font-bold mb-1">✓ One-time password for {tempPw.name}</p>
            <p className="text-[#fdf6e3]/50 text-xs mb-4">Share this privately and securely. They will be required to change it and set up MFA on first sign-in.</p>
            <div className="flex items-center gap-3">
              <code className="flex-1 bg-black/40 px-4 py-3 rounded-lg text-[#f5c842] font-mono text-lg tracking-widest">
                {tempPw.pw}
              </code>
              <button onClick={copyPw}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#f5c842]/30 text-[#f5c842]/80 hover:text-[#f5c842] text-sm transition-all">
                <Copy size={13} /> {copiedPw ? "Copied!" : "Copy"}
              </button>
            </div>
            <button onClick={() => setTempPw(null)} className="mt-3 text-[#fdf6e3]/30 hover:text-[#fdf6e3]/50 text-xs transition-colors">
              Dismiss
            </button>
          </div>
        )}

        {/* Add user */}
        {showAdd ? (
          <div className="mb-6 p-5 rounded-xl border border-[#2d6a35]/40 bg-black/20">
            <h3 className="text-[#f5c842] font-bold mb-4">Add New User</h3>
            {addErr && <p className="text-red-400 text-sm mb-3">{addErr}</p>}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-[10px] font-bold text-[#f5c842]/70 uppercase tracking-wider mb-1">Full Name</label>
                <input value={addForm.name} onChange={e => setAddForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="Jane Smith" className={FIELD_CLS} />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[#f5c842]/70 uppercase tracking-wider mb-1">Username</label>
                <input value={addForm.username}
                  onChange={e => setAddForm(p => ({ ...p, username: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, "") }))}
                  placeholder="jane" className={FIELD_CLS} />
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={addUser} className="flex items-center gap-1.5 btn-cta !px-5 !py-2 !text-sm">
                <Plus size={13} /> Create User &amp; Generate Password
              </button>
              <button onClick={() => { setShowAdd(false); setAddErr(""); }}
                className="px-5 py-2 rounded-lg text-[#fdf6e3]/50 hover:text-[#fdf6e3] text-sm transition-colors">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button onClick={() => setShowAdd(true)}
            className="flex items-center gap-1.5 mb-6 text-[#f5c842]/60 hover:text-[#f5c842] text-sm transition-colors">
            <Plus size={14} /> Add New User
          </button>
        )}

        {/* User list */}
        {loading ? (
          <div className="text-[#fdf6e3]/30 text-sm">Loading…</div>
        ) : (
          <div className="space-y-3">
            {users.map(u => (
              <div key={u.id} className="border border-[#2d6a35]/30 rounded-xl p-4 bg-black/20">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-white font-semibold">
                      {u.name}
                      {u.id === currentUserId && (
                        <span className="ml-2 text-[10px] bg-[#f5c842]/20 text-[#f5c842] px-1.5 py-0.5 rounded-full font-bold">You</span>
                      )}
                    </p>
                    <p className="text-[#fdf6e3]/40 text-xs mt-0.5">@{u.username} · {u.role}</p>
                    <p className="text-[#fdf6e3]/25 text-xs mt-1">
                      Last login: {u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : "Never"}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {u.mfaEnabled
                        ? <span className="text-[10px] bg-green-800/60 text-green-300 border border-green-700/40 px-2 py-0.5 rounded-full font-bold">MFA Active</span>
                        : u.mustSetupMfa
                          ? <span className="text-[10px] bg-amber-800/60 text-amber-300 border border-amber-700/40 px-2 py-0.5 rounded-full font-bold">MFA Pending Setup</span>
                          : <span className="text-[10px] bg-red-900/60 text-red-300 border border-red-800/40 px-2 py-0.5 rounded-full font-bold">No MFA</span>
                      }
                      {u.mustChangePassword && (
                        <span className="text-[10px] bg-blue-800/60 text-blue-300 border border-blue-700/40 px-2 py-0.5 rounded-full font-bold">Must Change Password</span>
                      )}
                    </div>
                  </div>
                  {u.id !== currentUserId && (
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => resetPw(u)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-[#2d6a35]/40
                          text-[#fdf6e3]/60 hover:text-[#fdf6e3] hover:border-[#f5c842]/30 transition-all">
                        Reset Password
                      </button>
                      <button onClick={() => deleteUser(u)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-red-800/40
                          text-red-400/60 hover:text-red-300 hover:border-red-600/40 transition-all">
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main admin page ────────────────────────────────────────────────────────
export default function AdminPage() {
  // Auth
  const [username,      setUsername]      = useState("");
  const [password,      setPassword]      = useState("");
  const [totpCode,      setTotpCode]      = useState("");
  const [sessionToken,  setSessionToken]  = useState("");
  const [currentUser,   setCurrentUser]   = useState<{ id: string; name: string; role: string } | null>(null);
  const [authed,        setAuthed]        = useState(false);
  const [authError,     setAuthError]     = useState("");
  const [mfaConfigured, setMfaConfigured] = useState(false);
  // First-login flows
  const [mustChangePw,     setMustChangePw]     = useState(false);
  const [mustSetupMfa,     setMustSetupMfa]     = useState(false);
  const [totpSetupUri,     setTotpSetupUri]     = useState("");
  const [totpSetupSecret,  setTotpSetupSecret]  = useState("");
  const [totpConfirmCode,  setTotpConfirmCode]  = useState("");
  const [newPw,            setNewPw]            = useState("");
  const [confirmPw,        setConfirmPw]        = useState("");
  const [changePwError,    setChangePwError]    = useState("");
  const [mfaError,         setMfaError]         = useState("");
  const [mfaConfirming,    setMfaConfirming]    = useState(false);
  // Dashboard
  const [activeFile,    setActiveFile]    = useState<FileKey>("page-content");
  const [pageContent,   setPageContent]   = useState<PageContent | null>(null);
  const [shopData,      setShopData]      = useState<ShopData | null>(null);
  const [layoutData,    setLayoutData]    = useState<LayoutData | null>(null);
  const [rawContent,    setRawContent]    = useState("");
  const [section,       setSection]       = useState<PageSection>("about");
  const [status,        setStatus]        = useState<"idle"|"loading"|"saving"|"success"|"error">("idle");
  const [statusMsg,     setStatusMsg]     = useState("");
  const [jsonError,     setJsonError]     = useState("");
  const [restarting,    setRestarting]    = useState(false);

  const passwordRef = useRef<HTMLInputElement>(null);
  const totpRef     = useRef<HTMLInputElement>(null);

  const authHeaders = useCallback(() => ({
    "Authorization": `Bearer ${sessionToken}`,
    "Content-Type": "application/json",
  }), [sessionToken]);

  const enterDashboard = useCallback(async (tok: string) => {
    const readRes = await fetch("/api/admin/read?file=page-content", {
      headers: { "Authorization": `Bearer ${tok}`, "Content-Type": "application/json" },
    });
    if (readRes.ok) {
      const fd = await readRes.json() as { content: string };
      setPageContent(JSON.parse(fd.content) as PageContent);
    }
    setAuthed(true);
  }, []);

  const login = useCallback(async () => {
    setAuthError("");
    const pw   = passwordRef.current?.value ?? password;
    const totp = totpRef.current?.value ?? totpCode;
    const res = await fetch("/api/admin/verify-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password: pw, totpCode: totp }),
    });
    if (res.ok) {
      const data = await res.json() as {
        sessionToken: string;
        user: { id: string; name: string; username: string; role: string };
        mustChangePassword: boolean;
        mustSetupMfa: boolean;
        totpSetupUri: string | null;
        totpSecret: string | null;
      };
      setSessionToken(data.sessionToken);
      setCurrentUser(data.user);
      setMfaConfigured(!data.mustSetupMfa);
      if (data.totpSetupUri)    setTotpSetupUri(data.totpSetupUri);
      if (data.totpSecret)      setTotpSetupSecret(data.totpSecret);
      if (data.mustChangePassword) {
        setMustChangePw(true);
        setMustSetupMfa(data.mustSetupMfa);
      } else if (data.mustSetupMfa) {
        setMustSetupMfa(true);
      } else {
        await enterDashboard(data.sessionToken);
      }
    } else {
      const err = await res.json().catch(() => ({})) as { error?: string };
      setAuthError(err.error ?? "Invalid credentials. Please try again.");
    }
  }, [username, password, totpCode, enterDashboard]);

  const changePassword = useCallback(async () => {
    setChangePwError("");
    if (newPw.length < 8) { setChangePwError("Password must be at least 8 characters."); return; }
    if (newPw !== confirmPw) { setChangePwError("Passwords do not match."); return; }
    const res = await fetch("/api/admin/change-password", {
      method: "POST",
      headers: { "Authorization": `Bearer ${sessionToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({ newPassword: newPw }),
    });
    const data = await res.json() as { success?: boolean; error?: string };
    if (data.success) {
      setMustChangePw(false);
      if (mustSetupMfa) { /* stay on MFA setup screen */ }
      else await enterDashboard(sessionToken);
    } else { setChangePwError(data.error ?? "Failed to change password."); }
  }, [sessionToken, newPw, confirmPw, mustSetupMfa, enterDashboard]);

  const confirmMfa = useCallback(async () => {
    setMfaError("");
    setMfaConfirming(true);
    const res = await fetch("/api/admin/confirm-mfa", {
      method: "POST",
      headers: { "Authorization": `Bearer ${sessionToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({ totpCode: totpConfirmCode }),
    });
    const data = await res.json() as { success?: boolean; error?: string };
    if (data.success) {
      setMustSetupMfa(false);
      setMfaConfigured(true);
      await enterDashboard(sessionToken);
    } else { setMfaError(data.error ?? "Invalid code — try again."); }
    setMfaConfirming(false);
  }, [sessionToken, totpConfirmCode, enterDashboard]);

  const loadFile = useCallback(async (file: FileKey) => {
    if (file === "media") return;
    setStatus("loading");
    setJsonError("");
    const res = await fetch(`/api/admin/read?file=${file}`, { headers: authHeaders() });
    if (res.ok) {
      const data = await res.json() as { content: string };
      const parsed = JSON.parse(data.content);
      if (file === "page-content")   setPageContent(parsed as PageContent);
      else if (file === "shop")          setShopData(parsed as ShopData);
      else if (file === "layout-config") setLayoutData(parsed as LayoutData);
      else setRawContent(JSON.stringify(parsed, null, 2));
      setStatus("idle");
    } else {
      setStatus("error");
      setStatusMsg("Failed to load file.");
    }
  }, [authHeaders]);

  const switchFile = (file: FileKey) => {
    setActiveFile(file);
    setJsonError("");
    if (file !== "media" && file !== "users") loadFile(file);
  };

  const validateRaw = (val: string) => {
    try { JSON.parse(val); setJsonError(""); return true; }
    catch (e) { setJsonError((e as Error).message); return false; }
  };

  const save = async () => {
    if (activeFile === "users") return;
    let content: string;
    if (activeFile === "page-content")   content = JSON.stringify(pageContent, null, 2);
    else if (activeFile === "shop")          content = JSON.stringify(shopData, null, 2);
    else if (activeFile === "layout-config") content = JSON.stringify(layoutData, null, 2);
    else {
      if (!validateRaw(rawContent)) return;
      content = rawContent;
    }
    setStatus("saving");
    const res  = await fetch("/api/admin/write", {
      method: "POST", headers: authHeaders(),
      body: JSON.stringify({ file: activeFile, content }),
    });
    const data = await res.json() as { success?: boolean; error?: string };
    if (data.success) {
      setStatus("success");
      setStatusMsg("Saved! Use Restart Server to apply changes immediately.");
      setTimeout(() => setStatus("idle"), 5000);
    } else {
      setStatus("error");
      setStatusMsg(data.error ?? "Save failed.");
    }
  };

  const restartServer = async () => {
    if (!confirm("Restart the Next.js server? The site will be briefly unavailable.")) return;
    setRestarting(true);
    try { await fetch("/api/admin/restart", { method: "POST", headers: authHeaders() }); } catch { /* expected */ }
    setTimeout(async () => {
      for (let i = 0; i < 15; i++) {
        try { if ((await fetch("/api/admin/verify-login")).ok) { setRestarting(false); return; } } catch { /* still restarting */ }
        await new Promise(r => setTimeout(r, 1000));
      }
      setRestarting(false);
    }, 2000);
  };

  const panelBg = { background: "linear-gradient(135deg, #0e2d14, #1a5225)" };

  // ── Change password screen ─────────────────────────────────────────────
  if (!authed && sessionToken && mustChangePw) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={panelBg}>
        <div className="panel-parchment p-10 w-full max-w-md">
          <h1 className="text-2xl font-black text-[#3d2008] mb-1 text-center" style={{ fontFamily: "Georgia, serif" }}>
            Set Your Password
          </h1>
          <p className="text-[#8b5e3c] text-sm mb-7 text-center">
            Welcome, {currentUser?.name}! You need to create a new password before continuing.
          </p>
          {changePwError && (
            <div className="flex items-center gap-2 text-red-700 bg-red-100 rounded-lg px-4 py-3 mb-4 text-sm">
              <AlertCircle size={15} /> {changePwError}
            </div>
          )}
          <form onSubmit={e => { e.preventDefault(); changePassword(); }} noValidate>
            <label className="block text-[10px] font-bold text-[#8b5e3c] uppercase tracking-wider mb-1">New Password</label>
            <input type="password" value={newPw} onChange={e => setNewPw(e.target.value)}
              autoComplete="new-password" placeholder="At least 8 characters"
              className="w-full px-4 py-3 rounded-xl border-2 border-[#d4a853] bg-[#fdf6e3] text-[#3d2008]
                font-semibold mb-4 outline-none focus:border-[#f07c2a]" />
            <label className="block text-[10px] font-bold text-[#8b5e3c] uppercase tracking-wider mb-1">Confirm Password</label>
            <input type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)}
              autoComplete="new-password" placeholder="Type it again"
              className="w-full px-4 py-3 rounded-xl border-2 border-[#d4a853] bg-[#fdf6e3] text-[#3d2008]
                font-semibold mb-5 outline-none focus:border-[#f07c2a]" />
            <button type="submit" className="btn-cta w-full text-center">
              {mustSetupMfa ? "Save Password & Continue to MFA Setup →" : "Save Password & Enter Dashboard →"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── MFA setup screen ───────────────────────────────────────────────────
  if (!authed && sessionToken && mustSetupMfa && !mustChangePw) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={panelBg}>
        <div className="panel-parchment p-10 w-full max-w-lg">
          <h1 className="text-2xl font-black text-[#3d2008] mb-1 text-center" style={{ fontFamily: "Georgia, serif" }}>
            Set Up Two-Factor Authentication
          </h1>
          <p className="text-[#8b5e3c] text-sm mb-6 text-center">
            Protect your account with an authenticator app (Google Authenticator, Authy, etc.)
          </p>

          <div className="bg-[#fdf6e3]/60 rounded-xl p-4 mb-5 border border-[#d4a853]/40">
            <p className="text-[10px] font-bold text-[#8b5e3c] uppercase tracking-wider mb-2">Step 1 — Open your authenticator app</p>
            <p className="text-[#3d2008]/70 text-sm">Tap <strong>+</strong> or <strong>Add Account</strong>, then choose <strong>"Enter a setup key"</strong> or <strong>"Manual entry"</strong>.</p>
          </div>

          <div className="bg-[#fdf6e3]/60 rounded-xl p-4 mb-5 border border-[#d4a853]/40">
            <p className="text-[10px] font-bold text-[#8b5e3c] uppercase tracking-wider mb-2">Step 2 — Enter these details in the app</p>
            <p className="text-[#3d2008]/70 text-sm mb-1"><strong>Account name:</strong> Kingdom Kids ({currentUser?.name})</p>
            <p className="text-[#3d2008]/70 text-sm mb-2"><strong>Setup key:</strong></p>
            <code className="block bg-[#3d2008]/10 px-4 py-3 rounded-lg text-[#3d2008] font-mono text-sm tracking-widest break-all">
              {totpSetupSecret}
            </code>
            {totpSetupUri && (
              <a href={totpSetupUri} className="block mt-2 text-xs text-[#f07c2a] hover:underline">
                Or tap here to open in your authenticator app →
              </a>
            )}
          </div>

          <div className="bg-[#fdf6e3]/60 rounded-xl p-4 mb-5 border border-[#d4a853]/40">
            <p className="text-[10px] font-bold text-[#8b5e3c] uppercase tracking-wider mb-2">Step 3 — Enter the 6-digit code the app shows</p>
            {mfaError && (
              <div className="flex items-center gap-2 text-red-700 bg-red-100 rounded-lg px-3 py-2 mb-3 text-sm">
                <AlertCircle size={14} /> {mfaError}
              </div>
            )}
            <form onSubmit={e => { e.preventDefault(); confirmMfa(); }} noValidate>
              <input type="text" inputMode="numeric" pattern="\d{6}" maxLength={6}
                value={totpConfirmCode} onChange={e => setTotpConfirmCode(e.target.value.replace(/\D/g, ""))}
                placeholder="000000" autoComplete="one-time-code"
                className="w-full px-4 py-3 rounded-xl border-2 border-[#d4a853] bg-[#fdf6e3] text-[#3d2008]
                  font-semibold mb-4 outline-none focus:border-[#f07c2a] tracking-[0.5em] text-center text-lg" />
              <button type="submit" disabled={mfaConfirming || totpConfirmCode.length !== 6}
                className="btn-cta w-full text-center disabled:opacity-50 disabled:cursor-not-allowed">
                {mfaConfirming ? "Verifying…" : "Confirm & Enter Dashboard →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ── Login screen ───────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={panelBg}>
        <div className="panel-parchment p-10 w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "linear-gradient(135deg, #f5c842, #d4a853)" }}>
            <Lock size={32} className="text-[#3d2008]" />
          </div>
          <h1 className="text-3xl font-black text-[#3d2008] mb-2" style={{ fontFamily: "Georgia, serif" }}>
            Admin Dashboard
          </h1>
          <p className="text-[#8b5e3c] text-sm mb-8">Enter your credentials to access site controls.</p>
          {authError && (
            <div className="flex items-center gap-2 text-red-700 bg-red-100 rounded-lg px-4 py-3 mb-4 text-sm">
              <AlertCircle size={16} /> {authError}
            </div>
          )}
          <form onSubmit={e => { e.preventDefault(); login(); }} noValidate>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)}
              placeholder="Username" autoComplete="username"
              className="w-full px-4 py-3 rounded-xl border-2 border-[#d4a853] bg-[#fdf6e3] text-[#3d2008]
                font-semibold mb-3 outline-none focus:border-[#f07c2a]" />
            <input ref={passwordRef} type="password" value={password}
              onChange={e => setPassword(e.target.value)}
              onInput={e => setPassword((e.target as HTMLInputElement).value)}
              placeholder="Password" autoComplete="current-password"
              className="w-full px-4 py-3 rounded-xl border-2 border-[#d4a853] bg-[#fdf6e3] text-[#3d2008]
                font-semibold mb-3 outline-none focus:border-[#f07c2a]" />
            <input ref={totpRef} type="text" inputMode="numeric" pattern="\d{6}" maxLength={6}
              value={totpCode}
              onChange={e => setTotpCode(e.target.value.replace(/\D/g, ""))}
              placeholder="6-digit MFA code (once you've set it up)"
              autoComplete="one-time-code"
              className="w-full px-4 py-3 rounded-xl border-2 border-[#d4a853] bg-[#fdf6e3] text-[#3d2008]
                font-semibold mb-4 outline-none focus:border-[#f07c2a] tracking-[0.3em] text-center" />
            <button type="submit" className="btn-cta w-full text-center">Sign In</button>
          </form>
        </div>
      </div>
    );
  }

  // ── Dashboard ──────────────────────────────────────────────────────────
  const fileMeta  = FILES.find(f => f.key === activeFile)!;
  const isMedia   = activeFile === "media";
  const isNoEdit  = activeFile === "media" || activeFile === "users";

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
        <div className="flex items-center gap-3">
          {currentUser && (
            <span className="text-[#fdf6e3]/50 text-xs hidden sm:inline">
              Signed in as <strong className="text-[#fdf6e3]/80">{currentUser.name}</strong>
            </span>
          )}
          {!mfaConfigured && (
            <span className="text-amber-400 text-xs bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full">
              MFA not set up
            </span>
          )}
          <button onClick={restartServer} disabled={restarting}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold
              border border-[#f5c842]/30 text-[#f5c842]/70 hover:text-[#f5c842] hover:border-[#f5c842]/60
              transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            <RotateCw size={13} className={restarting ? "animate-spin" : ""} />
            {restarting ? "Restarting…" : "Restart Server"}
          </button>
          <button
            onClick={() => { setAuthed(false); setUsername(""); setPassword(""); setTotpCode(""); setSessionToken(""); setCurrentUser(null); setMustChangePw(false); setMustSetupMfa(false); }}
            className="flex items-center gap-1.5 text-[#fdf6e3]/70 hover:text-[#fdf6e3] text-sm transition-colors">
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </div>

      <div className="flex flex-1 min-h-0">

        {/* Sidebar */}
        <div className="w-56 flex-shrink-0 p-4 flex flex-col gap-1 border-r border-[#2d6a35]/40 overflow-y-auto"
          style={{ background: "rgba(0,0,0,0.2)" }}>
          <p className="text-[#f5c842]/50 text-[10px] font-bold uppercase tracking-widest px-3 mb-2">Sections</p>
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
          <div className="mt-auto pt-4 border-t border-[#2d6a35]/40 flex flex-col gap-1">
            <a href="/" target="_blank"
              className="block text-center text-[#f5c842]/60 hover:text-[#f5c842] text-xs transition-colors py-2">
              View Live Site →
            </a>
            <a href="https://dashboard.stripe.com" target="_blank" rel="noopener noreferrer"
              className="block text-center text-[#a78bfa]/60 hover:text-[#a78bfa] text-xs transition-colors py-2">
              Stripe Dashboard →
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
            {!isNoEdit && (
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
            )}
          </div>

          {/* Status / error bars */}
          {!isNoEdit && (status === "success" || status === "error") && (
            <div className={`px-6 py-3 flex items-center gap-2 text-sm font-semibold flex-shrink-0 ${
              status === "success" ? "bg-green-800/60 text-green-200" : "bg-red-800/60 text-red-200"
            }`}>
              {status === "success" ? <CheckCircle size={15} /> : <AlertCircle size={15} />}
              {statusMsg}
            </div>
          )}
          {!isNoEdit && jsonError && (
            <div className="px-6 py-2 bg-red-900/40 text-red-300 text-xs font-mono flex items-center gap-2 flex-shrink-0">
              <AlertCircle size={11} /> JSON Error: {jsonError}
            </div>
          )}

          {/* Content area */}
          <div className="flex-1 flex flex-col min-h-0">
            {isMedia ? (
              <MediaLibrary sessionToken={sessionToken} />
            ) : activeFile === "page-content" && pageContent ? (
              <div className="flex-1 overflow-y-auto p-6">
                <div className="flex gap-2 mb-6">
                  {(["about", "rhinoCorner", "bookshelf"] as const).map(s => (
                    <button key={s} onClick={() => setSection(s)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                        section === s ? "bg-[#f5c842] text-[#3d2008]" : "bg-white/10 text-[#fdf6e3]/70 hover:bg-white/20"
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
            ) : activeFile === "shop" && shopData ? (
              <div className="flex-1 overflow-y-auto p-6">
                <ShopEditor data={shopData} onChange={setShopData} />
              </div>
            ) : activeFile === "layout-config" && layoutData ? (
              <div className="flex-1 overflow-y-auto p-6">
                <LayoutConfigEditor data={layoutData} onChange={setLayoutData} />
              </div>
            ) : activeFile === "users" ? (
              <UsersManager sessionToken={sessionToken} currentUserId={currentUser?.id ?? ""} />
            ) : (
              <div className="p-6 text-[#fdf6e3]/40 text-sm">Loading…</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
