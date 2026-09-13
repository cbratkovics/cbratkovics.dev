import { Calendar, GitMerge, RefreshCw, Target } from "lucide-react";
import { deliveryHighlights } from "@/data/projects";

const iconMap = { calendar: Calendar, sources: GitMerge, target: Target, recovery: RefreshCw } as const;

export default function Impact() {
  return (
    <section id="impact" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 matrix-bg" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Delivery highlights</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Selected outcomes from production reporting, applied modeling, and operational AI.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {deliveryHighlights.map(({ icon, ...highlight }) => {
            const Icon = iconMap[icon];
            return (
              <article key={highlight.label} className="glassmorphism-strong p-6 rounded-xl">
                <Icon className="w-7 h-7 text-cyan-400 mb-5" aria-hidden="true" />
                <p className="text-2xl font-bold text-white mb-2">{highlight.value}</p>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">{highlight.label}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{highlight.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
