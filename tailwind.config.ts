import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: '#4A0E18',
          dark: '#2E0A10',
          light: '#6B1423',
          muted: '#8B3042',
        },
        cream: {
          DEFAULT: '#EFE8D8',
          dark: '#D0C5B0',
          muted: '#C8B99A',
          deep: '#B8A88A',
        },
        'brand-black': '#0A0406',
        'brand-white': '#FAF7F2',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxury: '0.2em',
        widest: '0.3em',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
