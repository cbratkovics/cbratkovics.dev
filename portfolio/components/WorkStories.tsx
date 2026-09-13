import { workStories as stories } from "@/data/projects";

export default function WorkStories() {
  return (
    <section id="work" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-20" aria-hidden="true" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12 max-w-3xl">
          <p className="text-cyan-400 font-semibold tracking-wide uppercase text-sm mb-3">Selected professional work</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Decisions behind the delivery</h2>
          <p className="text-gray-300 text-lg leading-relaxed">Production reporting, applied modeling, and operational AI work, with contribution and validation in context.</p>
        </div>
        <div className="space-y-5">
          {stories.map((story, index) => (
            <article id={story.id} key={story.id} className="glassmorphism rounded-xl p-6 md:p-8 scroll-target">
              <h3 className="text-2xl font-semibold text-white mb-2">{story.title}</h3>
              <p className="text-cyan-300 text-lg font-medium">{story.outcome}</p>
              <details className="story-details mt-5" open={index === 0}>
                <summary>Implementation and validation</summary>
                <dl className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-sm md:text-base leading-relaxed mt-5">
                  <div><dt>Business problem</dt><dd>{story.problem}</dd></div>
                  <div><dt>My contribution</dt><dd>{story.contribution}</dd></div>
                  <div><dt>Consequential decision</dt><dd>{story.decision}</dd></div>
                  <div><dt>Validation and result</dt><dd>{story.validation}</dd></div>
                </dl>
              </details>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
