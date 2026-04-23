/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-alt': 'var(--color-surface-alt)',
        accent: 'var(--color-accent)',
        'accent-navy': 'var(--color-accent-navy)',
        'text-main': 'var(--color-text-main)',
        'text-body': 'var(--color-text-body)',
        'text-dim': 'var(--color-text-dim)',
        line: 'var(--color-line)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        mono: ['var(--font-mono)'],
        sans: ['var(--font-sans)'],
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
  safelist: [
    {
      pattern: /grid-cols-/,
      variants: ['sm', 'md', 'lg', 'xl'],
    },
    {
      pattern: /col-span-/,
      variants: ['sm', 'md', 'lg', 'xl'],
    },
    {
      pattern: /gap-/,
      variants: ['sm', 'md', 'lg', 'xl'],
    },
    {
      pattern: /p-/,
      variants: ['sm', 'md', 'lg', 'xl'],
    },
    {
      pattern: /px-/,
      variants: ['sm', 'md', 'lg', 'xl'],
    },
    {
      pattern: /py-/,
      variants: ['sm', 'md', 'lg', 'xl'],
    },
    {
      pattern: /m-/,
      variants: ['sm', 'md', 'lg', 'xl'],
    },
    {
      pattern: /mx-/,
      variants: ['sm', 'md', 'lg', 'xl'],
    },
    {
      pattern: /my-/,
      variants: ['sm', 'md', 'lg', 'xl'],
    },
  ],
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
