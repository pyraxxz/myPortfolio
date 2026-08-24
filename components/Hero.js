'use client';

import { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const [ringActive, setRingActive] = useState(false);
  const ringTimeout = useRef(null);

  const flashRing = () => {
    setRingActive(true);
    if (ringTimeout.current) clearTimeout(ringTimeout.current);
    ringTimeout.current = setTimeout(() => setRingActive(false), 400);
  };

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

  // SVG ring perimeter for a 96px-diameter circle (r=47, stroke centered) — used for the stroke-draw animation
  const ringCircumference = 2 * Math.PI * 47;

  return (
    <section
      id="hero"
      className="section-pad min-h-[70vh] lg:min-h-[65vh] flex flex-col justify-center relative px-6 sm:px-8 py-16 lg:py-14"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-2xl"
      >
        {/* Eyebrow + profile photo */}
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
          <div
            className="relative flex-shrink-0"
            style={{ width: 96, height: 96 }}
            onMouseEnter={flashRing}
            onTouchStart={flashRing}
            tabIndex={0}
            onFocus={flashRing}
            role="img"
            aria-label="Sugru Taimako, profile photo"
          >
            <img
              src="/myprofile.jpg"
              alt="Sugru Taimako"
              width={96}
              height={96}
              className="rounded-full object-cover w-full h-full"
              style={{ display: 'block' }}
            />
            <svg
              className="absolute top-0 left-0 pointer-events-none"
              width="96"
              height="96"
              viewBox="0 0 96 96"
            >
              <circle
                cx="48"
                cy="48"
                r="47"
                fill="none"
                stroke={ringActive ? 'var(--accent)' : 'var(--hairline-strong)'}
                strokeWidth="1"
                className="profile-photo-ring"
                strokeDasharray={reduceMotion ? undefined : ringCircumference}
                strokeDashoffset={reduceMotion ? 0 : ringCircumference}
                style={
                  reduceMotion
                    ? {}
                    : {
                        animation: 'draw-ring 0.7s ease-out 0.3s forwards',
                      }
                }
              />
            </svg>
          </div>
          <p
            className="font-mono text-xs tracking-wider"
            style={{ color: 'var(--ink-dim)' }}
          >
            SOFTWARE ENGINEER · ELECTRICAL ENGINEERING, KNUST
            <br />
            ACCRA/TAMALE, GHANA
          </p>
        </motion.div>

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
          className="text-base sm:text-lg mb-8 max-w-xl"
          style={{ color: 'var(--ink-dim)', lineHeight: 1.65 }}
        >
          Currently building Azaman, a fintech super-app for Ghana, and Wayfinder, a vision-AI QA tool for mobile apps.
        </motion.p>

        {/* Live status line */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 mb-10 font-mono text-xs flex-wrap"
          style={{ color: 'var(--ink-dim)' }}
        >
          <span style={{ color: 'var(--hairline)' }}>·</span>
          <span>AZAMAN: v0.3.0 · ANDROID (KOTLIN/COMPOSE)</span>
          <span style={{ color: 'var(--hairline)' }}>·</span>
          <span>LAST DEPLOY: AUG 2026</span>
        </motion.div>

        {/* CTAs */}
        <motion.div variants={itemVariants} className="flex items-center gap-6 flex-wrap">
          <span className="offset-wrap offset-btn-wrap rounded-md">
            <button
              onClick={scrollToAzaman}
              className="offset-btn px-6 py-3 rounded-md font-mono text-sm tracking-wide"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--bg)',
              }}
            >
              View Azaman
            </button>
          </span>
          <button
            onClick={openVideo}
            className="px-6 py-3 rounded-md font-mono text-sm tracking-wide border transition-colors duration-200"
            style={{
              borderColor: 'var(--hairline)',
              color: 'var(--ink-dim)',
            }}
          >
            Watch the pitch
          </button>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes draw-ring {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </section>
  );
}
