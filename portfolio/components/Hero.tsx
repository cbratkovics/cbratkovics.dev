"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { KPIGroup } from "./ui/KPIGroup";
import { ProvenanceChip } from "./ui/ProvenanceChip";
import type { SiteMetrics } from "@/types/metrics";

interface HeroProps {
  metricsData: SiteMetrics;
}

export default function Hero({ metricsData }: HeroProps) {
  const [models, setModels] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [latency, setLatency] = useState(0);
  const [dockerOpt, setDockerOpt] = useState(0);

  useEffect(() => {
    const animateCounter = (setter: (value: number) => void, target: number, duration: number) => {
      const steps = 60;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    };

    animateCounter(setModels, metricsData.hero.projectsCount, 1000);
    animateCounter(setAccuracy, Math.floor(metricsData.hero.bestAccuracy), 1500);
    animateCounter(setLatency, metricsData.hero.fastestP95ms, 1500);
    animateCounter(setDockerOpt, metricsData.hero.dockerReductionPct, 1800);
  }, [metricsData]);

  // Get provenance chips data from actual metrics
  const getProvenanceChips = () => {
    const chips = [];

    // Find the accuracy metric
    const fantasyProject = metricsData.projects.find(p => p.title.includes('Fantasy'));
    if (fantasyProject) {
      const accuracyMetric = Object.values(fantasyProject.metrics).find(m => m.key === 'accuracy');
      if (accuracyMetric) {
        chips.push({
          label: 'Best Accuracy',
          provenance: accuracyMetric.provenance,
          reproducible: accuracyMetric.reproducible
        });
      }
    }

    // Find the P95 metric
    const nbaProject = metricsData.projects.find(p => p.title.includes('NBA'));
    if (nbaProject) {
      const p95Metric = Object.values(nbaProject.metrics).find(m => m.key === 'p95_latency_ms');
      if (p95Metric) {
        chips.push({
          label: 'P95 Latency',
          provenance: p95Metric.provenance,
          reproducible: p95Metric.reproducible
        });
      }
    }

    // Find the Docker metric
    const ragProject = metricsData.projects.find(p => p.title.includes('Document'));
    if (ragProject) {
      const dockerMetric = Object.values(ragProject.metrics).find(m => m.key === 'docker_reduction');
      if (dockerMetric) {
        chips.push({
          label: 'Docker Reduction',
          provenance: dockerMetric.provenance,
          reproducible: dockerMetric.reproducible
        });
      }
    }

    return chips;
  };

  const provenanceChips = getProvenanceChips();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 gradient-bg opacity-20" />
      <div className="absolute inset-0 cyber-grid" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-6xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="gradient-text">Christopher J. Bratkovics</span>
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-200 neon-glow">
            Data Scientist → AI Engineer
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-400 mb-4 max-w-3xl mx-auto"
        >
          I ship production LLM systems, RAG pipelines, and predictive models with verifiable benchmarks
        </motion.p>

        {/* About Me Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-4xl mx-auto mb-12 mt-8"
        >
          <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 md:p-8">
            <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                I bridge advanced analytics and reliable engineering to transform experimental AI into
                <span className="text-cyan-400 font-semibold"> production systems</span> that deliver real business value.
                From deploying ML models and RAG architectures to building low-latency inference pipelines, I thrive at the intersection of
                <span className="text-purple-400 font-semibold"> cutting-edge AI capabilities</span> and
                <span className="text-green-400 font-semibold"> practical engineering constraints</span>.
                My mission: ensure ML solutions are not just accurate in notebooks, but scalable, monitored, and
                impactful once deployed. The rapid evolution in generative AI energizes me, pushing boundaries
                while maintaining the discipline needed for production systems.
            </p>
          </div>
        </motion.div>

        {/* KPI Group with animated counters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-6"
        >
          <KPIGroup kpis={{
            projectsCount: models,
            bestAccuracy: accuracy + 0.1, // Show 93.1
            fastestP95ms: latency,
            dockerReductionPct: dockerOpt
          }} />
        </motion.div>

        {/* Evidence-First Provenance Strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mb-12 flex flex-wrap justify-center gap-2"
        >
          <span className="text-xs text-gray-500">Evidence sources:</span>
          {provenanceChips.map((chip, idx) => (
            <div key={idx} className="flex items-center gap-1">
              <span className="text-xs text-gray-400">{chip.label}:</span>
              <ProvenanceChip
                provenance={chip.provenance}
                reproducible={chip.reproducible}
              />
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#projects"
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            View Projects
          </a>
          <a
            href="https://github.com/cbratkovics"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 glassmorphism text-white font-semibold rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-white/20"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/cbratkovics"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 glassmorphism text-white font-semibold rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-white/20"
          >
            LinkedIn
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 flex flex-col items-center"
      >
        <span className="text-gray-400 text-sm mb-2">Scroll to explore</span>
        <ChevronDown className="w-6 h-6 text-gray-400 animate-bounce" />
      </motion.div>
    </section>
  );
}
