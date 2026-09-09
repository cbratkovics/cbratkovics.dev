"use client";

import { motion } from "framer-motion";
import { Clock, Calendar, Database, GitMerge } from "lucide-react";

export default function Impact() {
  const impactMetrics = [
    {
      icon: <Calendar className="w-8 h-8" />,
      value: "7+",
      label: "Years in Enterprise Analytics",
      description: "Data science and analytics engineering at OUTFRONT Media",
      color: "from-blue-400 to-cyan-400"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      value: "20+",
      label: "Weekly Hours Saved",
      description: "Recurring reporting workflows automated with Python ETL",
      color: "from-purple-400 to-pink-400"
    },
    {
      icon: <GitMerge className="w-8 h-8" />,
      value: "5",
      label: "Advertising Sources Unified",
      description: "Production Snowflake and dbt pipeline feeding Sigma reporting",
      color: "from-green-400 to-emerald-400"
    },
    {
      icon: <Database className="w-8 h-8" />,
      value: "400K+",
      label: "Records Matched",
      description: "Fuzzy-matching workflow mapping advertisers to Snowflake IDs",
      color: "from-orange-400 to-red-400"
    }
  ];

  return (
    <section id="impact" className="py-20 px-4 relative overflow-hidden">
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
            Impact
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The scale of the analytics and data work I own day to day
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="glassmorphism-strong p-6 rounded-xl text-center group hover:scale-105 transition-all duration-300"
            >
              <div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${metric.color} mb-4 group-hover:scale-110 transition-transform`}
              >
                {metric.icon}
              </div>
              <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
              <div className="text-lg font-semibold text-gray-200 mb-1">{metric.label}</div>
              <div className="text-sm text-gray-400">{metric.description}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
