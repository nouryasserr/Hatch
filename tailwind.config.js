/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5632C9",
        secondary: "#ff0000",
        blackmuted: "#404040",
        lightblack: "#757575",
        lightgray: "#8E8F94",
      },
    },
    screens: {
      xs: "480px",
      sm: "640px",
      md: "769px",
      lg: "1025px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
