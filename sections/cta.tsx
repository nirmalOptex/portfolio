"use client";

import Link from "next/link";
import { Sparkles, Calendar } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ctaContent } from "@/lib/site";

const titleLines = ctaContent.title.split("\n");

export function CallToActionSection() {
  return (
    <section aria-labelledby="cta-heading" className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <ScrollReveal direction="up" className="max-w-4xl mx-auto">
          {/* Main card box with rich gradients */}
          <div className="relative rounded-3xl overflow-hidden border border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 p-8 md:p-12 shadow-2xl text-center">
            {/* Glowing gradient mesh backdrops */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/15 rounded-full blur-[80px] pointer-events-none select-none" />
            <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-accent/10 rounded-full blur-[80px] pointer-events-none select-none" />

            {/* Mesh background grid lines */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

            <div className="relative z-10 space-y-6 max-w-2xl mx-auto flex flex-col items-center">
              {/* Sparks icon banner */}
              <div
                aria-hidden="true"
                className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary motion-safe:animate-bounce"
              >
                <Sparkles className="h-5 w-5" />
              </div>

              <h2
                id="cta-heading"
                className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground leading-[1.1]"
              >
                {titleLines.map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < titleLines.length - 1 && <br />}
                  </span>
                ))}
              </h2>

              <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-lg">
                {ctaContent.body}
              </p>

              {/* Glowing CTA Action */}
              <div className="pt-4">
                <Link
                  href={ctaContent.cta.href}
                  className="inline-flex items-center justify-center rounded-xl px-8 py-7 font-medium shadow-lg hover:shadow-accent/25 cursor-pointer bg-primary text-primary-foreground hover:bg-accent/90 text-base group transition-all duration-300 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <Calendar aria-hidden="true" className="mr-2 h-5 w-5" />
                  {ctaContent.cta.label}
                </Link>
              </div>

              <span className="text-[11px] font-semibold text-muted-foreground tracking-wider uppercase">
                {ctaContent.eyebrow}
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
