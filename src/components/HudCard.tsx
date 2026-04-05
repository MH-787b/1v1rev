"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HudCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export function HudCard({ children, className = "", delay = 0, hover = true }: HudCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={`relative border border-border bg-bg-card hud-corners ${className}`}
    >
      {children}
    </motion.div>
  );
}
