"use client";

import dynamic from "next/dynamic";
import MinimalHero from "@/components/MinimalHero";
import Experience from "@/components/Experience";
import WorkStories from "@/components/WorkStories";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Impact from "@/components/Impact";
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
          <MinimalHero />
        </div>

        <Experience />
        <WorkStories />
        <Projects />
        <Skills />
        <Impact />
        <Contact />
      </main>
    </>
  );
}
