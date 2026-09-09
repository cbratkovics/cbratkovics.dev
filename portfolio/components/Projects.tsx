"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";

export default function Projects() {
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
            Independent Technical Projects
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Self-directed work in forecasting, retrieval, and LLM applications, with source code on GitHub
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
            >
              <div className="glassmorphism p-6 md:p-8 rounded-xl h-full flex flex-col transition-all duration-300 hover:shadow-2xl">
                <div className="absolute inset-0 gradient-bg opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300" />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Header */}
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:gradient-text transition-all duration-300">
                      {project.title}
                    </h3>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} source on GitHub`}
                      className="p-2 glassmorphism rounded-lg hover:scale-110 transition-transform flex-shrink-0"
                    >
                      <Github className="w-5 h-5 text-gray-300" />
                    </a>
                  </div>

                  {project.status && (
                    <p className="text-xs uppercase tracking-wider text-gray-500 -mt-2 mb-4">
                      {project.status}
                    </p>
                  )}

                  {/* Screenshot */}
                  {project.image && project.liveUrl && (
                    <div className="mb-4 rounded-lg overflow-hidden border border-white/10 hover:border-white/20 transition-colors">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block relative group/image"
                      >
                        <img
                          src={project.image}
                          alt={`${project.title} interface`}
                          className="w-full h-auto group-hover/image:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                          <span className="text-white font-semibold flex items-center gap-2">
                            Open live demo
                            <ExternalLink className="w-4 h-4" />
                          </span>
                        </div>
                      </a>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {project.description}
                    {project.companion && (
                      <>
                        {" "}
                        {project.companion.lead}{" "}
                        <a
                          href={project.companion.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-2 hover:text-white transition-colors"
                        >
                          {project.companion.label}
                        </a>
                        .
                      </>
                    )}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs rounded-full glassmorphism text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-4 mt-auto border-t border-white/10">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5
                                   bg-gradient-to-r from-blue-500 to-purple-600
                                   hover:from-blue-600 hover:to-purple-700
                                   text-white font-semibold rounded-lg
                                   hover:shadow-xl hover:scale-105
                                   transition-all duration-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live demo</span>
                      </a>
                    )}

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 px-4 py-2.5
                                 text-sm text-gray-400 hover:text-white
                                 glassmorphism rounded-lg
                                 hover:bg-white/10 transition-all duration-300
                                 ${project.liveUrl ? "flex-shrink-0" : "flex-1"}`}
                    >
                      <Github className="w-4 h-4" />
                      <span>Source</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
