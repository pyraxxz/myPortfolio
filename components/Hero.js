"use client";

import { useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import * as FadeIn from "@/components/motion/staggers/fade";
import TraceBox from "./TraceBox";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const [ringActive, setRingActive] = useState(false);
  const ringTimeout = useRef(null);

  const flashRing = () => {
    setRingActive(true);
    if (ringTimeout.current) clearTimeout(ringTimeout.current);
    ringTimeout.current = setTimeout(() => setRingActive(false), 400);
  };

  const scrollToAzaman = () => {
    document.getElementById("azaman")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openVideo = () => {
    window.open("https://youtu.be/VMPXiLlgFO0", "_blank");
  };

  const ringCircumference = 2 * Math.PI * 47;

  return (
    <section id="hero" className="pt-8 pb-16">
      <FadeIn.Container>
        {/* Profile + role */}
        <FadeIn.Item>
          <div className="flex items-center gap-4 mb-10">
            <div
              className="relative flex-shrink-0"
              style={{ width: 80, height: 80 }}
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
                width={80}
                height={80}
                className="rounded-full object-cover w-full h-full"
                style={{ display: "block" }}
              />
              <svg className="absolute top-0 left-0 pointer-events-none" width="80" height="80" viewBox="0 0 80 80">
                <circle
                  cx="40" cy="40" r="39"
                  fill="none"
                  stroke={ringActive ? "var(--accent)" : "var(--hairline-strong)"}
                  strokeWidth="1"
                  className="profile-photo-ring"
                  strokeDasharray={reduceMotion ? undefined : ringCircumference}
                  strokeDashoffset={reduceMotion ? 0 : ringCircumference}
                  style={reduceMotion ? {} : { animation: "draw-ring 0.7s ease-out 0.3s forwards" }}
                />
              </svg>
            </div>
            <p className="font-mono text-xs tracking-wide text-muted leading-relaxed">
              Software Engineer · Electrical Engineering, KNUST
              <br />
              Accra/Tamale, Ghana
            </p>
          </div>
        </FadeIn.Item>

        {/* Headline with trace box */}
        <FadeIn.Item>
          <TraceBox className="mb-5 px-4 py-3" bracketColor="var(--accent)">
            <h1 className="font-display text-3xl sm:text-4xl leading-[1.15] text-foreground">
              I built the financial infrastructure I could not find, then I make it feel obvious.
            </h1>
          </TraceBox>
        </FadeIn.Item>

        {/* Subline */}
        <FadeIn.Item>
          <p className="text-base text-muted mb-6 leading-relaxed">
            Currently building Azaman, a fintech super-app for Ghana, and Wayfinder, a vision-AI QA tool for mobile apps.
          </p>
        </FadeIn.Item>

        {/* Status line — no glowing orb */}
        <FadeIn.Item>
          <div className="flex items-center gap-2 mb-2 font-mono text-xs flex-wrap text-muted">
            <span>Azaman: v0.3.0 · Android (Kotlin/Compose)</span>
            <span className="text-muted/40">·</span>
            <span>Last deploy: Aug 2026</span>
          </div>
        </FadeIn.Item>

        {/* Founder line */}
        <FadeIn.Item>
          <p className="font-mono text-xs text-muted/60 mb-8">
            Founder &amp; Lead Developer, Azaman Digital Limited — solo-built from v0.1.0
          </p>
        </FadeIn.Item>

        {/* CTAs */}
        <FadeIn.Item>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="offset-wrap offset-btn-wrap rounded">
              <button
                onClick={scrollToAzaman}
                className="offset-btn px-5 py-2.5 rounded font-mono text-sm tracking-wide"
                style={{ backgroundColor: "var(--btn-bg)", color: "var(--btn-fg)" }}
              >
                View Azaman
              </button>
            </span>
            <button
              onClick={openVideo}
              className="px-5 py-2.5 rounded font-mono text-sm tracking-wide border transition-colors duration-200"
              style={{ borderColor: "var(--border)", color: "var(--muted)" }}
            >
              Watch the pitch
            </button>
          </div>
        </FadeIn.Item>
      </FadeIn.Container>

      <style jsx>{`
        @keyframes draw-ring {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </section>
  );
}
