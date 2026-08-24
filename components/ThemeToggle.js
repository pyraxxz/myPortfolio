"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const buttons = [
    { label: "system", icon: <Monitor width={13} height={13} />, active: theme === "system" },
    { label: "dark", icon: <Moon width={13} height={13} />, active: theme === "dark" },
    { label: "light", icon: <Sun width={13} height={13} />, active: theme === "light" },
  ];

  return (
    <span className="flex w-fit items-center gap-0.5 overflow-hidden rounded-[6px] bg-panel p-[2px] border border-border">
      {buttons.map(({ label, icon, active }) => (
        <button
          type="button"
          key={label}
          onClick={() => setTheme(label)}
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-[4px] transition-all hover:opacity-50",
            active ? "bg-hover text-foreground" : "text-muted"
          )}
        >
          {icon}
        </button>
      ))}
    </span>
  );
}
