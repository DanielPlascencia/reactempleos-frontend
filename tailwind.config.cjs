/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**", "./src/**/**"],
  theme: {
    screens: {
      movilS: "320px",
      movilM: "375px",
      movilL: "425px",
      tablet: "768px",
      laptop: "1024px",
      desktop: "1440px",
      desktopL: "2560px",
    },
    extend: {},
  },
  plugins: [],
};
