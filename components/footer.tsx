"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navLinks, socialLinks, siteConfig, footerContent } from "@/lib/site";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";

const iconMap = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
} as const;

export function Footer() {
  const scrollToTop = () => {
    // `scroll-smooth` on <html> already respects prefers-reduced-motion, but
    // the JS API does not — so ask the browser directly.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  };

  return (
    <footer className="border-t border-border bg-background/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo Column */}
          <div className="md:col-span-2 space-y-4">
            <Link
              href="#home"
              className="flex items-center gap-2 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50 w-fit"
            >
              <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent-foreground flex items-center justify-center font-bold text-primary-foreground text-lg shadow-md">
                {siteConfig.shortName.charAt(0)}
              </span>
              <span className="font-display text-xl tracking-tight">
                {siteConfig.shortName}
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm">
              {footerContent.tagline}
            </p>
          </div>

          {/* Links Column */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm tracking-wider uppercase text-foreground">Navigation</h4>
            <ul className="space-y-2">
              {navLinks.slice(0, 4).map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 rounded outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Socials Column */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm tracking-wider uppercase text-foreground">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = iconMap[social.icon as keyof typeof iconMap] ?? GithubIcon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-xl border border-border bg-background/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/45 transition-all duration-300 shadow-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <Icon className="h-4.5 w-4.5" />
                    <span className="sr-only">{social.label}</span>
                  </a>
                );
              })}
            </div>
            <p className="text-sm text-muted-foreground">
              Based in {siteConfig.location} · {siteConfig.availability}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border w-full my-6" />

        {/* Copyright & Scroll to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. Designed and built with care.
          </p>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollToTop}
            className="w-9 h-9 rounded-xl border border-border hover:bg-accent/80 hover:text-accent-foreground backdrop-blur-sm cursor-pointer shadow-sm active:scale-95 transition-all duration-200"
          >
            <ArrowUp className="h-4 w-4" />
            <span className="sr-only">Scroll to top</span>
          </Button>
        </div>
      </div>
    </footer>
  );
}
