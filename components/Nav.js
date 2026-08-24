"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { id: "origin", label: "Origin" },
  { id: "azaman", label: "Azaman" },
  { id: "builds", label: "Builds" },
  { id: "stack", label: "Stack" },
  { id: "credentials", label: "Credentials" },
];

export default function Nav({ activeSection }) {
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
          <div className="max-w-screen-sm mx-auto px-6 py-3 flex items-center justify-between gap-3">
            <button
              onClick={() => scrollTo("hero")}
              className="font-display text-sm tracking-tight whitespace-nowrap text-foreground"
            >
              Sugru Taimako
            </button>

            <div className="flex items-center gap-3 sm:gap-5 overflow-x-auto no-scrollbar">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="font-mono text-xs tracking-wide whitespace-nowrap transition-colors duration-200"
                  style={{
                    color: activeSection === item.id ? "var(--accent)" : "var(--muted)",
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <ThemeToggle />
              <button
                onClick={() => scrollTo("contact")}
                className="font-mono text-xs tracking-wide px-3 py-1.5 rounded-full whitespace-nowrap transition-colors duration-200"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "var(--bg)",
                }}
              >
                Contact
              </button>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
