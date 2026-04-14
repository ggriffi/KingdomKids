"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/data";

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav-wood sticky top-0 z-50 shadow-lg">
      {/* Top accent stripe */}
      <div className="h-1 w-full"
        style={{ background: "linear-gradient(90deg, #e8a030 0%, #f5c842 30%, #e8700a 60%, #f5c842 80%, #e8a030 100%)" }} />

      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
          {/* Circular emblem */}
          <div className="relative w-12 h-12 flex-shrink-0">
            <div className="w-12 h-12 rounded-full border-2 border-[#f5c842] shadow-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #3d7a3d 0%, #1a5225 50%, #0e2d14 100%)" }}>
              {/* Inner ring */}
              <div className="w-9 h-9 rounded-full border border-[#f5c842]/50 flex items-center justify-center">
                <span className="text-[8px] leading-none font-black text-[#f5c842] text-center uppercase tracking-tight">
                  KK
                </span>
              </div>
            </div>
            {/* Small crown on top */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[10px] leading-none">👑</div>
          </div>

          {/* Site name */}
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-black text-[#f5c842] text-lg uppercase tracking-wide"
              style={{ fontFamily: "Georgia, serif", textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}>
              The Kingdom Kids
            </span>
            <span className="text-[#fdf6e3]/60 text-[9px] uppercase tracking-[0.25em]">
              Bible Curriculum
            </span>
          </div>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-0.5">
          {site.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-150 ${
                  active
                    ? "bg-[#f5c842] text-[#3d2008] shadow"
                    : "text-[#fdf6e3]/90 hover:bg-white/10 hover:text-[#f5c842]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/shop"
            className="ml-2 btn-cta !px-5 !py-2 !text-xs"
          >
            🛒 Shop
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#fdf6e3] hover:text-[#f5c842] p-2 rounded-lg hover:bg-white/10 transition-all"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-2 border-t border-[#3d2008]"
          style={{ background: "rgba(30,10,5,0.95)" }}>
          {site.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-all ${
                  active
                    ? "bg-[#f5c842] text-[#3d2008]"
                    : "text-[#fdf6e3] hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/shop"
            onClick={() => setOpen(false)}
            className="btn-cta text-center text-sm mt-1"
          >
            🛒 Shop
          </Link>
        </div>
      )}

      {/* Bottom accent line */}
      <div className="h-px w-full opacity-50"
        style={{ background: "linear-gradient(90deg, transparent, #f5c842, transparent)" }} />
    </nav>
  );
}
