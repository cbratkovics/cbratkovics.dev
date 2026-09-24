import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { SITE } from "@/config/site";
import EvidenceLinks, { type EvidenceLink } from "@/components/case-study/EvidenceLinks";
import Section from "@/components/case-study/Section";
import FindingBlock from "@/components/case-study/FindingBlock";

const title = "EV Charging Data: Unified Schema | Christopher J. Bratkovics";
const description = "A dbt and DuckDB case study integrating three incompatible public EV charging datasets into a tested schema with contracts, quarantine, reconciliation, intentional utilization metrics, and evidence-backed findings.";
const path = "/projects/ev-charging-data-unified-schema";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, type: "article", url: path, siteName: SITE.shortTitle },
  twitter: { card: "summary_large_image", title, description },
};

const links: EvidenceLink[] = [
  { label: "Repository", href: "https://github.com/cbratkovics/ev-charging-data-unified-schema", icon: Github },
  { label: "dbt docs and lineage", href: "https://cbratkovics.github.io/ev-charging-data-unified-schema/", icon: ExternalLink },
  { label: "Findings", href: "https://github.com/cbratkovics/ev-charging-data-unified-schema/blob/main/docs/FINDINGS.md", icon: ExternalLink },
];

export default function EvChargingCaseStudy() {
  return <>
    <a href="#case-study-content" className="skip-link">Skip to case study</a>
    <div className="site-background" aria-hidden="true" />
    <header className="relative z-10 border-b border-white/10"><div className="max-w-5xl mx-auto px-4 py-5"><Link href="/#projects" className="project-link"><ArrowLeft className="w-4 h-4" aria-hidden="true" />Back to projects</Link></div></header>
    <main id="case-study-content" tabIndex={-1} className="case-study relative z-10 px-4 py-12 md:py-20">
      <article className="max-w-5xl mx-auto">
        <header className="max-w-4xl mb-14">
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">Independent project · Analytics engineering / Data quality</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white">EV Charging Data: Unified Schema</h1>
          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mt-6"><strong>Three public datasets in three incompatible shapes, conformed into one tested dbt schema, with every number traceable to evidence.</strong></p>
          <p className="text-cyan-300 font-semibold mt-5">As of v0.1.0</p>
          <div className="mt-6"><EvidenceLinks links={links} /></div>
        </header>

        <div className="case-study-prose">
          <Section title="The problem">
            <p>Consolidating differently shaped data feeds into one reliable reporting model is a pattern I work with professionally. I wanted a public example of it that anyone could inspect, so I built one on open data.</p>
            <p>The project uses three public operators’ charging-session logs. Each one has its own problems:</p>
            <ul><li><strong>Boulder, Colorado:</strong> one file holds two overlapping deliveries, and the timestamps come in mixed formats.</li><li><strong>Cary, North Carolina:</strong> timestamps are in true UTC, but there is no end time.</li><li><strong>UK Department for Transport:</strong> the release is split across four files whose headers, date formats, and duration units disagree.</li></ul>
            <p>None of the three publishes how many ports each station has. That means the denominator of every utilization figure has to be inferred.</p>
          </Section>

          <Section title="What I built">
            <p>As of v0.1.0, the pipeline lands 440,575 rows. It accepts 357,606 of them as sessions and quarantines the other 82,969. Every quarantined row is kept with its reasons, and nothing is dropped silently.</p>
            <ul><li><strong>Ingestion:</strong> each file is landed as strings with hashes, then checked against a declared contract per source.</li><li><strong>Warehouse:</strong> a bronze, silver, and gold dbt warehouse on DuckDB, with enforced contracts on the gold models, unit tests, and a quarantine.</li><li><strong>Station-day fact:</strong> built on a full date spine, with sessions split at local midnight and with daylight-saving days handled.</li><li><strong>Reconciliation:</strong> rows, sessions, and energy are reconciled from raw to gold, and every residual is classified.</li><li><strong>Claim checking:</strong> a CI check fails the build when a documented number has no committed artifact behind it.</li></ul>
            <p>The whole thing runs on GitHub Actions at no cost.</p>
            <p className="architecture-flow" aria-label="Data flow">Public source files <span>→</span> contract-aware landing <span>→</span> bronze <span>→</span> silver standardization <span>→</span> session fact / quarantine <span>→</span> station-day gold fact <span>→</span> reconciliation + claim artifacts <span>→</span> findings</p>
          </Section>

          <Section title="Three decisions that shaped it">
            <h3>Define the metric intentionally</h3><p>Utilization is a ratio, and ratios can’t be averaged across days. Every rollup sums the used minutes and the available minutes separately, then divides once. A test proves that the averaged version gives a different answer on this data.</p>
            <h3>Treat inferred capacity as a bound, not a fact</h3><ul><li>Port counts are the larger of two lower bounds: published connector IDs, and the concurrency a station reaches on at least five separate days.</li><li>Because ports can only be undercounted, the published utilization is an upper bound.</li><li>I publish the range across denominator definitions, not a single number:<ul><li>Boulder’s connected-time utilization is 11.4% under the production definition, and ranges from 10.5% to 12.4% across all of them.</li><li>The UK figure ranges from 8.7% to 11.4%.</li></ul></li></ul>
            <h3>Make incremental loads provably correct</h3><ul><li>A re-delivered file can change a value that is part of a session’s identity.</li><li>A row-by-row merge would count that session twice.</li><li>The session fact therefore replaces a whole source whenever any of its files change.</li><li>A test shows that a late re-delivery, with one changed value and one vanished row, produces the same result as a full rebuild.</li></ul>
          </Section>

          <Section title="What the data said">
            <div className="space-y-6">
              <FindingBlock title="Idle time is large, but most of it blocks nobody" why={<p>The headline idle figure overstates what an idle fee could recover by 3.6 times, and even the smaller number is a ceiling.</p>} recommendation={<ul><li>Quote the smaller figure, and say “up to.”</li><li>Pilot at multi-port stations around midday.</li><li>Queue data would change my view.</li></ul>}><ul><li>In Boulder, 45.1% of connected time is idle after charging ends.</li><li>Only up to 12.4% of connected time is idle while every inferred port was occupied.</li><li>That is up to 28% of the idle total.</li></ul></FindingBlock>
              <FindingBlock title="A publisher’s stated rule didn’t describe its own exclusions" why={<p>The publisher’s stated explanation does not fully describe the contents of the excluded file.</p>} recommendation={<p>Treat the publisher’s split as a label, keep every row, and apply one explicit rule of your own.</p>}><p>The UK publisher says it excluded zero-energy and very short sessions. Of the 48,619 rows in its excluded file:</p><ul><li>20,699 meet that rule.</li><li>17,677 are ordinary sessions excluded for unstated reasons.</li><li>9,258 are duplicates of events moved to another release.</li></ul></FindingBlock>
            </div>
          </Section>

          <Section title="Where the data proved the plan wrong"><ul><li><strong>Daylight-saving resolution:</strong> I assumed the database resolved ambiguous daylight-saving times to the first occurrence. An empirical test showed it uses the second.</li><li><strong>A phantom port:</strong> rounding a session end by up to thirty seconds created a port that did not exist at a single-port station. I caught it because two reports disagreed.</li><li><strong>A false reproducibility claim:</strong> after release, a reproducibility claim turned out to be false for two tables, because a non-deterministic pick was choosing station attributes. It now uses a majority rule with a tie-break, and a test that compares two independent builds byte for byte.</li></ul></Section>

          <Section title="How it was built"><p>The project was AI-assisted, using Claude Code. It worked under a written brief with phase-gated review, which means I approved or amended every phase. The brief and sixteen decision records are in the repository.</p><p>It is an independent project on open data and contains no employer code, data, or business rules.</p><p><strong>Stack:</strong> Python, SQL, dbt-core, DuckDB, pytest, GitHub Actions, GitHub Pages.</p><div className="mt-7"><EvidenceLinks links={links} /></div></Section>
        </div>
      </article>
    </main>
  </>;
}
