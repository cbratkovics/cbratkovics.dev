"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function MinimalHero() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        {/* Name - Bold and Clear */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="gradient-text">Christopher J. Bratkovics</span>
        </h1>

        {/* Title */}
        <p className="text-2xl md:text-3xl text-gray-300 mb-6 font-semibold">
          Data Scientist → AI Engineer
        </p>

        {/* The Pitch - 2 Sentences Max */}
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12">
          I transform experimental AI into production-ready systems that deliver measurable business value.
          Building at the intersection of cutting-edge AI capabilities and practical engineering constraints—LLM orchestration, RAG architectures, and real-time inference pipelines with verified performance.
        </p>

        {/* CTA - Scroll to Projects */}
        <motion.a
          href="#projects"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="inline-flex items-center gap-2 px-8 py-4
                     bg-gradient-to-r from-blue-500 to-purple-600
                     hover:from-blue-600 hover:to-purple-700
                     text-white font-bold text-lg rounded-lg
                     shadow-lg hover:shadow-xl hover:scale-105
                     transition-all duration-300"
        >
          View Live Demos
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </motion.a>
      </motion.div>
    </section>
  );
}
