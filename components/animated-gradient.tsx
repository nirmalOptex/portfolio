"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedGradientProps {
  className?: string;
  variant?: "primary" | "secondary" | "accent";
}

export function AnimatedGradient({ className, variant = "primary" }: AnimatedGradientProps) {
  const gradients = {
    primary: "bg-gradient-to-tr from-primary/30 via-indigo-500/10 to-transparent",
    secondary: "bg-gradient-to-tr from-purple-500/20 via-pink-500/10 to-transparent",
    accent: "bg-gradient-to-tr from-cyan-400/20 via-blue-500/10 to-transparent",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: [0.35, 0.55, 0.35],
        scale: [1, 1.1, 1],
        rotate: [0, 45, 0]
      }}
      transition={{ 
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={cn(
        "absolute rounded-full filter blur-[80px] pointer-events-none opacity-40 select-none",
        gradients[variant],
        className
      )}
    />
  );
}
