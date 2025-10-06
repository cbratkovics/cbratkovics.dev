"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { Badge } from "./ui/badge";
import { ProvenanceChip } from "./ui/ProvenanceChip";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { EvidenceList } from "./ui/EvidenceList";
import type { SiteMetrics } from "@/types/metrics";

interface ProjectsProps {
  metricsData: SiteMetrics;
}

const STAGE_CONFIG = {
  production: { label: "🟢 PRODUCTION", color: "bg-green-500/20 text-green-400 border-green-500/50" },
  synthetic_benchmark: { label: "🔵 SYNTHETIC", color: "bg-blue-500/20 text-blue-400 border-blue-500/50" },
  prototype: { label: "🟡 PROTOTYPE", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50" }
};

export default function Projects({ metricsData }: ProjectsProps) {
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
            ML systems built for scale, performance, and reliability — all metrics verifiable via GitHub
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {metricsData.projects.map((project, index) => {
            const stageConfig = STAGE_CONFIG[project.stage] || STAGE_CONFIG.synthetic_benchmark;
            const metricsList = Object.values(project.metrics);

            return (
              <motion.div
                key={project.repo}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="glassmorphism p-8 rounded-xl h-full transition-all duration-300 hover:shadow-2xl">
                  <div className="absolute inset-0 gradient-bg opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300" />

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white group-hover:gradient-text transition-all duration-300 mb-2">
                          {project.title}
                        </h3>
                        <Badge className={`${stageConfig.color} border`}>
                          {stageConfig.label}
                        </Badge>
                      </div>
                      <a
                        href={`https://github.com/${project.repo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 glassmorphism rounded-lg hover:scale-110 transition-transform"
                      >
                        <Github className="w-5 h-5 text-gray-300" />
                      </a>
                    </div>

                    {/* Summary */}
                    <p className="text-gray-300 mb-6">
                      {project.summary}
                    </p>

                    {/* Metrics Grid */}
                    {metricsList.length > 0 && (
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {metricsList.slice(0, 3).map((metric) => (
                          <div key={metric.key} className="glassmorphism p-3 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <div className="text-xl font-bold text-white">
                                {metric.value}{metric.unit || ''}
                              </div>
                              <ProvenanceChip
                                provenance={metric.provenance}
                                reproducible={metric.reproducible}
                              />
                            </div>
                            <div className="text-xs text-gray-400">
                              {metric.note || metric.key.replace(/_/g, ' ')}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs rounded-full glassmorphism text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 5 && (
                        <span className="px-3 py-1 text-xs rounded-full glassmorphism text-gray-400">
                          +{project.tech.length - 5} more
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t border-white/10">
                      {/* Evidence Drawer */}
                      {metricsList.length > 0 && (
                        <Drawer>
                          <DrawerTrigger asChild>
                            <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                              <ExternalLink className="w-4 h-4" />
                              <span>Evidence</span>
                            </button>
                          </DrawerTrigger>
                          <DrawerContent>
                            <DrawerHeader>
                              <DrawerTitle>{project.title} — Evidence Links</DrawerTitle>
                              <DrawerDescription>
                                Reproducible metrics with GitHub artifacts
                              </DrawerDescription>
                            </DrawerHeader>
                            <div className="p-4">
                              <EvidenceList metrics={metricsList} />
                            </div>
                          </DrawerContent>
                        </Drawer>
                      )}

                      {/* Case Study Link */}
                      {project.caseStudyPath && (
                        <a
                          href={project.caseStudyPath}
                          className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <span>Details</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}

                      {/* GitHub Link */}
                      <a
                        href={`https://github.com/${project.repo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors ml-auto"
                      >
                        <Github className="w-4 h-4" />
                        <span>Source</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
