"use client";

import { motion } from "framer-motion";
import { Calendar, GitMerge, RefreshCw, Target } from "lucide-react";

const highlights = [
  {
    icon: Calendar,
    value: "7+ years",
    label: "Enterprise analytics",
    description: "A continuous path from reporting foundations to modeling and production data products"
  },
  {
    icon: GitMerge,
    value: "5 sources",
    label: "Unified for reporting",
    description: "Advertising-platform data modeled in Snowflake/dbt for production Sigma reporting"
  },
  {
    icon: Target,
    value: "Decision support",
    label: "Retention and inventory",
    description: "Models, segments, mappings, and peer comparisons built to surface analytical priorities"
  },
  {
    icon: RefreshCw,
    value: "Output restored",
    label: "Operational AI recovery",
    description: "Stale source dependencies diagnosed, corrected with collaborators, and validated"
  }
];

export default function Impact() {
  return (
    <section id="impact" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 matrix-bg" />
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Delivery highlights</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Concrete scope and outcomes, without substituting activity counts for business impact</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map(({ icon: Icon, ...highlight }) => (
            <article key={highlight.label} className="glassmorphism-strong p-6 rounded-xl">
              <Icon className="w-7 h-7 text-cyan-400 mb-5" aria-hidden="true" />
              <p className="text-2xl font-bold text-white mb-2">{highlight.value}</p>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">{highlight.label}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{highlight.description}</p>
            </article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
