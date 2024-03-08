/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",

  content: [
    "./app/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
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
        "contribution-width": "831px",
        "left-area-visible": "1250px",
        zero: "767px",
        first: "1056px", // 1024px
        second: "1440px", // 1376px
        third: "1920px", // 1728px
      },
      fontFamily: {},
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
        "scale-in-center": "scale-in-center 0.06s ease-in both",
        "scale-in-bottom":
          "scale-in-bottom 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "slide-in-blurred-bottom":
          "slide-in-blurred-bottom 0.4s cubic-bezier(0.230, 1.000, 0.320, 1.000) both",
        "slide-out-bck-bottom":
          "slide-out-bck-bottom 0.15s cubic-bezier(0.550, 0.085, 0.680, 0.530) both",
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

        /* ----------------------------------------------
         * Generated by Animista on 2023-6-12 0:2:36
         * Licensed under FreeBSD License.
         * See http://animista.net/license for more info.
         * w: http://animista.net, t: @cssanimista
         * ---------------------------------------------- */
        "slide-in-blurred-bottom": {
          "0%": {
            "-webkit-transform": "translateY(1000px) scaleY(2.5) scaleX(0.2)",
            transform: "translateY(1000px) scaleY(2.5) scaleX(0.2)",
            "-webkit-transform-origin": "50% 100%",
            "transform-origin": "50% 100%",
            "-webkit-filter": "blur(40px)",
            filter: "blur(40px)",
            opacity: 0,
          },
          "100%": {
            "-webkit-transform": "translateY(0) scaleY(1) scaleX(1)",
            transform: "translateY(0) scaleY(1) scaleX(1)",
            "-webkit-transform-origin": "50% 50%",
            "transform-origin": "50% 50%",
            "-webkit-filter": "blur(0)",
            filter: "blur(0)",
            opacity: 1,
          },
        },
        "slide-out-bck-bottom": {
          "0%": {
            "-webkit-transform": "translateZ(0) translateY(0)",
            transform: "translateZ(0) translateY(0)",
            opacity: 1,
          },
          "100%": {
            "-webkit-transform": "translateZ(-1100px) translateY(1000px)",
            transform: "translateZ(-1100px) translateY(100px)",
            opacity: 0,
          },
        },
        "scale-in-center": {
          "0%": {
            "-webkit-transform": "scale(0)",
            transform: "scale(0)",
          },
          "100%": {
            "-webkit-transform": "scale(1)",
            transform: "scale(1)",
          },
        },
        "scale-in-bottom": {
          "0%": {
            "-webkit-transform": "scale(0)",
            transform: "scale(0)",
            "-webkit-transform-origin": "50% 100%",
            "transform-origin": "50% 100%",
          },
          "100%": {
            "-webkit-transform": "scale(1)",
            transform: "scale(1)",
            "-webkit-transform-origin": "50% 100%",
            "transform-origin": "50% 100%",
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
        grey1: "#2E2E2E",
      },
      minHeight: {
        auto: "auto",
      },
    },
  },
  plugins: [],
};
