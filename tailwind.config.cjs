/** @type {import('tailwindcss').Config} */

// Keep values in sync with src/config/brand.ts (fonts/colors used by Tailwind tooling only)
const BRAND_COLORS = {
  bluePrimary: '#0048ff',
  blueAccent: '#4fe6ff',
  purpleDetails: '#8705f2',
  pinkDetails: '#f501d3',
  background: '#040013',
  backgroundLight: '#f0f0f0',
  text: '#fcffff',
  textInverse: '#0e0e0e',
  textEmphasis: '#2E85F2',
  textHighlight: '#4fe6ff',
  textSecondary: '#a1a3a3',
  neutral: '#0b0d3a',
  neutralLight: '#F5F5F5',
  contactForeground: '#fcffff',
};

const BRAND_FONTS = {
  primary: 'TT Norms Pro',
  mono: 'PPSupplyMono',
};

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ...BRAND_COLORS,
        primary: BRAND_COLORS.bluePrimary,
        accent: BRAND_COLORS.blueAccent,
      },
      fontFamily: {
        sans: [BRAND_FONTS.primary, 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: [BRAND_FONTS.mono, 'monospace'],
        display: [BRAND_FONTS.primary, 'ui-sans-serif'],
        h1: [BRAND_FONTS.primary, 'ui-sans-serif'],
        h2: [BRAND_FONTS.primary, 'ui-sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
