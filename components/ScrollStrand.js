"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

export default function ScrollStrand({ activeSection, sectionIds, sectionLabels }) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredNode, setHoveredNode] = useState(null);
  const rafRef = useRef(null);

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
  const amplitude = isMobile ? 6 : 9;
  const baseX = isMobile ? 16 : 22;
  const pitch = isMobile ? 80 : 110;
  const totalTwists = Math.max(3, helixHeight / pitch);
  const phase = reduceMotion ? 0 : scrollProgress * Math.PI * totalTwists * 2;
  const step = 3;

  // Generate sine-wave path
  const generatePath = (phaseOffset) => {
    if (helixHeight <= 0) return "";
    let d = "";
    for (let y = 0; y <= helixHeight; y += step) {
      const x = baseX + amplitude * Math.sin((y / pitch) * Math.PI * 2 + phase + phaseOffset);
      d += y === 0 ? `M ${x.toFixed(2)} ${y.toFixed(2)}` : ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
    }
    return d;
  };

  // Generate a path with varying width for depth illusion
  // The "front" strand is thicker when sine > 0 (toward viewer), thinner when < 0 (away)
  const generateDepthPath = (phaseOffset) => {
    if (helixHeight <= 0) return "";
    let d = "";
    for (let y = 0; y <= helixHeight; y += step) {
      const wave = Math.sin((y / pitch) * Math.PI * 2 + phase + phaseOffset);
      const x = baseX + amplitude * wave;
      d += y === 0 ? `M ${x.toFixed(2)} ${y.toFixed(2)}` : ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
    }
    return d;
  };

  const strand1Path = generateDepthPath(0);
  const strand2Path = generateDepthPath(Math.PI);

  // Depth value at a specific y (0 = far, 1 = near)
  const depthAt = (y, phaseOffset) => {
    const wave = Math.sin((y / pitch) * Math.PI * 2 + phase + phaseOffset);
    return (wave + 1) / 2; // 0 to 1
  };

  // Rungs at fixed evenly-spaced positions
  const rungCount = sectionIds.length;
  const rungSpacing = rungCount > 1 ? helixHeight / (rungCount - 1) : 0;
  const rungs = sectionIds.map((id, i) => ({
    id,
    y: rungSpacing * i,
    label: sectionLabels[id] || id,
  }));

  const dotY = scrollProgress * helixHeight;

  const activeRungIndex = Math.min(
    rungCount - 1,
    Math.max(0, Math.round(scrollProgress * (rungCount - 1)))
  );

  const strandXAt = (y, phaseOffset) => {
    return baseX + amplitude * Math.sin((y / pitch) * Math.PI * 2 + phase + phaseOffset);
  };

  const handleRungClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!vh || helixHeight <= 0) return null;

  const svgWidth = isMobile ? 40 : 52;
  const svgHeight = helixHeight;

  // Unique gradient IDs
  const gradId1 = "strand-grad-1";
  const gradId2 = "strand-grad-2";
  const glowId = "strand-glow";

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
        <defs>
          {/* Gradient for strand 1 — blue with depth variation */}
          <linearGradient id={gradId1} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.6" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.6" />
          </linearGradient>

          {/* Gradient for strand 2 — slightly lighter blue */}
          <linearGradient id={gradId2} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.35" />
          </linearGradient>

          {/* Soft glow filter for the dot */}
          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Strand 2 (back strand) — drawn first, lighter, thinner */}
        <path
          d={strand2Path}
          stroke={`url(#${gradId2})`}
          strokeWidth="1.2"
          fill="none"
          opacity="0.7"
        />

        {/* Rungs — drawn between the two strands */}
        {rungs.map((rung, i) => {
          const x1 = strandXAt(rung.y, 0);
          const x2 = strandXAt(rung.y, Math.PI);
          const isNearActive = i === activeRungIndex;
          const isHovered = hoveredNode === rung.id;
          const midX = (x1 + x2) / 2;
          const depth1 = depthAt(rung.y, 0);
          const depth2 = depthAt(rung.y, Math.PI);

          // Color rungs with blue tint, stronger near active
          const rungOpacity = isNearActive ? 0.8 : 0.25;
          const rungColor = isNearActive ? "var(--accent)" : "var(--accent)";

          return (
            <g key={rung.id}>
              {/* Hit area */}
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

              {/* Rung line — blue tinted */}
              <line
                x1={x1}
                y1={rung.y}
                x2={x2}
                y2={rung.y}
                stroke={rungColor}
                strokeWidth={isNearActive ? 2 : 1}
                strokeLinecap="round"
                className="pointer-events-none"
                opacity={rungOpacity}
                style={{ transition: "stroke-width 0.3s ease, opacity 0.3s ease" }}
              />

              {/* Small node dots at strand intersections */}
              <circle
                cx={x1}
                cy={rung.y}
                r={depth1 > 0.5 ? 2.2 : 1.2}
                fill="var(--accent)"
                opacity={depth1 > 0.5 ? 0.7 : 0.25}
                className="pointer-events-none"
              />
              <circle
                cx={x2}
                cy={rung.y}
                r={depth2 > 0.5 ? 2.2 : 1.2}
                fill="var(--accent)"
                opacity={depth2 > 0.5 ? 0.7 : 0.25}
                className="pointer-events-none"
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
                  opacity={isNearActive ? 0.8 : 0.4}
                />
              )}
            </g>
          );
        })}

        {/* Strand 1 (front strand) — drawn after rungs, thicker, more opaque */}
        <path
          d={strand1Path}
          stroke={`url(#${gradId1})`}
          strokeWidth="2"
          fill="none"
          opacity="0.9"
        />

        {/* The moving dot — with glow */}
        <g filter={`url(#${glowId})`}>
          <circle
            cx={baseX}
            cy={dotY}
            r={4}
            fill="var(--accent)"
            className="pointer-events-none"
          />
        </g>
        {/* Inner solid dot */}
        <circle
          cx={baseX}
          cy={dotY}
          r={2.5}
          fill="var(--accent)"
          className="pointer-events-none"
        />
        {/* Outer ring */}
        <circle
          cx={baseX}
          cy={dotY}
          r={7}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="0.8"
          opacity="0.25"
          className="pointer-events-none"
        />
      </svg>

      {/* Active section label tag — follows the dot */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: isMobile ? 28 : 38,
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
              right: isMobile ? 28 : 38,
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
