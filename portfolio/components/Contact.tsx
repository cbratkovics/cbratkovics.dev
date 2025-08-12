"use client";

import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

export default function Contact() {
  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="w-6 h-6" />,
      url: "https://github.com/cbratkovics",
      color: "hover:from-gray-600 hover:to-gray-800"
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-6 h-6" />,
      url: "https://linkedin.com/in/cbratkovics",
      color: "hover:from-blue-600 hover:to-blue-800"
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 tech-lines opacity-30" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto relative z-10"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Let&apos;s Build Together
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Ready to transform your ML models into production-ready systems? Let&apos;s discuss how I can help.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="glassmorphism-strong p-6 rounded-xl max-w-md w-full">
            <h3 className="text-xl font-semibold text-white mb-4">Quick Connect</h3>
            <p className="text-gray-400 mb-4 text-sm">
              View source code for all projects on GitHub - all metrics verifiable
            </p>
            <div className="space-y-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 p-3 glassmorphism rounded-lg hover:bg-gradient-to-r ${link.color} transition-all duration-300 group`}
                >
                  <div className="p-2 glassmorphism rounded-lg group-hover:scale-110 transition-transform">
                    {link.icon}
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {link.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 pt-8 border-t border-white/10 text-center"
        >
          <p className="text-gray-400">
            © {new Date().getFullYear()} Christopher Bratkovics. Built with Next.js, TypeScript, and Tailwind CSS.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            All achievements documented and open-source | Metrics verifiable via GitHub
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}