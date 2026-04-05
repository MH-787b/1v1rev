"use client";

import { motion } from "framer-motion";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
}

export function GlitchText({ text, className = "", as: Tag = "span" }: GlitchTextProps) {
  return (
    <motion.div
      className="relative inline-block"
      whileHover="glitch"
    >
      <Tag className={`relative z-10 ${className}`}>{text}</Tag>
      <motion.span
        className={`absolute top-0 left-0 z-0 text-cyan opacity-0 ${className}`}
        variants={{
          glitch: {
            opacity: [0, 0.8, 0, 0.6, 0],
            x: [-2, 2, -1, 1, 0],
            transition: { duration: 0.4 },
          },
        }}
        aria-hidden
      >
        {text}
      </motion.span>
      <motion.span
        className={`absolute top-0 left-0 z-0 text-magenta opacity-0 ${className}`}
        variants={{
          glitch: {
            opacity: [0, 0.6, 0, 0.8, 0],
            x: [2, -2, 1, -1, 0],
            transition: { duration: 0.4 },
          },
        }}
        aria-hidden
      >
        {text}
      </motion.span>
    </motion.div>
  );
}
