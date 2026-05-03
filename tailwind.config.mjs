/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
        error: "var(--color-error)",
        "error-surface": "var(--color-error-surface)",
      },
      fontSize: {
        micro: "var(--text-micro)",
        tiny: "var(--text-tiny)",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        bounce: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(1.5)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      },
      animation: {
        fadeUp: 'fadeUp 0.5s ease-out',
        fadeIn: 'fadeIn 0.5s ease-out',
        glowPulse: 'glowPulse 2s ease-in-out infinite',
        bounce: 'bounce 1s ease-in-out infinite',
        gradient: 'gradient 8s ease infinite',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
