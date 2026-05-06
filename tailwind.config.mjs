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
      spacing: {
        'text': 'var(--spacing-text)',
        'group': 'var(--spacing-group)',
      },
      colors: {
        "brand-blue-bg": "var(--color-brand-blue-bg)",
        "brand-blue-border": "var(--color-brand-blue-border)",
        "brand-blue-text": "var(--color-brand-blue-text)",
        "brand-blue-accent": "var(--color-brand-blue-accent)",
        "brand-blue-light": "var(--color-brand-blue-light)",
        "brand-green-bg": "var(--color-brand-green-bg)",
        "brand-green-border": "var(--color-brand-green-border)",
        "brand-green-text": "var(--color-brand-green-text)",
        "brand-green-status": "var(--color-brand-green-status)",
        "brand-green-icon": "var(--color-brand-green-icon)",
        "brand-neutral-bg": "var(--color-brand-neutral-bg)",
        "brand-neutral-border": "var(--color-brand-neutral-border)",
        "brand-neutral-text": "var(--color-brand-neutral-text)",
        "brand-amber-bg": "var(--color-brand-amber-bg)",
        "brand-amber-text": "var(--color-brand-amber-text)",
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
