module.exports = {
  purge: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        black: "#000000",
        "black-fade-50": "rgba(0,0,0,0.5)",
        white: "#FFFFFF",
        "white-fade-50": "rgba(255,255,255,0.5)",
        "gray-100": "#F7FAFC",
        "gray-200": "#EDF2F7",
        "gray-300": "#E2E8F0",
        "gray-400": "#CBD5E0",
        "gray-500": "#A0AEC0",
        "gray-600": "#718096",
        "gray-700": "#4A5568",
        "gray-800": "#2D3748",
        "gray-900": "#1A202C",
        "blue-100": "#EBF8FF",
        "blue-200": "#BEE3F8",
        "blue-300": "#90CDF4",
        "blue-400": "#63B3ED",
        "blue-500": "#4299E1",
        "blue-600": "#3182CE",
        "blue-700": "#2B6CB0",
        "blue-800": "#2C5282",
        "blue-900": "#2A4365",
      },
      fontFamily: {
        barlow: ["Barlow", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        mono: ["JetBrainsMono", "monospace"],
      },
      animation: {
        "slide-top": "slide-top 0.1s cubic-bezier(0, 0, 0.2, 1) forwards",
        "slide-bottom": "slide-bottom 0.1s cubic-bezier(0, 0, 0.2, 1) forwards",
        "slide-left": "slide-left 0.1s cubic-bezier(0, 0, 0.2, 1) forwards",
        "slide-right": "slide-right 0.1s cubic-bezier(0, 0, 0.2, 1) forwards",
        "dialog-enter": "dialog-enter 0.3s cubic-bezier(0, 0, 0.2, 1) forwards",
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
        "dialog-enter": {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "25%": { opacity: "1" },
          "100%": { transform: "translateY(0px)", opacity: "1" },
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
