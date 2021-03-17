module.exports = {
  purge: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Barlow", "sans-serif"],
        mono: ["monospace"],
      },
      animation: {
        "slide-top": "slide-top 0.1s linear forwards",
        "slide-bottom": "slide-bottom 0.1s linear forwards",
        "slide-left": "slide-left 0.1s linear forwards",
        "slide-right": "slide-right 0.1s linear forwards",
      },
      keyframes: {
        "slide-top": {
          "0%": { transform: "translateY(-5px)", opacity: "0" },
          "25%": { opacity: "1" },
          "100%": { transform: "translateY(0px)", opacity: "1" },
        },
        "slide-bottom": {
          "0%": { transform: "translateY(5px)", opacity: "0" },
          "25%": { opacity: "1" },
          "100%": { transform: "translateY(0px)", opacity: "1" },
        },
        "slide-left": {
          "0%": { transform: "translateX(-5px)", opacity: "0" },
          "25%": { opacity: "1" },
          "100%": { transform: "translateX(0px)", opacity: "1" },
        },
        "slide-right": {
          "0%": { transform: "translateX(5px)", opacity: "0" },
          "25%": { opacity: "1" },
          "100%": { transform: "translateX(0px)", opacity: "1" },
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
