"use client";

import { motion, useReducedMotion } from "framer-motion";

/* Small inline LinkedIn button */
function LinkedinBtn({ href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium transition-all duration-200 hover:opacity-80"
      style={{ backgroundColor: "var(--btn-blue-bg)", color: "var(--btn-blue-fg)", verticalAlign: "baseline" }}
    >
      <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
      </svg>
      LinkedIn
    </a>
  );
}

const NODES = [
  {
    tag: "Node 01",
    label: "BiTT, Tamale",
    dates: "2019–2022",
    short: "Self-taught software foundations",
    detail: (
      <>
        Learned C++, Python, Java, and HTML/CSS under Saeed Bala Ahmed at BiTT
        {" — "}currently a Vulnerable Machine Engineer at OffSec{" "}
        <LinkedinBtn href="https://www.linkedin.com/in/saeedbalaahmed" />
        {" "}and Sayibu Sulemana
        {" — "}a DevOps and cloud engineer, founder &amp; CTO of SecureAxis Technologies{" "}
        <LinkedinBtn href="https://www.linkedin.com/in/sayibu-sulemana-2b30ab17a" />
        {" "}before university. This was the training current that set the direction.
      </>
    ),
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
    detail: (
      <>
        Hardware-adjacent engineering work during an internship. Built and tested a
        highly efficient solar-powered lighting system for rural areas, applying
        electrical theory to real deployment constraints under the Co-Founder
        Barnabas Nomo{" "}
        <LinkedinBtn href="https://www.linkedin.com/in/barnabas-nomo-386ab7109" />.
      </>
    ),
  },
  {
    tag: "Node 04",
    label: "Azaman & Wayfinder",
    dates: "2024",
    short: "Full-time product building",
    detail: "Stepped into full-time product work: Azaman (Super-fintech Application) and Wayfinder (vision-AI QA). From training current to production current.",
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
              <div className="text-xs text-muted/70 leading-relaxed mt-2 pt-2 border-t border-border">
                {node.detail}
              </div>
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
