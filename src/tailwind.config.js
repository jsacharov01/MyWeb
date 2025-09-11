/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // povolí manuální přepínání dark/light
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};