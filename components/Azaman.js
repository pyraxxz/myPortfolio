"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { X, Smartphone } from "lucide-react";
import TraceBox from "./TraceBox";

const FEATURES = [
  {
    title: "P2P Transfer + Escrow",
    desc: "Send money person-to-person with built-in escrow protection. Funds only release when both parties confirm.",
  },
  {
    title: "Digitized Susu",
    desc: "Traditional rotating savings, modernized. Track contributions, rotations, and payouts in-app.",
  },
  {
    title: "Local Marketplace",
    desc: "Buy and sell within the community. Listings tied to verified Azaman wallets for trust.",
  },
  {
    title: "Social Chat",
    desc: "Built-in messaging tied to transactions. Talk to the person you're sending money to without leaving the app.",
  },
];

export default function Azaman() {
  const reduceMotion = useReducedMotion();
  const [previewOpen, setPreviewOpen] = useState(false);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const headingY = reduceMotion ? 0 : useTransform(scrollYProgress, [0, 1], [0, -40]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openPitch = () => {
    window.open("https://youtu.be/VMPXiLlgFO0", "_blank");
  };

  const openSite = () => {
    window.open("https://azaman.me", "_blank");
  };

  const openDemo = () => {
    window.open("https://azm-web-demo.vercel.app/", "_blank");
  };

  return (
    <section id="azaman" ref={sectionRef} className="py-16 relative">
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ type: "spring", stiffness: 150, damping: 19, mass: 1.2 }}
      >
        <p className="font-mono text-xs tracking-wider mb-3 text-accent label-glow">Node 03 · Flagship Product</p>
        <motion.h2
          className="font-display text-2xl sm:text-3xl mb-4 text-foreground sticky top-20 z-10"
          style={{ y: headingY, opacity: headingOpacity }}
        >
          Azaman
        </motion.h2>
        <p className="text-base text-muted mb-6 leading-relaxed">
          A fintech super-app for Ghana. P2P transfer with escrow, digitized Susu, local marketplace, and social chat in one product.
        </p>

        {/* Solo-build sentence with animated trace box */}
        <TraceBox className="mb-10 px-5 py-4" bracketColor="var(--accent)">
          <p className="text-base text-muted/80 leading-relaxed">
            I designed and built Azaman, from the first Flutter prototype through the current
            Kotlin/Compose rewrite. The transfer logic, the escrow system, the Susu engine,
            all of it started as one person's work.
          </p>
        </TraceBox>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 150, damping: 19, delay: i * 0.08 }}
              className="feature-card rounded-large border border-border bg-panel p-5"
            >
              <h3 className="text-sm font-medium text-foreground mb-2">{feature.title}</h3>
              <p className="text-xs text-muted leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Try the demo — animated arrow */}
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 140, damping: 20, delay: 0.15 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="page-arrow-float flex items-center gap-1">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 5v14M6 13l6 6 6-6"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="font-mono text-xs text-accent font-medium">
              Try the live demo
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="offset-wrap offset-btn-wrap rounded">
              <button
                onClick={openDemo}
                className="offset-btn px-5 py-2.5 rounded font-mono text-sm tracking-wide"
                style={{ backgroundColor: "var(--btn-blue-bg)", color: "var(--btn-blue-fg)" }}
              >
                Try Azaman
              </button>
            </span>
            <p className="font-mono text-xs text-muted/60 leading-relaxed max-w-xs">
              This is a web build of the app so you can explore the interface and get a feel for it.
              For the full experience, try it on a phone.
            </p>
          </div>
        </motion.div>

        {/* Website preview — phone icon that expands */}
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="mb-10"
        >
          <AnimatePresence mode="wait">
            {!previewOpen ? (
              /* Collapsed: phone icon + arrow */
              <motion.div
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-4"
              >
                {/* Phone icon button */}
                <span className="offset-wrap offset-card-wrap rounded-large">
                  <button
                    onClick={() => setPreviewOpen(true)}
                    className="offset-btn flex items-center justify-center rounded-large border transition-colors duration-200 hover:border-accent-border"
                    style={{
                      border: "1px solid var(--border)",
                      backgroundColor: "var(--panel)",
                      width: 72,
                      height: 88,
                    }}
                    aria-label="Open website preview"
                  >
                    <Smartphone
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
                    Click to preview azaman.me
                  </p>
                </div>
              </motion.div>
            ) : (
              /* Expanded: phone mockup with iframe */
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
                className="flex justify-center"
              >
                <div
                  className="relative rounded-[2rem] border border-border bg-panel p-2"
                  style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
                >
                  {/* Close button */}
                  <button
                    onClick={() => setPreviewOpen(false)}
                    className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                    style={{
                      backgroundColor: "color-mix(in srgb, var(--bg) 80%, transparent)",
                      backdropFilter: "blur(4px)",
                    }}
                    aria-label="Close preview"
                  >
                    <X size={14} style={{ color: "var(--muted)" }} />
                  </button>

                  {/* Phone screen with clip-path reveal */}
                  <motion.div
                    initial={{ clipPath: "inset(0 100% 0 0)" }}
                    animate={{
                      clipPath: "inset(0 0% 0 0)",
                      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
                    }}
                    className="rounded-[1.6rem] overflow-hidden relative"
                    style={{ width: 280, height: 560 }}
                  >
                    <iframe
                      src="https://azaman.me"
                      title="Azaman website preview"
                      className="w-full h-full border-0"
                      style={{ transform: "scale(0.65)", transformOrigin: "top left", width: "431px", height: "862px" }}
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin"
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!previewOpen && (
            <p className="font-mono text-xs mt-3 text-muted/60">
              Live preview of azaman.me
            </p>
          )}
          {previewOpen && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => setPreviewOpen(false)}
              className="font-mono text-xs mt-3 text-muted/60 hover:text-accent transition-colors block mx-auto"
            >
              Tap to collapse
            </motion.button>
          )}
        </motion.div>

        {/* CTAs */}
        <div className="flex items-center gap-4 flex-wrap">
          <span className="offset-wrap offset-btn-wrap rounded">
            <button
              onClick={openSite}
              className="offset-btn px-5 py-2.5 rounded font-mono text-sm tracking-wide"
              style={{ backgroundColor: "var(--btn-bg)", color: "var(--btn-fg)" }}
            >
              Visit azaman.me
            </button>
          </span>
          <span className="offset-wrap offset-btn-wrap rounded">
            <button
              onClick={scrollToContact}
              className="offset-btn px-5 py-2.5 rounded font-mono text-sm tracking-wide"
              style={{ backgroundColor: "var(--btn-bg)", color: "var(--btn-fg)" }}
            >
              Get in touch
            </button>
          </span>
          <button
            onClick={openPitch}
            className="px-5 py-2.5 rounded font-mono text-sm tracking-wide border transition-colors duration-200"
            style={{ borderColor: "var(--border)", color: "var(--muted)" }}
          >
            Watch the pitch
          </button>
        </div>
      </motion.div>
    </section>
  );
}
