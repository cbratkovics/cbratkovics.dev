import { ProvenanceChip } from "./ProvenanceChip";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";
import type { Metric } from "@/types/metrics";
import { ReactNode } from "react";

interface StatProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  tooltip?: string;
  metric?: Metric;
  showProvenance?: boolean;
  colorClass?: string;
}

export function Stat({
  label,
  value,
  icon,
  tooltip,
  metric,
  showProvenance = false,
  colorClass = "from-blue-400 to-cyan-400"
}: StatProps) {
  const content = (
    <div className="glassmorphism p-6 rounded-xl min-h-[160px] flex flex-col justify-center items-center text-center">
      {icon && (
        <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${colorClass} mb-2`}>
          <div className="w-6 h-6 flex items-center justify-center">
            {icon}
          </div>
        </div>
      )}
      <div className="flex items-center gap-2">
        <div className="text-2xl font-bold text-white mb-1">
          {value}
        </div>
        {showProvenance && metric && (
          <ProvenanceChip
            provenance={metric.provenance}
            reproducible={metric.reproducible}
          />
        )}
      </div>
      <div className="text-xs text-gray-400">
        {label}
      </div>
      {metric?.note && (
        <div className="text-xs text-gray-500 mt-1">
          {metric.note}
        </div>
      )}
    </div>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {content}
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm max-w-xs">{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
}
