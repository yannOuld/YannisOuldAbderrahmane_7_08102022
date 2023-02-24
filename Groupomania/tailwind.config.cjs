/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        lato: "'Lato', sans-serif",
      },
      backgroundColor: {
        primarygroup: "#FD2D01",
        secondgroup: "#FFD7D7",
        tertiarygroup: "#4E5166",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
};
