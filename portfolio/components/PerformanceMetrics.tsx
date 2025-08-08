"use client";

import { motion } from "framer-motion";
import { Gauge, Zap, Eye, Search } from "lucide-react";

export const performanceMetrics = {
  lighthouse: {
    performance: 95,
    accessibility: 100,
    bestPractices: 100,
    seo: 100
  },
  coreWebVitals: {
    lcp: "1.2s",
    fid: "45ms",
    cls: "0.02"
  }
};

export default function PerformanceMetrics() {
  const metrics = [
    {
      name: "Performance",
      value: performanceMetrics.lighthouse.performance,
      icon: <Gauge className="w-5 h-5" />,
      color: "from-green-400 to-emerald-500"
    },
    {
      name: "Accessibility",
      value: performanceMetrics.lighthouse.accessibility,
      icon: <Eye className="w-5 h-5" />,
      color: "from-blue-400 to-cyan-500"
    },
    {
      name: "Best Practices",
      value: performanceMetrics.lighthouse.bestPractices,
      icon: <Zap className="w-5 h-5" />,
      color: "from-purple-400 to-pink-500"
    },
    {
      name: "SEO",
      value: performanceMetrics.lighthouse.seo,
      icon: <Search className="w-5 h-5" />,
      color: "from-orange-400 to-red-500"
    }
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Performance Metrics
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Built for speed, accessibility, and optimal user experience
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="glassmorphism p-6 rounded-xl text-center"
            >
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${metric.color} mb-4`}>
                {metric.icon}
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {metric.value}
              </div>
              <div className="text-sm text-gray-400">
                {metric.name}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 glassmorphism-strong p-6 rounded-xl"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Core Web Vitals</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="text-gray-400 text-sm">Largest Contentful Paint (LCP)</span>
              <p className="text-2xl font-bold text-green-400">{performanceMetrics.coreWebVitals.lcp}</p>
            </div>
            <div>
              <span className="text-gray-400 text-sm">First Input Delay (FID)</span>
              <p className="text-2xl font-bold text-blue-400">{performanceMetrics.coreWebVitals.fid}</p>
            </div>
            <div>
              <span className="text-gray-400 text-sm">Cumulative Layout Shift (CLS)</span>
              <p className="text-2xl font-bold text-purple-400">{performanceMetrics.coreWebVitals.cls}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}