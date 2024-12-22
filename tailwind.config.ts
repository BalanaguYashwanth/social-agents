import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    extend: {
      keyframes: {
        draw: {
          to: { strokeDashoffset: '0' },
        },
      },
      animation: {
        draw: 'draw 3s ease-in-out infinite alternate',
      },
      fontSize: {
        sm: ['14px', '19px'], // [fontSize, lineHeight]
      },
      colors: {
        backgroundPrimary: 'hsl(var(--background-primary))',
        surfacePrimary: 'hsl(var(--surface-primary))',
        surfaceSecondary: 'hsl(var(--surface-secondary))',
        cardPrimary: 'hsl(var(--card-primary))',
        cardSecondary: 'hsl(var(--card-secondary))',
        surfaceInverse: 'hsl(var(--surface-inverse))',
        textPrimary: 'hsl(var(--text-primary))',
        textSecondary: 'hsl(var(--text-secondary))',
        textInverse: 'hsl(var(--text-inverse))',
        textMuted: 'hsl(var(--text-muted))',
        textPositive: 'hsl(var(--text-positive))',
        textNegative: 'hsl(var(--text-negative))',
        textInfo: 'hsl(var(--text-info))',
        primaryBorder: 'hsl(var(--primary-border))',
        secondaryBorder: 'hsl(var(--secondary-border))',
        menuSurface: 'hsl(var(--menu-surface))',
        menuCard: 'hsl(var(--menu-card))',
        menuItemCard: 'hsl(var(--menu-item-card))',
      },
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
