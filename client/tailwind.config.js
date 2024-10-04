const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#21506E',
      },
       backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'complex-gradient': 'linear-gradient(to bottom, #000000 0%, #000F14 10%, #01151C 20%, #011D26 30%, #01212B 40%, #01222D 50%, #01212B 60%, #011D26 70%, #01151C 80%, #000F14 90%, #000000 100%)',
      },
      fontFamily: {
        primary: ['Poppins', ...defaultTheme.fontFamily.sans],
        secondary: ['Raleway', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}

