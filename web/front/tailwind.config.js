/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/**/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      zIndex: {
        999: "999",
      },
    },
  },
  plugins: [require("daisyui"), require("tailwind-scrollbar")],
};
