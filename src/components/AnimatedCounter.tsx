"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  className?: string;
  duration?: number;
}

export function AnimatedCounter({ value, className = "", duration = 1.5 }: AnimatedCounterProps) {
  const spring = useSpring(0, { duration: duration * 1000 });
  const display = useTransform(spring, (v) => Math.round(v));
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    spring.set(value);
    return display.on("change", (v) => setCurrent(v));
  }, [value, spring, display]);

  return (
    <motion.span className={`font-mono tabular-nums ${className}`}>
      {current.toLocaleString()}
    </motion.span>
  );
}
