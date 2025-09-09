"use client";

import { motion } from "framer-motion";
import { CheckCircle, GitBranch, FileCode } from "lucide-react";

export default function BenchmarkMethodology() {
  const benchmarks = [
    {
      project: "Chat Platform",
      method: "k6 WebSocket tests, 100+ concurrent (local synthetic)",
      metrics: "P50/P95/P99 latency (~186ms P95), cache hit (~73%), cost reduction (~70%)",
      link: "https://github.com/cbratkovics/chatbot-ai-system/tree/main/benchmarks/results"
    },
    {
      project: "RAG System",
      method: "Custom eval sets, production metrics",
      metrics: "P95 <200ms, 42% cache hit, Docker −88%",
      link: "https://github.com/cbratkovics/document-intelligence-ai#key-performance-metrics"
    },
    {
      project: "Fantasy AI",
      method: "Historical data, k-fold cross-validation",
      metrics: "93.1% accuracy, 100+ features, <100ms cached",
      link: "https://github.com/cbratkovics/fantasy-football-ai#verified-production-metrics"
    },
    {
      project: "NBA Predictions",
      method: "169K+ game records, time-aware validation",
      metrics: "R² 0.942 (points), P95 87ms",
      link: "https://github.com/cbratkovics/nba-ai-ml#model-performance"
    }
  ];

  return (
    <section className="py-12 px-4 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <div className="glassmorphism p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-6">
            <FileCode className="w-6 h-6 text-green-400" />
            <h3 className="text-xl font-semibold text-white">Benchmark Methodology</h3>
          </div>
          
          <p className="text-gray-400 mb-6">
            Local synthetic benchmarks on developer hardware. We publish P50/P95/P99, 
            cache hit rate, and cost deltas. See linked JSON artifacts for reproducibility.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benchmarks.map((bench) => (
              <a
                key={bench.project}
                href={bench.link}
                target="_blank"
                rel="noopener noreferrer"
                className="glassmorphism p-4 rounded-lg hover:bg-white/5 transition-all"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
                  <div>
                    <h4 className="text-white font-medium mb-1">{bench.project}</h4>
                    <p className="text-xs text-gray-400 mb-2">{bench.method}</p>
                    <p className="text-xs text-cyan-400">{bench.metrics}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <GitBranch className="w-4 h-4" />
              <span>Re-run steps and artifacts linked on every project page</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}