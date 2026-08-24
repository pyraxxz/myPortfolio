'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Origin from '../components/Origin';
import Azaman from '../components/Azaman';
import BuildLog from '../components/BuildLog';
import Stack from '../components/Stack';
import Credentials from '../components/Credentials';
import Contact from '../components/Contact';

const SECTION_IDS = ['hero', 'origin', 'azaman', 'builds', 'stack', 'credentials', 'contact'];

export default function Page() {
  const [activeSection, setActiveSection] = useState('hero');
  const [nodePositions, setNodePositions] = useState([]);
  const reduceMotion = useReducedMotion();
  const pulseRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Calculate node positions after mount
    const positions = SECTION_IDS.map((id) => {
      const el = document.getElementById(id);
      if (el) return el.offsetTop + 20;
      return 0;
    });
    setNodePositions(positions);

    // Trace pulse animation
    if (!reduceMotion && pulseRef.current) {
      let raf;
      const animatePulse = () => {
        const scrollY = window.scrollY;
        const winH = window.innerHeight;
        // Pulse follows scroll position with slight lead
        const targetY = scrollY + winH * 0.5;
        if (pulseRef.current) {
          pulseRef.current.style.transform = `translateY(${targetY}px)`;
        }
        raf = requestAnimationFrame(animatePulse);
      };
      animatePulse();
      return () => {
        observer.disconnect();
        cancelAnimationFrame(raf);
      };
    }

    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <>
      {/* Trace line */}
      <div className="trace-line" />

      {/* Trace pulse (animated, follows scroll) */}
      {!reduceMotion && (
        <div
          ref={pulseRef}
          className="trace-pulse"
          style={{ transform: 'translateY(0px)', willChange: 'transform' }}
        />
      )}

      {/* Trace nodes */}
      {nodePositions.map((top, i) => {
        const sectionId = SECTION_IDS[i];
        return (
          <div
            key={sectionId}
            className={`trace-node ${activeSection === sectionId ? 'active' : ''} ${sectionId === 'builds' ? 'current' : ''}`}
            style={{ top: `${top}px`, position: 'absolute' }}
          />
        );
      })}

      <Nav activeSection={activeSection} />

      <main>
        <Hero />
        <Origin />
        <Azaman />
        <BuildLog />
        <Stack />
        <Credentials />
        <Contact />
      </main>
    </>
  );
}
