"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/data";
import { GithubIcon, LinkedinIcon, TwitterIcon, DribbbleIcon } from "@/components/brand-icons";
import { NavLink, SocialLink } from "@/types";

export function Footer({ links, socialLinks }: { links?: NavLink[]; socialLinks?: SocialLink[] }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const iconMap: Record<string, any> = {
    github: GithubIcon,
    linkedin: LinkedinIcon,
    twitter: TwitterIcon,
    dribbble: DribbbleIcon,
  };

  const activeLinks = links || navLinks;
  const activeSocials = socialLinks || [
    { label: "GitHub", href: "https://github.com", icon: "github" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
    { label: "Twitter", href: "https://twitter.com", icon: "twitter" },
    { label: "Dribbble", href: "https://dribbble.com", icon: "dribbble" },
  ];

  return (
    <footer className="border-t border-border bg-background/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo Column */}
          <div className="md:col-span-2 space-y-4">
            <Link href="#home" className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent-foreground flex items-center justify-center font-bold text-primary-foreground text-lg shadow-md">
                N
              </span>
              <span className="font-display text-xl tracking-tight">Nirmal</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm">
              I build web apps and backend tools that are practical, reliable, and easy to use. My goal is to help teams solve real problems with thoughtful software.
            </p>
          </div>

          {/* Links Column */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm tracking-wider uppercase text-foreground">Navigation</h4>
            <ul className="space-y-2">
              {activeLinks.slice(0, 4).map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
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
              {activeSocials.map((social) => {
                const Icon = iconMap[social.icon] || GithubIcon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-xl border border-border bg-background/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/45 transition-all duration-300 shadow-sm"
                  >
                    <Icon className="h-4.5 w-4.5" />
                    <span className="sr-only">{social.label}</span>
                  </a>
                );
              })}
            </div>
            <p className="text-sm text-muted-foreground">
              Based in San Francisco, CA
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border w-full my-6" />

        {/* Copyright & Scroll to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground flex items-center gap-2 flex-wrap">
            <span>© {new Date().getFullYear()} Nirmal Maharjan. Designed and built with care.</span>
            <span className="text-muted-foreground/35">•</span>
            <a
              href="http://localhost:3001/admin"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors duration-200 underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-primary"
            >
              Admin Panel
            </a>
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
