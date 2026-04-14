import type { Metadata } from "next";
import "./globals.css";
import NavConditional from "@/components/NavConditional";
import FooterConditional from "@/components/FooterConditional";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: {
    template: `%s | ${site.name}`,
    default: `${site.name} — ${site.tagline}`,
  },
  description: site.description,
  keywords: ["Bible curriculum", "children's ministry", "safari adventure", "Kingdom Kids", "Christian education"],
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <NavConditional />
        <main className="flex-1">{children}</main>
        <FooterConditional />
      </body>
    </html>
  );
}
