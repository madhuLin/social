// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "social-primary": "#0F0E25",
        "social-c2": "#2C1F59",
        "social-c3": "#4C35AF",
        "social-font": "#FFFFFF",
        "social-font-second" : "#A9A8AF",
      },
    },
    fontFamily: {

    },
    container : {
      padding : "2rem",
      center : true,
    },
  },
  plugins: [],
}