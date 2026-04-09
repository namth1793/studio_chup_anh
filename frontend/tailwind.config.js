/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0A',
        stone: '#3A3A3A',
        mist: '#888888',
        cream: '#FAF8F5',
        sand: '#F0EDE6',
        bone: '#E8E4DC',
        gold: '#B8935A',
        'gold-light': '#D4B07A',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Montserrat', '"Helvetica Neue"', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.3em',
        ultra: '0.5em',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 1s ease forwards',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
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
