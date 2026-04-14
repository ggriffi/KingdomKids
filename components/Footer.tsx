import Link from "next/link";
import { site } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="nav-wood border-t-2 border-[#3d2008] mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h3 className="text-[#f5c842] font-bold text-xl mb-2" style={{ fontFamily: "Georgia, serif" }}>
            The Kingdom Kids
          </h3>
          <p className="text-[#fdf6e3]/80 text-sm leading-relaxed">
            {site.description}
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-[#f5c842] font-bold mb-3 uppercase tracking-wider text-sm">Explore</h4>
          <ul className="space-y-2">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-[#fdf6e3]/80 hover:text-[#f5c842] text-sm transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/admin" className="text-[#fdf6e3]/40 hover:text-[#fdf6e3]/80 text-xs transition-colors">
                Admin
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[#f5c842] font-bold mb-3 uppercase tracking-wider text-sm">Contact</h4>
          {site.contact.email && (
            <a href={`mailto:${site.contact.email}`}
               className="text-[#fdf6e3]/80 hover:text-[#f5c842] text-sm transition-colors block mb-1">
              {site.contact.email}
            </a>
          )}
          <div className="flex gap-3 mt-4">
            {site.social.facebook && (
              <a href={site.social.facebook} className="text-[#fdf6e3]/60 hover:text-[#f5c842] transition-colors text-sm">Facebook</a>
            )}
            {site.social.instagram && (
              <a href={site.social.instagram} className="text-[#fdf6e3]/60 hover:text-[#f5c842] transition-colors text-sm">Instagram</a>
            )}
            {site.social.youtube && (
              <a href={site.social.youtube} className="text-[#fdf6e3]/60 hover:text-[#f5c842] transition-colors text-sm">YouTube</a>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#3d2008] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="text-[#fdf6e3]/50 text-xs">{site.footer.copyright}</span>
        <div className="flex gap-4">
          {site.footer.links.map((link) => (
            <Link key={link.href} href={link.href}
              className="text-[#fdf6e3]/50 hover:text-[#fdf6e3]/80 text-xs transition-colors">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
