'use client';

import { motion, useReducedMotion } from 'framer-motion';

const LINKS = [
  { label: 'LINKEDIN (PERSONAL)', url: 'https://www.linkedin.com/in/sugru-taimako-35356b229' },
  { label: 'LINKEDIN (AZAMAN DIGITAL)', url: 'https://www.linkedin.com/company/azaman/' },
  { label: 'EMAIL', url: 'mailto:taimakoshamsudeen@gmail.com' },
  { label: 'WHATSAPP COMMUNITY', url: 'https://azaman.me' },
];

export default function Contact() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="contact"
      className="section-pad min-h-screen flex flex-col justify-center items-start px-6 sm:px-8 py-24"
    >
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-xl w-full"
      >
        <p className="font-mono text-xs tracking-wider mb-4" style={{ color: 'var(--signal-blue)' }}>
          NODE-07 · CONTACT
        </p>

        <h2 className="font-display text-3xl sm:text-4xl mb-8" style={{ color: 'var(--ink)', fontWeight: 500 }}>
          Building something that needs this? Reach out.
        </h2>

        {/* Links */}
        <div className="space-y-3 mb-16">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target={link.url.startsWith('mailto:') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className="block font-mono text-sm py-2 transition-colors duration-200"
              style={{ color: 'var(--ink-dim)' }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--signal-blue)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--ink-dim)')}
            >
              <span style={{ color: 'var(--signal-blue)' }}>&#8594;</span> {link.label}
            </a>
          ))}
        </div>

        {/* Mailto button */}
        <a
          href="mailto:taimakoshamsudeen@gmail.com"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-mono text-sm tracking-wide transition-transform duration-200 hover:scale-[1.02]"
          style={{
            backgroundColor: 'var(--signal-copper)',
            color: 'var(--bg-graphite)',
          }}
        >
          Send an email
        </a>
      </motion.div>

      {/* Footer */}
      <div
        className="w-full mt-20 pt-6 border-t"
        style={{ borderColor: 'rgba(91, 143, 168, 0.08)' }}
      >
        <p className="font-mono text-xs" style={{ color: 'var(--ink-dim)' }}>
          AZAMAN.ME · BUILT IN GHANA · 2026
        </p>
      </div>
    </section>
  );
}
