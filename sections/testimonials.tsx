"use client";

import React from "react";
import { Star, Quote } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { testimonials as localTestimonials } from "@/lib/data";
import { Testimonial } from "@/types";

export function TestimonialsSection({ content, testimonials }: { content?: any; testimonials?: Testimonial[] }) {
  const activeTestimonials = testimonials || localTestimonials;
  const title = content?.title || "Client Testimonials";
  const body = content?.body || "Read comments from startup founders, product managers, and developers who have experienced our digital deliverables.";

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-background">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full filter blur-[100px] pointer-events-none select-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl tracking-tight mb-4 text-foreground">
            {title}
          </h2>
          <div className="w-12 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground text-md leading-relaxed">
            {body}
          </p>
        </ScrollReveal>

        {/* Carousel slide wrap */}
        <ScrollReveal className="max-w-4xl mx-auto px-4 relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {activeTestimonials.map((test) => (
                <CarouselItem key={test.id} className="md:basis-1/2 p-2">
                  <Card className="glass-panel border-border/80 h-full p-6 flex flex-col justify-between hover:border-primary/20 transition-all duration-300 relative overflow-hidden shadow-md">
                    {/* Double quote background icon */}
                    <Quote className="absolute right-4 top-4 h-12 w-12 text-primary/5 pointer-events-none" />

                    <div className="space-y-4">
                      {/* Star ratings */}
                      <div className="flex gap-0.5 text-amber-500">
                        {Array.from({ length: test.rating }).map((_, idx) => (
                          <Star key={idx} className="h-4.5 w-4.5 fill-current" />
                        ))}
                      </div>

                      {/* Review text */}
                      <p className="text-muted-foreground text-sm leading-relaxed italic">
                        &ldquo;{test.review}&rdquo;
                      </p>
                    </div>

                    {/* Author block */}
                    <div className="flex items-center gap-3.5 mt-6 pt-6 border-t border-border/60">
                      {/* Avatar initials badge */}
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent-foreground flex items-center justify-center font-bold text-primary-foreground text-sm shadow-md">
                        {test.avatar}
                      </div>
                      <div>
                        <h4 className="font-display text-sm font-semibold text-foreground">
                          {test.name}
                        </h4>
                        <p className="text-[11px] font-medium text-muted-foreground">
                          {test.position}, {test.company}
                        </p>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Carousel controllers */}
            <div className="hidden md:flex justify-end gap-2 mt-6">
              <CarouselPrevious className="relative translate-y-0 left-0 right-0 border-border hover:bg-accent/80 hover:text-accent-foreground backdrop-blur-sm shadow-sm cursor-pointer" />
              <CarouselNext className="relative translate-y-0 left-0 right-0 border-border hover:bg-accent/80 hover:text-accent-foreground backdrop-blur-sm shadow-sm cursor-pointer" />
            </div>
          </Carousel>
        </ScrollReveal>
      </div>
    </section>
  );
}
