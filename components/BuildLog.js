"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const ENTRIES = [
  {
    version: "v0.1.0",
    date: "Jan 2025",
    title: "Flutter MVP",
    desc: "First working build. P2P transfer + Susu. Kotlin backend on Firebase.",
    status: "shipped",
  },
  {
    version: "v0.2.0",
    date: "Mar 2025",
    title: "Compose rewrite",
    desc: "Full rewrite to Jetpack Compose. Escrow logic added. Marketplace scaffolded.",
    status: "shipped",
  },
  {
    version: "v0.3.0",
    date: "Aug 2026",
    title: "Social layer",
    desc: "In-app chat tied to transactions. Credit scoring model prototyped.",
    status: "current",
  },
  {
    version: "v0.4.0",
    date: "Next",
    title: "Wayfinder integration",
    desc: "Vision-AI QA pipeline to catch UI regressions before deploy.",
    status: "next",
  },
];

export default function BuildLog() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const headingY = reduceMotion ? 0 : useTransform(scrollYProgress, [0, 1], [0, -40]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);

  return (
    <section id="builds" ref={sectionRef} className="py-16 relative">
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ type: "spring", stiffness: 150, damping: 19, mass: 1.2 }}
      >
        <p className="font-mono text-xs tracking-wider mb-3 text-accent label-glow">Node 04 · Build Log</p>
        <motion.h2
          className="font-display text-2xl sm:text-3xl mb-8 text-foreground sticky top-20 z-10"
          style={{ y: headingY, opacity: headingOpacity }}
        >
          Shipping in sequence.
        </motion.h2>

        <div className="space-y-0">
          {ENTRIES.map((entry, i) => (
            <motion.div
              key={entry.version}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="flex gap-4 py-4 border-t border-border"
            >
              <div className="flex-shrink-0 w-20">
                <p className="font-mono text-xs text-foreground">{entry.version}</p>
                <p className="font-mono text-xs text-muted/60 mt-0.5">{entry.date}</p>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-foreground">{entry.title}</p>
                  {entry.status === "current" && (
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-accent-soft text-accent-fg">
                      CURRENT
                    </span>
                  )}
                  {entry.status === "next" && (
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-border text-muted">
                      NEXT
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted leading-relaxed">{entry.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
