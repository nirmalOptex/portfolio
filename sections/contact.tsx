"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, MapPin, CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { GithubIcon, LinkedinIcon, TwitterIcon, DribbbleIcon } from "@/components/brand-icons";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    
    // Reset success banner after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const socials = [
    { label: "GitHub", href: "https://github.com", icon: GithubIcon },
    { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedinIcon },
    { label: "Twitter", href: "https://twitter.com", icon: TwitterIcon },
    { label: "Dribbble", href: "https://dribbble.com", icon: DribbbleIcon },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-background">
      {/* Background decoration dots */}
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.1] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl tracking-tight mb-4 text-foreground">
            Get in Touch
          </h2>
          <div className="w-12 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground text-md leading-relaxed">
            Have a project in mind or want to collaborate? Fill out the form below, and I&apos;ll get back to you within 24 hours.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-start">
          {/* Metadata Sidebar */}
          <div className="lg:col-span-5 space-y-8">
            <ScrollReveal direction="left" className="space-y-6">
              <h3 className="font-display text-2xl tracking-tight text-foreground">
                Contact Information
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Feel free to reach out directly via email, or follow me on my social channels to keep up to date with my current projects.
              </p>

              {/* Info Items */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Mail className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground">Email Me</h4>
                    <a href="mailto:nirmal@portfolio.dev" className="text-sm font-semibold text-foreground hover:text-primary transition-colors duration-200">
                      nirmal@portfolio.dev
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <MapPin className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground">Location</h4>
                    <p className="text-sm font-semibold text-foreground">
                      Remote friendly / IIMS College
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="space-y-3 pt-6 border-t border-border/80">
                <h4 className="text-xs font-bold tracking-wider uppercase text-muted-foreground">Follow Me</h4>
                <div className="flex gap-2">
                  {socials.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="w-9 h-9 rounded-xl border border-border bg-background/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 shadow-sm"
                      >
                        <Icon className="h-4 w-4" />
                        <span className="sr-only">{social.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Form Block */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="right" className="glass-panel border-border/80 p-6 md:p-8 rounded-2xl shadow-xl">
              {isSuccess ? (
                <div className="py-8 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
                  <CheckCircle className="h-14 w-14 text-emerald-500 animate-bounce" />
                  <h3 className="font-display text-xl tracking-tight text-foreground">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-sm">
                    Thank you for reaching out! I have received your message and will get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Name field */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      className="rounded-xl border-border bg-background/50 focus-visible:ring-primary/40 focus-visible:border-primary transition-all duration-300 py-5"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive font-medium mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="rounded-xl border-border bg-background/50 focus-visible:ring-primary/40 focus-visible:border-primary transition-all duration-300 py-5"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive font-medium mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Message field */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      rows={5}
                      placeholder="Tell me about your project..."
                      className="rounded-xl border-border bg-background/50 focus-visible:ring-primary/40 focus-visible:border-primary transition-all duration-300"
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="text-xs text-destructive font-medium mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl py-6 font-semibold shadow-md bg-primary text-primary-foreground hover:bg-primary/95 transition-all duration-300 cursor-pointer flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
