"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { skills } from "@/data/projects";
import { Brain, Database, Cloud, Cpu, Sparkles } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  "Core analytics engineering": <Cpu className="w-6 h-6" />,
  "Data products and quality": <Database className="w-6 h-6" />,
  "Modeling and validation": <Brain className="w-6 h-6" />,
  "Cloud and delivery": <Cloud className="w-6 h-6" />,
  "Applied AI and applications": <Sparkles className="w-6 h-6" />
};

const categoryColors: Record<string, string> = {
  "Core analytics engineering": "from-blue-400 to-cyan-400",
  "Data products and quality": "from-green-400 to-emerald-500",
  "Modeling and validation": "from-purple-400 to-pink-500",
  "Cloud and delivery": "from-orange-400 to-red-500",
  "Applied AI and applications": "from-cyan-400 to-blue-500"
};

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <section id="skills" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 tech-lines opacity-50" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Technical Skills
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Tools and methods I use across analytics engineering, modeling, and applied AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, items], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className={`glassmorphism p-6 rounded-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-cyan-400 ${
                selectedCategory === category ? "ring-2 ring-blue-500" : ""
              }`}
              onMouseEnter={() => setSelectedCategory(category)}
              onMouseLeave={() => setSelectedCategory(null)}
            >
              <div className="flex items-center mb-4">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${categoryColors[category]} mr-3`}>
                  {categoryIcons[category]}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white">{category}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm rounded-full glassmorphism text-gray-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
