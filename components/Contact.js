"use client";

import { motion, useReducedMotion } from "framer-motion";

const LINKS = [
  { label: "GitHub", href: "https://github.com/pyraxxz" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/taimako-shamsudeen-sugru" },
  { label: "Email", href: "mailto:taimakoshamsudeen@gmail.com" },
];

export default function Contact() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="contact" className="py-16">
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ type: "spring", stiffness: 150, damping: 19, mass: 1.2 }}
      >
        <p className="font-mono text-xs tracking-wider mb-3 text-accent">Node 07 · Contact</p>
        <h2 className="font-display text-2xl sm:text-3xl mb-4 text-foreground">
          Let's build something.
        </h2>
        <p className="text-base text-muted mb-8 leading-relaxed">
          Open to collaborations on fintech infrastructure, Android engineering, or vision-AI tooling.
          The fastest way to reach me is email.
        </p>

        <div className="flex items-center gap-6 flex-wrap">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-foreground underline decoration-1 underline-offset-4 decoration-muted/30 hover:decoration-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
