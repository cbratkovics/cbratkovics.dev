import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { caseStudyMetadata } from "@/components/case-study/metadata";
import EvidenceLinks, { type EvidenceLink } from "@/components/case-study/EvidenceLinks";
import Section from "@/components/case-study/Section";
import FindingBlock from "@/components/case-study/FindingBlock";

const title = "Entity Resolution: Rules vs. Calibrated Classifier | Christopher J. Bratkovics";
const description = "A record-linkage case study matching MusicBrainz album release groups to Discogs masters against labelled ground truth: blocking completeness, a weighted rules baseline versus an isotonic-calibrated classifier, tiered decisions, review-queue cost, and coverage reported separately from accuracy.";
const path = "/projects/entity-resolution";

export const metadata: Metadata = caseStudyMetadata({ title, description, path });

const links: EvidenceLink[] = [
  { label: "Repository", href: "https://github.com/cbratkovics/entity-resolution", icon: Github },
  { label: "Results site", href: "https://cbratkovics.github.io/entity-resolution/", icon: ExternalLink },
  { label: "Findings", href: "https://github.com/cbratkovics/entity-resolution/blob/main/docs/FINDINGS.md", icon: ExternalLink },
  { label: "Methods card", href: "https://github.com/cbratkovics/entity-resolution/blob/main/docs/METHODS_CARD.md", icon: ExternalLink },
];

export default function EntityResolutionCaseStudy() {
  return <>
    <a href="#case-study-content" className="skip-link">Skip to case study</a>
    <div className="site-background" aria-hidden="true" />
    <header className="relative z-10 border-b border-white/10"><div className="max-w-5xl mx-auto px-4 py-5"><Link href="/#projects" className="project-link"><ArrowLeft className="w-4 h-4" aria-hidden="true" />Back to projects</Link></div></header>
    <main id="case-study-content" tabIndex={-1} className="case-study relative z-10 px-4 py-12 md:py-20">
      <article className="max-w-5xl mx-auto">
        <header className="max-w-4xl mb-14">
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">Independent project · Data science / Record linkage</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white">Entity Resolution: Rules vs. Calibrated Classifier</h1>
          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mt-6"><strong>Two matchers, one labelled truth set, and an honest answer to whether the learned model was worth it.</strong></p>
          <p className="text-cyan-300 font-semibold mt-5">As of v0.1.0</p>
          <div className="mt-6"><EvidenceLinks links={links} /></div>
        </header>

        <div className="case-study-prose">
          <Section title="The problem">
            <p>Linking records that describe the same entity across systems that never agreed on an identifier is a pattern I work with <Link href="/#work" className="text-cyan-300 underline decoration-cyan-300/40 underline-offset-4 hover:text-white">professionally</Link>. In that setting I could measure coverage, how many records got a match, but never accuracy, because there was no ground truth. I wanted a public version where accuracy could be measured.</p>
            <p>MusicBrainz and Discogs both catalogue albums independently, and MusicBrainz editors have linked 242,542 of its 2,324,821 album-type release groups to their Discogs masters. Those links are the labelled truth. Both datasets are CC0, so the whole thing is reproducible.</p>
            <p>Why it is hard:</p>
            <ul><li><strong>Titles</strong> differ by punctuation, edition, and language.</li><li><strong>Artist credits</strong> vary, various-artists compilations especially.</li><li><strong>One-to-many links</strong> exist in both directions: rare, but real.</li><li><strong>Most MusicBrainz records have no Discogs link at all</strong>, and an unlinked record is not evidence of a non-match.</li></ul>
          </Section>

          <Section title="What I built">
            <ul>
              <li><strong>Scope:</strong> album-type release groups only (482,514 sampled) against all Discogs masters; 241,752 truth pairs in scope. Singles, EPs, and a third source are on the roadmap.</li>
              <li><strong>Blocking:</strong> five keys unioned, then a per-record cap of 200 candidates. Pair completeness 96.3% before the cap, 96.2% after; the 240 truth pairs lost to the cap are counted, not hidden.</li>
              <li><strong>One normaliser</strong> shared by every method, so no matcher gets private preprocessing.</li>
              <li><strong>Three methods:</strong> an exact-match rule, a weighted-score rules baseline (the shape of what I use at work), and one scikit-learn classifier with isotonic calibration on a separate fold.</li>
              <li><strong>Tiered decisions:</strong> auto-accept, review, reject, with the review queue split into a floor part and an ambiguity part.</li>
              <li><strong>Warehouse:</strong> a dbt bronze/silver/gold warehouse on DuckDB carrying the mapping table and its tests; only the test-fold mapping is committed.</li>
              <li><strong>Number checker in CI:</strong> every cited figure in the docs must resolve to a committed artifact key, or the build fails.</li>
            </ul>
            <p className="architecture-flow" aria-label="Pipeline">CC0 dumps <span>→</span> deterministic sample + truth audit <span>→</span> normalise <span>→</span> block (cap 200) <span>→</span> pair features <span>→</span> fit / calibrate / test folds by MusicBrainz record <span>→</span> exact, rules, and learned tiers <span>→</span> artifacts <span>→</span> dbt bronze/silver/gold <span>→</span> findings and site</p>
          </Section>

          <Section title="Three decisions that shaped it">
            <h3>Choose a population where coverage and accuracy can disagree</h3><p>The first candidate for side A was Wikidata albums. Profiling showed its Discogs-linked population contained no unlinked records, so coverage would have equalled accuracy by construction and the coverage-versus-accuracy question could never be asked. MusicBrainz, sampled with a 0.50 unlinked share per side, was chosen instead (ADR 0001).</p>
            <h3>Evaluate at the grain where decisions are made</h3><p>Every decision and metric is per MusicBrainz record, so cross-validation folds are split by MusicBrainz record, not by Discogs master (ADR 0003). Rules thresholds were searched on fit-fold decisions; the classifier was trained on labelled pairs only and calibrated on its own fold.</p>
            <h3>Commit only what is reproducible and licensed</h3><p>First-release years come from MusicBrainz core tables because the convenient derived table ships under a non-commercial licence (ADR 0002). Only the test-fold mapping table is committed; the full mapping is a build output (ADR 0005). The full build’s ~13.8 GiB data peak does not fit a hosted runner, so CI verifies committed artifacts and the full build is owner-run.</p>
          </Section>

          <Section title="What the data said">
            <div className="space-y-6">
              <FindingBlock title="The rules baseline was the better single method" why={<p>A learned model is not automatically an upgrade. Here its measurable contribution was calibrated confidence and a review queue about a quarter the size, bought with lower recall, at different tier thresholds.</p>} recommendation={<ul><li>Keep the rules baseline as the reference method.</li><li>Switch to the classifier only if reviewer hours are the binding cost and you accept the recall you give up.</li><li>Do not compare the queues as if recall were equal.</li></ul>}><ul><li>On the test fold at auto-accept, rules scored precision 0.9946, recall 0.931, F1 0.962.</li><li>The calibrated classifier scored precision 0.9993, recall 0.850, F1 0.919.</li><li>Review queues: 25,076 pairs for rules, 6,016 for the classifier.</li></ul></FindingBlock>
              <FindingBlock title="Coverage is not accuracy" why={<p>In production matching, this is exactly the population a high match rate is built from. Without labels, a rising coverage number tells you nothing about false attribution.</p>} recommendation={<p>Report verified and unverified accepts as separate numbers, and treat the unverified share as review backlog, not as wins.</p>}><p>The rules method auto-accepted 4,501 pairs whose MusicBrainz record has no Discogs link. Those are unverified, and they appear in coverage counts only, never in precision, recall, or F1.</p></FindingBlock>
            </div>
          </Section>

          <Section title="Where the data proved the plan wrong"><ul><li><strong>Various-artists credits:</strong> the first feature version treated “Various Artists” credits as ordinary artist names and mismatched compilations. Canonicalising them to one token (ADR 0004, feature version 0.2.0) fixed it, and the earlier stages were re-run with sample membership and counts unchanged.</li><li><strong>The candidate cap has a price:</strong> the per-record cap of 200 dropped 240 truth pairs. They are counted in the blocking report rather than absorbed into “recall”.</li><li><strong>Calibration was still overconfident:</strong> the classifier’s pair-level probabilities were calibrated, but decision-level confidence, the probability of the <em>chosen</em> candidate, remained overconfident because selecting the maximum inflates it. The findings name this rather than smoothing it over.</li><li><strong>The hosted runner couldn’t hold the data:</strong> the planned full-build CI workflow was replaced by a verify-only workflow after measuring the data peak.</li></ul></Section>

          <Section title="How it was built"><p>The project was AI-assisted, using Claude Code under a written brief with phase-gated review, which means I approved or amended every phase. The brief and five decision records are in the repository, and the brief says so.</p><p>It is an independent project on CC0 data under an MIT licence and contains no employer code, data, or business rules.</p><p><strong>Stack:</strong> Python, SQL, scikit-learn, dbt-core, DuckDB, uv, pytest, GitHub Actions, GitHub Pages.</p><div className="mt-7"><EvidenceLinks links={links} /></div></Section>
        </div>
      </article>
    </main>
  </>;
}
