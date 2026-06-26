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
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      colors: {
        bg: {
          primary: '#05050f',
          secondary: '#0a0a1a',
          card: '#0f0f20',
        },
        brand: {
          purple: '#7c3aed',
          'purple-light': '#a855f7',
          'purple-dark': '#5b21b6',
          cyan: '#06b6d4',
          'cyan-light': '#22d3ee',
        },
      },
      animation: {
        'float':       'float 6s ease-in-out infinite',
        'float-slow':  'float 9s ease-in-out 2s infinite',
        'pulse-glow':  'pulseGlow 2s ease-in-out infinite',
        'shimmer':     'shimmer 2.5s linear infinite',
        'grid-fade':   'gridFade 4s ease-in-out infinite alternate',
        'spin-slow':   'spin 14s linear infinite',
        'border-spin': 'borderSpin 4s linear infinite',
        'blink':       'blink 1s step-end infinite',
        'drift-1':     'drift1 20s ease-in-out infinite alternate',
        'drift-2':     'drift2 28s ease-in-out infinite alternate',
        'drift-3':     'drift3 35s ease-in-out infinite alternate',
      },
      keyframes: {
        float:      { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
        pulseGlow:  { '0%,100%': { boxShadow: '0 0 20px #7c3aed30' }, '50%': { boxShadow: '0 0 50px #7c3aed60, 0 0 80px #7c3aed20' } },
        shimmer:    { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        gridFade:   { '0%': { opacity: '0.02' }, '100%': { opacity: '0.07' } },
        borderSpin: { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
        blink:      { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
        drift1:     { '0%': { transform: 'translate(0, 0)' }, '100%': { transform: 'translate(60px, -40px)' } },
        drift2:     { '0%': { transform: 'translate(0, 0)' }, '100%': { transform: 'translate(-50px, 60px)' } },
        drift3:     { '0%': { transform: 'translate(0, 0)' }, '100%': { transform: 'translate(40px, 50px)' } },
      },
    },
  },
  plugins: [],
}

export default config
