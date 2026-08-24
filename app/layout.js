import { Fraunces, Inter, IBM_Plex_Mono } from 'next/font/google';

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600'],
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plex-mono',
  weight: ['400', '500'],
});

import './globals.css';

export const metadata = {
  title: 'Sugru Taimako - Software & Electrical Engineer',
  description: 'Building the financial infrastructure I could not find, then making it feel obvious. Currently building Azaman and Wayfinder.',
  openGraph: {
    title: 'Sugru Taimako - Software & Electrical Engineer',
    description: 'Fintech infrastructure builder. Azaman, Wayfinder, and the signal between.',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

// Runs before first paint to avoid a flash of the wrong theme.
// Reads localStorage, falls back to prefers-color-scheme, sets
// data-theme on <html> and syncs the theme-color meta tag.
const NO_FLASH_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('azm-portfolio-theme');
    var theme = stored || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#FFFFFF' : '#000000');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
