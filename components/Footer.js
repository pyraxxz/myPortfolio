"use client";

import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { label: "GitHub", href: "https://github.com/pyraxxz" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/taimako-shamsudeen-sugru" },
];

export default function Footer() {
  return (
    <footer className="flex flex-col gap-3 border-t border-border pt-6 pb-4">
      <div className="flex w-full items-center justify-between">
        <p className="font-mono text-xs text-muted">
          Sugru Taimako · Accra/Tamale, Ghana
        </p>
        <ThemeToggle />
      </div>
      <div className="flex items-center gap-4 pb-2">
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted underline decoration-1 underline-offset-2 decoration-muted/30 hover:decoration-accent transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
