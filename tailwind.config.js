/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          1: 'var(--gray-1)', 2: 'var(--gray-2)', 3: 'var(--gray-3)',
          4: 'var(--gray-4)', 5: 'var(--gray-5)', 6: 'var(--gray-6)',
          7: 'var(--gray-7)', 8: 'var(--gray-8)', 9: 'var(--gray-9)',
          10: 'var(--gray-10)', 11: 'var(--gray-11)', 12: 'var(--gray-12)',
          a1: 'var(--gray-a1)', a2: 'var(--gray-a2)', a3: 'var(--gray-a3)',
          a4: 'var(--gray-a4)', a5: 'var(--gray-a5)', a6: 'var(--gray-a6)',
          a7: 'var(--gray-a7)', a8: 'var(--gray-a8)', a9: 'var(--gray-a9)',
          a10: 'var(--gray-a10)', a11: 'var(--gray-a11)', a12: 'var(--gray-a12)',
        },
        orange: {
          1: 'var(--orange-1)', 2: 'var(--orange-2)', 3: 'var(--orange-3)',
          4: 'var(--orange-4)', 5: 'var(--orange-5)', 6: 'var(--orange-6)',
          7: 'var(--orange-7)', 8: 'var(--orange-8)', 9: 'var(--orange-9)',
          10: 'var(--orange-10)', 11: 'var(--orange-11)', 12: 'var(--orange-12)',
          a1: 'var(--orange-a1)', a2: 'var(--orange-a2)', a3: 'var(--orange-a3)',
          a4: 'var(--orange-a4)', a5: 'var(--orange-a5)', a6: 'var(--orange-a6)',
          a7: 'var(--orange-a7)', a8: 'var(--orange-a8)', a9: 'var(--orange-a9)',
          a10: 'var(--orange-a10)', a11: 'var(--orange-a11)', a12: 'var(--orange-a12)',
        },
        background: 'var(--bg)',
        foreground: 'var(--fg)',
        muted: 'var(--muted)',
        panel: 'var(--panel)',
        hover: 'var(--hover)',
        border: 'var(--border)',
        accent: 'var(--accent)',
        'accent-fg': 'var(--accent-fg)',
        'accent-soft': 'var(--accent-soft)',
        'accent-border': 'var(--accent-border)',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        small: 'var(--radius-small)',
        DEFAULT: 'var(--radius-base)',
        large: 'var(--radius-large)',
      },
    },
  },
  plugins: [],
};
