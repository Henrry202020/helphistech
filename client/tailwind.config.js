/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Light mode
        "light-main": "rgb(99 102 241)",
        "light-description": "rgb(64 64 64)",
        "light-subtitle": "rgb(120 120 120)",
        // Dark mode
        "dark-main": "rgb(76 78 149)",
        "dark-text": "rgb(225 225 225)",
        "darkmode": "rgb(5,5,5)"
      }
    },
  },
  plugins: [],
}

