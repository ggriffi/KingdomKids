import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: {
    template: `%s | ${site.name}`,
    default: `${site.name} — ${site.tagline}`,
  },
  description: site.description,
  keywords: ["Bible curriculum", "children's ministry", "safari adventure", "Kingdom Kids", "Christian education"],
  icons: {
    icon: "/images/KingdomKids-favicon.png",
    shortcut: "/images/KingdomKids-favicon.png",
    apple: "/images/KingdomKids-favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
