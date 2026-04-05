"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";

const navItems = [
  { href: "/", label: "HOME" },
  { href: "/dashboard", label: "DASHBOARD" },
  { href: "/battle", label: "BATTLE" },
  { href: "/leaderboard", label: "RANKINGS" },
];

export function Navbar() {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-bg-primary/90 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            className="w-8 h-8 border-2 border-cyan flex items-center justify-center clip-diamond"
            whileHover={{ rotate: 45, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <span className="text-cyan text-xs font-mono font-bold">1v1</span>
          </motion.div>
          <span className="font-mono text-sm tracking-[0.3em] text-cyan glow-text">
            REVISION
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {navItems.map((item, i) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative px-4 py-2"
              >
                <span
                  className={`font-mono text-xs tracking-widest transition-colors duration-200 ${
                    isActive
                      ? "text-cyan glow-text"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-cyan"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {hoveredIndex === i && !isActive && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    className="absolute bottom-0 left-2 right-2 h-[1px] bg-text-muted"
                  />
                )}
              </Link>
            );
          })}
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/battle"
            className="font-mono text-xs tracking-wider border border-cyan text-cyan px-4 py-2 hover:bg-cyan hover:text-bg-primary transition-colors duration-200"
          >
            PLAY NOW
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  );
}
