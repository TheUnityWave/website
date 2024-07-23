const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        '5': '5px', // Example for custom border width
        '6': '6px',
      },
      colors: {
        primary: '#21506E',
      },
      fontFamily: {
        primary: ['Poppins', ...defaultTheme.fontFamily.sans],
        secondary: ['Raleway', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}

