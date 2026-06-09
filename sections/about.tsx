"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import { Card, CardContent } from "@/components/ui/card";
import { skills } from "@/lib/data";

export function AboutSection() {
  const stats = [
    { value: "5+", label: "Years Experience" },
    { value: "50+", label: "Projects Delivered" },
    { value: "99%", label: "Client Satisfaction" },
    { value: "100%", label: "Lighthouse Score target" },
  ];

  const categories = ["Frontend", "Backend", "Design", "DevOps"];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-background">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.1] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl tracking-tight mb-4 text-foreground">
            About Me & Skills
          </h2>
          <div className="w-12 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground text-md leading-relaxed">
            I am a full-stack engineer driven by visual aesthetics and code performance. I bridge the gap between design and engineering to build products that feel incredibly premium.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Bio Column */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal direction="left" delay={0.1}>
              <h3 className="font-display text-2xl tracking-tight mb-4 text-foreground">
                My Story & Mission
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I am a BCS undergraduate at IIMS College with real project experience in full-stack web development and the basics of machine learning. My work is grounded in real-life problems and practical digital solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I believe good software should be easy to use, easy to maintain, and built to help people move faster. I enjoy turning detailed user needs into clear interfaces and real digital tools.
              </p>
            </ScrollReveal>

            {/* Stats Grid */}
            <ScrollReveal direction="left" delay={0.2} className="grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => (
                <Card key={idx} className="glass-panel border-border/80 p-4 hover:border-primary/20 transition-all duration-300">
                  <CardContent className="p-0 flex flex-col justify-center">
                    <span className="text-3xl font-bold font-display bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
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
                My Tech Stack
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
                    <div className="flex flex-wrap gap-2">
                      {categorySkills.map((skill) => (
                        <div
                          key={skill.name}
                          className="px-3.5 py-1.5 rounded-xl border border-border bg-background/50 text-sm font-medium hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-default flex items-center gap-2"
                        >
                          <span>{skill.name}</span>
                          <span className="text-xs text-primary font-semibold">{skill.level}%</span>
                        </div>
                      ))}
                    </div>
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
