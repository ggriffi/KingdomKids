"use client";
import { usePathname } from "next/navigation";
import Navigation from "./Navigation";

export default function NavConditional() {
  if (usePathname() === "/") return null;
  return <Navigation />;
}
