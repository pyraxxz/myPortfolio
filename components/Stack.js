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

export default function Stack() {
  const reduceMotion = useReducedMotion();
  const [openKey, setOpenKey] = useState(null);

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

        <div className="space-y-6">
          {ROWS.map((row, rowIdx) => (
            <motion.div
              key={row.label}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: rowIdx * 0.1 }}
            >
              <p className="font-mono text-xs tracking-wide mb-3 text-muted">{row.label}</p>
              <div className="flex gap-2 overflow-x-auto no-scrollbar snap-strip pb-2">
                {row.items.map((item) => {
                  const key = `${row.label}-${item.name}`;
                  const isOpen = openKey === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setOpenKey(isOpen ? null : key)}
                      onMouseEnter={() => setOpenKey(key)}
                      onMouseLeave={() => setOpenKey((k) => (k === key ? null : k))}
                      className={`skill-chip snap-item flex-shrink-0 px-4 py-2 text-left ${isOpen ? "open" : ""}`}
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
          ))}
        </div>
        <p className="font-mono text-xs mt-4 text-muted/60">Tap or hover a chip for context</p>
      </motion.div>
    </section>
  );
}
