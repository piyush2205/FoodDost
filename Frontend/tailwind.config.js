/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
    screens: {
      'sm': '376px',
      // => @media (max-width: 576px) { ... }

      'md': '960px',
      // => @media (max-width: 960px) { ... }

      'lg': '1440px',
      // => @media (max-width: 1440px) { ... }
    },
  },
  plugins: [],
}

