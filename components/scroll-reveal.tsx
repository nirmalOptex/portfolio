"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  staggerChildren?: number;
}

const directionOffset = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
  none: {},
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.6,
  staggerChildren = 0,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const reduceMotion = useReducedMotion();

  // With reduced motion the content must still appear — we drop the travel and
  // the fade rather than leaving the element stuck at opacity 0.
  const initialVal = reduceMotion
    ? { opacity: 1 }
    : { opacity: 0, ...directionOffset[direction] };

  const animateVal = {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: reduceMotion ? 0 : duration,
      delay: reduceMotion ? 0 : delay,
      // `as const` keeps this a 4-tuple; in a standalone variable there is no
      // contextual type to stop TS widening it to number[], which framer-motion
      // rejects (it wants a readonly bezier tuple).
      ease: [0.21, 0.47, 0.32, 0.98] as const,
      staggerChildren: reduceMotion ? 0 : staggerChildren,
    },
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
