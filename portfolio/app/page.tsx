"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Metrics from "@/components/Metrics";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";

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
        <div id="home">
          <Hero />
        </div>
        <Skills />
        <Projects />
        <Metrics />
        <Contact />
      </main>
    </>
  );
}