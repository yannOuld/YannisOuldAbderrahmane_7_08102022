/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  mode: 'jit',
  theme: {
    extend: {
      fontFamily: {
        lato: "'Lato', sans-serif"
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },

}
