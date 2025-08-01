/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'brand-teal': '#00f0a8', // Adjust this to the exact teal from your image
          'brand-dark': '#0f172a',
          'brand-light-dark': '#1e293b',
        },
      },
    },
    plugins: [],
  }