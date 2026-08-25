"use client";

import { useState, useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { X, FileText, Maximize2 } from "lucide-react";

function CountUp({ target, reduceMotion }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useState(() => {
    if (!inView) return;
    if (reduceMotion) { setValue(target); return; }
  });

  return <span ref={ref}>{value.toLocaleString()}</span>;
}

const STATS = [
  { value: 1000, label: "Teams registered" },
  { value: 130, label: "Top 130 advanced" },
  { value: 3900, label: "Votes · #16" },
];

export default function Credentials() {
  const reduceMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const headingY = reduceMotion ? 0 : useTransform(scrollYProgress, [0, 1], [0, -40]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);

  return (
    <section id="credentials" ref={sectionRef} className="py-16 relative">
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ type: "spring", stiffness: 150, damping: 19, mass: 1.2 }}
      >
        <p className="font-mono text-xs tracking-wider mb-3 text-accent label-glow">Node 06 · Credentials</p>
        <motion.h2
          className="font-display text-2xl sm:text-3xl mb-8 text-foreground sticky top-20 z-10"
          style={{ y: headingY, opacity: headingOpacity }}
        >
          Paper proof, and traction proof.
        </motion.h2>

        {/* Certificate — document icon with expand animation */}
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          {/* Collapsed: document icon + arrow */}
          <AnimatePresence mode="wait">
            {!expanded ? (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-4"
              >
                {/* Document icon button */}
                <span className="offset-wrap offset-card-wrap rounded-large">
                  <button
                    onClick={() => setExpanded(true)}
                    className="offset-btn flex items-center justify-center rounded-large border transition-colors duration-200 hover:border-accent-border"
                    style={{
                      border: "1px solid var(--border)",
                      backgroundColor: "var(--panel)",
                      width: 72,
                      height: 88,
                    }}
                    aria-label="View certificate"
                  >
                    <FileText
                      size={32}
                      strokeWidth={1.5}
                      style={{ color: "var(--muted)" }}
                    />
                  </button>
                </span>

                {/* Arrow + text pointing to the icon */}
                <div className="flex items-center gap-2">
                  <svg width="28" height="20" viewBox="0 0 28 20" fill="none" className="flex-shrink-0">
                    <path
                      d="M26 10H4M4 10l5-5M4 10l5 5"
                      stroke="var(--accent)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="font-mono text-xs text-accent">
                    Click to view certificate
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, scale: 0.85, y: -10 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 22,
                    mass: 0.8,
                  },
                }}
                exit={{ opacity: 0, scale: 0.85, y: -10 }}
                className="max-w-xs"
              >
                <div
                  className="relative rounded-large overflow-hidden border border-border bg-panel"
                  style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
                >
                  {/* Close / collapse button */}
                  <button
                    onClick={() => setExpanded(false)}
                    className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                    style={{
                      backgroundColor: "color-mix(in srgb, var(--bg) 80%, transparent)",
                      backdropFilter: "blur(4px)",
                    }}
                    aria-label="Collapse certificate"
                  >
                    <X size={14} style={{ color: "var(--muted)" }} />
                  </button>

                  {/* Certificate image with reveal animation */}
                  <motion.div
                    initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                    animate={{
                      clipPath: "inset(0 0% 0 0)",
                      opacity: 1,
                      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
                    }}
                  >
                    <img
                      src="/azaman-certificate.jpg"
                      alt="Azaman Digital Limited certificate of incorporation"
                      className="w-full block"
                      style={{ maxHeight: 400, objectFit: "contain", backgroundColor: "var(--bg)" }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="font-mono text-xs mt-3 tracking-wide text-muted">
            Azaman Digital Limited · Business Registration
          </p>
          {expanded && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => setExpanded(false)}
              className="font-mono text-xs mt-1 text-muted/60 hover:text-accent transition-colors"
            >
              Tap to collapse
            </motion.button>
          )}
        </motion.div>

        {/* Narrative */}
        <p className="text-base text-muted mb-10 leading-relaxed">
          Out of roughly 1,000 registered teams in the Moolre Startup Cup, vetted on the live product and submission
          video, Azaman was selected among the top 130. A public OTP-verified voting round followed. As a team of four,
          we campaigned across KNUST and the surrounding community, earned about 3,900 votes, and finished 16th. We did
          not reach the top 10 for the Accra investor pitch round, but set up a WhatsApp community channel on the spot
          to keep supporters connected through launch.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <p className="font-mono text-2xl sm:text-3xl mb-1 text-foreground">
                {stat.value.toLocaleString()}
              </p>
              <p className="font-mono text-xs tracking-wide text-muted leading-tight">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Video link — YouTube thumbnail preview */}
        <div className="max-w-md">
          <p className="font-mono text-xs mb-3 text-muted">Submission video:</p>
          <a
            href="https://youtu.be/VMPXiLlgFO0"
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
            aria-label="Watch the submission video on YouTube"
          >
            <div
              className="relative rounded-large overflow-hidden border border-border transition-colors duration-200 group-hover:border-muted/40"
              style={{ backgroundColor: "var(--panel)" }}
            >
              {/* YouTube thumbnail */}
              <div className="aspect-video relative">
                <img
                  src="https://img.youtube.com/vi/VMPXiLlgFO0/maxresdefault.jpg"
                  alt="Azaman submission video"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Dark overlay for contrast */}
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
                />
                {/* Play button */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                    style={{ backgroundColor: "var(--btn-bg)" }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M8 5v14l11-7z" fill="var(--btn-fg)" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <p className="font-mono text-xs mt-2 text-muted group-hover:text-accent transition-colors">
              Watch on YouTube →
            </p>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
