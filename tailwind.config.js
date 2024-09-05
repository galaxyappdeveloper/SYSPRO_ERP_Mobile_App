/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1254a5",
        secondary: {
          DEFAULT: "#021121",
          100: "#021121",
          200: "#021121",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
        textGray: {
          100: "#5C658C",
        },
        border: {
          100: "#55555526",
        },
      },
      fontFamily: {
        gthin: ["Gilroy-Thin", "sans-serif"],
        glight: ["Gilroy-Light", "sans-serif"],
        gregular: ["Gilroy-Regular", "sans-serif"],
        gregularItalic: ["Gilroy-Regularitalic", "sans-serif"],
        gmedium: ["Gilroy-Medium", "sans-serif"],
        gsemibold: ["Gilroy-SemiBold", "sans-serif"],
        gbold: ["Gilroy-Bold", "sans-serif"],
        gextrabold: ["Gilroy-ExtraBold", "sans-serif"],
        gblack: ["Gilroy-Black", "sans-serif"],
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
