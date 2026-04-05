"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HudCard } from "@/components/HudCard";
import { AnimatedCounter } from "@/components/AnimatedCounter";

const recentMatches = [
  { opponent: "PhysicsNerd42", subject: "PHYSICS", result: "WIN", elo: "+24", time: "2m ago" },
  { opponent: "MathsGoat", subject: "MATHS", result: "LOSS", elo: "-18", time: "15m ago" },
  { opponent: "AI [HARD]", subject: "CHEMISTRY", result: "WIN", elo: "+12", time: "1h ago" },
  { opponent: "RevKing", subject: "BIOLOGY", result: "WIN", elo: "+21", time: "2h ago" },
  { opponent: "HistoryBuff", subject: "HISTORY", result: "LOSS", elo: "-15", time: "3h ago" },
];

const subjectStats = [
  { name: "MATHS", elo: 1420, rank: 234, matches: 89, winRate: 67 },
  { name: "PHYSICS", elo: 1380, rank: 412, matches: 64, winRate: 59 },
  { name: "CHEMISTRY", elo: 1290, rank: 678, matches: 42, winRate: 52 },
  { name: "BIOLOGY", elo: 1350, rank: 345, matches: 57, winRate: 61 },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Dashboard() {
  return (
    <div className="relative z-10 pt-20 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="font-mono text-xs tracking-[0.4em] text-text-muted block mb-2">
            // COMMAND CENTRE
          </span>
          <div className="flex items-end gap-4">
            <h1 className="text-3xl font-bold tracking-tight">DASHBOARD</h1>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 bg-success" />
              <span className="font-mono text-xs text-success">ONLINE</span>
            </div>
          </div>
        </motion.div>

        {/* Player Card + Stats Row */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-4 gap-4 mb-8"
        >
          {/* Player Card */}
          <motion.div variants={fadeUp} className="md:col-span-1">
            <HudCard delay={0} className="p-6 h-full">
              <div className="flex flex-col items-center text-center">
                <motion.div
                  className="w-20 h-20 border-2 border-cyan clip-hex bg-bg-secondary flex items-center justify-center mb-4 relative"
                  animate={{ borderColor: ["#00e5ff", "#ff2d7b", "#00e5ff"] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <span className="text-2xl font-bold text-cyan font-mono">MR</span>
                </motion.div>
                <h2 className="font-mono text-sm tracking-wider mb-1">MaxRevs</h2>
                <span className="font-mono text-[10px] tracking-[0.3em] text-gold glow-text-gold">
                  GOLD III
                </span>
                <div className="w-full border-t border-border mt-4 pt-4">
                  <div className="font-mono text-3xl text-cyan glow-text">
                    <AnimatedCounter value={1420} />
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.3em] text-text-muted mt-1">
                    OVERALL ELO
                  </div>
                </div>
              </div>
            </HudCard>
          </motion.div>

          {/* Stat Cards */}
          <motion.div variants={fadeUp}>
            <HudCard delay={0} className="p-5 h-full">
              <div className="font-mono text-[10px] tracking-[0.3em] text-text-muted mb-3">
                WIN RATE
              </div>
              <div className="text-4xl font-bold font-mono text-success">
                <AnimatedCounter value={62} />%
              </div>
              <div className="mt-3 h-[3px] bg-bg-secondary">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "62%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-success progress-bar"
                />
              </div>
            </HudCard>
          </motion.div>

          <motion.div variants={fadeUp}>
            <HudCard delay={0} className="p-5 h-full">
              <div className="font-mono text-[10px] tracking-[0.3em] text-text-muted mb-3">
                MATCHES
              </div>
              <div className="text-4xl font-bold font-mono text-text-primary">
                <AnimatedCounter value={252} />
              </div>
              <div className="flex items-center gap-2 mt-3">
                <span className="font-mono text-xs text-success">156W</span>
                <span className="text-text-muted">/</span>
                <span className="font-mono text-xs text-danger">96L</span>
              </div>
            </HudCard>
          </motion.div>

          <motion.div variants={fadeUp}>
            <HudCard delay={0} className="p-5 h-full">
              <div className="font-mono text-[10px] tracking-[0.3em] text-text-muted mb-3">
                STREAK
              </div>
              <div className="text-4xl font-bold font-mono text-gold glow-text-gold">
                <AnimatedCounter value={7} />🔥
              </div>
              <div className="font-mono text-xs text-text-muted mt-3">
                BEST: 14
              </div>
            </HudCard>
          </motion.div>
        </motion.div>

        {/* Quick Play */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Link
              href="/battle"
              className="block border-2 border-cyan bg-bg-card p-6 text-center group hover:bg-cyan/5 transition-colors duration-200"
            >
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="font-mono text-2xl tracking-wider text-cyan glow-text group-hover:tracking-[0.4em] transition-all duration-300">
                  ⚔️ FIND MATCH
                </span>
              </motion.div>
              <span className="font-mono text-xs text-text-muted mt-2 block">
                AVG QUEUE TIME: 3s
              </span>
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Recent Matches */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <HudCard hover={false} className="p-5">
              <h3 className="font-mono text-xs tracking-[0.3em] text-text-muted mb-4">
                // RECENT BATTLES
              </h3>
              <div className="space-y-2">
                {recentMatches.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.08 }}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-[10px] tracking-wider px-2 py-0.5 border ${
                          m.result === "WIN"
                            ? "text-success border-success/30"
                            : "text-danger border-danger/30"
                        }`}
                      >
                        {m.result}
                      </span>
                      <div>
                        <div className="font-mono text-sm text-text-primary">
                          {m.opponent}
                        </div>
                        <div className="font-mono text-[10px] text-text-muted">
                          {m.subject}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`font-mono text-sm ${
                          m.elo.startsWith("+") ? "text-success" : "text-danger"
                        }`}
                      >
                        {m.elo}
                      </div>
                      <div className="font-mono text-[10px] text-text-muted">
                        {m.time}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </HudCard>
          </motion.div>

          {/* Subject Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <HudCard hover={false} className="p-5">
              <h3 className="font-mono text-xs tracking-[0.3em] text-text-muted mb-4">
                // SUBJECT STATS
              </h3>
              <div className="space-y-4">
                {subjectStats.map((s, i) => (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-sm tracking-wider text-text-primary">
                        {s.name}
                      </span>
                      <span className="font-mono text-sm text-cyan">
                        {s.elo}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-[3px] bg-bg-secondary">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${s.winRate}%` }}
                          transition={{ duration: 0.8, delay: 0.8 + i * 0.1 }}
                          className="h-full bg-cyan"
                        />
                      </div>
                      <span className="font-mono text-[10px] text-text-muted w-16 text-right">
                        {s.winRate}% WR
                      </span>
                    </div>
                    <div className="flex gap-4 mt-1">
                      <span className="font-mono text-[10px] text-text-muted">
                        RANK #{s.rank}
                      </span>
                      <span className="font-mono text-[10px] text-text-muted">
                        {s.matches} PLAYED
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </HudCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
