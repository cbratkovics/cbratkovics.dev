import { ExternalLink, Github } from "lucide-react";
import { projects, type Project } from "@/data/projects";

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3 pt-4 mt-auto border-t border-white/10">
      {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link"><ExternalLink className="w-4 h-4" aria-hidden="true" />{project.liveLabel ?? "Demo"}</a>}
      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link"><Github className="w-4 h-4" aria-hidden="true" />Source code</a>
      {project.evidence?.map((item) => <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer" className="project-link"><ExternalLink className="w-4 h-4" aria-hidden="true" />{item.label}</a>)}
    </div>
  );
}

function ProjectCard({ project, flagship = false }: { project: Project; flagship?: boolean }) {
  return (
    <article className={`glassmorphism rounded-xl p-6 md:p-8 flex flex-col ${flagship ? "lg:grid lg:grid-cols-[1.1fr_.9fr] lg:gap-10" : ""}`}>
      <div>
        <p className="text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-3">{flagship ? "Flagship evidence" : project.featured ? "Featured project" : "Additional work"}</p>
        <h3 className="text-xl md:text-2xl font-bold text-white">{project.title}</h3>
        <p className="text-gray-200 leading-relaxed mt-4 font-medium">{project.summary}</p>
        <p className="text-gray-400 text-sm leading-relaxed mt-3">{project.detail}</p>
      </div>
      <div className={`flex flex-col ${flagship ? "lg:border-l lg:border-white/10 lg:pl-10 mt-6 lg:mt-0" : "mt-5"}`}>
        <p className="text-sm text-gray-300 leading-relaxed"><span className="text-white font-semibold">What to inspect:</span> {project.inspect}</p>
        <div className="flex flex-wrap gap-2 my-5" aria-label={`${project.title} technologies`}>
          {project.tech.map((tech) => <span key={tech} className="px-3 py-1 text-xs rounded-full glassmorphism text-gray-300">{tech}</span>)}
        </div>
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}

export default function Projects() {
  const featured = projects.filter((project) => project.featured);
  const additional = projects.filter((project) => !project.featured);
  return (
    <section id="projects" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30" aria-hidden="true" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Independent Technical Projects</h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">Public implementations and scoped evidence—kept distinct from proprietary professional work.</p>
        </div>
        <div className="space-y-8">
          <ProjectCard project={featured[0]} flagship />
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">{featured.slice(1).map((project) => <ProjectCard key={project.id} project={project} />)}</div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-10">
          <h3 className="text-2xl font-semibold text-white mb-6">Additional work</h3>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">{additional.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
        </div>
      </div>
    </section>
  );
}
