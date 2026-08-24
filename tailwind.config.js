/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg': 'var(--bg)',
        'bg-panel': 'var(--bg-panel)',
        'ink': 'var(--ink)',
        'ink-dim': 'var(--ink-dim)',
        'accent': 'var(--accent)',
      },
      fontFamily: {
        'display': ['var(--font-fraunces)', 'serif'],
        'body': ['var(--font-inter)', 'sans-serif'],
        'mono': ['var(--font-plex-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};
