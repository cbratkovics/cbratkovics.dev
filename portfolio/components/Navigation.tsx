"use client";

import { useEffect, useRef, useState } from "react";
import { BarChart3, Briefcase, Code, Home, Mail, Menu, User } from "lucide-react";

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "work", label: "Selected Work", icon: BarChart3 },
  { id: "projects", label: "Projects", icon: Code },
  { id: "skills", label: "Skills", icon: User },
  { id: "impact", label: "Highlights", icon: BarChart3 },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const syncHash = () => setActiveSection(window.location.hash.slice(1) || "home");
    syncHash();
    window.addEventListener("hashchange", syncHash);
    const media = window.matchMedia("(min-width: 1024px)");
    const closeAtDesktop = () => {
      detailsRef.current?.removeAttribute("open");
      setIsOpen(false);
    };
    media.addEventListener("change", closeAtDesktop);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActiveSection(visible.target.id);
    }, { rootMargin: "-20% 0px -65%", threshold: [0, 0.25, 0.5] });
    navItems.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => {
      window.removeEventListener("hashchange", syncHash);
      media.removeEventListener("change", closeAtDesktop);
      observer.disconnect();
    };
  }, []);

  const closeMenu = () => {
    detailsRef.current?.removeAttribute("open");
    setIsOpen(false);
  };

  return (
    <nav aria-label="Primary navigation" className="fixed top-0 left-0 right-0 z-50 glassmorphism-strong">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#home" className="text-xl font-bold gradient-text" aria-label="Christopher Bratkovics, home">CB</a>
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map(({ id, label, icon: Icon }) => (
            <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined}
              className="nav-link flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:text-white">
              <Icon className="w-4 h-4" aria-hidden="true" /><span>{label}</span>
            </a>
          ))}
        </div>
        <details ref={detailsRef} className="mobile-navigation lg:hidden" onToggle={(event) => setIsOpen(event.currentTarget.open)} onKeyDown={(event) => {
          if (event.key === "Escape" && detailsRef.current?.open) {
            closeMenu();
            summaryRef.current?.focus();
          }
        }}>
          <summary ref={summaryRef} aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={isOpen} aria-controls="mobile-navigation-panel" className="p-2 glassmorphism rounded-lg cursor-pointer">
            <Menu className="w-6 h-6" aria-hidden="true" />
          </summary>
          <div id="mobile-navigation-panel" className="absolute right-4 top-14 w-64 glassmorphism-strong rounded-xl p-4 shadow-2xl">
            {navItems.map(({ id, label, icon: Icon }) => (
              <a key={id} href={`#${id}`} onClick={closeMenu} aria-current={activeSection === id ? "location" : undefined}
                className="nav-link flex items-center gap-3 px-4 py-3 rounded-lg text-gray-200 hover:text-white">
                <Icon className="w-4 h-4" aria-hidden="true" /><span>{label}</span>
              </a>
            ))}
          </div>
        </details>
      </div>
    </nav>
  );
}
