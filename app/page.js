"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/lib/cn";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Origin from "@/components/Origin";
import Azaman from "@/components/Azaman";
import BuildLog from "@/components/BuildLog";
import Stack from "@/components/Stack";
import Credentials from "@/components/Credentials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const SECTION_IDS = ["hero", "origin", "azaman", "builds", "stack", "credentials", "contact"];

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
      <Nav activeSection={activeSection} />
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
