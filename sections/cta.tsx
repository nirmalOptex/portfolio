"use client";

import Link from "next/link";
import { Sparkles, Calendar } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

export function CallToActionSection({ content }: { content?: any }) {
  const title = content?.title || "Want a web project that works \nfor real people?";
  const body = content?.body || "I help turn practical ideas into reliable web and mobile tools that are easy to use and simple to maintain. If you have a project or a problem, let's talk about a sensible solution.";
  const ctaLabel = content?.ctaLabel || "Book a Free Consultation";
  const ctaUrl = content?.ctaUrl || "#contact";
  const eyebrow = content?.eyebrow || "Free Technical Architecture Review Included";

  const formatTitle = (text: string) => {
    return text.split("\n").map((line, index, array) => (
      <span key={index}>
        {line}
        {index < array.length - 1 && <br />}
      </span>
    ));
  };

  return (
    <section className="py-24 relative overflow-hidden bg-background">
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
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary animate-bounce">
                <Sparkles className="h-5 w-5" />
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground leading-[1.1]">
                {formatTitle(title)}
              </h2>

              <p className="text-muted-foreground text-sm md:text-md leading-relaxed max-w-lg">
                {body}
              </p>

              {/* Glowing CTA Action */}
              <div className="pt-4">
                <Link
                  href={ctaUrl}
                  className="inline-flex items-center justify-center rounded-xl px-8 py-7 font-medium shadow-lg hover:shadow-accent/25 cursor-pointer bg-primary text-primary-foreground hover:bg-accent/90 text-md group transition-all duration-300"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  {ctaLabel}
                </Link>
              </div>

              <span className="text-[11px] font-semibold text-muted-foreground tracking-wider uppercase">
                {eyebrow}
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
