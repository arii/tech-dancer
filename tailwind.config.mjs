import { tailwindSafelist } from './src/styles/safelist';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: tailwindSafelist,
  theme: {
    extend: {
      colors: {
        "brand-blue-bg": "var(--color-surface)",
        "brand-blue-border": "var(--color-line)",
        "brand-blue-text": "var(--color-text-main)",
        "brand-blue-accent": "var(--color-accent)",
        "brand-blue-light": "var(--color-surface-alt)",
        "brand-green-bg": "var(--color-surface)",
        "brand-green-border": "var(--color-line)",
        "brand-green-text": "var(--color-text-main)",
        "brand-green-status": "var(--color-accent-brand)",
        "brand-green-icon": "var(--color-accent-brand)",
        "brand-neutral-bg": "var(--color-surface)",
        "brand-neutral-border": "var(--color-line)",
        "brand-neutral-text": "var(--color-text-dim)",
        "brand-amber-bg": "var(--color-surface-alt)",
        "brand-amber-text": "var(--color-accent-magenta)",
        error: "var(--color-error)",
        "error-surface": "var(--color-error-surface)",
      },
      fontSize: {
        micro: "var(--text-micro)",
        tiny: "var(--text-tiny)",
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      },
      animation: {
        gradient: 'gradient 8s ease infinite',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
