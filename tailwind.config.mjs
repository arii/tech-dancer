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
      opacity: {
        ghost: '0.1',
        low: '0.2',
        medium: '0.3',
        subtle: '0.4',
        muted: '0.5',
        dim: '0.6',
        high: '0.7',
        heavy: '0.8',
        solid: '0.9',
        full: '1',
      },
      colors: {
        "brand-blue-bg": "#f0f7ff",
        "brand-blue-border": "#dbeafe",
        "brand-blue-text": "#1e40af",
        "brand-blue-accent": "#3b82f6",
        "brand-blue-light": "#eff6ff",
        "brand-green-bg": "#f0fdf4",
        "brand-green-border": "#dcfce7",
        "brand-green-text": "#166534",
        "brand-green-status": "#22c55e",
        "brand-green-icon": "#4ade80",
        "brand-neutral-bg": "#f9fafb",
        "brand-neutral-border": "#f3f4f6",
        "brand-neutral-text": "#4b5563",
        "brand-amber-bg": "#fffbeb",
        "brand-amber-text": "#92400e",
        "brand-purple": "#7c3aed",
        "brand-green": "#34d399",
        "brand-cyan": "#0891b2",
        "brand-amber": "#fbbf24",
        "brand-terminal-red": "#FF5F56",
        "brand-terminal-yellow": "#FFBD2E",
        "brand-terminal-green": "#27C93F",
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
