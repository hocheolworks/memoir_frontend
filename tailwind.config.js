/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",

  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./components/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // screens: {
    //   // calc(100%-2rem)
    //   zero: "767px",
    //   first: "1056px", // 1024px
    //   second: "1440px", // 1376px
    //   third: "1920px", // 1728px
    // },

    extend: {
      screens: {
        // calc(100%-2rem)
        zero: "767px",
        first: "1056px", // 1024px
        second: "1440px", // 1376px
        third: "1920px", // 1728px
      },
      fontFamily: {
        // helsinki: src
      },
      animation: {
        "slide-down":
          "slide-down 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "slide-up":
          "slide-up 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "slide-top":
          "slide-top 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "slide-bottom":
          "slide-bottom 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "fade-in": "fade-in 0.25s ease-out both",
        "fade-out": "fade-out 0.03s ease-in both",
      },
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        "fade-out": {
          "0%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
          },
        },
        "slide-down": {
          "0%": {
            "-webkit-transform": "translateY(0)",
            transform: "translateY(0)",
            opacity: 0,
          },
          "100%": {
            "-webkit-transform": "translateY(0.5rem)",
            transform: "translateY(0.5rem)",
            opacity: 1,
          },
        },
        "slide-up": {
          "0%": {
            "-webkit-transform": "translateY(0)",
            transform: "translateY(0)",
            opacity: 1,
          },
          "100%": {
            "-webkit-transform": "translateY(-0.5rem)",
            transform: "translateY(-0.5rem)",
            opacity: 0,
          },
        },
        "slide-top": {
          "0%": {
            "-webkit-transform": "translateY(100%)",
            transform: "translateY(100%)",
          },
          "100%": {
            "-webkit-transform": "translateY(0)",
            transform: "translateY(0)",
          },
        },
        "slide-bottom": {
          "0%": {
            "-webkit-transform": "translateY(0)",
            transform: "translateY(0)",
          },
          "100%": {
            "-webkit-transform": "translateY(100%)",
            transform: "translateY(100%)",
          },
        },
      },
      width: {
        firstScreenWidth: "1024px",
        secondScreenWidth: "1376px",
        thirdScreenWidth: "1728px",
      },
      colors: {
        black: "#242021",
        white: "#F4F4F4",
        point: "#904CF9",
        defaultGraphLev1: "#0E4429",
        defaultGraphLev2: "#006D32",
        defaultGraphLev3: "#26a641",
        defaultGraphLev4: "#39d353",
      },
    },
  },
  plugins: [],
};
