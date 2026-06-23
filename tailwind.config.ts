import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      colors: {
        em: {
          900: '#022c22',
          800: '#064e3b',
          700: '#047857',   // primary
          600: '#059669',
          500: '#10b981',
          400: '#34d399',
          300: '#6ee7b7',
          200: '#a7f3d0',
        },
      },
      animation: {
        'float-1': 'float1 5s ease-in-out infinite',
        'float-2': 'float2 6.5s ease-in-out infinite',
        'float-3': 'float3 7s ease-in-out infinite',
        'scroll-doc': 'scrollDoc 14s linear infinite',
        'scan-line': 'scanLine 3.5s ease-in-out infinite',
        'gradient-x': 'gradientX 6s ease infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'pulse-ring': 'pulseRing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'rotate-glow': 'rotateGlow 8s linear infinite',
        'blink-cursor': 'blinkCursor 1s step-end infinite',
      },
      keyframes: {
        float1: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        float2: {
          '0%, 100%': { transform: 'translateY(-8px)' },
          '50%': { transform: 'translateY(14px)' },
        },
        float3: {
          '0%, 100%': { transform: 'translateY(-4px)' },
          '50%': { transform: 'translateY(16px)' },
        },
        scrollDoc: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
        scanLine: {
          '0%': { top: '5%', opacity: '0' },
          '5%': { opacity: '1' },
          '90%': { top: '88%', opacity: '0.8' },
          '100%': { top: '88%', opacity: '0' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.15)', opacity: '0.4' },
          '100%': { transform: 'scale(1)', opacity: '0.8' },
        },
        rotateGlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        blinkCursor: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
