'use client';

import { motion, useReducedMotion } from 'framer-motion';

export default function BuildLog() {
  const reduceMotion = useReducedMotion();

  const cards = [
    {
      label: 'SIDE BUILD',
      title: 'Wayfinder',
      desc: 'AI-powered QA tool that walks a mobile app screens, screenshots them, and uses vision AI to flag broken layouts. No test scripts, no golden baselines needed.',
      tag: '[ IN PROGRESS ]',
      showTag: true,
    },
    {
      label: 'INTERNSHIP',
      title: 'Solar-powered lighting system',
      desc: 'Hardware-adjacent engineering work at Goliath Robotics. Built and tested solar-powered lighting systems, applying electrical theory to real deployment constraints.',
      tag: null,
      showTag: false,
    },
  ];

  return (
    <section id="builds" className="section-pad min-h-screen flex flex-col justify-center px-6 sm:px-8 py-24">
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <p className="font-mono text-xs tracking-wider mb-4" style={{ color: 'var(--signal-blue)' }}>
          NODE-04 · BUILD LOG
        </p>
        <h2 className="font-display text-3xl sm:text-4xl mb-12" style={{ color: 'var(--ink)', fontWeight: 500 }}>
          Side work and earlier builds.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-4xl">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: 'easeOut' }}
              className={`card-trace-border pl-5 pr-5 py-6 ${i === 0 ? 'lg:col-span-3' : 'lg:col-span-2'}`}
            >
              <span className="font-mono text-xs tracking-wider block mb-3" style={{ color: 'var(--signal-blue)' }}>
                {card.label}
              </span>
              <h3 className="font-display text-xl sm:text-2xl mb-3" style={{ color: 'var(--ink)' }}>
                {card.title}
              </h3>
              <p className="text-sm mb-4" style={{ color: 'var(--ink-dim)', lineHeight: 1.65 }}>
                {card.desc}
              </p>
              {card.showTag && (
                <span
                  className="inline-block font-mono text-xs px-2 py-1 rounded"
                  style={{ color: 'var(--signal-blue)', backgroundColor: 'rgba(91, 143, 168, 0.1)' }}
                >
                  {card.tag}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
