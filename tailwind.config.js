/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cb: {
          blue:    '#0052FF',
          black:   '#050F19',
          gray1:   '#1E2025',
          gray2:   '#5B616E',
          gray3:   '#8A919E',
          gray4:   '#B8BFC8',
          gray5:   '#D8DCE0',
          gray6:   '#EAECEF',
          gray7:   '#F5F5F5',
          green:   '#05B169',
          red:     '#CF303B',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '1200px',
      },
      keyframes: {
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%':   { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        ticker: 'ticker 40s linear infinite',
        fadeUp: 'fadeUp 0.4s ease forwards',
      },
    },
  },
  plugins: [],
}
