import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: {
    template: `%s | ${site.name}`,
    default: `${site.name} — ${site.tagline}`,
  },
  description: site.description,
  keywords: ["Bible curriculum", "children's ministry", "safari adventure", "Kingdom Kids", "Christian education"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
