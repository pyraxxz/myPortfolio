"use client";

import { motion, useReducedMotion } from "framer-motion";
import TraceBox from "./TraceBox";

const LINKS = [
  { label: "GitHub", href: "https://github.com/pyraxxz" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sugru-taimako-35356b229" },
  { label: "WhatsApp", href: "https://chat.whatsapp.com/CjMuWLnowfPIFmBWI5ytO1" },
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
        <p className="font-mono text-xs tracking-wider mb-3 text-accent label-glow">Node 07 · Contact</p>
        <h2 className="font-display text-2xl sm:text-3xl mb-4 text-foreground">
          Let's build something.
        </h2>
        <p className="text-base text-muted mb-6 leading-relaxed">
          Open to collaborations on fintech infrastructure, Android engineering, or vision-AI tooling.
          The fastest way to reach me is email.
        </p>

        {/* Constraint / opportunity paragraph with trace box */}
        <TraceBox className="mb-8 px-5 py-4 max-w-lg" bracketColor="var(--accent)">
          <p className="text-sm text-muted/70 leading-relaxed italic">
            Everything above was built on borrowed machines, one laptop at a time, over the past two years.
            I've never had the luxury of ideal working conditions for this — only the work itself. Given real
            tools and a real program behind me, I don't intend to slow down.
          </p>
        </TraceBox>

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
