/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",

  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./components/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      // calc(100%-2rem)
      first: "1056px", // 1024px
      second: "1440px", // 1376px
      third: "1920px", // 1728px
    },

    extend: {
      width: {
        firstScreenWidth: "1024px",
        secondScreenWidth: "1376px",
        thirdScreenWidth: "1728px",
      },
      colors: {
        black: "#242021",
        white: "#F4F4F4",
        point: "#904CF9",
      },
    },
  },
  plugins: [],
};
