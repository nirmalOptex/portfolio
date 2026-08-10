"use client";

import { Code, Palette, Smartphone, Database, Server, Sparkles, Check, type LucideIcon } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { services } from "@/lib/data";
import { servicesContent } from "@/lib/site";

const iconMap: Record<string, LucideIcon> = {
  code: Code,
  palette: Palette,
  smartphone: Smartphone,
  database: Database,
  server: Server,
  sparkles: Sparkles,
};

export function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-24 relative overflow-hidden bg-background"
    >
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-accent/5 to-primary/5 rounded-full blur-[100px] pointer-events-none select-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeading
          id="services-heading"
          title={servicesContent.title}
          body={servicesContent.body}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const IconComponent = iconMap[service.icon] || Code;
            return (
              <ScrollReveal
                key={service.id}
                direction="up"
                delay={idx * 0.05}
                className="h-full"
              >
                <Card className="glass-panel border-border/80 h-full p-6 glass-panel-hover flex flex-col justify-between transition-all duration-300 relative group overflow-hidden">
                  {/* Subtle hover gradient indicator */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 space-y-4">
                    {/* Icon container */}
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                      <IconComponent className="h-6 w-6" />
                    </div>

                    <div className="space-y-2">
                      <CardTitle className="font-display text-xl tracking-tight text-foreground">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground text-sm leading-relaxed">
                        {service.description}
                      </CardDescription>
                    </div>
                  </div>

                  {/* Bullet features */}
                  <ul className="relative z-10 mt-6 pt-6 border-t border-border/60 space-y-2.5">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <span className="w-4.5 h-4.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mt-0.5 shrink-0">
                          <Check className="h-3 w-3" />
                        </span>
                        <span className="text-xs font-medium text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
