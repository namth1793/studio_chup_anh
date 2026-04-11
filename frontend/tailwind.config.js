/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#3A3A3A',
        stone: '#6B6561',
        mist: '#9E9898',
        cream: '#FFFFFF',
        sand: '#EAE7E1',
        bone: '#D4D0CA',
        gold: '#D8A7B1',
        'gold-light': '#E8C4CB',
        blush: '#F7F1F3',
        olive: '#A3B18A',
        'olive-light': '#C8D5B9',
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
