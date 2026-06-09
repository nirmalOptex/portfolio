"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function InteractiveGrid() {
  const [mounted] = useState<boolean>(() => typeof window !== "undefined");
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <div 
      ref={containerRef}
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
