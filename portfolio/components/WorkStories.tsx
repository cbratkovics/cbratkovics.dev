const stories = [
  {
    id: "reporting-modernization",
    title: "Five-source reporting modernization",
    outcome: "A maintainable Snowflake/dbt foundation feeds production revenue and delivery reporting in Sigma.",
    problem: "Five differently shaped advertising source feeds needed consistent reporting without changing established financial and delivery definitions.",
    contribution: "I built source transformations, unified facts and reporting marts, inventory enrichment, source-specific deduplication, controlled backfills, and reusable reconciliation.",
    decision: "I preserved valid source differences in explicit layers so historical recovery and business validation remained traceable.",
    validation: "Validation covers date and source coverage, row counts, revenue, fees, impressions, plays, business calculations, and record-level exceptions across Vistar, Place Exchange, Hivestack DDA, Hivestack Programmatic, and ViOOH."
  },
  {
    id: "daily-occupancy",
    title: "Daily occupancy without double-counted capacity",
    outcome: "Built and validated daily programmatic occupancy and buy-type components at their intended reporting grains.",
    problem: "Activity split across sources and buy types can multiply shared inventory-day capacity when the grains are combined.",
    contribution: "I built the SSP components and their integration, collaborating with a data engineer who owns the shared-capacity and charted components.",
    decision: "We separated source activity from shared inventory-day capacity so extra activity groupings do not repeat the denominator.",
    validation: "Aggregation checks cover documented measurable populations and groupings; the completed components do not imply arbitrary-filter correctness or release of every downstream report."
  },
  {
    id: "advertiser-mappings",
    title: "Reviewable advertiser mappings",
    outcome: "Connected external advertiser data to internal reporting while keeping uncertain matches inspectable.",
    problem: "External advertiser names did not reliably join to internal accounts, while maximizing coverage could also increase false matches.",
    contribution: "Built Python/SQL workflows combining name normalization, exact and fuzzy matching, retained similarity scores, confidence tiers, and exceptions for review.",
    decision: "Exact matching resolves known names first; fuzzy matching handles remaining candidates without presenting similarity as labeled correctness.",
    validation: "Retained scores, confidence tiers, and exceptions make mapping coverage and review status visible without treating them as an accuracy measurement."
  },
  {
    id: "applied-modeling",
    title: "Applied modeling for retention and inventory decisions",
    outcome: "Produced analytical outputs for retention priorities, customer groups, inventory-performance gaps, and peer comparisons.",
    problem: "Business teams needed structured views of advertiser risk and uneven inventory utilization.",
    contribution: "I developed churn-risk models and K-means segmentation separately from inventory-utilization and revenue-per-unit regressions, then used peer comparisons to surface priorities.",
    decision: "The implementation keeps retention, segmentation, and inventory-performance questions distinct rather than presenting them as one model.",
    validation: "Outputs were reviewed as analytical decision support; no measured lift or universal adoption is attributed to them."
  },
  {
    id: "operational-ai",
    title: "Restoring executive financial-email output",
    outcome: "Restored application output after identifying stale source dependencies.",
    problem: "An application that turns financial pacing data into editable executive communications stopped producing valid output.",
    contribution: "Traced invalid financial-email output to stale source views, coordinated the correction with the data team, and validated the restored application output.",
    decision: "The correction addressed the source dependency instead of masking the problem with prompt or interface changes.",
    validation: "Application output was checked after the cross-team source correction, preserving the boundary between operational support and broader application ownership."
  }
];

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
