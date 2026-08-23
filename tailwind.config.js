/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-graphite': '#12151A',
        'bg-panel': '#1A1E25',
        'ink': '#EDEBE4',
        'ink-dim': '#8B8F98',
        'signal-copper': '#C97B4A',
        'signal-blue': '#5B8FA8',
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
