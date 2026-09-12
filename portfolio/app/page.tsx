import MinimalHero from "@/components/MinimalHero";
import Experience from "@/components/Experience";
import WorkStories from "@/components/WorkStories";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Impact from "@/components/Impact";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="site-background" aria-hidden="true" />
      <Navigation />
      <main id="main-content" tabIndex={-1} className="relative z-10">
        <div id="home" className="scroll-target">
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
