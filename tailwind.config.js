/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: '#7A0C1E',
          dark: '#4E0712',
          darker: '#2C0509',
        },
        gold: {
          light: '#F4D88C',
          DEFAULT: '#D4A72C',
          dark: '#9C7A1E',
        },
        cream: '#FBF7EE',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(122, 12, 30, 0.15)',
        premium: '0 20px 40px -10px rgba(122, 12, 30, 0.25)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F4D88C 0%, #D4A72C 50%, #9C7A1E 100%)',
        'maroon-gradient': 'linear-gradient(135deg, #7A0C1E 0%, #4E0712 100%)',
      },
    },
  },
  plugins: [],
}
