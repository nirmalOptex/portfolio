"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  staggerChildren?: number;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.6,
  staggerChildren = 0
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const directionOffset = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
    none: {}
  };

  const initialVal = {
    opacity: 0,
    ...directionOffset[direction]
  };

  const animateVal = {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration,
      delay,
      ease: [0.21, 0.47, 0.32, 0.98],
      staggerChildren
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={initialVal}
      animate={isInView ? animateVal : initialVal}
      className={className}
    >
      {children}
    </motion.div>
  );
}
