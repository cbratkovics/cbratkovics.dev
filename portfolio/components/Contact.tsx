"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, FileDown, Send, Calendar } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:cbratkovics@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${formData.message}%0D%0A%0D%0AFrom: ${formData.email}`;
    window.location.href = mailtoLink;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
    },
    {
      name: "Email",
      icon: <Mail className="w-6 h-6" />,
      url: "mailto:cbratkovics@gmail.com",
      color: "hover:from-red-600 hover:to-pink-600"
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
            Let's Build Together
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Ready to transform your ML models into production-ready systems? Let's discuss how I can help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 glassmorphism rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 glassmorphism rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 glassmorphism rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glassmorphism-strong p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-white mb-4">Quick Connect</h3>
              <div className="space-y-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target={link.name !== "Email" ? "_blank" : undefined}
                    rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
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

            <div className="glassmorphism-strong p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-white mb-4">Download Resume</h3>
              <p className="text-gray-400 mb-4">
                Get a detailed overview of my experience, skills, and achievements.
              </p>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 glassmorphism rounded-lg hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-600 transition-all duration-300 text-gray-300 hover:text-white"
              >
                <FileDown className="w-5 h-5" />
                Download PDF
              </a>
            </div>

            <div className="glassmorphism-strong p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-white mb-4">Schedule a Call</h3>
              <p className="text-gray-400 mb-4">
                Let's discuss your ML engineering needs and how I can help.
              </p>
              <a
                href="https://calendly.com/cbratkovics"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 glassmorphism rounded-lg hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 transition-all duration-300 text-gray-300 hover:text-white"
              >
                <Calendar className="w-5 h-5" />
                Book a Meeting
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 pt-8 border-t border-white/10 text-center"
        >
          <p className="text-gray-400">
            © 2024 Christopher Bratkovics. Built with Next.js, TypeScript, and Tailwind CSS.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Turning ML models into production-ready systems.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}