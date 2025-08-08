"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { metrics } from "@/data/projects";
import { Rocket, Clock, TrendingUp, DollarSign } from "lucide-react";

export default function Metrics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const [modelsDeployed, setModelsDeployed] = useState(0);
  const [accuracyImprovement, setAccuracyImprovement] = useState(0);
  const [costSavings, setCostSavings] = useState(0);
  const [predictionsServed, setPredictionsServed] = useState(0);

  useEffect(() => {
    if (!isInView) return;

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

    animateCounter(setModelsDeployed, metrics.modelsDeployed, 1500);
    animateCounter(setAccuracyImprovement, metrics.accuracyImprovement, 1500);
    animateCounter(setCostSavings, metrics.costSavings, 1500);
    animateCounter(setPredictionsServed, 1200000, 2000);
  }, [isInView]);

  const impactMetrics = [
    {
      icon: <Rocket className="w-8 h-8" />,
      value: `${modelsDeployed}+`,
      label: "Models Deployed",
      description: "Production ML models",
      color: "from-blue-400 to-cyan-400"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      value: `${metrics.deploymentTime.from} → ${metrics.deploymentTime.to}`,
      label: "Deployment Time",
      description: "Reduced time to production",
      color: "from-purple-400 to-pink-400"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: `${accuracyImprovement}%+`,
      label: "Accuracy Improvement",
      description: "Average model performance gain",
      color: "from-green-400 to-emerald-400"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      value: `${costSavings}%`,
      label: "Cost Savings",
      description: "Through optimization",
      color: "from-orange-400 to-red-400"
    }
  ];

  return (
    <section ref={ref} id="metrics" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 matrix-bg" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Engineering Impact
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Measurable results from production ML systems and engineering excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {impactMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="glassmorphism-strong p-6 rounded-xl text-center group hover:scale-105 transition-all duration-300"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${metric.color} mb-4 group-hover:scale-110 transition-transform`}>
                {metric.icon}
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {metric.value}
              </div>
              <div className="text-lg font-semibold text-gray-200 mb-1">
                {metric.label}
              </div>
              <div className="text-sm text-gray-400">
                {metric.description}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="glassmorphism p-8 rounded-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">
                {predictionsServed.toLocaleString()}+
              </div>
              <div className="text-gray-400">Total Predictions Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">
                {metrics.systemUptime}%
              </div>
              <div className="text-gray-400">Average System Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">
                24/7
              </div>
              <div className="text-gray-400">Monitoring & Support</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <h3 className="text-2xl font-semibold mb-4 text-white">
            Engineering Excellence
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Clean Architecture",
              "Test-Driven Development",
              "CI/CD Pipelines",
              "Performance Monitoring",
              "A/B Testing",
              "Feature Flags",
              "Disaster Recovery",
              "Auto-scaling"
            ].map((practice, index) => (
              <motion.span
                key={practice}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.05 }}
                className="px-4 py-2 glassmorphism rounded-full text-gray-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all duration-300"
              >
                {practice}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}