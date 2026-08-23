'use client';

import { useState } from 'react';
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

  const toggle = (i) => setExpanded(expanded === i ? null : i);

  return (
    <section id="origin" className="section-pad min-h-screen flex flex-col justify-center px-6 sm:px-8 py-24">
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <p className="font-mono text-xs tracking-wider mb-4" style={{ color: 'var(--signal-blue)' }}>
          NODE-02 · ORIGIN
        </p>
        <h2 className="font-display text-3xl sm:text-4xl mb-12" style={{ color: 'var(--ink)', fontWeight: 500 }}>
          The signal path, traced.
        </h2>

        {/* Timeline */}
        <div className="space-y-1">
          {NODES.map((node, i) => (
            <div key={node.tag} className="relative">
              {/* Horizontal line between nodes (desktop) */}
              {i < NODES.length - 1 && (
                <div
                  className="hidden lg:block absolute top-0 left-0 right-0 h-px"
                  style={{ backgroundColor: 'rgba(91, 143, 168, 0.1)', top: '100%' }}
                />
              )}

              <button
                onClick={() => toggle(i)}
                className="w-full text-left py-4 group"
                aria-expanded={expanded === i}
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  {/* Tag + dot */}
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <div
                      className="w-3 h-3 rounded-full border-2 transition-all"
                      style={{
                        borderColor: 'var(--signal-blue)',
                        backgroundColor: node.active ? 'var(--signal-blue)' : 'var(--bg-graphite)',
                        boxShadow: node.active ? '0 0 12px rgba(91, 143, 168, 0.4)' : 'none',
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 sm:gap-4 flex-wrap mb-1">
                      <span className="font-mono text-xs" style={{ color: 'var(--signal-blue)' }}>
                        {node.tag}
                      </span>
                      <span className="font-mono text-xs" style={{ color: 'var(--ink-dim)' }}>
                        {node.dates}
                      </span>
                    </div>
                    <h3 className="font-display text-lg sm:text-xl" style={{ color: 'var(--ink)' }}>
                      {node.label}
                    </h3>
                    <p className="text-sm mt-1" style={{ color: 'var(--ink-dim)' }}>
                      {node.short}
                    </p>
                  </div>

                  {/* Expand indicator */}
                  <div
                    className="font-mono text-xs transition-transform duration-300 mt-1"
                    style={{
                      color: 'var(--ink-dim)',
                      transform: expanded === i ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                  >
                    +
                  </div>
                </div>
              </button>

              {/* Expandable detail */}
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
                      className="text-sm pl-8 sm:pl-12 pr-4 py-3 max-w-xl"
                      style={{ color: 'var(--ink)', lineHeight: 1.7 }}
                    >
                      {node.detail}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
