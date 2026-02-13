"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ===============================
   TERMINAL ENTRY
================================ */

function Terminal({ onEnter }: { onEnter: () => void }) {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState([
    "OscarOS v1.0",
    "Access portfolio?",
    "Type 'yes' to continue."
  ]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLines(prev => [...prev, `> ${input}`]);

    if (input.toLowerCase() === "yes") {
      setLines(prev => [...prev, "Access granted..."]);
      setTimeout(onEnter, 900);
    } else {
      setLines(prev => [...prev, "Access denied."]);
    }

    setInput("");
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center text-green-400 font-mono"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.4,
        filter: "blur(40px)"
      }}
      transition={{ duration: 1 }}
    >
      <div className="w-[720px] max-w-[92%] bg-[#050505] border border-green-500/20 rounded-xl p-6 shadow-2xl">
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}

        <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
          <span>&gt;</span>
          <input
            autoFocus
            value={input}
            onChange={e => setInput(e.target.value)}
            className="bg-transparent outline-none flex-1"
          />
        </form>
      </div>
    </motion.div>
  );
}

/* ===============================
   LIQUID GLASS PROJECT CARD
================================ */

function GlassCard({ title }: { title: string }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="
        backdrop-blur-2xl
        bg-white/[0.05]
        border border-white/10
        rounded-3xl
        p-6
        shadow-xl
        hover:bg-white/[0.08]
        transition
      "
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-neutral-400 mt-2 text-sm">
        Clean architecture. Efficient systems. Intelligent software.
      </p>
    </motion.div>
  );
}

/* ===============================
   MAIN PORTFOLIO UI
================================ */

function PortfolioUI() {
  const projects = [
    "MLAPS Cryptography System",
    "Card Simulation Engine",
    "Neural Network Experiments",
    "Java Concurrency Visualiser",
    "SQL Analytics Toolkit",
    "Portfolio OS"
  ];

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen bg-[#070707] text-white px-6 md:px-16 py-16 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/5 blur-[160px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-neutral-500/10 blur-[140px] rounded-full" />
      </div>

      {/* HERO */}
      <section className="max-w-4xl mx-auto mb-28 relative">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="
            text-6xl md:text-7xl
            font-semibold
            tracking-tight
            bg-gradient-to-r from-white to-neutral-500
            bg-clip-text text-transparent
          "
        >
          Oscar Jones
        </motion.h1>

        <p className="text-neutral-400 text-lg mt-6 max-w-2xl">
          Computer Science MSc student building clean, efficient systems
          and intelligent software.
        </p>
      </section>

      {/* PROJECTS */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-12 tracking-tight">
          Selected Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <GlassCard key={i} title={p} />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-6xl mx-auto mt-28 pt-10 border-t border-white/10 text-neutral-600 text-sm">
        © {new Date().getFullYear()} Oscar Jones
      </footer>
    </motion.main>
  );
}

/* ===============================
   PAGE CONTROLLER
================================ */

export default function Home() {
  const [entered, setEntered] = useState(false);

  return (
    <div className="bg-black">
      <AnimatePresence mode="wait">
        {!entered ? (
          <Terminal key="terminal" onEnter={() => setEntered(true)} />
        ) : (
          <PortfolioUI key="portfolio" />
        )}
      </AnimatePresence>
    </div>
  );
}

