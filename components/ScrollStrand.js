"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

export default function ScrollStrand({ activeSection, sectionIds, sectionLabels }) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
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

  // Scroll progress listener (throttled via rAF)
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

  // Helix is 70% of viewport height, vertically centered
  const helixHeightRatio = 0.7;
  const helixHeight = vh > 0 ? Math.round(vh * helixHeightRatio) : 0;
  const helixTop = vh > 0 ? Math.round((vh - helixHeight) / 2) : 0;

  // Helix parameters
  const amplitude = isMobile ? 5 : 8;
  const baseX = isMobile ? 14 : 20;
  const pitch = isMobile ? 80 : 110;
  const totalTwists = Math.max(3, helixHeight / pitch);
  // Phase rotates in place with scroll — the helix spins but doesn't travel
  const phase = reduceMotion ? 0 : scrollProgress * Math.PI * totalTwists * 2;
  const step = 4;

  // Generate sine-wave path — fixed length, only phase changes (spins in place)
  const generatePath = (phaseOffset) => {
    if (helixHeight <= 0) return "";
    let d = "";
    for (let y = 0; y <= helixHeight; y += step) {
      const x = baseX + amplitude * Math.sin((y / pitch) * Math.PI * 2 + phase + phaseOffset);
      d += y === 0 ? `M ${x.toFixed(2)} ${y.toFixed(2)}` : ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
    }
    return d;
  };

  const strand1Path = generatePath(0);
  const strand2Path = generatePath(Math.PI);

  // Rungs are evenly spaced across the helix — 7 sections, fixed positions
  const rungCount = sectionIds.length;
  const rungSpacing = rungCount > 1 ? helixHeight / (rungCount - 1) : 0;
  const rungs = sectionIds.map((id, i) => ({
    id,
    y: rungSpacing * i,
    label: sectionLabels[id] || id,
  }));

  // The dot position: map scroll progress to y on the helix
  // 0 = top of helix, 1 = bottom
  const dotY = scrollProgress * helixHeight;

  // Find which rung the dot is closest to (for active highlight)
  const activeRungIndex = Math.min(
    rungCount - 1,
    Math.max(0, Math.round(scrollProgress * (rungCount - 1)))
  );

  // Get strand x position at a specific y within the helix
  const strandXAt = (y, phaseOffset) => {
    return baseX + amplitude * Math.sin((y / pitch) * Math.PI * 2 + phase + phaseOffset);
  };

  const handleRungClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!vh || helixHeight <= 0) return null;

  const svgWidth = isMobile ? 36 : 48;
  const svgHeight = helixHeight;

  return (
    <div
      ref={containerRef}
      className="fixed right-0 z-40 pointer-events-none"
      style={{
        width: svgWidth,
        top: helixTop,
        height: helixHeight,
      }}
    >
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        fill="none"
        className="pointer-events-none"
      >
        {/* Strand 1 — fixed in place, spins via phase */}
        <path d={strand1Path} stroke="var(--hairline)" strokeWidth="1" fill="none" />
        {/* Strand 2 */}
        <path d={strand2Path} stroke="var(--hairline)" strokeWidth="1" fill="none" />

        {/* Rungs at fixed positions */}
        {rungs.map((rung, i) => {
          const x1 = strandXAt(rung.y, 0);
          const x2 = strandXAt(rung.y, Math.PI);
          const isActive = i === activeRungIndex && activeSection === rung.id;
          const isNearActive = i === activeRungIndex;
          const isHovered = hoveredNode === rung.id;
          const midX = (x1 + x2) / 2;
          const strokeColor = isNearActive ? "var(--accent)" : "var(--hairline)";

          return (
            <g key={rung.id}>
              {/* Invisible hit area */}
              <rect
                x={0}
                y={rung.y - 12}
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
                y1={rung.y}
                x2={x2}
                y2={rung.y}
                stroke={strokeColor}
                strokeWidth={isNearActive ? 1.5 : 1}
                className="pointer-events-none"
                style={{ transition: "stroke 0.3s ease, stroke-width 0.3s ease" }}
              />

              {/* Hover dot for non-active */}
              {!isNearActive && isHovered && (
                <circle cx={midX} cy={rung.y} r={2} fill="var(--muted)" className="pointer-events-none" />
              )}

              {/* Connector line to label tag */}
              {(isNearActive || isHovered) && (
                <line
                  x1={Math.min(x1, x2)}
                  y1={rung.y}
                  x2={Math.min(x1, x2) - 4}
                  y2={rung.y}
                  stroke={isNearActive ? "var(--accent)" : "var(--muted)"}
                  strokeWidth="1"
                  className="pointer-events-none"
                  opacity={isNearActive ? 1 : 0.5}
                />
              )}
            </g>
          );
        })}

        {/* The moving dot — this is the only thing that moves up and down */}
        <circle
          cx={baseX}
          cy={dotY}
          r={3.5}
          fill="var(--accent)"
          className="pointer-events-none"
          style={{
            transition: reduceMotion ? "cy 0.3s ease" : "none",
          }}
        />
        {/* Glow ring around the dot */}
        <circle
          cx={baseX}
          cy={dotY}
          r={6}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="0.5"
          opacity="0.3"
          className="pointer-events-none"
        />
      </svg>

      {/* Active section label tag — follows the dot */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: isMobile ? 26 : 34,
          top: dotY - 9,
          transition: reduceMotion ? "top 0.3s ease" : "top 0.05s linear",
        }}
      >
        <span
          className="font-mono text-[10px] tracking-wider px-1.5 py-0.5 rounded whitespace-nowrap"
          style={{
            backgroundColor: "var(--accent-soft)",
            color: "var(--accent-fg)",
            border: "1px solid var(--accent-border)",
          }}
        >
          {sectionLabels[activeSection] || activeSection}
        </span>
      </div>

      {/* Hover label tags for non-active rungs */}
      {rungs.map((rung, i) => {
        if (i === activeRungIndex && activeSection === rung.id) return null;
        const isHovered = hoveredNode === rung.id;
        if (!isHovered) return null;

        return (
          <div
            key={`hover-label-${rung.id}`}
            className="absolute pointer-events-none"
            style={{
              right: isMobile ? 26 : 34,
              top: rung.y - 9,
              opacity: 0.5,
            }}
          >
            <span
              className="font-mono text-[10px] tracking-wider px-1.5 py-0.5 rounded whitespace-nowrap"
              style={{
                backgroundColor: "var(--panel)",
                color: "var(--muted)",
                border: "1px solid var(--border)",
              }}
            >
              {rung.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
