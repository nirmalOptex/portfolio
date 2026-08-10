"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { skills } from "@/lib/data";
import { aboutContent } from "@/lib/site";

/** Derived from the data so a new category never silently disappears. */
const categories = Array.from(new Set(skills.map((s) => s.category)));

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-24 relative overflow-hidden bg-background"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.1] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeading
          id="about-heading"
          title={aboutContent.title}
          body={aboutContent.body}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Bio Column */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal direction="left" delay={0.1}>
              <h3 className="font-display text-2xl tracking-tight mb-4 text-foreground">
                {aboutContent.storyTitle}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {aboutContent.storyBody1}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {aboutContent.storyBody2}
              </p>
            </ScrollReveal>

            {/* Stats Grid */}
            <ScrollReveal direction="left" delay={0.2} className="grid grid-cols-2 gap-4">
              {aboutContent.stats.map((stat) => (
                <Card
                  key={stat.label}
                  className="glass-panel border-border/80 p-4 hover:border-primary/20 transition-all duration-300"
                >
                  <CardContent className="p-0 flex flex-col justify-center">
                    <span className="text-3xl font-bold font-display bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
                      {stat.value}
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground mt-1 tracking-wide uppercase">
                      {stat.label}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </ScrollReveal>
          </div>

          {/* Skills Column */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal direction="right" delay={0.1}>
              <h3 className="font-display text-2xl tracking-tight mb-6 text-foreground">
                {aboutContent.skillsTitle}
              </h3>
            </ScrollReveal>

            <div className="space-y-6">
              {categories.map((category, idx) => {
                const categorySkills = skills.filter((s) => s.category === category);
                return (
                  <ScrollReveal
                    key={category}
                    direction="right"
                    delay={0.15 + idx * 0.05}
                    className="space-y-3"
                  >
                    <h4 className="text-xs font-bold tracking-wider uppercase text-muted-foreground">
                      {category}
                    </h4>
                    <ul className="flex flex-wrap gap-2">
                      {categorySkills.map((skill) => (
                        <li
                          key={skill.name}
                          className="px-3.5 py-1.5 rounded-xl border border-border bg-background/50 text-sm font-medium hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-default"
                        >
                          {skill.name}
                        </li>
                      ))}
                    </ul>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
