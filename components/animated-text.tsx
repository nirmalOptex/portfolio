"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface AnimatedTextProps {
  words: string[];
  className?: string;
  interval?: number;
}

export function AnimatedText({ words, className, interval = 3000 }: AnimatedTextProps) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // A word that never stops changing is exactly what a reduced-motion request
    // is asking us not to do, so settle on the first one and stop.
    if (reduceMotion || words.length < 2) return;

    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [words, interval, reduceMotion]);

  return (
    <span className="relative inline-block overflow-hidden min-h-[1.2em] align-bottom pb-1">
      {/* Assistive tech gets the full list once instead of a word that
          re-announces itself every few seconds. */}
      <span className="sr-only">{words.join(", ")}</span>

      <span aria-hidden="true">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={reduceMotion ? { opacity: 1 } : { y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { y: -30, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.23, 1, 0.32, 1] }}
            className={className}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
