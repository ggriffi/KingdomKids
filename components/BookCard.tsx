import Link from "next/link";

interface BookCardProps {
  title: string;
  series: string;
  coverColor: string;
  tags: string[];
  available: boolean;
  previewLink?: string;
  compact?: boolean;
}

export default function BookCard({ title, series, coverColor, tags, available, previewLink, compact }: BookCardProps) {
  const inner = (
    <div
      className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer ${compact ? "w-20" : "w-32"}`}
      style={{ background: coverColor }}
    >
      {/* Book spine stripe */}
      <div className="w-3 h-full absolute left-0 top-0" style={{ background: "rgba(0,0,0,0.2)" }} />

      {/* Cover art placeholder */}
      <div className={`relative flex flex-col items-center justify-center p-2 ${compact ? "h-28" : "h-44"}`}>
        {/* Cross symbol */}
        <div className="mb-1">
          <svg viewBox="0 0 40 50" className={compact ? "w-8 h-10" : "w-12 h-14"} fill="none">
            <rect x="16" y="0"  width="8" height="50" rx="2" fill="rgba(255,255,255,0.9)" />
            <rect x="0"  y="14" width="40" height="8"  rx="2" fill="rgba(255,255,255,0.9)" />
          </svg>
        </div>
        {tags.includes("new") && (
          <span className="absolute top-2 right-2 badge-jungle text-[9px]">New</span>
        )}
        {tags.includes("free") && (
          <span className="absolute top-2 right-2 badge-jungle text-[9px]">Free</span>
        )}
        {!available && (
          <span className="absolute top-2 right-2 bg-white/20 text-white text-[9px] px-2 py-0.5 rounded-full font-bold uppercase">Soon</span>
        )}
      </div>

      {/* Title bar */}
      <div className="bg-black/30 px-2 py-1.5">
        <p className={`text-white font-bold leading-tight ${compact ? "text-[9px]" : "text-xs"}`}>{title}</p>
        <p className={`text-white/70 ${compact ? "text-[8px]" : "text-[10px]"}`}>{series}</p>
      </div>
    </div>
  );

  if (previewLink && available) {
    return <Link href={previewLink}>{inner}</Link>;
  }
  return inner;
}
