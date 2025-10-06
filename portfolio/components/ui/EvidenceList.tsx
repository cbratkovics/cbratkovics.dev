"use client";

import { ExternalLink } from "lucide-react";
import type { Metric } from "@/types/metrics";

interface EvidenceListProps {
  metrics: Metric[];
}

export function EvidenceList({ metrics }: EvidenceListProps) {
  // Collect all evidence links from all metrics
  const allEvidence = metrics.flatMap(metric =>
    (metric.evidence || []).map(link => ({
      ...link,
      metricKey: metric.key,
      metricNote: metric.note
    }))
  );

  if (allEvidence.length === 0) {
    return (
      <div className="text-center text-gray-400 py-4">
        No public artifacts available for these metrics.
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {allEvidence.map((item, index) => (
        <div key={index} className="space-y-2">
          <div className="text-xs text-gray-500 uppercase tracking-wide">
            {item.metricKey.replace(/_/g, ' ')}
            {item.metricNote && ` — ${item.metricNote}`}
          </div>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/50 hover:bg-gray-800/50 transition-colors border border-gray-800"
          >
            <ExternalLink className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-200 truncate">
                {item.label}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {item.href}
              </p>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}
