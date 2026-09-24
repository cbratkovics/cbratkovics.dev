import type { LucideIcon } from "lucide-react";

export interface EvidenceLink { label: string; href: string; icon: LucideIcon }

export default function EvidenceLinks({ links }: { links: EvidenceLink[] }) {
  return <div className="flex flex-wrap gap-3" aria-label="Project evidence links">{links.map(({ label, href, icon: Icon }) => <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-gray-100 hover:border-cyan-300/60 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"><Icon className="w-4 h-4" aria-hidden="true" />{label}<span className="sr-only"> (opens in a new tab)</span></a>)}</div>;
}
