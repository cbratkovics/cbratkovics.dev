import { Briefcase, GraduationCap } from "lucide-react";
import { experience, education } from "@/data/projects";

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 tech-lines opacity-50" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Experience
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Progression from business-critical reporting into applied modeling, operational AI, and production data-product ownership
          </p>
        </div>

        <div className="space-y-6">
          {experience.map((role) => (
            <article
              key={role.id}
              className="glassmorphism p-6 md:p-8 rounded-xl"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-5">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-blue-400 to-cyan-400 flex-shrink-0">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-white">
                      {role.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-gray-400 mt-2">
                      <span className="font-medium text-gray-300">{role.company}</span>
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-400 md:text-right md:whitespace-nowrap md:pt-1">
                  {role.period}
                </span>
              </div>

              <p className="text-gray-300 leading-relaxed mb-5">{role.summary}</p>
              <ol className="space-y-3 border-l border-white/10 pl-5">
                {role.milestones.map((milestone) => (
                  <li key={`${role.id}-${milestone.date}`} className="text-gray-300 leading-relaxed">
                    <span className="block text-cyan-400 text-sm font-semibold mb-1">{milestone.date}</span>
                    <span
                      className="text-sm md:text-base">{milestone.text}</span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>

        <div className="glassmorphism p-6 md:p-8 rounded-xl mt-6">
          <div className="flex items-center gap-4 mb-5">
            <div className="p-2 rounded-lg bg-gradient-to-r from-purple-400 to-pink-500 flex-shrink-0">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-white">Education</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {education.map((entry) => (
              <div
                key={entry.institution}
                className="glassmorphism p-4 rounded-lg"
              >
                <p className="text-white font-medium">
                  {entry.credential}
                </p>
                <p className="text-gray-400 text-sm mt-1">{entry.institution}</p>
                <p className="text-gray-500 text-sm mt-1">{entry.date}</p>
                {entry.detail && <p className="text-gray-400 text-sm mt-1">{entry.detail}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
