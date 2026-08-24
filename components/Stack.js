'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const ROWS = [
  {
    label: 'LANGUAGES',
    items: [
      { name: 'C++', desc: '4+ YRS, SINCE BiTT' },
      { name: 'Python', desc: '5+ YRS, SINCE BiTT' },
      { name: 'Java', desc: '3+ YRS, OOP FOUNDATIONS' },
      { name: 'Kotlin', desc: 'PRIMARY, AZAMAN ANDROID' },
      { name: 'Swift', desc: 'LEARNING, iOS NEXT' },
    ],
  },
  {
    label: 'PLATFORMS',
    items: [
      { name: 'Android / Jetpack Compose', desc: 'PRIMARY, AZAMAN' },
      { name: 'Flutter', desc: 'PRODUCTION, AZAMAN v1' },
    ],
  },
  {
    label: 'DOMAIN',
    items: [
      { name: 'Fintech systems', desc: 'P2P, ESCROW, SUSU' },
      { name: 'Payments logic', desc: 'ESCROW + CREDIT SCORING' },
      { name: 'Vision AI tooling', desc: 'WAYFINDER, QA AUTOMATION' },
    ],
  },
];

function ChipRow({ row, rowIdx, reduceMotion, openKey, setOpenKey }) {
  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: rowIdx * 0.12, ease: 'easeOut' }}
    >
      <p className="font-mono text-xs tracking-wider mb-3" style={{ color: 'var(--ink-dim)' }}>
        {row.label}
      </p>
      <div className="relative">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 snap-strip">
          {row.items.map((item) => {
            const key = `${row.label}-${item.name}`;
            const isOpen = openKey === key;
            return (
              <button
                key={key}
                onClick={() => setOpenKey(isOpen ? null : key)}
                onMouseEnter={() => setOpenKey(key)}
                onMouseLeave={() => setOpenKey((k) => (k === key ? null : k))}
                className={`skill-chip snap-item flex-shrink-0 px-4 py-2 text-left ${isOpen ? 'open' : ''}`}
              >
                <span className="text-sm font-medium block" style={{ color: 'var(--ink)' }}>
                  {item.name}
                </span>
                <motion.span
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden block"
                >
                  <span className="font-mono text-xs whitespace-nowrap block mt-1" style={{ color: 'var(--ink-dim)' }}>
                    {item.desc}
                  </span>
                </motion.span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default function Stack() {
  const reduceMotion = useReducedMotion();
  const [openKey, setOpenKey] = useState(null);

  return (
    <section id="stack" className="section-pad flex flex-col justify-center px-6 sm:px-8 py-16 lg:py-18">
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-2xl w-full"
      >
        <p className="font-mono text-xs tracking-wider mb-4" style={{ color: 'var(--accent)' }}>
          NODE-05 · STACK
        </p>
        <h2 className="font-display text-3xl sm:text-4xl mb-10" style={{ color: 'var(--ink)', fontWeight: 500 }}>
          Components on the tray.
        </h2>

        <div className="space-y-7">
          {ROWS.map((row, rowIdx) => (
            <ChipRow
              key={row.label}
              row={row}
              rowIdx={rowIdx}
              reduceMotion={reduceMotion}
              openKey={openKey}
              setOpenKey={setOpenKey}
            />
          ))}
        </div>
        <p className="font-mono text-xs mt-6" style={{ color: 'var(--ink-dim)' }}>
          TAP OR HOVER A CHIP FOR CONTEXT
        </p>
      </motion.div>
    </section>
  );
}
