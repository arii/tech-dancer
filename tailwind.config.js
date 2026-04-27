/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        error: "var(--color-error)",
        "error-surface": "var(--color-error-surface)",
        brand: {
          blue: {
            bg: "#E6F1FB",
            border: "#B5D4F4",
            text: "#0C447C",
            accent: "#185FA5",
            light: "#85B7EB",
          },
          green: {
            bg: "#E1F5EE",
            border: "#5DCAA5",
            text: "#085041",
            status: "#1D9E75",
            icon: "#0F6E56",
          },
          neutral: {
            bg: "#F1EFE8",
            border: "#D3D1C7",
            text: "#444441",
          },
          amber: {
            bg: "#FAEEDA",
            text: "#633806",
          }
        }
      },
      fontSize: {
        micro: "var(--text-micro)",
        tiny: "var(--text-tiny)",
      },
      maxWidth: {
        'prose-narrow': '420px',
      },
      borderWidth: {
        '1.5': '1.5px',
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
