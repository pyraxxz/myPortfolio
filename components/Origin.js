'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const NODES = [
  {
    tag: 'NODE-01',
    label: 'BiTT, Tamale',
    dates: '2019-2022',
    short: 'Self-taught software foundations',
    detail: 'Learned C++, Python, Java, and HTML/CSS under Saeed Bala Ahmed at BiTT, before university. This was the training current that set the direction.',
    active: false,
  },
  {
    tag: 'NODE-02',
    label: 'KNUST, Kumasi',
    dates: '2022-PRESENT',
    short: 'Electrical Engineering, final year',
    detail: 'Chose Electrical Engineering deliberately to stay versatile across hardware and software. The discipline transfers directly to systems thinking in fintech infrastructure.',
    active: false,
  },
  {
    tag: 'NODE-03',
    label: 'Goliath Robotics',
    dates: 'INTERNSHIP',
    short: 'Solar-powered lighting system',
    detail: 'Hardware-adjacent engineering work during an internship. Built and tested a solar-powered lighting system, applying electrical theory to real deployment constraints.',
    active: false,
  },
  {
    tag: 'NODE-04',
    label: 'Azaman & Wayfinder',
    dates: '2024-PRESENT',
    short: 'Full-time product building',
    detail: 'Full-time on Azaman, a fintech super-app for Ghana. Wayfinder is the side build, a vision-AI QA tool for mobile apps. This is the current node.',
    active: true,
  },
];

export default function Origin() {
  const [expanded, setExpanded] = useState(null);
  const reduceMotion = useReducedMotion();
  const stripRef = useRef(null);

  const toggle = (i) => setExpanded(expanded === i ? null : i);

  return (
    <section id="origin" className="section-pad flex flex-col justify-center px-6 sm:px-8 py-16 lg:py-20">
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <p className="font-mono text-xs tracking-wider mb-4" style={{ color: 'var(--accent)' }}>
          NODE-02 · ORIGIN
        </p>
        <h2 className="font-display text-3xl sm:text-4xl mb-8" style={{ color: 'var(--ink)', fontWeight: 500 }}>
          The signal path, traced.
        </h2>

        {/* Horizontal scroll-snap strip */}
        <div className="relative">
          <div
            ref={stripRef}
            className="snap-strip flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-1 px-1"
          >
            {NODES.map((node, i) => (
              <div
                key={node.tag}
                className="snap-item flex-shrink-0"
                style={{ width: 'min(340px, 82vw)' }}
              >
                <span className="offset-wrap offset-block offset-card-wrap rounded-lg">
                  <button
                    onClick={() => toggle(i)}
                    className="offset-btn w-full text-left p-5 rounded-lg"
                    style={{
                      backgroundColor: 'var(--bg-panel)',
                      border: '1px solid var(--hairline)',
                    }}
                    aria-expanded={expanded === i}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-3 h-3 rounded-full border-2 flex-shrink-0 mt-1"
                        style={{
                          borderColor: 'var(--hairline-strong)',
                          backgroundColor: node.active ? 'var(--accent)' : 'var(--bg-panel)',
                          boxShadow: node.active ? '0 0 12px rgba(201, 123, 74, 0.4)' : 'none',
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-3 flex-wrap mb-1">
                          <span className="font-mono text-xs" style={{ color: 'var(--accent)' }}>
                            {node.tag}
                          </span>
                          <span className="font-mono text-xs" style={{ color: 'var(--ink-dim)' }}>
                            {node.dates}
                          </span>
                        </div>
                        <h3 className="font-display text-lg" style={{ color: 'var(--ink)' }}>
                          {node.label}
                        </h3>
                        <p className="text-sm mt-1" style={{ color: 'var(--ink-dim)' }}>
                          {node.short}
                        </p>
                      </div>
                      <div
                        className="font-mono text-xs transition-transform duration-300 mt-1 flex-shrink-0"
                        style={{
                          color: 'var(--ink-dim)',
                          transform: expanded === i ? 'rotate(45deg)' : 'rotate(0deg)',
                        }}
                      >
                        +
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {expanded === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                          className="overflow-hidden"
                        >
                          <p
                            className="text-sm pt-3 mt-3"
                            style={{ color: 'var(--ink)', lineHeight: 1.7, borderTop: '1px solid var(--hairline)' }}
                          >
                            {node.detail}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </span>
              </div>
            ))}
          </div>
          {/* Fading edge hint that there's more to scroll */}
          <div className="scroll-hint-fade hidden sm:block" aria-hidden="true" />
        </div>
        <p className="font-mono text-xs mt-3" style={{ color: 'var(--ink-dim)' }}>
          &#8592; SWIPE TO SEE ALL FOUR &#8594;
        </p>
      </motion.div>
    </section>
  );
}
