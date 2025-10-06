import { Badge } from "./badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";
import type { Provenance } from "@/types/metrics";

interface ProvenanceChipProps {
  provenance: Provenance;
  reproducible: boolean;
}

const PROVENANCE_CONFIG: Record<Provenance, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; tooltip: string }> = {
  repo_artifact: {
    label: "Verified JSON",
    variant: "default",
    tooltip: "Metric extracted from public GitHub artifact (JSON/CSV)"
  },
  readme_text: {
    label: "README",
    variant: "secondary",
    tooltip: "Metric stated in repository README"
  },
  commit_stats: {
    label: "Git Stats",
    variant: "outline",
    tooltip: "Metric derived from git commit statistics"
  },
  resume_internal: {
    label: "Internal",
    variant: "destructive",
    tooltip: "Internal employer metric (not publicly reproducible)"
  }
};

export function ProvenanceChip({ provenance, reproducible }: ProvenanceChipProps) {
  const config = PROVENANCE_CONFIG[provenance];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant={config.variant} className="text-xs">
            {config.label}
            {!reproducible && " ⚠️"}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">{config.tooltip}</p>
          {!reproducible && <p className="text-xs text-yellow-500">Not publicly reproducible</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
