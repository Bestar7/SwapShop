const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        swapShop: colors.indigo, // TODO facilitate changing theme, maybe in .env with a string ?
        //swapShop: colors['indigo'],
        //swapShop: colors.orange,
        //swapShop: colors.amber,
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    ({ addUtilities }) => {
      addUtilities({
        '.focusable': {}, // defined in src/global.scss
        '.clickableMain': {}, // defined in src/global.scss
        '.clickableSecondary': {}, // defined in src/global.scss
      });
    }
  ],
}

