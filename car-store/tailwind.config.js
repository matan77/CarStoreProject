/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{html,js,jsx}',
    './components/**/*.{html,js,jsx}',
  ],
  theme: {
  },
  extend: {},
  plugins: [require('@tailwindcss/forms')({
    strategy: 'base', 
    strategy: 'class',
  })],
}

