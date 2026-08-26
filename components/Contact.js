"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import TraceBox from "./TraceBox";
import SocialIcons from "./SocialIcons";

export default function Contact() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const headingY = reduceMotion ? 0 : useTransform(scrollYProgress, [0, 1], [0, -40]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);

  return (
    <section id="contact" ref={sectionRef} className="py-16 relative">
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ type: "spring", stiffness: 150, damping: 19, mass: 1.2 }}
      >
        <p className="font-mono text-xs tracking-wider mb-3 text-accent label-glow">Node 07 · Contact</p>
        <motion.h2
          className="font-display text-2xl sm:text-3xl mb-4 text-foreground sticky top-20 z-10"
          style={{ y: headingY, opacity: headingOpacity }}
        >
          Let's build something.
        </motion.h2>
        <p className="text-base text-muted mb-6 leading-relaxed">
          Open to collaborations on fintech infrastructure, Android engineering, or vision-AI tooling.
          The fastest way to reach me is email.
        </p>

        {/* Trimmed constraint paragraph with trace box */}
        <TraceBox className="mb-8 px-5 py-4 max-w-lg" bracketColor="var(--accent)">
          <p className="text-sm text-muted/70 leading-relaxed italic">
            I've never had the luxury of ideal working conditions for this; only the work itself.
            Given real tools and a real program behind me, I don't intend to slow down.
          </p>
        </TraceBox>

        {/* Social icon buttons */}
        <div className="flex items-center gap-3">
          <SocialIcons size="sm" />
        </div>
      </motion.div>
    </section>
  );
}
