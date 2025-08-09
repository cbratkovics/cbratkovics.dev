"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Activity, Zap, TrendingUp, Server } from "lucide-react";

export default function Hero() {
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

    animateCounter(setModels, 5, 1000);
    animateCounter(setAccuracy, 93, 1500);
    animateCounter(setLatency, 150, 1500);
    animateCounter(setDockerOpt, 54, 1800);
  }, []);

  const metrics = [
    {
      icon: <TrendingUp className="w-5 h-5" />,
      label: "Production Models",
      value: models + "+",
      color: "from-blue-400 to-cyan-400",
      tooltip: "XGBoost, LightGBM, Neural Networks deployed in production environments"
    },
    {
      icon: <Activity className="w-5 h-5" />,
      label: "Prediction Accuracy",
      value: accuracy + "%",
      color: "from-purple-400 to-pink-400",
      tooltip: "93.1% accuracy on Fantasy Football AI ensemble model"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      label: "Avg API Latency",
      value: `<${latency}ms`,
      color: "from-green-400 to-emerald-400",
      tooltip: "FastAPI with Redis caching achieving sub-150ms response times"
    },
    {
      icon: <Server className="w-5 h-5" />,
      label: "Docker Optimization",
      value: dockerOpt + "%",
      color: "from-orange-400 to-red-400",
      tooltip: "Reduced container size from 3.3GB to 1.5GB through multi-stage builds"
    }
  ];

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
          className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto"
        >
          Building Production ML Systems That Ship | All Metrics Verifiable via GitHub
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              className="glassmorphism p-4 rounded-xl"
            >
              <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${metric.color} mb-2`}>
                {metric.icon}
              </div>
              <div className="text-2xl font-bold text-white mb-1" title={metric.tooltip}>
                {metric.value}
              </div>
              <div className="text-xs text-gray-400" title={metric.tooltip}>
                {metric.label}
              </div>
            </motion.div>
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
            href="#contact"
            className="px-8 py-3 glassmorphism text-white font-semibold rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-white/20"
          >
            Get In Touch
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