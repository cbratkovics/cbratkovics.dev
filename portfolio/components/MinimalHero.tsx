"use client";

import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

export default function MinimalHero() {
  return (
    <section className="min-h-[72vh] flex items-center px-4 pt-28 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto relative z-10 w-full"
      >
        <p className="text-cyan-400 font-semibold tracking-wide uppercase text-sm mb-4">
          7+ years in enterprise analytics
        </p>
        <h1 className="text-5xl md:text-7xl font-bold mb-5">
          <span className="gradient-text">Christopher J. Bratkovics</span>
        </h1>

        <p className="text-2xl md:text-4xl text-white mb-7 font-semibold">
          Data Scientist <span className="text-gray-500">|</span> Analytics Engineer <span className="text-gray-500">|</span> Applied AI
        </p>

        <p className="text-lg md:text-xl text-gray-300 max-w-4xl leading-relaxed mb-10">
          I build predictive models and production data products, translating fragmented business data into reliable reporting and analytical tools. At OUTFRONT Media, I own a five-platform Snowflake/dbt reporting foundation and develop Python-based solutions for advertiser retention, segmentation, and inventory performance.
        </p>

        <div className="flex flex-wrap gap-4">
          <motion.a
            href="#work"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 px-7 py-3
                     bg-gradient-to-r from-blue-500 to-purple-600
                     hover:from-blue-600 hover:to-purple-700
                     text-white font-semibold rounded-lg shadow-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
          >
            View selected work <ArrowDownRight className="w-5 h-5" />
          </motion.a>
          <a href="#experience" className="inline-flex items-center px-7 py-3 rounded-lg border border-white/20 text-gray-200 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">
            Career progression
          </a>
        </div>
      </motion.div>
    </section>
  );
}
