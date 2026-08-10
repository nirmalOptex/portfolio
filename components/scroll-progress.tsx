"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/**
 * Thin reading-progress bar pinned under the navbar.
 *
 * `useScroll` with no target tracks the document, so this needs no resize or
 * scroll listeners of its own — framer-motion drives the transform off the
 * scroll timeline directly and never triggers a React re-render.
 */
export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Spring smoothing is the whole point of the effect; with reduced motion we
  // bind straight to the raw progress so the bar tracks without easing.
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: reduceMotion ? scrollYProgress : smoothed }}
      className="fixed top-0 left-0 right-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-primary to-accent-foreground"
    />
  );
}
