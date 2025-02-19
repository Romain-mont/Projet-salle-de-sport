const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
    flowbite.content()
  ],
  theme: {
    extend: {
      colors : {
        'primary': '#FED703',
        'secondary': '#3C454D',
        'gray-light': '#D9D9D9',
        'accent': '#0077B6'
      },
      fontFamily: {
        'title': ['Bebas Neue', 'sans-serif'],
        'body': ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [
    flowbite.plugin()
  ],
}
