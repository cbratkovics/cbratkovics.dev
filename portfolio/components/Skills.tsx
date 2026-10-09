import { skills } from "@/data/projects";
import { Brain, Database, Cloud, Cpu, Sparkles } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  "Core analytics engineering": <Cpu className="w-6 h-6" />,
  "Data modeling & reliability": <Database className="w-6 h-6" />,
  "Applied data science": <Brain className="w-6 h-6" />,
  "Platforms & development": <Cloud className="w-6 h-6" />,
  "Applied AI & applications": <Sparkles className="w-6 h-6" />
};

const categoryColors: Record<string, string> = {
  "Core analytics engineering": "from-blue-400 to-cyan-400",
  "Data modeling & reliability": "from-green-400 to-emerald-500",
  "Applied data science": "from-purple-400 to-pink-500",
  "Platforms & development": "from-orange-400 to-red-500",
  "Applied AI & applications": "from-cyan-400 to-blue-500"
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
            Analytics engineering first, with applied data science and AI depth. Tools span professional work and independent projects; SCD2, incremental processing, data contracts, and MotherDuck are demonstrated in independent projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, items]) => (
            <div
              key={category}
              className={`glassmorphism p-6 rounded-xl ${category === "Core analytics engineering" ? "md:col-span-2 lg:col-span-3 border border-cyan-400/20" : ""}`}
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
