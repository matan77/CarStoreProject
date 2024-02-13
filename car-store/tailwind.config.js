/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{html,js,jsx}',
    './components/**/*.{html,js,jsx}',
  ],
  theme: {
    colors: {
      red: {
        DEFAULT: '#ff2323', // Default red color
        light: '#ffc0c0',   // Light mode red color
        dark: '#d70000',    // Dark mode red color
      }
    }
  },
  extend: {},
  plugins: [],
}

