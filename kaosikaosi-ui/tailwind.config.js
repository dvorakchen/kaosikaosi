/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,jsx,js}", "./index.html"],
  theme: {
    extend: {
      backgroundImage: {
        volleyballBoys: "url('/src/assets/volleyball-boys.webp')",
        'volleyballBoys-mobile': "url('/src/assets/volleyball-boys.jpg')",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["winter"],
  },
};
