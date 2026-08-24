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

  return (
    <section id="azaman" className="section-pad flex flex-col justify-center px-6 sm:px-8 py-16 lg:py-18">
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-5xl w-full"
      >
        {/* Label */}
        <p className="font-mono text-xs tracking-wider mb-4" style={{ color: 'var(--accent)' }}>
          NODE-03 · FLAGSHIP PRODUCT
        </p>

        {/* Title */}
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mb-4" style={{ color: 'var(--ink)', fontWeight: 500 }}>
          Azaman
        </h2>

        {/* Description */}
        <p className="text-base sm:text-lg mb-8 max-w-2xl" style={{ color: 'var(--ink-dim)', lineHeight: 1.65 }}>
          A fintech super-app for Ghana. P2P transfer with escrow, digitized Susu, local marketplace, and social chat in one product.
        </p>

        {/* Phone frame mockup with scroll-driven perspective settle */}
        <div className="mb-10 flex justify-center" style={{ perspective: '1000px' }}>
          <motion.div
            initial={
              reduceMotion
                ? {}
                : { opacity: 0, scale: 0.95, rotateY: -6, rotateX: 2 }
            }
            whileInView={{ opacity: 1, scale: 1, rotateY: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{ transformPerspective: 1000 }}
            className="relative"
          >
            {/* Phone frame */}
            <div
              className="phone-glow rounded-[2rem] border overflow-hidden"
              style={{
                borderColor: 'var(--hairline)',
                width: '240px',
                height: '480px',
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
              style={{ backgroundColor: 'var(--bg)' }}
            />
          </motion.div>
        </div>

        {/* Feature grid: 2x2 desktop, single column mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-8">
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.label}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: 'linear' }}
              className="flex flex-col gap-1 py-3 border-b"
              style={{ borderColor: 'var(--hairline)' }}
            >
              <span className="font-mono text-xs" style={{ color: 'var(--accent)' }}>
                {feat.label}
              </span>
              <span className="text-sm" style={{ color: 'var(--ink-dim)' }}>
                {feat.desc}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Technical note */}
        <p className="text-sm mb-2" style={{ color: 'var(--ink-dim)' }}>
          Native Android rebuild in Kotlin/Jetpack Compose, led solo. iOS in Swift planned next.
        </p>
        <p className="text-sm mb-6" style={{ color: 'var(--ink-dim)' }}>
          Azaman Digital Limited is a registered company, actively preparing for Bank of Ghana clearance.
        </p>

        {/* CTA */}
        <a
          href="https://azaman.me"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-sm tracking-wide transition-colors duration-200"
          style={{ color: 'var(--accent)' }}
        >
          Open azaman.me <span style={{ color: 'var(--accent)' }}>[&#8599;]</span>
        </a>
      </motion.div>
    </section>
  );
}
