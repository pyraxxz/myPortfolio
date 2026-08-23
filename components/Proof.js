'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useReducedMotion, animate } from 'framer-motion';

function CountUp({ target, reduceMotion }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setValue(target);
      return;
    }
    const controls = animate(0, target, {
      duration: 0.8,
      ease: 'easeOut',
      onUpdate: (val) => setValue(Math.round(val)),
    });
    return () => controls.stop();
  }, [inView, target, reduceMotion]);

  return <span ref={ref}>{value.toLocaleString()}</span>;
}

const STATS = [
  { value: 1000, label: 'TEAMS REGISTERED' },
  { value: 30, label: 'TOP 30 ADVANCED' },
  { value: 3900, label: 'VOTES · #16' },
];

export default function Proof() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="proof" className="section-pad min-h-screen flex flex-col justify-center px-6 sm:px-8 py-24">
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-2xl w-full"
      >
        <p className="font-mono text-xs tracking-wider mb-4" style={{ color: 'var(--signal-blue)' }}>
          NODE-06 · RECOGNITION
        </p>
        <h2 className="font-display text-3xl sm:text-4xl mb-8" style={{ color: 'var(--ink)', fontWeight: 500 }}>
          Moolre Startup Cup.
        </h2>

        {/* Narrative */}
        <p className="text-base mb-12" style={{ color: 'var(--ink-dim)', lineHeight: 1.7 }}>
          Out of roughly 1,000 registered teams in the Moolre Startup Cup, vetted on the live product and submission
          video, Azaman was selected among the top 30. A public OTP-verified voting round followed. As a team of four,
          we campaigned across KNUST and the surrounding community, earned about 3,900 votes, and finished 16th. We did
          not reach the top 10 for the Accra investor pitch round, but set up a WhatsApp community channel on the spot
          to keep supporters connected through launch.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: 'easeOut' }}
            >
              <p className="font-mono text-3xl sm:text-4xl mb-2" style={{ color: 'var(--ink)' }}>
                <CountUp target={stat.value} reduceMotion={reduceMotion} />
              </p>
              <p className="font-mono text-xs tracking-wider" style={{ color: 'var(--ink-dim)' }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Video embed */}
        <div className="max-w-md">
          <p className="font-mono text-xs mb-3" style={{ color: 'var(--ink-dim)' }}>
            SUBMISSION VIDEO:
          </p>
          <div
            className="relative rounded-lg overflow-hidden border"
            style={{ borderColor: 'rgba(91, 143, 168, 0.15)' }}
          >
            <a
              href="https://youtu.be/VMPXiLlgFO0"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
              aria-label="Watch the Moolre Startup Cup submission video on YouTube"
            >
              {/* Thumbnail */}
              <div
                className="aspect-video flex items-center justify-center transition-colors duration-200"
                style={{ backgroundColor: 'var(--bg-panel)' }}
              >
                <div className="flex flex-col items-center gap-3">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                    style={{ backgroundColor: 'var(--signal-copper)' }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M8 5v14l11-7z" fill="var(--bg-graphite)" />
                    </svg>
                  </div>
                  <span className="font-mono text-xs" style={{ color: 'var(--ink-dim)' }}>
                    YOUTUBE.COM
                  </span>
                </div>
              </div>
              <div
                className="px-4 py-3 border-t"
                style={{ borderColor: 'rgba(91, 143, 168, 0.1)' }}
              >
                <p className="text-sm" style={{ color: 'var(--ink)' }}>
                  Moolre Startup Cup Submission
                </p>
                <p className="font-mono text-xs mt-1" style={{ color: 'var(--ink-dim)' }}>
                  youtu.be/VMPXiLlgFO0
                </p>
              </div>
            </a>
          </div>
          <p className="text-xs mt-3" style={{ color: 'var(--ink-dim)' }}>
            Click to open on YouTube in a new tab.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
