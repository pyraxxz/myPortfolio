'use client';

import { motion, useReducedMotion } from 'framer-motion';

const FEATURES = [
  {
    label: 'P2P TRANSFER + ESCROW',
    desc: 'Send and receive money with built-in escrow protection. Funds held until both parties confirm.',
  },
  {
    label: 'SUSU + CREDIT SCORING',
    desc: 'Digitized rotating savings (Susu) with transparent cycles and participant credit scoring.',
  },
  {
    label: 'MARKETPLACE',
    desc: 'Local buying and selling integrated with the payment and escrow layer. No separate app needed.',
  },
  {
    label: 'CHAT LAYER',
    desc: 'In-app messaging for transaction coordination, community channels, and support.',
  },
];

export default function Azaman() {
  const reduceMotion = useReducedMotion();

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="azaman" className="section-pad min-h-screen flex flex-col justify-center px-6 sm:px-8 py-24">
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-5xl w-full"
      >
        {/* Label */}
        <p className="font-mono text-xs tracking-wider mb-4" style={{ color: 'var(--signal-blue)' }}>
          NODE-03 · FLAGSHIP PRODUCT
        </p>

        {/* Title */}
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mb-4" style={{ color: 'var(--ink)', fontWeight: 500 }}>
          Azaman
        </h2>

        {/* Description */}
        <p className="text-base sm:text-lg mb-10 max-w-2xl" style={{ color: 'var(--ink-dim)', lineHeight: 1.65 }}>
          A fintech super-app for Ghana. P2P transfer with escrow, digitized Susu, local marketplace, and social chat in one product.
        </p>

        {/* Phone frame mockup */}
        <div className="mb-12 flex justify-center">
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative"
          >
            {/* Phone frame */}
            <div
              className="phone-glow rounded-[2rem] border-2 overflow-hidden"
              style={{
                borderColor: 'rgba(91, 143, 168, 0.2)',
                width: '260px',
                height: '520px',
                backgroundColor: 'var(--bg-panel)',
              }}
            >
              {/* Screen content: iframe of azaman.me */}
              <iframe
                src="https://azaman.me"
                title="Azaman live product"
                className="w-full h-full border-0"
                loading="lazy"
                style={{ pointerEvents: 'none' }}
              />
            </div>
            {/* Notch indicator */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 rounded-b-2xl"
              style={{ backgroundColor: 'var(--bg-graphite)' }}
            />
          </motion.div>
        </div>

        {/* Feature list */}
        <div className="space-y-3 mb-10">
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.label}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: 'linear' }}
              className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 py-2 border-b"
              style={{ borderColor: 'rgba(91, 143, 168, 0.08)' }}
            >
              <span className="font-mono text-xs whitespace-nowrap" style={{ color: 'var(--signal-blue)' }}>
                {feat.label}
              </span>
              <span className="text-sm flex-1" style={{ color: 'var(--ink-dim)' }}>
                {feat.desc}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Technical note */}
        <p className="text-sm mb-2" style={{ color: 'var(--ink-dim)' }}>
          Native Android rebuild in Kotlin/Jetpack Compose, led solo. iOS in Swift planned next.
        </p>
        <p className="text-sm mb-8" style={{ color: 'var(--ink-dim)' }}>
          Azaman Digital Limited is a registered company, actively preparing for Bank of Ghana clearance.
        </p>

        {/* CTA */}
        <a
          href="https://azaman.me"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-sm tracking-wide transition-colors duration-200"
          style={{ color: 'var(--signal-copper)' }}
        >
          Open azaman.me <span style={{ color: 'var(--signal-copper)' }}>[&#8599;]</span>
        </a>
      </motion.div>
    </section>
  );
}
