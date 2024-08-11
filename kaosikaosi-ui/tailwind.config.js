/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,jsx,js}", "./index.html"],
  theme: {
    extend: {
      backgroundImage: {
        volleyballBoys: "url('/src/assets/volleyball-boys.webp')",
        'miku-hero': "url('/src/assets/miku.webp')",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["winter"],
  },
};
