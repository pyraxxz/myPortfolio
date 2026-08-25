"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const ROWS = [
  {
    label: "Languages",
    items: [
      { name: "C++", desc: "4+ yrs, since BiTT" },
      { name: "Python", desc: "5+ yrs, since BiTT" },
      { name: "Java", desc: "3+ yrs, OOP foundations" },
      { name: "Kotlin", desc: "Primary, Azaman Android" },
      { name: "Swift", desc: "Learning, iOS next" },
    ],
  },
  {
    label: "Platforms",
    items: [
      { name: "Android / Jetpack Compose", desc: "Primary, Azaman" },
      { name: "Flutter", desc: "Production, Azaman v1" },
    ],
  },
  {
    label: "Domain",
    items: [
      { name: "Fintech systems", desc: "P2P, escrow, Susu" },
      { name: "Payments logic", desc: "Escrow + credit scoring" },
      { name: "Vision AI tooling", desc: "Wayfinder, QA automation" },
    ],
  },
];

const COLLAPSED_COUNT = 2;

export default function Stack() {
  const reduceMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const [hoverKey, setHoverKey] = useState(null);

  return (
    <section id="stack" className="py-16">
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ type: "spring", stiffness: 150, damping: 19, mass: 1.2 }}
      >
        <p className="font-mono text-xs tracking-wider mb-3 text-accent">Node 05 · Stack</p>
        <h2 className="font-display text-2xl sm:text-3xl mb-8 text-foreground">
          Components on the tray.
        </h2>

        <div className="space-y-5">
          {ROWS.map((row, rowIdx) => {
            const visibleItems = expanded
              ? row.items
              : row.items.slice(0, COLLAPSED_COUNT);
            const hiddenCount = row.items.length - COLLAPSED_COUNT;

            return (
              <motion.div
                key={row.label}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: rowIdx * 0.08 }}
              >
                <p className="font-mono text-xs tracking-wide mb-2 text-muted">{row.label}</p>
                <div className="flex gap-2 flex-wrap">
                  {visibleItems.map((item) => {
                    const key = `${row.label}-${item.name}`;
                    const isOpen = hoverKey === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setHoverKey(isOpen ? null : key)}
                        onMouseEnter={() => setHoverKey(key)}
                        onMouseLeave={() => setHoverKey((k) => (k === key ? null : k))}
                        className={`skill-chip px-4 py-2 text-left ${isOpen ? "open" : ""}`}
                      >
                        <span className="text-sm font-medium block text-foreground">{item.name}</span>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.span
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden block"
                            >
                              <span className="font-mono text-xs whitespace-nowrap block mt-1 text-muted">
                                {item.desc}
                              </span>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </button>
                    );
                  })}
                  {/* Collapsed count badge */}
                  {!expanded && hiddenCount > 0 && (
                    <button
                      onClick={() => setExpanded(true)}
                      className="skill-chip px-3 py-2 text-left transition-colors"
                    >
                      <span className="font-mono text-xs text-muted">+{hiddenCount} more</span>
                    </button>
                  )}
                </div>

                {/* Expanded items */}
                <AnimatePresence initial={false}>
                  {expanded && row.items.length > COLLAPSED_COUNT && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="flex gap-2 flex-wrap mt-2">
                        {row.items.slice(COLLAPSED_COUNT).map((item) => {
                          const key = `${row.label}-${item.name}`;
                          const isOpen = hoverKey === key;
                          return (
                            <button
                              key={key}
                              onClick={() => setHoverKey(isOpen ? null : key)}
                              onMouseEnter={() => setHoverKey(key)}
                              onMouseLeave={() => setHoverKey((k) => (k === key ? null : k))}
                              className={`skill-chip px-4 py-2 text-left ${isOpen ? "open" : ""}`}
                            >
                              <span className="text-sm font-medium block text-foreground">{item.name}</span>
                              <AnimatePresence initial={false}>
                                {isOpen && (
                                  <motion.span
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden block"
                                  >
                                    <span className="font-mono text-xs whitespace-nowrap block mt-1 text-muted">
                                      {item.desc}
                                    </span>
                                  </motion.span>
                                )}
                              </AnimatePresence>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Collapse toggle */}
        {expanded && (
          <button
            onClick={() => setExpanded(false)}
            className="font-mono text-xs mt-4 text-muted/60 hover:text-accent transition-colors"
          >
            Show less
          </button>
        )}
        {!expanded && (
          <p className="font-mono text-xs mt-3 text-muted/60">Tap or hover a chip for context</p>
        )}
      </motion.div>
    </section>
  );
}
