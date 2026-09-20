import Link from "next/link";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { projects, type Project } from "@/data/projects";

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3 pt-4 mt-auto border-t border-white/10">
      {!project.primaryAction && project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link"><ExternalLink className="w-4 h-4" aria-hidden="true" />{project.liveLabel ?? "Demo"}</a>}
      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link"><Github className="w-4 h-4" aria-hidden="true" />Source code</a>
      {project.evidence?.map((item) => <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer" className="project-link"><ExternalLink className="w-4 h-4" aria-hidden="true" />{item.label}</a>)}
    </div>
  );
}

function ProjectAction({ action, primary = false }: { action: NonNullable<Project["primaryAction"]>; primary?: boolean }) {
  const internal = action.url.startsWith("/");
  const className = primary
    ? "inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
    : "inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/20 text-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300";
  const contents = <>{internal ? <ArrowRight className="w-4 h-4" aria-hidden="true" /> : <ExternalLink className="w-4 h-4" aria-hidden="true" />}{action.label}</>;
  return internal ? <Link href={action.url} className={className}>{contents}</Link> : <a href={action.url} target="_blank" rel="noopener noreferrer" className={className}>{contents}</a>;
}

function ProjectCard({ project, flagship = false }: { project: Project; flagship?: boolean }) {
  return (
    <article className={`glassmorphism rounded-xl p-6 md:p-8 flex flex-col ${flagship ? "lg:grid lg:grid-cols-[1.1fr_.9fr] lg:gap-10" : ""}`}>
      <div>
        <p className="text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-3">{flagship ? "Flagship evidence" : project.featured ? "Featured project" : "Additional work"}</p>
        <h3 className="text-xl md:text-2xl font-bold text-white">{project.title}</h3>
        <p className="text-gray-200 leading-relaxed mt-4 font-medium">{project.summary}</p>
        <p className="text-gray-300 leading-relaxed mt-4"><span className="text-white font-semibold">Decision:</span> {project.narrative.decisionContext}</p>
        <div className="grid sm:grid-cols-2 gap-4 mt-5">
          <div className="rounded-lg border border-cyan-400/20 bg-cyan-400/5 p-4"><p className="text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2">{project.narrative.findingBasis === "Measured evaluation" ? "Measured finding" : project.narrative.findingBasis === "Illustrative example" ? "Illustrated finding" : "Key finding"}</p><p className="text-gray-100 leading-relaxed">{project.narrative.finding}</p><p className="text-gray-400 text-sm mt-2 leading-relaxed">{project.narrative.whyItMatters}</p></div>
          <div className="rounded-lg border border-purple-400/20 bg-purple-400/5 p-4"><p className="text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2">{project.narrative.recommendationStatus === "Proposed next step" ? "Proposed next step" : "Practical recommendation"}</p><p className="text-gray-100 leading-relaxed">{project.narrative.recommendation}</p></div>
        </div>
        {project.primaryAction && <div className="flex flex-wrap gap-3 mt-5"><ProjectAction action={project.primaryAction} primary />{project.secondaryAction && <ProjectAction action={project.secondaryAction} />}</div>}
      </div>
      <div className={`flex flex-col ${flagship ? "lg:border-l lg:border-white/10 lg:pl-10 mt-6 lg:mt-0" : "mt-5"}`}>
        <p className="text-sm text-gray-300 leading-relaxed"><span className="text-white font-semibold">What to inspect:</span> {project.inspect}</p>
        <details className="story-details mt-5"><summary>Implementation, evidence, and limitations</summary><div className="mt-4 space-y-3 text-sm text-gray-400 leading-relaxed"><p>{project.detail}</p>{project.narrative.validation && <p><span className="text-gray-200 font-semibold">Validation:</span> {project.narrative.validation}</p>}{project.narrative.limitations && <p><span className="text-gray-200 font-semibold">Limitations:</span> {project.narrative.limitations}</p>}</div></details>
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
