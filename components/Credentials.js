"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, useReducedMotion, animate, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

function CountUp({ target, reduceMotion }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) { setValue(target); return; }
    const controls = animate(0, target, {
      duration: 0.8, ease: "easeOut",
      onUpdate: (val) => setValue(Math.round(val)),
    });
    return () => controls.stop();
  }, [inView, target, reduceMotion]);

  return <span ref={ref}>{value.toLocaleString()}</span>;
}

const STATS = [
  { value: 1000, label: "Teams registered" },
  { value: 130, label: "Top 130 advanced" },
  { value: 3900, label: "Votes · #16" },
];

export default function Credentials() {
  const reduceMotion = useReducedMotion();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <section id="credentials" className="py-16">
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ type: "spring", stiffness: 150, damping: 19, mass: 1.2 }}
      >
        <p className="font-mono text-xs tracking-wider mb-3 text-accent label-glow">Node 06 · Credentials</p>
        <h2 className="font-display text-2xl sm:text-3xl mb-8 text-foreground">
          Paper proof, and traction proof.
        </h2>

        {/* Certificate card */}
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 max-w-xs"
        >
          <span className="offset-wrap offset-block offset-card-wrap rounded-large">
            <button
              onClick={() => setLightboxOpen(true)}
              className="offset-btn block w-full rounded-large overflow-hidden text-left"
              style={{ border: "1px solid var(--border)", backgroundColor: "var(--panel)" }}
              aria-label="Open certificate full size"
            >
              <img
                src="/azaman-certificate.jpg"
                alt="Azaman Digital Limited certificate of incorporation"
                className="w-full block"
                style={{ maxHeight: 280, objectFit: "cover" }}
              />
            </button>
          </span>
          <p className="font-mono text-xs mt-3 tracking-wide text-muted">
            Azaman Digital Limited · Business Registration
          </p>
          <p className="font-mono text-xs mt-1 text-muted/60">Tap to view full size</p>
        </motion.div>

        {/* Narrative */}
        <p className="text-base text-muted mb-10 leading-relaxed">
          Out of roughly 1,000 registered teams in the Moolre Startup Cup, vetted on the live product and submission
          video, Azaman was selected among the top 130. A public OTP-verified voting round followed. As a team of four,
          we campaigned across KNUST and the surrounding community, earned about 3,900 votes, and finished 16th. We did
          not reach the top 10 for the Accra investor pitch round, but set up a WhatsApp community channel on the spot
          to keep supporters connected through launch.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <p className="font-mono text-2xl sm:text-3xl mb-1 text-foreground">
                <CountUp target={stat.value} reduceMotion={reduceMotion} />
              </p>
              <p className="font-mono text-xs tracking-wide text-muted leading-tight">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Video link — YouTube thumbnail preview */}
        <div className="max-w-md">
          <p className="font-mono text-xs mb-3 text-muted">Submission video:</p>
          <a
            href="https://youtu.be/VMPXiLlgFO0"
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
            aria-label="Watch the submission video on YouTube"
          >
            <div
              className="relative rounded-large overflow-hidden border border-border transition-colors duration-200 group-hover:border-muted/40"
              style={{ backgroundColor: "var(--panel)" }}
            >
              {/* YouTube thumbnail */}
              <div className="aspect-video relative">
                <img
                  src="https://img.youtube.com/vi/VMPXiLlgFO0/maxresdefault.jpg"
                  alt="Azaman submission video"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Dark overlay for contrast */}
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
                />
                {/* Play button */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                    style={{ backgroundColor: "var(--btn-bg)" }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M8 5v14l11-7z" fill="var(--btn-fg)" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <p className="font-mono text-xs mt-2 text-muted group-hover:text-accent transition-colors">
              Watch on YouTube →
            </p>
          </a>
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lightbox-overlay"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              src="/azaman-certificate.jpg"
              alt="Azaman Digital Limited certificate"
              className="max-w-[90vw] max-h-[90vh] rounded-large object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
