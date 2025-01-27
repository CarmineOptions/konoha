/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E7E2D4",
        secondary: "#1478D3",
        "main-bg": "#F5F4EE",
      },
      fontFamily: {
        default: ["Instrument Serif", "serif"],
        inter: ["Inter Tigh", "sans-serif"],
      },
    },
  },
  plugins: [],
};
