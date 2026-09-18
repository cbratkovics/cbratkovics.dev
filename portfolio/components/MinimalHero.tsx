import { ArrowDownRight } from "lucide-react";
import { identity } from "@/data/projects";

export default function MinimalHero() {
  return (
    <section className="min-h-[72vh] flex items-center px-4 pt-28 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30" />

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        <p className="text-cyan-400 font-semibold tracking-wide uppercase text-sm mb-4">
          {identity.eyebrow}
        </p>
        <p className="text-xl text-white font-semibold mb-5">{identity.name}</p>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 max-w-5xl leading-tight gradient-text">{identity.valueProposition}</h1>
        <p className="text-xl md:text-2xl text-white mb-7 font-semibold">{identity.headline}</p>

        <p className="text-lg md:text-xl text-gray-300 max-w-4xl leading-relaxed mb-10">
          {identity.summary}
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href="#work"
            className="inline-flex items-center gap-2 px-7 py-3
                     bg-gradient-to-r from-blue-500 to-purple-600
                     hover:from-blue-600 hover:to-purple-700
                     text-white font-semibold rounded-lg shadow-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
          >
            Explore selected work <ArrowDownRight className="w-5 h-5" />
          </a>
          <a href="#projects" className="inline-flex items-center px-7 py-3 rounded-lg border border-white/20 text-gray-200 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">
            Explore projects
          </a>
        </div>
      </div>
    </section>
  );
}
