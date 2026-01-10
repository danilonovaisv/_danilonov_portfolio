import type { Config } from 'tailwindcss';
import { BRAND } from './src/config/brand';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: BRAND.colors,
      fontFamily: {
        sans: ['TT Norms Pro', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['PPSupplyMono', 'monospace'],
        display: ['TT Norms Pro', 'ui-sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
