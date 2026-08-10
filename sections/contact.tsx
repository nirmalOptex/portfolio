"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, MapPin, CheckCircle, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";
import { SocialLinks } from "@/components/social-links";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { contactContent, siteConfig } from "@/lib/site";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  // `z.email()`, not `z.string().email()` — the latter is deprecated in Zod v4.
  email: z.email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactSection() {
  const [isSent, setIsSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  /**
   * There is no backend, so a validated submission hands off to the visitor's
   * mail client with the fields pre-filled. That keeps the message in their
   * sent folder and gives them a reply-to address for free.
   */
  const onSubmit = (formData: ContactFormValues) => {
    const subject = `Portfolio enquiry from ${formData.name}`;
    const body = `${formData.message}\n\n—\n${formData.name}\n${formData.email}`;

    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setIsSent(true);
    reset();
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-24 relative overflow-hidden bg-background"
    >
      {/* Background decoration dots */}
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.1] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeading
          id="contact-heading"
          title={contactContent.title}
          body={contactContent.body}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-start">
          {/* Metadata Sidebar */}
          <div className="lg:col-span-5 space-y-8">
            <ScrollReveal direction="left" className="space-y-6">
              <h3 className="font-display text-2xl tracking-tight text-foreground">
                {contactContent.sidebarTitle}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {contactContent.sidebarBody}
              </p>

              {/* Info Items */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4">
                  <div
                    aria-hidden="true"
                    className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0"
                  >
                    <Mail className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground">Email Me</h4>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-sm font-semibold text-foreground hover:text-primary transition-colors duration-200 rounded outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div
                    aria-hidden="true"
                    className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0"
                  >
                    <MapPin className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground">Location</h4>
                    <p className="text-sm font-semibold text-foreground">
                      {siteConfig.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="space-y-3 pt-6 border-t border-border/80">
                <h4 className="text-xs font-bold tracking-wider uppercase text-muted-foreground">Follow Me</h4>
                <SocialLinks size="md" />
              </div>
            </ScrollReveal>
          </div>

          {/* Form Block */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="right" className="glass-panel border-border/80 p-6 md:p-8 rounded-2xl shadow-xl">
              {isSent ? (
                <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
                  <CheckCircle aria-hidden="true" className="h-14 w-14 text-emerald-500" />
                  <h3 className="font-display text-xl tracking-tight text-foreground">
                    Your email client is open
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-sm">
                    I have pre-filled a draft addressed to me — press send there and
                    it is on its way. If nothing opened, email me directly at{" "}
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="font-semibold text-foreground hover:text-primary underline underline-offset-4 rounded outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      {siteConfig.email}
                    </a>
                    .
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setIsSent(false)}
                    className="rounded-xl px-5 py-4 border-border hover:bg-accent/80 hover:text-accent-foreground cursor-pointer"
                  >
                    Write another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                  {/* Name field */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      autoComplete="name"
                      aria-invalid={errors.name ? true : undefined}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className="rounded-xl border-border bg-background/50 focus-visible:ring-primary/40 focus-visible:border-primary transition-all duration-300 py-5"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-xs text-destructive font-medium mt-1">
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
                      autoComplete="email"
                      aria-invalid={errors.email ? true : undefined}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className="rounded-xl border-border bg-background/50 focus-visible:ring-primary/40 focus-visible:border-primary transition-all duration-300 py-5"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-xs text-destructive font-medium mt-1">
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
                      aria-invalid={errors.message ? true : undefined}
                      aria-describedby={errors.message ? "message-error" : "message-hint"}
                      className="rounded-xl border-border bg-background/50 focus-visible:ring-primary/40 focus-visible:border-primary transition-all duration-300"
                      {...register("message")}
                    />
                    {errors.message ? (
                      <p id="message-error" className="text-xs text-destructive font-medium mt-1">
                        {errors.message.message}
                      </p>
                    ) : (
                      <p id="message-hint" className="text-xs text-muted-foreground mt-1">
                        Submitting opens a pre-filled draft in your email app.
                      </p>
                    )}
                  </div>

                  {/* Submit button */}
                  <Button
                    type="submit"
                    className="w-full rounded-xl py-6 font-semibold shadow-md bg-primary text-primary-foreground hover:bg-accent/90 transition-all duration-300 cursor-pointer flex items-center justify-center"
                  >
                    Compose Message
                    <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
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
