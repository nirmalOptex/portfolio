"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { AnimatedText } from "@/components/animated-text";
import { AnimatedGradient } from "@/components/animated-gradient";
import { InteractiveGrid } from "@/components/interactive-grid";
import { GithubIcon, LinkedinIcon, TwitterIcon, DribbbleIcon } from "@/components/brand-icons";

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.215, 0.61, 0.355, 1] as const,
      },
    },
  };

  const socials = [
    { label: "GitHub", href: "https://github.com", icon: GithubIcon },
    { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedinIcon },
    { label: "Twitter", href: "https://twitter.com", icon: TwitterIcon },
    { label: "Dribbble", href: "https://dribbble.com", icon: DribbbleIcon },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-background">
      {/* Interactive Background Canvas */}
      <InteractiveGrid />
      
      {/* Background Glowing Blurs */}
      <AnimatedGradient className="-top-40 -left-40 w-[550px] h-[550px]" variant="primary" />
      <AnimatedGradient className="top-1/3 -right-40 w-[600px] h-[600px]" variant="accent" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6">
            {/* Availability Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 self-start px-3.5 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              BCS Student at IIMS College
            </motion.div>

            {/* Main Headline */}
            <motion.h1 variants={itemVariants} className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05] text-foreground">
              I build practical web applications <br />
              with thoughtful interfaces and
              <span className="bg-gradient-to-r from-primary via-accent to-accent-foreground bg-clip-text text-transparent">
                real impact.
              </span>
            </motion.h1>

            {/* Sub-headline word-cycler */}
            <motion.div variants={itemVariants} className="text-xl md:text-2xl font-semibold text-muted-foreground flex flex-wrap gap-2 items-center">
              <span>I am a</span>
              <AnimatedText
                words={["Full-Stack Web Developer", "Backend Builder", "Problem Solver"]}
                className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent font-bold"
              />
            </motion.div>

            {/* Intro paragraph */}
            <motion.p variants={itemVariants} className="text-muted-foreground text-md md:text-lg max-w-xl leading-relaxed">
              I&apos;m Nirmal Maharjan, a BCS student at IIMS College who builds web apps, backend systems, and real-time tools. My work is practical, user-centered, and designed to solve everyday problems.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
              <Link
                href="#portfolio"
                className="inline-flex items-center justify-center rounded-xl px-7 py-6 font-medium shadow-lg hover:shadow-accent/25 cursor-pointer bg-primary text-primary-foreground hover:bg-accent/90 group text-md transition-all duration-300"
              >
                Explore My Work
                <ArrowUpRight className="ml-1.5 h-4.5 w-4.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl px-7 py-6 font-medium bg-background/50 hover:bg-accent/80 hover:text-accent-foreground backdrop-blur-sm cursor-pointer border-border text-md shadow-sm transition-all duration-300"
              >
                Contact Me
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 pt-6 border-t border-border/60 max-w-sm">
              <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">Follow Me:</span>
              <div className="flex gap-2">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-lg border border-border bg-background/40 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 shadow-sm"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="sr-only">{social.label}</span>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Profile Illustration / Avatar */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              variants={itemVariants}
              className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] lg:w-[400px] lg:h-[400px]"
            >
              {/* Outer decorative glowing ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary to-accent-foreground blur-xl opacity-30 animate-pulse-glow" />
              
              {/* Frame */}
              <div className="relative w-full h-full rounded-3xl border border-border bg-background/80 p-3 shadow-2xl backdrop-blur-sm overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent-foreground/5 pointer-events-none" />
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-muted">
                  <Image
                    src="/images/w.jpg"
                    alt=" developer profile portrait"
                    fill
                    sizes="(max-width: 768px) 280px, 400px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    priority
                  />
                </div>
              </div>

              {/* Floating micro items for high-tech premium feel */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -left-4 glass-panel border-border/80 px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-2"
              >
                <span className="text-xl">🚀</span>
                <span className="text-xs font-semibold">Speed Optimizer</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-4 -right-4 glass-panel border-border/80 px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-2"
              >
                <span className="text-xl">🎨</span>
                <span className="text-xs font-semibold">Sleek Interactions</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
