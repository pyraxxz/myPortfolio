"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import SocialIcons from "./SocialIcons";

export default function Nav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{
            backgroundColor: "color-mix(in srgb, var(--bg) 88%, transparent)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="max-w-screen-sm mx-auto px-6 py-3 flex items-center justify-between">
            <button
              onClick={() => scrollTo("hero")}
              className="font-display text-sm tracking-tight whitespace-nowrap text-foreground"
            >
              Sugru Taimako <span className="text-muted">(Pyrax)</span>
            </button>
            <div className="flex items-center gap-2">
              <SocialIcons size="nav" />
              <ThemeToggle />
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
