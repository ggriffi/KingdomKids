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
    <nav className="nav-wood sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm text-white border-2 border-[#f5c842] shadow-lg"
            style={{ background: "linear-gradient(135deg, #22c55e, #15803d)" }}>
            <span className="text-[10px] leading-tight text-center font-black uppercase tracking-tight">
              KING<br />DOM<br />KIDS
            </span>
          </div>
          <span className="hidden sm:block font-bold text-[#f5c842] text-xl tracking-wide drop-shadow"
            style={{ fontFamily: "Georgia, serif", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
            The Kingdom Kids
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {site.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg font-semibold text-sm uppercase tracking-wider transition-all duration-150 ${
                  active
                    ? "bg-[#f5c842] text-[#3d2008] shadow"
                    : "text-[#fdf6e3] hover:bg-white/10 hover:text-[#f5c842]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/shop"
            className="ml-3 btn-cta !px-5 !py-2 !text-sm"
          >
            Shop
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#fdf6e3] hover:text-[#f5c842] p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-2 border-t border-[#3d2008]">
          {site.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 rounded-lg font-semibold text-sm uppercase tracking-wider transition-all ${
                  active
                    ? "bg-[#f5c842] text-[#3d2008]"
                    : "text-[#fdf6e3] hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
