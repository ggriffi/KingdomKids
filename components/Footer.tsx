import Link from "next/link";
import { site } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative mt-16"
      style={{
        background: "linear-gradient(180deg, #1a5c22 0%, #0f3c16 50%, #0a2c10 100%)",
        borderTop: "3px solid #2a8030",
      }}>

      {/* Leaf top border accent */}
      <div className="h-1 w-full"
        style={{ background: "linear-gradient(90deg, transparent, #f5c842 30%, #f5c842 70%, transparent)" }}/>

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h3 className="font-black text-xl mb-3"
            style={{
              fontFamily: "Georgia, serif",
              background: "linear-gradient(135deg, #f5c842, #f0c040)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
            The Kingdom Kids
          </h3>
          <p className="text-white/70 text-sm leading-relaxed">{site.description}</p>
          {/* Social links */}
          <div className="flex gap-3 mt-5">
            {site.social.facebook && (
              <SocialChip href={site.social.facebook} label="Facebook"/>
            )}
            {site.social.instagram && (
              <SocialChip href={site.social.instagram} label="Instagram"/>
            )}
            {site.social.youtube && (
              <SocialChip href={site.social.youtube} label="YouTube"/>
            )}
          </div>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-[#f5c842] font-bold mb-4 uppercase tracking-widest text-xs">
            Explore
          </h4>
          <ul className="space-y-2.5">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}
                  className="text-white/65 hover:text-[#f5c842] text-sm transition-colors
                             flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f5c842]/40
                    group-hover:bg-[#f5c842] transition-colors flex-shrink-0"/>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/admin"
                className="text-white/30 hover:text-white/60 text-xs transition-colors
                           flex items-center gap-2 mt-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/20 flex-shrink-0"/>
                Admin Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[#f5c842] font-bold mb-4 uppercase tracking-widest text-xs">
            Contact
          </h4>
          {site.contact.email && (
            <a href={`mailto:${site.contact.email}`}
              className="text-white/65 hover:text-[#f5c842] text-sm transition-colors block mb-3">
              {site.contact.email}
            </a>
          )}
          <p className="text-white/45 text-xs leading-relaxed">
            Bible-based curriculum for children ages 4–12. Equipping families and classrooms
            for adventure in faith.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-6 py-4
        flex flex-col sm:flex-row items-center justify-between gap-3 flex-wrap">
        <span className="text-white/35 text-xs">{site.footer.copyright}</span>

        {/* Portal login */}
        <Link href="/admin"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                     font-bold text-xs uppercase tracking-widest
                     text-[#3d2008] hover:brightness-110 transition-all
                     shadow-md hover:shadow-lg"
          style={{ background: "linear-gradient(135deg, #f5c842, #e8a030)" }}>
          🔐 Parent &amp; Teacher Portal
        </Link>

        <div className="flex gap-5">
          {site.footer.links.map((link) => (
            <Link key={link.href} href={link.href}
              className="text-white/40 hover:text-white/70 text-xs transition-colors">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

function SocialChip({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="px-3 py-1.5 rounded-full text-xs font-bold transition-all
                 text-[#f5c842]/80 hover:text-[#3d2008] hover:shadow-md"
      style={{
        border: "1px solid rgba(245,200,66,.35)",
        background: "rgba(245,200,66,.08)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background =
          "linear-gradient(135deg,#f5c842,#e8a030)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background =
          "rgba(245,200,66,.08)";
      }}>
      {label}
    </a>
  );
}
