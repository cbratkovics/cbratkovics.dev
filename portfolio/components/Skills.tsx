"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { skills } from "@/data/projects";
import { Brain, Database, Cloud, Code, Cpu, Layout } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  "ML/AI Engineering": <Brain className="w-6 h-6" />,
  "Backend & APIs": <Code className="w-6 h-6" />,
  "MLOps & Infrastructure": <Cloud className="w-6 h-6" />,
  "AI/LLM Systems": <Cpu className="w-6 h-6" />,
  "System Design": <Layout className="w-6 h-6" />,
  "Data & Tools": <Database className="w-6 h-6" />
};

const categoryColors: Record<string, string> = {
  "ML/AI Engineering": "from-blue-400 to-blue-600",
  "Backend & APIs": "from-purple-400 to-purple-600",
  "MLOps & Infrastructure": "from-orange-400 to-orange-600",
  "AI/LLM Systems": "from-pink-400 to-pink-600",
  "System Design": "from-cyan-400 to-cyan-600",
  "Data & Tools": "from-green-400 to-green-600"
};

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

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
            Technical Arsenal
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Demonstrated expertise in production ML systems - all skills verifiable through GitHub projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {Object.entries(skills).map(([category, items], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className={`glassmorphism p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                selectedCategory === category ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              onMouseEnter={() => setSelectedCategory(category)}
              onMouseLeave={() => setSelectedCategory(null)}
            >
              <div className="flex items-center mb-4">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${categoryColors[category]} mr-3`}>
                  {categoryIcons[category]}
                </div>
                <h3 className="text-xl font-semibold text-white">{category}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {items.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`px-3 py-1 text-sm rounded-full transition-all duration-300 ${
                      hoveredSkill === skill
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                        : "glassmorphism text-gray-300"
                    }`}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="glassmorphism-strong p-8 rounded-xl text-center"
        >
          <h3 className="text-2xl font-semibold mb-4 gradient-text">
            Production Focus
          </h3>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Specialized in building production-ready ML systems with 93% accuracy, &lt;150ms latency, 
            and 54% Docker optimization. Experienced in taking models from notebook to production 
            with proper engineering practices in production environments.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}