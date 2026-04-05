"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ParticleField } from "@/components/ParticleField";
import { GlitchText } from "@/components/GlitchText";
import { HudCard } from "@/components/HudCard";

const features = [
  {
    icon: "⚔️",
    title: "1v1 BATTLES",
    desc: "Go head-to-head against real players or AI opponents in timed question duels.",
    stat: "REAL-TIME",
  },
  {
    icon: "📊",
    title: "ELO RANKING",
    desc: "Chess-style rating system. Every win and loss moves your rank. Climb to the top.",
    stat: "COMPETITIVE",
  },
  {
    icon: "🧠",
    title: "GCSE FOCUSED",
    desc: "Questions mapped to the actual spec. Maths, Science, English, History and more.",
    stat: "EXAM-READY",
  },
  {
    icon: "🤖",
    title: "AI OPPONENTS",
    desc: "Practice against AI at your level. It adapts. It learns. It doesn't go easy on you.",
    stat: "ADAPTIVE",
  },
];

const subjects = [
  { name: "MATHS", players: "12.4K" },
  { name: "PHYSICS", players: "8.2K" },
  { name: "CHEMISTRY", players: "7.8K" },
  { name: "BIOLOGY", players: "9.1K" },
  { name: "ENGLISH", players: "6.5K" },
  { name: "HISTORY", players: "5.3K" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Home() {
  return (
    <div className="relative">
      <ParticleField />

      {/* HERO */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-block border border-border px-4 py-1 mb-8">
              <span className="font-mono text-xs tracking-[0.4em] text-text-secondary">
                SEASON 01 — NOW LIVE
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-none mb-2">
              <GlitchText text="1v1" className="text-cyan glow-text" />
              <span className="text-text-primary"> REVISION</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-lg md:text-xl text-text-secondary font-mono mt-6 max-w-xl mx-auto"
          >
            Revision that hits different. Battle your mates,
            <br />
            climb the ranks, ace your GCSEs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/battle"
                className="inline-block font-mono text-sm tracking-wider border-2 border-cyan text-bg-primary bg-cyan px-8 py-3 hover:bg-transparent hover:text-cyan transition-colors duration-200"
              >
                START BATTLING
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/dashboard"
                className="inline-block font-mono text-sm tracking-wider border border-border text-text-secondary px-8 py-3 hover:border-text-muted hover:text-text-primary transition-colors duration-200"
              >
                VIEW STATS
              </Link>
            </motion.div>
          </motion.div>

          {/* Live stats ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-16 flex items-center justify-center gap-8 text-text-muted font-mono text-xs"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-success animate-pulse" />
              <span>2,847 ONLINE</span>
            </div>
            <span className="text-border">|</span>
            <div>1,204 BATTLES LIVE</div>
            <span className="text-border">|</span>
            <div>48.2K MATCHES TODAY</div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-[1px] h-12 bg-border mx-auto"
            />
            <span className="font-mono text-[10px] tracking-[0.3em] text-text-muted mt-2 block">
              SCROLL
            </span>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="font-mono text-xs tracking-[0.4em] text-text-muted block mb-4">
              // SYSTEMS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              HOW IT <span className="text-cyan glow-text">WORKS</span>
            </h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-4"
          >
            {features.map((f, i) => (
              <motion.div key={i} variants={fadeUp}>
                <HudCard delay={0} className="p-6 group cursor-default">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-2xl">{f.icon}</span>
                    <span className="font-mono text-[10px] tracking-[0.3em] text-text-muted border border-border px-2 py-1">
                      {f.stat}
                    </span>
                  </div>
                  <h3 className="font-mono text-sm tracking-wider text-text-primary mb-2 group-hover:text-cyan transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {f.desc}
                  </p>
                </HudCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SUBJECTS */}
      <section className="relative z-10 py-32 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="font-mono text-xs tracking-[0.4em] text-text-muted block mb-4">
              // ARENAS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              CHOOSE YOUR <span className="text-magenta glow-text-magenta">BATTLEFIELD</span>
            </h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3"
          >
            {subjects.map((s, i) => (
              <motion.div key={s.name} variants={fadeUp}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="border border-border bg-bg-card p-5 cursor-pointer group hover:border-cyan transition-colors duration-200"
                >
                  <div className="font-mono text-lg tracking-wider text-text-primary group-hover:text-cyan transition-colors">
                    {s.name}
                  </div>
                  <div className="font-mono text-xs text-text-muted mt-2">
                    {s.players} PLAYERS
                  </div>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                    className="h-[2px] bg-cyan mt-4 origin-left"
                    style={{ width: `${60 + Math.random() * 40}%` }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-32 px-6 border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              READY TO <span className="text-cyan glow-text">COMPETE</span>?
            </h2>
            <p className="text-text-secondary font-mono text-sm mb-10">
              5 free matches a day. No sign-up needed to start.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/battle"
                className="inline-block font-mono text-sm tracking-wider border-2 border-cyan text-bg-primary bg-cyan px-10 py-4 hover:bg-transparent hover:text-cyan transition-colors duration-200"
              >
                ENTER THE ARENA
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="font-mono text-xs text-text-muted tracking-wider">
            1v1 REVISION © 2026
          </span>
          <div className="flex gap-6 font-mono text-xs text-text-muted">
            <span className="hover:text-text-secondary cursor-pointer transition-colors">TERMS</span>
            <span className="hover:text-text-secondary cursor-pointer transition-colors">PRIVACY</span>
            <span className="hover:text-text-secondary cursor-pointer transition-colors">CONTACT</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
