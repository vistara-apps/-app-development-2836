/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7ee',
          100: '#fdedd3',
          200: '#fad7a5',
          300: '#f7ba6d',
          400: '#f39533',
          500: '#f17509',
          600: '#e25c04',
          700: '#bb4507',
          800: '#95380c',
          900: '#782f0d',
        },
      },
    },
  },
  plugins: [],
}