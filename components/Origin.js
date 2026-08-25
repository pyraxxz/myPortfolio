"use client";

import { motion, useReducedMotion } from "framer-motion";

const NODES = [
  {
    tag: "Node 01",
    label: "BiTT, Tamale",
    dates: "2019–2022",
    short: "Self-taught software foundations",
    detail: "Learned C++, Python, Java, and HTML/CSS under Saeed Bala Ahmed at BiTT, before university. This was the training current that set the direction.",
  },
  {
    tag: "Node 02",
    label: "KNUST, Kumasi",
    dates: "2022–Present",
    short: "Electrical Engineering, final year",
    detail: "Chose Electrical Engineering deliberately to stay versatile across hardware and software. The discipline transfers directly to systems thinking in fintech infrastructure.",
  },
  {
    tag: "Node 03",
    label: "Goliath Robotics",
    dates: "Internship",
    short: "Solar-powered lighting system",
    detail: "Hardware-adjacent engineering work during an internship. Built and tested a solar-powered lighting system, applying electrical theory to real deployment constraints.",
  },
  {
    tag: "Node 04",
    label: "Azaman & Wayfinder",
    dates: "2024",
    short: "Full-time product building",
    detail: "Stepped into full-time product work: Azaman (Android fintech) and Wayfinder (vision-AI QA). From training current to production current.",
    active: true,
  },
];

export default function Origin() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="origin" className="py-16">
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ type: "spring", stiffness: 150, damping: 19, mass: 1.2 }}
      >
        <p className="font-mono text-xs tracking-wider mb-3 text-accent label-glow">Node 02 · Origin</p>
        <h2 className="font-display text-2xl sm:text-3xl mb-8 text-foreground">
          The signal path, traced.
        </h2>

        {/* Timeline cards — vertical on mobile, horizontal scroll on desktop */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar snap-strip pb-2 -mx-2 px-2">
          {NODES.map((node, i) => (
            <div
              key={node.tag}
              className="snap-item flex-shrink-0 w-[260px] rounded-large border border-border bg-panel p-5 transition-colors duration-200 hover:border-muted/40"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`font-mono text-xs tracking-wider ${node.active ? "text-accent" : "text-muted"}`}>
                  {node.tag}
                </span>
                <span className="font-mono text-xs text-muted/60">{node.dates}</span>
              </div>
              <p className="text-sm font-medium text-foreground mb-2">{node.label}</p>
              <p className="text-xs text-muted leading-relaxed">{node.short}</p>
              <p className="text-xs text-muted/70 leading-relaxed mt-2 pt-2 border-t border-border">
                {node.detail}
              </p>
            </div>
          ))}
        </div>

        <p className="font-mono text-xs mt-4 text-muted/60">
          ← Swipe to see all four →
        </p>
      </motion.div>
    </section>
  );
}
