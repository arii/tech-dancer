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
        'accent-brand': 'var(--color-accent-brand)',
        'accent-shadow': 'var(--color-accent-shadow)',
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
      borderRadius: {
        subtle: 'var(--radius-subtle)',
        standard: 'var(--radius-standard)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      spacing: {
        card: 'var(--spacing-card)',
        compact: 'var(--spacing-compact)',
        nav: 'var(--spacing-nav)',
        'email-bar-y': 'var(--spacing-email-bar-y)',
        'email-bar-x-sm': 'var(--spacing-email-bar-x-sm)',
        'email-bar-x-md': 'var(--spacing-email-bar-x-md)',
        hero: 'var(--spacing-hero)',
        comfort: 'var(--spacing-comfort)',
        'end-pad': 'var(--spacing-end-pad)',
        'container-sm': 'var(--spacing-container-sm)',
        'container-md': 'var(--spacing-container-md)',
      },
      zIndex: {
        hide: 'var(--z-hide)',
        base: 'var(--z-base)',
        docked: 'var(--z-docked)',
        dropdown: 'var(--z-dropdown)',
        sticky: 'var(--z-sticky)',
        overlay: 'var(--z-overlay)',
        modal: 'var(--z-modal)',
        popover: 'var(--z-popover)',
        'skip-link': 'var(--z-skip-link)',
        toast: 'var(--z-toast)',
        top: 'var(--z-top)',
        search: 'var(--z-search)',
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
