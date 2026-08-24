"use client";

import { motion, useReducedMotion } from "framer-motion";

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

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openPitch = () => {
    window.open("https://youtu.be/VMPXiLlgFO0", "_blank");
  };

  const openSite = () => {
    window.open("https://azaman.me", "_blank");
  };

  return (
    <section id="azaman" className="py-16">
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ type: "spring", stiffness: 150, damping: 19, mass: 1.2 }}
      >
        <p className="font-mono text-xs tracking-wider mb-3 text-accent">Node 03 · Flagship Product</p>
        <h2 className="font-display text-2xl sm:text-3xl mb-4 text-foreground">Azaman</h2>
        <p className="text-base text-muted mb-10 leading-relaxed">
          A fintech super-app for Ghana. P2P transfer with escrow, digitized Susu, local marketplace, and social chat in one product.
        </p>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 150, damping: 19, delay: i * 0.08 }}
              className="rounded-large border border-border bg-panel p-5 transition-colors duration-200 hover:border-muted/40"
            >
              <h3 className="text-sm font-medium text-foreground mb-2">{feature.title}</h3>
              <p className="text-xs text-muted leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Live phone preview — real azaman.me site */}
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="flex justify-center mb-8"
        >
          <button
            onClick={openSite}
            className="group rounded-[2rem] border border-border bg-panel p-2 transition-colors duration-200 hover:border-muted/40"
            aria-label="Visit azaman.me"
          >
            <div
              className="rounded-[1.6rem] overflow-hidden relative"
              style={{ width: 280, height: 560 }}
            >
              <iframe
                src="https://azaman.me"
                title="Azaman website preview"
                className="w-full h-full border-0 pointer-events-none group-hover:opacity-90 transition-opacity"
                style={{ transform: "scale(0.65)", transformOrigin: "top left", width: "431px", height: "862px" }}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </button>
        </motion.div>

        <p className="font-mono text-xs text-center text-muted/60 mb-8">
          Live preview of azaman.me — tap to visit →
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-4 flex-wrap">
          <span className="offset-wrap offset-btn-wrap rounded">
            <button
              onClick={openSite}
              className="offset-btn px-5 py-2.5 rounded font-mono text-sm tracking-wide"
              style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
            >
              Visit azaman.me
            </button>
          </span>
          <span className="offset-wrap offset-btn-wrap rounded">
            <button
              onClick={scrollToContact}
              className="offset-btn px-5 py-2.5 rounded font-mono text-sm tracking-wide"
              style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
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
