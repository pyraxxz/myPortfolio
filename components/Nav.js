'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const NAV_ITEMS = [
  { id: 'origin', label: 'ORIGIN' },
  { id: 'azaman', label: 'AZAMAN' },
  { id: 'builds', label: 'BUILDS' },
  { id: 'stack', label: 'STACK' },
  { id: 'credentials', label: 'CREDENTIALS' },
];

export default function Nav({ activeSection }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{ backgroundColor: 'var(--bg)', opacity: 0.92, borderBottom: '1px solid var(--hairline)' }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            {/* Name */}
            <button
              onClick={() => scrollTo('hero')}
              className="font-display text-sm tracking-tight whitespace-nowrap"
              style={{ color: 'var(--ink)' }}
            >
              SUGRU TAIMAKO
            </button>

            {/* Nav items - horizontal scroll on mobile */}
            <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-colors duration-200"
                  style={{
                    color: activeSection === item.id ? 'var(--accent)' : 'var(--ink-dim)',
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <ThemeToggle />
              {/* Contact pill */}
              <button
                onClick={() => scrollTo('contact')}
                className="font-mono text-xs uppercase tracking-wider px-3 py-1.5 rounded-full whitespace-nowrap transition-colors duration-200"
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'var(--bg)',
                }}
              >
                CONTACT
              </button>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
