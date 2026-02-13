"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ProjectCard from "./components/ProjectCard";

export default function Home() {
  const projects = Array.from({ length: 6 });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <main className="relative min-h-screen bg-[#070707] text-white px-6 md:px-16 py-12 overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-white/5 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-neutral-500/10 blur-[120px] rounded-full" />
      </div>

      {/* Hero */}
      <section className="relative max-w-4xl mx-auto mb-32">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-7xl font-semibold tracking-tight mb-6 bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent"
        >
          Oscar Jones
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-lg md:text-xl text-neutral-400 max-w-2xl"
        >
          Computer Science MSc student building clean, efficient systems and intelligent software.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-10 flex gap-4"
        >
          <Link
            href="#projects"
            className="px-6 py-3 rounded-2xl bg-white text-black text-sm hover:scale-105 active:scale-95 transition-transform duration-200 shadow-lg shadow-white/10"
          >
            View Projects
          </Link>

          <Link
            href="#contact"
            className="px-6 py-3 rounded-2xl border border-neutral-700 text-sm backdrop-blur-xl bg-white/5 hover:bg-white/10 transition"
          >
            Contact
          </Link>
        </motion.div>
      </section>

      {/* Projects */}
      <section id="projects" className="relative max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold mb-14 tracking-tight"
        >
          Selected Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((_, index) => (
            <ProjectCard
              key={index}
              title={`Project ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="relative max-w-4xl mx-auto mt-36 pt-12 border-t border-white/10"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold mb-6 tracking-tight"
        >
          Contact
        </motion.h2>

        <p className="text-neutral-400 mb-4">
          Replace this section with your email, LinkedIn, and GitHub.
        </p>
      </section>

      {/* Footer */}
      <footer className="relative max-w-6xl mx-auto mt-24 pt-12 border-t border-white/10 text-sm text-neutral-600">
        © {new Date().getFullYear()} Oscar Jones. All rights reserved.
      </footer>
    </main>
  );
}