/** @type {import('tailwindcss').Config} */
module.exports = {
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
        "1024px": "1024px",
        "1376px": "1376px",
        "1728px": "1728px",
      },
    },
  },
  plugins: [],
};
