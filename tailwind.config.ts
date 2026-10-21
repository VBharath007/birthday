import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-body)', 'sans-serif'],
        display: ['var(--font-display)', 'serif'],
        handwriting: ['var(--font-handwriting)', 'cursive'],
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.15)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.15)' },
          '70%': { transform: 'scale(1)' },
        },
        flicker: {
          '0%, 100%': { transform: 'scale(1) rotate(-1deg)', opacity: '1' },
          '50%': { transform: 'scale(1.08) rotate(1.5deg)', opacity: '0.92' },
        },
        'fade-float': {
          '0%': { opacity: '1', transform: 'translate(0, 0) scale(0.8)' },
          '100%': { opacity: '0', transform: 'translate(0, -40px) scale(1.3)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'music-bar': {
          '0%, 100%': { height: '30%' },
          '50%': { height: '100%' },
        },
      },
      animation: {
        shimmer: 'shimmer 2.5s infinite',
        heartbeat: 'heartbeat 1.6s ease-in-out infinite',
        flicker: 'flicker 1.2s ease-in-out infinite alternate',
        'fade-in': 'fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'spin-slow': 'spin-slow 15s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
