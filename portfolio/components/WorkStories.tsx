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
          {stories.map((story) => (
            <article id={story.id} key={story.id} className="glassmorphism rounded-xl p-6 md:p-8 scroll-target">
              <h3 className="text-2xl font-semibold text-white mb-2">{story.title}</h3>
              <p className="text-gray-200 leading-relaxed mt-3"><span className="text-white font-semibold">Decision:</span> {story.narrative.decisionContext}</p>
              <div className="grid md:grid-cols-2 gap-4 mt-5">
                <div className="rounded-lg border border-cyan-400/20 bg-cyan-400/5 p-4"><p className="text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2">{story.narrative.findingBasis === "Measured evaluation" ? "Measured finding" : story.narrative.findingBasis === "Observed implementation" ? "Observed finding" : "Key finding"}</p><p className="text-gray-100 leading-relaxed">{story.narrative.finding}</p><p className="text-gray-400 text-sm leading-relaxed mt-2">{story.narrative.whyItMatters}</p></div>
                <div className="rounded-lg border border-purple-400/20 bg-purple-400/5 p-4"><p className="text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2">{story.narrative.recommendationStatus === "Proposed next step" ? "Proposed next step" : "Recommendation"}</p><p className="text-gray-100 leading-relaxed">{story.narrative.recommendation}</p></div>
              </div>
              <details className="story-details mt-5">
                <summary>Implementation and validation</summary>
                <dl className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-sm md:text-base leading-relaxed mt-5">
                  {story.narrative.ambiguity && <div><dt>Ambiguity or source problem</dt><dd>{story.narrative.ambiguity}</dd></div>}
                  {story.narrative.contribution && <div><dt>My contribution</dt><dd>{story.narrative.contribution}</dd></div>}
                  {story.narrative.validation && <div><dt>Validation</dt><dd>{story.narrative.validation}</dd></div>}
                  {story.narrative.deliveredOutcome && <div><dt>Delivered result</dt><dd>{story.narrative.deliveredOutcome}</dd></div>}
                  {story.narrative.limitations && <div><dt>Limitations</dt><dd>{story.narrative.limitations}</dd></div>}
                </dl>
              </details>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
