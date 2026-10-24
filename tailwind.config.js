/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,html}'],
  theme: {
    extend: {
      colors: {
        semperfi: {
          DEFAULT: '#2ebaf8',
          50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc',
          400: '#5dcbfb', 500: '#2ebaf8', 600: '#1a9ad6', 700: '#0d94c9',
          800: '#0a7ab5', 900: '#0a1628',
        },
        night: '#070f1d',
        cream: '#f9f8f6',
        'cream-2': '#f0efed',
        ink: '#1c1d1f',
        muted: '#5f5f5e', // AA sobre crema (≈6:1)
      },
      backgroundImage: {
        'gradient-semperfi': 'linear-gradient(135deg, #2ebaf8 0%, #1a9ad6 50%, #0d94c9 100%)',
      },
      boxShadow: {
        semperfi: '0 10px 40px rgba(46, 186, 248, 0.3)',
        'semperfi-lg': '0 20px 60px rgba(46, 186, 248, 0.4)',
        panel: 'inset 0 1px 0 rgba(255,255,255,.08), 0 30px 60px -20px rgba(0,0,0,.6)',
      },
      fontFamily: {
        display: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};
