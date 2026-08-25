"use client";

import { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import ScrollStrand from "@/components/ScrollStrand";
import Hero from "@/components/Hero";
import Origin from "@/components/Origin";
import Azaman from "@/components/Azaman";
import BuildLog from "@/components/BuildLog";
import Stack from "@/components/Stack";
import Credentials from "@/components/Credentials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const SECTION_IDS = ["hero", "origin", "azaman", "builds", "stack", "credentials", "contact"];

const SECTION_LABELS = {
  hero: "Hero",
  origin: "Origin",
  azaman: "Azaman",
  builds: "Build Log",
  stack: "Stack",
  credentials: "Credentials",
  contact: "Contact",
};

export default function Page() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Nav />
      <ScrollStrand
        activeSection={activeSection}
        sectionIds={SECTION_IDS}
        sectionLabels={SECTION_LABELS}
      />
      <Hero />
      <Origin />
      <Azaman />
      <BuildLog />
      <Stack />
      <Credentials />
      <Contact />
      <Footer />
    </>
  );
}
