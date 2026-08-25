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

  const openDemo = () => {
    window.open("https://azm-web-demo.vercel.app/", "_blank");
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
        <p className="text-base text-muted mb-6 leading-relaxed">
          A fintech super-app for Ghana. P2P transfer with escrow, digitized Susu, local marketplace, and social chat in one product.
        </p>
        <p className="text-base text-muted/70 mb-10 leading-relaxed">
          I designed and built Azaman entirely on my own, from the first Flutter prototype through the current
          Kotlin/Compose rewrite — every line of the P2P transfer logic, the escrow system, and the Susu engine is mine.
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

        {/* Try the demo — animated callout with arrow */}
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 140, damping: 20, delay: 0.15 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 flex-wrap">
            <span className="offset-wrap offset-btn-wrap rounded">
              <button
                onClick={openDemo}
                className="offset-btn px-5 py-2.5 rounded font-mono text-sm tracking-wide flex items-center gap-2"
                style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
              >
                Try Azaman
                {/* Animated arrow */}
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none"
                  className="demo-arrow"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </span>
            <p className="font-mono text-xs text-muted/60 leading-relaxed max-w-xs">
              This is a web build of the app so you can explore the interface and get a feel for it.
              For the full experience, try it on a phone.
            </p>
          </div>
        </motion.div>

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

      <style jsx>{`
        @keyframes demo-arrow-bounce {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }
        .demo-arrow {
          animation: demo-arrow-bounce 1.4s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .demo-arrow { animation: none; }
        }
      `}</style>
    </section>
  );
}
