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
  return (
    <section id="skills" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 tech-lines opacity-50" />

      <div
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
          {Object.entries(skills).map(([category, items]) => (
            <div
              key={category}
              className="glassmorphism p-6 rounded-xl"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
