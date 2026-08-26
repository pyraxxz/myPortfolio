"use client";

import ThemeToggle from "./ThemeToggle";
import SocialIcons from "./SocialIcons";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-3 border-t border-border pt-6 pb-4">
      <div className="flex w-full items-center justify-between">
        <p className="font-mono text-xs text-muted">
          Sugru Taimako · Accra/Tamale, Ghana
        </p>
        <ThemeToggle />
      </div>
      <div className="flex items-center gap-2 pb-2">
        <SocialIcons size="sm" />
      </div>
    </footer>
  );
}
