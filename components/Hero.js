'use client';

import { motion, useReducedMotion } from 'framer-motion';

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.4 } },
      }
    : {
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      };

  const scrollToAzaman = () => {
    document.getElementById('azaman')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openVideo = () => {
    window.open('https://youtu.be/VMPXiLlgFO0', '_blank');
  };

  return (
    <section
      id="hero"
      className="section-pad min-h-screen flex flex-col justify-center relative px-6 sm:px-8 py-20"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-2xl"
      >
        {/* Eyebrow */}
        <motion.p
          variants={itemVariants}
          className="font-mono text-xs tracking-wider mb-8"
          style={{ color: 'var(--ink-dim)' }}
        >
          SOFTWARE ENGINEER · ELECTRICAL ENGINEERING, KNUST · ACCRA/TAMALE, GHANA
        </motion.p>

        {/* Display line */}
        <motion.h1
          variants={itemVariants}
          className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-6"
          style={{ color: 'var(--ink)', fontWeight: 500 }}
        >
          I built the financial infrastructure I could not find, then I make it feel obvious.
        </motion.h1>

        {/* Subline */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg mb-10 max-w-xl"
          style={{ color: 'var(--ink-dim)', lineHeight: 1.65 }}
        >
          Currently building Azaman, a fintech super-app for Ghana, and Wayfinder, a vision-AI QA tool for mobile apps.
        </motion.p>

        {/* Live status line */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 mb-12 font-mono text-xs flex-wrap"
          style={{ color: 'var(--ink-dim)' }}
        >
          <span>STATUS: LIVE</span>
          <span style={{ color: 'rgba(91, 143, 168, 0.3)' }}>·</span>
          <span>AZAMAN: v0.3.0 · ANDROID (KOTLIN/COMPOSE)</span>
          <span style={{ color: 'rgba(91, 143, 168, 0.3)' }}>·</span>
          <span>LAST DEPLOY: AUG 2026</span>
        </motion.div>

        {/* CTAs */}
        <motion.div variants={itemVariants} className="flex items-center gap-4 flex-wrap">
          <button
            onClick={scrollToAzaman}
            className="px-6 py-3 rounded-md font-mono text-sm tracking-wide transition-transform duration-200 hover:scale-[1.02]"
            style={{
              backgroundColor: 'var(--signal-copper)',
              color: 'var(--bg-graphite)',
            }}
          >
            View Azaman
          </button>
          <button
            onClick={openVideo}
            className="px-6 py-3 rounded-md font-mono text-sm tracking-wide border transition-colors duration-200"
            style={{
              borderColor: 'rgba(91, 143, 168, 0.3)',
              color: 'var(--ink-dim)',
            }}
          >
            Watch the pitch
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
