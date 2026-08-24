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

        {/* Phone mockup */}
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="flex justify-center mb-10"
        >
          <div
            className="rounded-[2rem] border border-border bg-panel p-2"
            style={{ boxShadow: "inset 0 0 30px rgba(0,0,0,0.06)" }}
          >
            <div
              className="rounded-[1.6rem] overflow-hidden"
              style={{ width: 240, height: 480, background: "linear-gradient(180deg, #0a2e1a 0%, #061810 100%)" }}
            >
              {/* Phone UI mockup */}
              <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                <div className="mb-6">
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <path d="M18 4 L30 28 L6 28 Z" stroke="#c97b4a" strokeWidth="2" fill="none" />
                    <circle cx="18" cy="20" r="4" fill="#c97b4a" />
                  </svg>
                </div>
                <p className="text-white text-2xl font-medium mb-1" style={{ fontFamily: "var(--font-inter)" }}>
                  Azaman
                </p>
                <p className="text-white/40 text-xs mb-8">A new way to send and save money.</p>
                <div
                  className="w-full rounded-lg px-3 py-2 text-left mb-3"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                >
                  <p className="text-white/30 text-xs">Enter your email</p>
                </div>
                <button
                  className="w-full rounded-lg px-3 py-2.5 text-white text-sm font-medium"
                  style={{ backgroundColor: "#c97b4a" }}
                >
                  Join waitlist
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTAs */}
        <div className="flex items-center gap-4 flex-wrap">
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
