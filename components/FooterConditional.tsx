"use client";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterConditional() {
  if (usePathname() === "/") return null;
  return <Footer />;
}
