/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: "#80AED9",
        },
        gray: {
          lighter: "#FDFDFD",
          light: "#777777",
          DEFAULT: "#4F4E4E",
          dark: "#333333",
          darker: "#010101",
        },
        pink: {
          DEFAULT: "#FF91B8",
          neutral: "#FC6DA0",
        },
      },
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
