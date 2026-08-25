"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Animated corner-bracket frame that draws in when scrolled into view.
 * Gives a "blueprint targeting" feel — fits the engineering aesthetic.
 */
export default function TraceBox({ children, className = "", bracketColor, delay = 0 }) {
  const reduceMotion = useReducedMotion();

  const color = bracketColor || "var(--accent)";
  const bracketSize = "18px";
  const bracketThickness = "1.5px";
  const bracketRadius = "5px";

  const baseStyle = {
    position: "absolute",
    width: bracketSize,
    height: bracketSize,
    borderColor: color,
    borderStyle: "solid",
    borderWidth: 0,
    pointerEvents: "none",
  };

  const animProps = reduceMotion
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true } }
    : {
        initial: { opacity: 0, scale: 0.3 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true, amount: 0.3 },
        transition: { type: "spring", stiffness: 200, damping: 18 },
      };

  return (
    <div className={`relative ${className}`}>
      {/* Top-left */}
      <motion.div
        {...animProps}
        transition={reduceMotion ? undefined : { ...animProps.transition, delay: delay }}
        style={{ ...baseStyle, top: -1, left: -1, borderTopWidth: bracketThickness, borderLeftWidth: bracketThickness, borderTopLeftRadius: bracketRadius }}
      />
      {/* Top-right */}
      <motion.div
        {...animProps}
        transition={reduceMotion ? undefined : { ...animProps.transition, delay: delay + 0.1 }}
        style={{ ...baseStyle, top: -1, right: -1, borderTopWidth: bracketThickness, borderRightWidth: bracketThickness, borderTopRightRadius: bracketRadius }}
      />
      {/* Bottom-left */}
      <motion.div
        {...animProps}
        transition={reduceMotion ? undefined : { ...animProps.transition, delay: delay + 0.15 }}
        style={{ ...baseStyle, bottom: -1, left: -1, borderBottomWidth: bracketThickness, borderLeftWidth: bracketThickness, borderBottomLeftRadius: bracketRadius }}
      />
      {/* Bottom-right */}
      <motion.div
        {...animProps}
        transition={reduceMotion ? undefined : { ...animProps.transition, delay: delay + 0.2 }}
        style={{ ...baseStyle, bottom: -1, right: -1, borderBottomWidth: bracketThickness, borderRightWidth: bracketThickness, borderBottomRightRadius: bracketRadius }}
      />
      {children}
    </div>
  );
}
