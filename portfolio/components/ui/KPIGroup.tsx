import { Stat } from "./Stat";
import { Activity, TrendingUp, Zap, Server } from "lucide-react";
import type { HeroKPIs } from "@/types/metrics";

interface KPIGroupProps {
  kpis: HeroKPIs;
}

export function KPIGroup({ kpis }: KPIGroupProps) {
  const metrics = [
    {
      icon: <TrendingUp className="w-5 h-5" />,
      label: "Production Projects",
      value: kpis.projectsCount,
      colorClass: "from-blue-400 to-cyan-400",
      tooltip: "Projects with verified GitHub benchmarks"
    },
    {
      icon: <Activity className="w-5 h-5" />,
      label: "Best Model Accuracy",
      value: kpis.bestAccuracy > 0 ? `${kpis.bestAccuracy}%` : "N/A",
      colorClass: "from-purple-400 to-pink-400",
      tooltip: "Highest model accuracy across all projects (within ±3 points definition)"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      label: "Fastest P95 Latency",
      value: kpis.fastestP95ms > 0 ? `${kpis.fastestP95ms}ms` : "N/A",
      colorClass: "from-green-400 to-emerald-400",
      tooltip: "Fastest P95 latency across benchmark projects"
    },
    {
      icon: <Server className="w-5 h-5" />,
      label: "Docker Reduction (RAG)",
      value: kpis.dockerReductionPct > 0 ? `${kpis.dockerReductionPct}%` : "N/A",
      colorClass: "from-orange-400 to-red-400",
      tooltip: "Largest Docker image size reduction achieved"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Stat
          key={index}
          label={metric.label}
          value={metric.value}
          icon={metric.icon}
          colorClass={metric.colorClass}
          tooltip={metric.tooltip}
        />
      ))}
    </div>
  );
}
