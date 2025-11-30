import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
  content: ['./app/**/*.{ts,tsx}', './content/**/*.mdx', './public/**/*.svg'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      colors: {
        admin: {
          bg: '#0A0E1A',
          surface: '#1A1F35',
          surfaceDark: '#0A0E1A',
          cyan: '#00D9FF',
          cyanLight: '#00B8D9',
          amber: '#FFB84D',
          amberDark: '#E5A344',
          green: '#10B981',
          greenDark: '#0F9F75',
          red: '#EF4444',
          redDark: '#DC2626',
          textPrimary: '#E8E9ED',
          textSecondary: '#9CA3AF',
          textTertiary: '#6B7280',
        },
      },
      typography: {
        quoteless: {
          css: {
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:first-of-type::after': { content: 'none' },
          },
        },
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
} satisfies Config;
