"use client";

import { Briefcase, GraduationCap, Trophy } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { experience, education, awards } from "@/lib/data";
import { experienceContent } from "@/lib/site";

/**
 * Work history, education, and awards — the three CV sections the site had no
 * home for. Replaces the old testimonials band, which was invented copy.
 *
 * The timeline rail is drawn with borders and absolutely positioned dots and
 * is purely decorative; the semantic structure is the <ol> underneath it.
 */
export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="py-24 relative overflow-hidden bg-background"
    >
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.1] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full filter blur-[100px] pointer-events-none select-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeading
          id="experience-heading"
          title={experienceContent.title}
          body={experienceContent.body}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          {/* Work timeline */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="left">
              <h3 className="font-display text-2xl tracking-tight mb-8 text-foreground flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0"
                >
                  <Briefcase className="h-4.5 w-4.5" />
                </span>
                Work Experience
              </h3>
            </ScrollReveal>

            <ol className="relative border-l border-border/80 ml-4 space-y-8">
              {experience.map((job, idx) => (
                <li key={job.id} className="relative pl-8">
                  {/* Timeline node */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-[6.5px] top-6 w-3 h-3 rounded-full bg-primary ring-4 ring-background"
                  />
                  <ScrollReveal direction="left" delay={idx * 0.08}>
                    <Card className="glass-panel border-border/80 p-6 glass-panel-hover transition-all duration-300">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h4 className="font-display text-lg tracking-tight text-foreground">
                          {job.company}
                        </h4>
                        <span className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
                          {job.location}
                        </span>
                      </div>

                      {/* Roles — several stints at one employer stack here */}
                      <ul className="mt-3 space-y-1.5">
                        {job.roles.map((role) => (
                          <li
                            key={role.title}
                            className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5"
                          >
                            <span className="text-sm font-semibold text-primary">
                              {role.title}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {role.period}
                            </span>
                            {role.current && (
                              <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                                Current
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>

                      <ul className="mt-4 pt-4 border-t border-border/60 space-y-2">
                        {job.highlights.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0"
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </ScrollReveal>
                </li>
              ))}
            </ol>
          </div>

          {/* Education + awards */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <ScrollReveal direction="right">
                <h3 className="font-display text-2xl tracking-tight mb-8 text-foreground flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0"
                  >
                    <GraduationCap className="h-4.5 w-4.5" />
                  </span>
                  {experienceContent.educationTitle}
                </h3>
              </ScrollReveal>

              <ul className="space-y-4">
                {education.map((item, idx) => (
                  <li key={item.id}>
                    <ScrollReveal direction="right" delay={idx * 0.08}>
                      <Card className="glass-panel border-border/80 p-5 glass-panel-hover transition-all duration-300">
                        <h4 className="font-display text-base tracking-tight text-foreground">
                          {item.institution}
                        </h4>
                        <p className="text-sm font-medium text-primary mt-1">
                          {item.qualification}
                        </p>
                        {item.detail && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.detail}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border/60 flex flex-wrap items-center gap-x-2">
                          <span>{item.period}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-semibold text-foreground">
                            {item.score}
                          </span>
                        </p>
                      </Card>
                    </ScrollReveal>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <ScrollReveal direction="right">
                <h3 className="font-display text-2xl tracking-tight mb-8 text-foreground flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0"
                  >
                    <Trophy className="h-4.5 w-4.5" />
                  </span>
                  {experienceContent.awardsTitle}
                </h3>
              </ScrollReveal>

              <ul className="space-y-4">
                {awards.map((award, idx) => (
                  <li key={award.id}>
                    <ScrollReveal direction="right" delay={idx * 0.08}>
                      <Card className="glass-panel border-border/80 p-5 glass-panel-hover transition-all duration-300">
                        <h4 className="font-display text-base tracking-tight text-foreground">
                          {award.title}
                        </h4>
                        <p className="text-[11px] font-semibold tracking-wider uppercase text-primary mt-1">
                          {award.issuer}
                        </p>
                        <p className="text-xs leading-relaxed text-muted-foreground mt-3">
                          {award.description}
                        </p>
                      </Card>
                    </ScrollReveal>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
