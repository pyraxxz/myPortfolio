'use client';

import { motion, useReducedMotion } from 'framer-motion';

const ROWS = [
  {
    label: 'LANGUAGES',
    items: [
      { name: 'C++', desc: '4+ YRS, SINCE BiTT', fill: 70 },
      { name: 'Python', desc: '5+ YRS, SINCE BiTT', fill: 80 },
      { name: 'Java', desc: '3+ YRS, OOP FOUNDATIONS', fill: 65 },
      { name: 'Kotlin', desc: 'PRIMARY, AZAMAN ANDROID', fill: 90 },
      { name: 'Swift', desc: 'LEARNING, iOS NEXT', fill: 25 },
    ],
  },
  {
    label: 'PLATFORMS',
    items: [
      { name: 'Android / Jetpack Compose', desc: 'PRIMARY, AZAMAN', fill: 90 },
      { name: 'Flutter', desc: 'PRODUCTION, AZAMAN v1', fill: 70 },
    ],
  },
  {
    label: 'DOMAIN',
    items: [
      { name: 'Fintech systems', desc: 'P2P, ESCROW, SUSU', fill: 85 },
      { name: 'Payments logic', desc: 'ESCROW + CREDIT SCORING', fill: 80 },
      { name: 'Vision AI tooling', desc: 'WAYFINDER, QA AUTOMATION', fill: 55 },
    ],
  },
];

export default function Stack() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="stack" className="section-pad min-h-screen flex flex-col justify-center px-6 sm:px-8 py-24">
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-2xl w-full"
      >
        <p className="font-mono text-xs tracking-wider mb-4" style={{ color: 'var(--signal-blue)' }}>
          NODE-05 · STACK
        </p>
        <h2 className="font-display text-3xl sm:text-4xl mb-12" style={{ color: 'var(--ink)', fontWeight: 500 }}>
          Components on the tray.
        </h2>

        <div className="space-y-10">
          {ROWS.map((row, rowIdx) => (
            <motion.div
              key={row.label}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: rowIdx * 0.15, ease: 'easeOut' }}
            >
              <p className="font-mono text-xs tracking-wider mb-4" style={{ color: 'var(--ink-dim)' }}>
                {row.label}
              </p>
              <div className="space-y-4">
                {row.items.map((item) => (
                  <div key={item.name}>
                    <div className="flex items-baseline justify-between mb-1.5 gap-4">
                      <span className="text-sm font-medium" style={{ color: 'var(--ink)' }}>
                        {item.name}
                      </span>
                      <span className="font-mono text-xs whitespace-nowrap" style={{ color: 'var(--ink-dim)' }}>
                        {item.desc}
                      </span>
                    </div>
                    <div className="skill-bar-track h-1">
                      <motion.div
                        className="skill-bar-fill"
                        initial={reduceMotion ? { width: `${item.fill}%` } : { width: 0 }}
                        whileInView={{ width: `${item.fill}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
