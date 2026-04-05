"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { HudCard } from "@/components/HudCard";
import { AnimatedCounter } from "@/components/AnimatedCounter";

const subjects = ["ALL", "MATHS", "PHYSICS", "CHEMISTRY", "BIOLOGY", "ENGLISH", "HISTORY"];

const players = [
  { rank: 1, name: "RevGodx", elo: 2140, winRate: 78, matches: 412, streak: 12, tier: "DIAMOND" },
  { rank: 2, name: "PhysicsNerd42", elo: 2085, winRate: 74, matches: 389, streak: 8, tier: "DIAMOND" },
  { rank: 3, name: "MathsGoat", elo: 2010, winRate: 72, matches: 356, streak: 5, tier: "DIAMOND" },
  { rank: 4, name: "ChemQueen", elo: 1945, winRate: 69, matches: 298, streak: 3, tier: "PLATINUM" },
  { rank: 5, name: "BioWarrior", elo: 1890, winRate: 67, matches: 274, streak: 6, tier: "PLATINUM" },
  { rank: 6, name: "RevKing", elo: 1855, winRate: 65, matches: 301, streak: 2, tier: "PLATINUM" },
  { rank: 7, name: "StudyHard99", elo: 1810, winRate: 63, matches: 245, streak: 4, tier: "GOLD" },
  { rank: 8, name: "GCSEslayer", elo: 1780, winRate: 61, matches: 267, streak: 1, tier: "GOLD" },
  { rank: 9, name: "NeuronFire", elo: 1745, winRate: 60, matches: 234, streak: 7, tier: "GOLD" },
  { rank: 10, name: "AtomSmasher", elo: 1720, winRate: 58, matches: 198, streak: 0, tier: "GOLD" },
  { rank: 11, name: "HistoryBuff", elo: 1695, winRate: 57, matches: 212, streak: 3, tier: "GOLD" },
  { rank: 12, name: "QuizWizard", elo: 1670, winRate: 55, matches: 189, streak: 0, tier: "SILVER" },
];

const tierColors: Record<string, string> = {
  DIAMOND: "text-cyan glow-text",
  PLATINUM: "text-text-primary",
  GOLD: "text-gold glow-text-gold",
  SILVER: "text-text-secondary",
};

const rankDisplay = (rank: number) => {
  if (rank === 1) return { symbol: "👑", color: "text-gold" };
  if (rank === 2) return { symbol: "🥈", color: "text-text-secondary" };
  if (rank === 3) return { symbol: "🥉", color: "text-[#cd7f32]" };
  return { symbol: `#${rank}`, color: "text-text-muted" };
};

export default function Leaderboard() {
  const [selectedSubject, setSelectedSubject] = useState("ALL");

  return (
    <div className="relative z-10 pt-20 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-10"
        >
          <span className="font-mono text-xs tracking-[0.4em] text-text-muted block mb-2">
            // GLOBAL RANKINGS
          </span>
          <h1 className="text-3xl font-bold tracking-tight">
            LEADER<span className="text-cyan glow-text">BOARD</span>
          </h1>
        </motion.div>

        {/* Subject Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {subjects.map((s) => (
            <motion.button
              key={s}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedSubject(s)}
              className={`font-mono text-xs tracking-wider px-4 py-2 border transition-all duration-200 ${
                selectedSubject === s
                  ? "border-cyan text-cyan bg-cyan/5"
                  : "border-border text-text-muted hover:border-text-muted hover:text-text-secondary"
              }`}
            >
              {s}
            </motion.button>
          ))}
        </motion.div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[players[1], players[0], players[2]].map((p, i) => {
            const order = [2, 1, 3][i];
            const heights = ["h-32", "h-40", "h-28"];
            return (
              <motion.div
                key={p.rank}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className={`w-14 h-14 border-2 ${order === 1 ? 'border-gold' : 'border-border'} clip-hex bg-bg-card flex items-center justify-center mb-2`}>
                  <span className={`font-mono text-sm ${order === 1 ? 'text-gold' : 'text-text-secondary'}`}>
                    {p.name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <span className="font-mono text-sm text-text-primary mb-1">{p.name}</span>
                <span className={`font-mono text-lg ${order === 1 ? 'text-gold glow-text-gold' : 'text-cyan'}`}>
                  <AnimatedCounter value={p.elo} />
                </span>
                <span className={`font-mono text-[10px] tracking-[0.3em] ${tierColors[p.tier]} mt-1`}>
                  {p.tier}
                </span>
                <div className={`w-full ${heights[i]} border border-border bg-bg-card mt-3 flex items-end justify-center pb-3`}>
                  <span className="font-mono text-3xl">
                    {order === 1 ? "👑" : order === 2 ? "🥈" : "🥉"}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Rankings Table */}
        <HudCard hover={false} className="overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 gap-2 px-5 py-3 border-b border-border font-mono text-[10px] tracking-[0.3em] text-text-muted">
            <div className="col-span-1">RANK</div>
            <div className="col-span-3">PLAYER</div>
            <div className="col-span-2">TIER</div>
            <div className="col-span-2 text-right">ELO</div>
            <div className="col-span-2 text-right">WIN RATE</div>
            <div className="col-span-2 text-right">STREAK</div>
          </div>

          {/* Rows */}
          {players.map((p, i) => {
            const rd = rankDisplay(p.rank);
            return (
              <motion.div
                key={p.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.04 }}
                whileHover={{ backgroundColor: "rgba(0, 229, 255, 0.03)" }}
                className="grid grid-cols-12 gap-2 px-5 py-3 border-b border-border last:border-0 items-center cursor-default"
              >
                <div className={`col-span-1 font-mono text-sm ${rd.color}`}>
                  {rd.symbol}
                </div>
                <div className="col-span-3 font-mono text-sm text-text-primary">
                  {p.name}
                </div>
                <div className={`col-span-2 font-mono text-[10px] tracking-wider ${tierColors[p.tier]}`}>
                  {p.tier}
                </div>
                <div className="col-span-2 text-right font-mono text-sm text-cyan">
                  {p.elo.toLocaleString()}
                </div>
                <div className="col-span-2 text-right font-mono text-sm text-text-secondary">
                  {p.winRate}%
                </div>
                <div className="col-span-2 text-right font-mono text-sm">
                  {p.streak > 0 ? (
                    <span className="text-gold">{p.streak}🔥</span>
                  ) : (
                    <span className="text-text-muted">—</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </HudCard>

        {/* Your Position */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-4"
        >
          <div className="border-2 border-cyan bg-bg-card px-5 py-4 grid grid-cols-12 gap-2 items-center glow-border">
            <div className="col-span-1 font-mono text-sm text-cyan">#234</div>
            <div className="col-span-3 font-mono text-sm text-cyan">
              MaxRevs <span className="text-[10px] text-text-muted">(YOU)</span>
            </div>
            <div className="col-span-2 font-mono text-[10px] tracking-wider text-gold glow-text-gold">
              GOLD III
            </div>
            <div className="col-span-2 text-right font-mono text-sm text-cyan">1,420</div>
            <div className="col-span-2 text-right font-mono text-sm text-text-secondary">62%</div>
            <div className="col-span-2 text-right font-mono text-sm text-gold">7🔥</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
