'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Lightbox({ src, alt, caption, onClose }) {
  useEffect(() => {
    if (!src) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [src, onClose]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          className="lightbox-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-[90vw] max-h-[88vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={src}
              alt={alt}
              className="max-w-[90vw] max-h-[78vh] object-contain rounded"
              style={{ border: '1px solid var(--hairline-strong)' }}
            />
            {caption && (
              <p className="font-mono text-xs mt-4 tracking-wider" style={{ color: 'var(--ink-dim)' }}>
                {caption}
              </p>
            )}
            <button
              onClick={onClose}
              className="absolute -top-10 right-0 font-mono text-xs tracking-wider px-3 py-1.5 rounded"
              style={{ border: '1px solid var(--hairline)', color: 'var(--ink)' }}
              aria-label="Close"
            >
              CLOSE [ESC]
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
