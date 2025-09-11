/** @type {import('tailwindcss').Config} */
module.exports = {
  // Use class strategy for dark mode so we can control it programmatically
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
