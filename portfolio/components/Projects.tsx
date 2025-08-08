"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { Github, ExternalLink, ArrowUpRight, Zap, TrendingUp } from "lucide-react";

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <section id="projects" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Production Systems
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            ML systems built for scale, performance, and reliability in production environments
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative group"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="glassmorphism p-8 rounded-xl h-full transition-all duration-300 hover:shadow-2xl">
                <div className="absolute inset-0 gradient-bg opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-white group-hover:gradient-text transition-all duration-300">
                      {project.title}
                    </h3>
                    <div className="flex gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 glassmorphism rounded-lg hover:scale-110 transition-transform"
                        >
                          <Github className="w-5 h-5 text-gray-300" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 glassmorphism rounded-lg hover:scale-110 transition-transform"
                        >
                          <ExternalLink className="w-5 h-5 text-gray-300" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="mb-4 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-lg inline-block">
                    <span className="text-lg font-semibold text-white flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      {project.heroMetric}
                    </span>
                  </div>

                  <p className="text-gray-300 mb-6">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {project.metrics.map((metric) => (
                      <div key={metric.label} className="glassmorphism p-3 rounded-lg">
                        <div className="text-xl font-bold text-white">
                          {metric.value}
                        </div>
                        <div className="text-xs text-gray-400">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {project.performance && (
                    <div className="mb-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Performance</span>
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-sm text-gray-300">{project.performance.before}</span>
                        <ArrowUpRight className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-semibold text-green-400">
                          {project.performance.after}
                        </span>
                      </div>
                      <div className="text-xs text-green-400 mt-1">
                        {project.performance.improvement}
                      </div>
                    </div>
                  )}

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Key Features</h4>
                    <ul className="space-y-1">
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="text-sm text-gray-300 flex items-start">
                          <span className="text-blue-400 mr-2">▸</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs rounded-full glassmorphism text-gray-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.architecture && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <span className="text-xs text-gray-400">Architecture: </span>
                      <span className="text-xs text-gray-300">{project.architecture}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}