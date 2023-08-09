/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}','node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}' /* Add more paths as needed */],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
};

