"use client";

import { ScrollReveal } from "@/components/scroll-reveal";

/**
 * The centred title + rule + lede that opens every section.
 *
 * Each section owns its own <h2>, so the id is passed through and referenced by
 * the section's `aria-labelledby` — that gives screen-reader users a landmark
 * list that reads as the page's outline.
 */
export function SectionHeading({
  id,
  title,
  body,
  className = "mb-16",
}: {
  id: string;
  title: string;
  body: string;
  className?: string;
}) {
  return (
    <ScrollReveal className={`text-center max-w-2xl mx-auto ${className}`}>
      <h2
        id={id}
        className="font-display text-3xl md:text-4xl tracking-tight mb-4 text-foreground"
      >
        {title}
      </h2>
      <div className="w-12 h-1 bg-primary mx-auto rounded-full mb-6" />
      <p className="text-muted-foreground text-base leading-relaxed">{body}</p>
    </ScrollReveal>
  );
}
