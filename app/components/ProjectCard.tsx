"use client";

import { motion } from "framer-motion";

type Props = {
  title: string;
};

export default function ProjectCard({ title }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-zinc-900 p-6 rounded-2xl shadow-lg cursor-pointer"
    >
      <h3 className="text-xl font-semibold text-white">
        {title}
      </h3>
      <p className="text-zinc-400 mt-2">
        Project description goes here.
      </p>
    </motion.div>
  );
}