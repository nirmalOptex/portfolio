"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export function InteractiveGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Touch devices have no hovering cursor to follow, and a reduced-motion
    // request means the glow should sit still — skip the listener entirely
    // rather than doing the work and discarding it.
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer || reduceMotion) return;

    let frame = 0;
    let pending: { x: number; y: number } | null = null;

    const flush = () => {
      frame = 0;
      if (!pending || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(pending.x - rect.left);
      mouseY.set(pending.y - rect.top);
      pending = null;
    };

    // mousemove fires far faster than the display refreshes; coalescing to one
    // read per frame keeps getBoundingClientRect off the hot path.
    const handleMouseMove = (e: MouseEvent) => {
      pending = { x: e.clientX, y: e.clientY };
      if (!frame) frame = requestAnimationFrame(flush);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [mouseX, mouseY, reduceMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-[1]"
    >
      {/* Light dot grid */}
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.25] dark:opacity-[0.15]" />

      {/* Interactive mouse follow radial gradient */}
      <motion.div
        className="absolute w-[450px] h-[450px] rounded-full bg-radial from-primary/10 via-accent/5 to-transparent filter blur-[60px] pointer-events-none"
        style={{
          left: glowX,
          top: glowY,
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}
