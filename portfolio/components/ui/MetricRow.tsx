import { ProvenanceChip } from "./ProvenanceChip";
import type { Metric } from "@/types/metrics";

interface MetricRowProps {
  metric: Metric;
  showProvenance?: boolean;
}

export function MetricRow({ metric, showProvenance = true }: MetricRowProps) {
  const formattedValue = metric.unit
    ? `${metric.value}${metric.unit}`
    : metric.value;

  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-800/50 last:border-0">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-300">
            {metric.key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </span>
          {metric.note && (
            <span className="text-xs text-gray-500">({metric.note})</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-lg font-bold text-white">
          {formattedValue}
        </span>
        {showProvenance && (
          <ProvenanceChip
            provenance={metric.provenance}
            reproducible={metric.reproducible}
          />
        )}
      </div>
    </div>
  );
}
