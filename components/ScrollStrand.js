"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

export default function ScrollStrand({ activeSection, sectionIds, sectionLabels }) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [rungPositions, setRungPositions] = useState([]);
  const [hoveredNode, setHoveredNode] = useState(null);
  const rafRef = useRef(null);

  // Dimensions
  const [vh, setVh] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateDims = () => {
      setVh(window.innerHeight);
      setIsMobile(window.innerWidth < 640);
    };
    updateDims();
    window.addEventListener("resize", updateDims);
    return () => window.removeEventListener("resize", updateDims);
  }, []);

  // Compute rung positions from actual section boundaries
  const computeRungPositions = useCallback(() => {
    if (!vh) return;
    const navHeight = 56;
    const strandTop = navHeight + 20;
    const strandBottom = vh - 20;
    const strandHeight = strandBottom - strandTop;

    const positions = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return { id, ratio: 0, top: strandTop };

      const rect = el.getBoundingClientRect();
      // Map section center to strand position
      const sectionCenter = rect.top + rect.height / 2;
      // Clamp to strand range
      let ratio = (sectionCenter - strandTop) / (document.documentElement.scrollHeight - vh);
      ratio = Math.max(0, Math.min(1, ratio));
      return {
        id,
        ratio,
        top: strandTop + ratio * strandHeight,
      };
    });
    setRungPositions(positions);
  }, [vh, sectionIds]);

  // Scroll progress + rung position updater
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(maxScroll > 0 ? Math.min(1, scrollTop / maxScroll) : 0);
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Recompute rung positions on scroll and resize
  useEffect(() => {
    computeRungPositions();
    const recompute = () => computeRungPositions();
    window.addEventListener("scroll", recompute, { passive: true });
    window.addEventListener("resize", recompute, { passive: true });
    const interval = setInterval(recompute, 1000); // periodic recheck for content shifts
    return () => {
      window.removeEventListener("scroll", recompute);
      window.removeEventListener("resize", recompute);
      clearInterval(interval);
    };
  }, [computeRungPositions]);

  // Helix parameters
  const navHeight = 56;
  const strandTop = navHeight + 20;
  const strandBottom = vh - 20;
  const strandHeight = Math.max(0, strandBottom - strandTop);
  const amplitude = isMobile ? 5 : 8;
  const baseX = isMobile ? 14 : 20;
  const pitch = isMobile ? 100 : 120;
  const totalTwists = Math.max(3, strandHeight / pitch);
  const phase = reduceMotion ? 0 : scrollProgress * Math.PI * totalTwists * 2;
  const step = 4; // px resolution for path sampling

  // Generate sine-wave path string for one strand with phase offset
  const generatePath = (phaseOffset) => {
    if (strandHeight <= 0) return "";
    let d = "";
    for (let y = 0; y <= strandHeight; y += step) {
      const x = baseX + amplitude * Math.sin((y / pitch) * Math.PI * 2 + phase + phaseOffset);
      const py = strandTop + y;
      d += y === 0 ? `M ${x.toFixed(2)} ${py.toFixed(2)}` : ` L ${x.toFixed(2)} ${py.toFixed(2)}`;
    }
    return d;
  };

  const strand1Path = generatePath(0);
  const strand2Path = generatePath(Math.PI); // opposite phase = other strand

  // Get x position of both strands at a specific y
  const strandXAt = (y, phaseOffset) => {
    const localY = y - strandTop;
    return baseX + amplitude * Math.sin((localY / pitch) * Math.PI * 2 + phase + phaseOffset);
  };

  const handleRungClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!vh) return null;

  const svgWidth = isMobile ? 36 : 48;
  const svgHeight = vh;

  return (
    <div
      ref={containerRef}
      className="fixed right-0 top-0 z-40 pointer-events-none"
      style={{ width: svgWidth, height: svgHeight }}
    >
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        fill="none"
        className="pointer-events-none"
      >
        {/* Strand 1 */}
        <path
          d={strand1Path}
          stroke="var(--hairline)"
          strokeWidth="1"
          fill="none"
        />
        {/* Strand 2 */}
        <path
          d={strand2Path}
          stroke="var(--hairline)"
          strokeWidth="1"
          fill="none"
        />

        {/* Rungs */}
        {rungPositions.map((rung) => {
          const y = rung.top;
          if (y < strandTop || y > strandBottom) return null;
          const x1 = strandXAt(y, 0);
          const x2 = strandXAt(y, Math.PI);
          const isActive = activeSection === rung.id;
          const isHovered = hoveredNode === rung.id;
          const midX = (x1 + x2) / 2;
          const strokeColor = isActive ? "var(--accent)" : "var(--hairline)";
          const label = sectionLabels[rung.id] || rung.id;

          return (
            <g key={rung.id}>
              {/* Invisible hit area for clicking */}
              <rect
                x={0}
                y={y - 12}
                width={svgWidth}
                height={24}
                fill="transparent"
                className="pointer-events-auto cursor-pointer"
                onClick={() => handleRungClick(rung.id)}
                onMouseEnter={() => setHoveredNode(rung.id)}
                onMouseLeave={() => setHoveredNode(null)}
              />

              {/* Rung line */}
              <line
                x1={x1}
                y1={y}
                x2={x2}
                y2={y}
                stroke={strokeColor}
                strokeWidth={isActive ? 1.5 : 1}
                className="pointer-events-none"
                style={{
                  transition: "stroke 0.3s ease, stroke-width 0.3s ease",
                }}
              />

              {/* Active dot */}
              {isActive && (
                <circle
                  cx={midX}
                  cy={y}
                  r={3}
                  fill="var(--accent)"
                  className="pointer-events-none"
                />
              )}

              {/* Hover dot for non-active */}
              {!isActive && isHovered && (
                <circle
                  cx={midX}
                  cy={y}
                  r={2}
                  fill="var(--muted)"
                  className="pointer-events-none"
                />
              )}

              {/* Connector line to label tag */}
              {(isActive || isHovered) && (
                <line
                  x1={Math.min(x1, x2)}
                  y1={y}
                  x2={Math.min(x1, x2) - 4}
                  y2={y}
                  stroke={isActive ? "var(--accent)" : "var(--muted)"}
                  strokeWidth="1"
                  className="pointer-events-none"
                  opacity={isActive ? 1 : 0.5}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Label tags — rendered as HTML for crisp text */}
      {rungPositions.map((rung) => {
        const y = rung.top;
        if (y < strandTop || y > strandBottom) return null;
        const isActive = activeSection === rung.id;
        const isHovered = hoveredNode === rung.id;
        if (!isActive && !isHovered) return null;

        const label = sectionLabels[rung.id] || rung.id;
        const tagLeft = isMobile ? 2 : 6;

        return (
          <div
            key={`label-${rung.id}`}
            className="absolute pointer-events-none"
            style={{
              right: isMobile ? 26 : 34,
              top: y - 9,
              opacity: isActive ? 1 : 0.5,
              transition: "opacity 0.2s ease",
            }}
          >
            <span
              className="font-mono text-[10px] tracking-wider px-1.5 py-0.5 rounded whitespace-nowrap"
              style={{
                backgroundColor: isActive ? "var(--accent-soft)" : "var(--panel)",
                color: isActive ? "var(--accent-fg)" : "var(--muted)",
                border: `1px solid ${isActive ? "var(--accent-border)" : "var(--border)"}`,
              }}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
