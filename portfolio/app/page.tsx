"use client";

import dynamic from "next/dynamic";
import MinimalHero from "@/components/MinimalHero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import BenchmarkMethodology from "@/components/BenchmarkMethodology";
import Metrics from "@/components/Metrics";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";
import metricsDataRaw from "@/data/metrics.json";
import type { SiteMetrics } from "@/types/metrics";

const metricsData = metricsDataRaw as SiteMetrics;

const Particles = dynamic(() => import("@/components/Particles"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 z-0" />
});

export default function Home() {
  return (
    <>
      <Particles />
      <Navigation />
      <main className="relative z-10">
        {/* Minimal Hero - Just Name + Tagline */}
        <div id="home">
          <MinimalHero />
        </div>

        {/* Projects FIRST - The Main Event */}
        <Projects metricsData={metricsData} />

        {/* Everything else */}
        <Skills />
        <BenchmarkMethodology />
        <Metrics />
        <Contact />
      </main>
    </>
  );
}
