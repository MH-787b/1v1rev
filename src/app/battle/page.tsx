"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

type Phase = "select" | "matchmaking" | "battle" | "result";

interface Question {
  question: string;
  answers: string[];
  correct: number;
  subject: string;
}

const QUESTIONS: Question[] = [
  {
    question: "What is the chemical formula for water?",
    answers: ["H₂O", "CO₂", "NaCl", "O₂"],
    correct: 0,
    subject: "CHEMISTRY",
  },
  {
    question: "Solve: 3x + 7 = 22",
    answers: ["x = 3", "x = 5", "x = 7", "x = 4"],
    correct: 1,
    subject: "MATHS",
  },
  {
    question: "What is the unit of force?",
    answers: ["Joule", "Watt", "Newton", "Pascal"],
    correct: 2,
    subject: "PHYSICS",
  },
  {
    question: "What is the powerhouse of the cell?",
    answers: ["Nucleus", "Ribosome", "Mitochondria", "Golgi apparatus"],
    correct: 2,
    subject: "BIOLOGY",
  },
  {
    question: "In which year did World War II end?",
    answers: ["1943", "1944", "1945", "1946"],
    correct: 2,
    subject: "HISTORY",
  },
];

const subjects = ["MATHS", "PHYSICS", "CHEMISTRY", "BIOLOGY", "ENGLISH", "HISTORY"];

export default function Battle() {
  const [phase, setPhase] = useState<Phase>("select");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [searchTime, setSearchTime] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [timer, setTimer] = useState(15);
  const [selected, setSelected] = useState<number | null>(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [playerEloChange, setPlayerEloChange] = useState(0);

  const currentQuestion = QUESTIONS[questionIndex];
  const totalQuestions = QUESTIONS.length;

  // Matchmaking timer
  useEffect(() => {
    if (phase !== "matchmaking") return;
    const interval = setInterval(() => setSearchTime((t) => t + 1), 1000);
    const timeout = setTimeout(() => {
      setPhase("battle");
      setQuestionIndex(0);
      setPlayerScore(0);
      setOpponentScore(0);
      setTimer(15);
    }, 3000 + Math.random() * 2000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [phase]);

  // Question timer
  useEffect(() => {
    if (phase !== "battle" || showCorrect) return;
    if (timer <= 0) {
      handleAnswer(-1);
      return;
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [phase, timer, showCorrect]);

  const handleAnswer = useCallback(
    (idx: number) => {
      if (showCorrect || phase !== "battle") return;
      setSelected(idx);
      setShowCorrect(true);

      const isCorrect = idx === currentQuestion.correct;
      if (isCorrect) setPlayerScore((s) => s + 1);

      // Simulate opponent
      const opponentCorrect = Math.random() > 0.4;
      if (opponentCorrect) setOpponentScore((s) => s + 1);

      setTimeout(() => {
        if (questionIndex < totalQuestions - 1) {
          setQuestionIndex((i) => i + 1);
          setTimer(15);
          setSelected(null);
          setShowCorrect(false);
        } else {
          const finalPlayer = isCorrect ? playerScore + 1 : playerScore;
          const finalOpponent = opponentCorrect ? opponentScore + 1 : opponentScore;
          setPlayerEloChange(finalPlayer > finalOpponent ? 24 : finalPlayer === finalOpponent ? 0 : -18);
          setPhase("result");
        }
      }, 1500);
    },
    [showCorrect, phase, currentQuestion, questionIndex, totalQuestions, playerScore, opponentScore]
  );

  const resetBattle = () => {
    setPhase("select");
    setSelectedSubject(null);
    setSearchTime(0);
    setQuestionIndex(0);
    setPlayerScore(0);
    setOpponentScore(0);
    setTimer(15);
    setSelected(null);
    setShowCorrect(false);
  };

  return (
    <div className="relative z-10 pt-20 pb-16 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          {/* SUBJECT SELECT */}
          {phase === "select" && (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="pt-16"
            >
              <div className="text-center mb-12">
                <span className="font-mono text-xs tracking-[0.4em] text-text-muted block mb-4">
                  // SELECT ARENA
                </span>
                <h1 className="text-4xl font-bold tracking-tight">
                  CHOOSE YOUR <span className="text-cyan glow-text">SUBJECT</span>
                </h1>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
                {subjects.map((s, i) => (
                  <motion.button
                    key={s}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedSubject(s)}
                    className={`border p-5 font-mono text-sm tracking-wider transition-all duration-200 text-left ${
                      selectedSubject === s
                        ? "border-cyan bg-cyan/5 text-cyan glow-border"
                        : "border-border bg-bg-card text-text-secondary hover:border-text-muted hover:text-text-primary"
                    }`}
                  >
                    {s}
                    <div className="text-[10px] text-text-muted mt-1">GCSE</div>
                  </motion.button>
                ))}
              </div>

              <div className="flex justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => selectedSubject && setPhase("matchmaking")}
                  disabled={!selectedSubject}
                  className={`font-mono text-sm tracking-wider px-10 py-3 border-2 transition-all duration-200 ${
                    selectedSubject
                      ? "border-cyan bg-cyan text-bg-primary hover:bg-transparent hover:text-cyan"
                      : "border-border text-text-muted cursor-not-allowed"
                  }`}
                >
                  ⚔️ FIND OPPONENT
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedSubject("MIXED");
                    setTimeout(() => setPhase("matchmaking"), 100);
                  }}
                  className="font-mono text-sm tracking-wider px-10 py-3 border border-magenta text-magenta hover:bg-magenta/5 transition-colors duration-200"
                >
                  🤖 VS AI
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* MATCHMAKING */}
          {phase === "matchmaking" && (
            <motion.div
              key="matchmaking"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="pt-32 text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 border-2 border-cyan border-t-transparent mx-auto mb-8"
                style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
              />

              <h2 className="font-mono text-xl tracking-wider text-cyan glow-text mb-2">
                SEARCHING FOR OPPONENT
              </h2>
              <p className="font-mono text-sm text-text-muted mb-1">
                {selectedSubject} — GCSE
              </p>
              <motion.p
                className="font-mono text-3xl text-text-secondary tabular-nums"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {searchTime}s
              </motion.p>

              <div className="mt-8 flex items-center justify-center gap-12">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 border-2 border-cyan clip-hex bg-bg-card flex items-center justify-center mx-auto mb-2">
                    <span className="font-mono text-lg text-cyan">YOU</span>
                  </div>
                  <span className="font-mono text-xs text-text-muted">1420 ELO</span>
                </motion.div>

                <motion.span
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="font-mono text-2xl text-text-muted"
                >
                  VS
                </motion.span>

                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-center"
                >
                  <div className="w-16 h-16 border-2 border-border clip-hex bg-bg-card flex items-center justify-center mx-auto mb-2">
                    <span className="font-mono text-lg text-text-muted">?</span>
                  </div>
                  <span className="font-mono text-xs text-text-muted">??? ELO</span>
                </motion.div>
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={resetBattle}
                className="font-mono text-xs text-text-muted mt-12 hover:text-text-secondary transition-colors"
              >
                CANCEL
              </motion.button>
            </motion.div>
          )}

          {/* BATTLE */}
          {phase === "battle" && (
            <motion.div
              key="battle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Score bar */}
              <div className="flex items-center justify-between py-4 mb-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border border-cyan clip-hex bg-bg-card flex items-center justify-center">
                    <span className="font-mono text-xs text-cyan">Y</span>
                  </div>
                  <div>
                    <span className="font-mono text-sm text-text-primary">YOU</span>
                    <span className="font-mono text-lg text-cyan ml-3">{playerScore}</span>
                  </div>
                </div>

                <div className="text-center">
                  <div className="font-mono text-[10px] tracking-[0.3em] text-text-muted">
                    Q{questionIndex + 1}/{totalQuestions}
                  </div>
                  <div className="font-mono text-xs text-text-muted mt-1">
                    {currentQuestion.subject}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="font-mono text-lg text-magenta mr-3">{opponentScore}</span>
                    <span className="font-mono text-sm text-text-primary">OPP</span>
                  </div>
                  <div className="w-8 h-8 border border-magenta clip-hex bg-bg-card flex items-center justify-center">
                    <span className="font-mono text-xs text-magenta">O</span>
                  </div>
                </div>
              </div>

              {/* Timer */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] text-text-muted">TIME</span>
                  <motion.span
                    className={`font-mono text-2xl tabular-nums ${
                      timer <= 5 ? "text-danger" : "text-text-primary"
                    }`}
                    animate={timer <= 5 ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.5, repeat: timer <= 5 ? Infinity : 0 }}
                  >
                    {timer}
                  </motion.span>
                </div>
                <div className="h-[3px] bg-bg-secondary">
                  <motion.div
                    className={`h-full ${timer <= 5 ? "bg-danger" : "bg-cyan"}`}
                    initial={{ width: "100%" }}
                    animate={{ width: `${(timer / 15) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Question */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={questionIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="border border-border bg-bg-card p-8 mb-6 hud-corners">
                    <span className="font-mono text-[10px] tracking-[0.3em] text-text-muted block mb-4">
                      // QUESTION {questionIndex + 1}
                    </span>
                    <h2 className="text-xl md:text-2xl font-bold text-text-primary leading-relaxed">
                      {currentQuestion.question}
                    </h2>
                  </div>

                  {/* Answers */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentQuestion.answers.map((a, i) => {
                      const isCorrect = i === currentQuestion.correct;
                      const isSelected = selected === i;
                      let borderClass = "border-border hover:border-cyan";
                      let textClass = "text-text-secondary hover:text-text-primary";

                      if (showCorrect) {
                        if (isCorrect) {
                          borderClass = "border-success";
                          textClass = "text-success";
                        } else if (isSelected && !isCorrect) {
                          borderClass = "border-danger";
                          textClass = "text-danger";
                        } else {
                          borderClass = "border-border";
                          textClass = "text-text-muted";
                        }
                      }

                      return (
                        <motion.button
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + i * 0.05 }}
                          whileHover={!showCorrect ? { scale: 1.02 } : {}}
                          whileTap={!showCorrect ? { scale: 0.98 } : {}}
                          onClick={() => handleAnswer(i)}
                          disabled={showCorrect}
                          className={`border bg-bg-card p-4 text-left font-mono text-sm tracking-wider transition-all duration-200 ${borderClass} ${textClass}`}
                        >
                          <span className="text-text-muted mr-3">
                            {String.fromCharCode(65 + i)}.
                          </span>
                          {a}
                          {showCorrect && isCorrect && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="float-right text-success"
                            >
                              ✓
                            </motion.span>
                          )}
                          {showCorrect && isSelected && !isCorrect && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="float-right text-danger"
                            >
                              ✗
                            </motion.span>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}

          {/* RESULT */}
          {phase === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="pt-24 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                {playerScore > opponentScore ? (
                  <>
                    <div className="font-mono text-6xl mb-4">⚔️</div>
                    <h1 className="text-5xl font-bold text-success mb-2">VICTORY</h1>
                    <p className="font-mono text-sm text-text-secondary">You dominated the arena</p>
                  </>
                ) : playerScore === opponentScore ? (
                  <>
                    <div className="font-mono text-6xl mb-4">🤝</div>
                    <h1 className="text-5xl font-bold text-gold glow-text-gold mb-2">DRAW</h1>
                    <p className="font-mono text-sm text-text-secondary">Evenly matched</p>
                  </>
                ) : (
                  <>
                    <div className="font-mono text-6xl mb-4">💀</div>
                    <h1 className="text-5xl font-bold text-danger mb-2">DEFEAT</h1>
                    <p className="font-mono text-sm text-text-secondary">Better luck next time</p>
                  </>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-10 border border-border bg-bg-card p-6 max-w-sm mx-auto"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-center">
                    <div className="font-mono text-3xl text-cyan">{playerScore}</div>
                    <div className="font-mono text-[10px] text-text-muted mt-1">YOU</div>
                  </div>
                  <div className="font-mono text-text-muted">—</div>
                  <div className="text-center">
                    <div className="font-mono text-3xl text-magenta">{opponentScore}</div>
                    <div className="font-mono text-[10px] text-text-muted mt-1">OPP</div>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="font-mono text-[10px] tracking-[0.3em] text-text-muted mb-1">
                    ELO CHANGE
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, type: "spring" }}
                    className={`font-mono text-2xl ${
                      playerEloChange > 0
                        ? "text-success"
                        : playerEloChange < 0
                        ? "text-danger"
                        : "text-text-muted"
                    }`}
                  >
                    {playerEloChange > 0 ? "+" : ""}
                    {playerEloChange}
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-10 flex items-center justify-center gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setPhase("matchmaking");
                    setSearchTime(0);
                  }}
                  className="font-mono text-sm tracking-wider border-2 border-cyan bg-cyan text-bg-primary px-8 py-3 hover:bg-transparent hover:text-cyan transition-colors duration-200"
                >
                  REMATCH
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetBattle}
                  className="font-mono text-sm tracking-wider border border-border text-text-secondary px-8 py-3 hover:border-text-muted hover:text-text-primary transition-colors duration-200"
                >
                  CHANGE SUBJECT
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
