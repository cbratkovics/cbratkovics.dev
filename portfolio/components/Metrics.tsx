"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Rocket, Clock, TrendingUp, DollarSign } from "lucide-react";

export default function Metrics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const [hoursSaved, setHoursSaved] = useState(0);
  const [modelAccuracy, setModelAccuracy] = useState(0);
  const [processingSpeed, setProcessingSpeed] = useState(0);
  const [dataProcessed, setDataProcessed] = useState(0);

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

    animateCounter(setHoursSaved, 20, 1500);
    animateCounter(setModelAccuracy, 93, 1500);
    animateCounter(setProcessingSpeed, 500, 1500);
    animateCounter(setDataProcessed, 169, 2000);
  }, [isInView]);

  const impactMetrics = [
    {
      icon: <Clock className="w-8 h-8" />,
      value: `${hoursSaved}+`,
      label: "Weekly Hours Saved",
      description: "Through Python ETL automation in production",
      color: "from-blue-400 to-cyan-400"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: `${modelAccuracy}%`,
      label: "Model Accuracy",
      description: "Average across production models",
      color: "from-purple-400 to-pink-400"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      value: `${processingSpeed}`,
      label: "Players/Second",
      description: "Feature engineering pipeline speed",
      color: "from-green-400 to-emerald-400"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      value: `${dataProcessed}K+`,
      label: "Records Processed",
      description: "NBA game records in ETL pipeline",
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
            Real-World Production Impact
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Verifiable achievements from production ML systems and automation
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
                5+
              </div>
              <div className="text-gray-400">Production Models</div>
              <div className="text-xs text-gray-500 mt-1">Professional and personal projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">
                &lt;150ms
              </div>
              <div className="text-gray-400">Average API Latency</div>
              <div className="text-xs text-gray-500 mt-1">FastAPI with Redis</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">
                54%
              </div>
              <div className="text-gray-400">Docker Size Reduction</div>
              <div className="text-xs text-gray-500 mt-1">3.3GB → 1.5GB</div>
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
            Demonstrated Engineering Practices
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Clean Architecture",
              "Repository Pattern",
              "CI/CD with GitHub Actions",
              "Performance Monitoring",
              "Redis Caching",
              "Multi-tenant Design",
              "JWT Authentication",
              "Docker Optimization"
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