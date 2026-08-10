"use client";

import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { socialLinks } from "@/lib/site";

const iconMap = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
} as const;

/**
 * Renders the social icon row. Both the hero and the contact section show the
 * same links; only the sizing differs, so that is the one thing parameterised.
 */
export function SocialLinks({
  size = "sm",
  className = "",
}: {
  size?: "sm" | "md";
  className?: string;
}) {
  const box = size === "sm" ? "w-8 h-8 rounded-lg" : "w-9 h-9 rounded-xl";
  const icon = size === "sm" ? "h-4 w-4" : "h-4.5 w-4.5";

  return (
    <div className={`flex gap-2 ${className}`}>
      {socialLinks.map((social) => {
        const Icon = iconMap[social.icon as keyof typeof iconMap] ?? GithubIcon;
        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            className={`${box} border border-border bg-background/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300 shadow-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50`}
          >
            <Icon className={icon} />
            <span className="sr-only">{social.label}</span>
          </a>
        );
      })}
    </div>
  );
}
