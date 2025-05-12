"use client";

import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";

interface FooterProps {
  className?: string;
  showThemeSwitcher?: boolean;
}

export function Footer({ className = "", showThemeSwitcher = true }: FooterProps) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={`w-full border-t border-border py-6 ${className}`}>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-6">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Link href={"/"} className="font-semibold">
            <span className="text-primary">Class</span>App
          </Link>
          <div className="flex gap-4 text-muted-foreground text-xs">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-muted-foreground text-xs">
            © {currentYear} ClassApp. All rights reserved.
          </p>
          {showThemeSwitcher && <ThemeSwitcher />}
        </div>
      </div>
    </footer>
  );
} 