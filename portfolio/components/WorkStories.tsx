"use client";

import { motion } from "framer-motion";

const stories = [
  {
    title: "Five-source reporting modernization",
    outcome: "A maintainable Snowflake/dbt foundation now feeds production revenue and delivery reporting in Sigma.",
    problem: "Five differently shaped advertising-platform feeds had to support consistent reporting without changing established financial and delivery definitions.",
    contribution: "I built source-specific transformations, unified facts and reporting marts, inventory enrichment, deduplication, controlled reloads, historical backfills, and reusable reconciliation.",
    decision: "I preserved valid legacy logic in explicit layers rather than simplifying away source differences. That made recovered history and business validation traceable during migration.",
    scope: "The foundation covers Vistar, Place Exchange, Hivestack DDA, Hivestack Programmatic, and ViOOH. It does not imply that every downstream report or user population has completed rollout."
  },
  {
    title: "Daily occupancy without double-counted capacity",
    outcome: "Built and validated daily programmatic occupancy and buy-type model components for measured reporting grains.",
    problem: "Combining sales activity with shared inventory capacity can multiply the denominator when activity is split into additional categories.",
    contribution: "I own the supply-side platform components and their integration, and co-designed the sales-activity and shared-capacity approach with a data-engineering collaborator who owns the shared-capacity and charted components.",
    decision: "We kept activity and capacity components at intentional grains so shared capacity is not repeated merely because the activity is grouped differently.",
    scope: "Validation supports the documented aggregations and measurable populations, not arbitrary filter combinations or completion of every downstream report."
  },
  {
    title: "Reviewable advertiser entity resolution",
    outcome: "Reusable mappings connect external market data to internal reporting while keeping uncertain matches visible for review.",
    problem: "External advertiser names did not reliably join to internal accounts, and maximizing coverage could also increase false matches.",
    contribution: "I developed Python/SQL normalization, exact and fuzzy matching, retained similarity information, confidence tiers, and exception handling for human review.",
    decision: "The workflow exposes uncertainty rather than treating a similarity score as accuracy or a calibrated probability.",
    scope: "No record count or match-rate claim is shown because the dated comparison population and validation run were not resolved for publication."
  },
  {
    title: "Applied modeling for retention and inventory decisions",
    outcome: "Delivered analytical outputs that identify retention priorities, customer groups, inventory-performance gaps, and peer comparisons.",
    problem: "Business teams needed more structured ways to examine advertiser risk and uneven inventory utilization, not another undifferentiated dashboard.",
    contribution: "I developed Python churn-risk models and K-means segmentation separately from regression models for inventory utilization and revenue per unit, then used peer comparisons to surface analytical priorities.",
    decision: "The outputs preserve the different business questions rather than presenting segmentation and performance regression as one model.",
    scope: "These are implemented analytical deliverables, not claims of measured retention lift, incremental revenue, or universal adoption."
  },
  {
    title: "Operational AI recovery",
    outcome: "Restored a leadership-facing AI application's output after correcting stale source dependencies.",
    problem: "An application that turned financial pacing data into editable executive communications stopped producing valid output in production.",
    contribution: "I traced the failure across the application and data layers to stale source views, partnered with the data team on the correction, and validated the output before confirming recovery.",
    decision: "The incident was treated as a source-reliability problem rather than masked with prompt or interface changes.",
    scope: "The result demonstrates operational support and cross-layer debugging, not sole ownership, uptime, user-count, or cost-savings claims."
  }
];

export default function WorkStories() {
  return (
    <section id="work" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto relative z-10"
      >
        <div className="mb-12 max-w-3xl">
          <p className="text-cyan-400 font-semibold tracking-wide uppercase text-sm mb-3">Selected professional work</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Decisions behind the delivery</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Sanitized accounts of production reporting, applied modeling, and operational AI work. They describe my contribution and boundaries without exposing employer data or code.
          </p>
        </div>
        <div className="space-y-5">
          {stories.map((story) => (
            <article key={story.title} className="glassmorphism rounded-xl p-6 md:p-8">
              <h3 className="text-2xl font-semibold text-white mb-2">{story.title}</h3>
              <p className="text-cyan-300 text-lg font-medium mb-5">{story.outcome}</p>
              <dl className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-sm md:text-base leading-relaxed">
                <div><dt>Business problem</dt><dd>{story.problem}</dd></div>
                <div><dt>My contribution</dt><dd>{story.contribution}</dd></div>
                <div><dt>Consequential decision</dt><dd>{story.decision}</dd></div>
                <div><dt>Scope and validation boundary</dt><dd>{story.scope}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
