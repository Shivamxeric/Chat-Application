/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "bounce-in": "bounce-in 0.6s ease-out forwards", // Custom animation for card entrance
      },
      keyframes: {
        "bounce-in": {
          "0%": {
            transform: "scale(0.95) translateY(-20px)",
            opacity: 0,
          },
          "60%": {
            transform: "scale(1.05)",
            opacity: 0.8,
          },
          "100%": {
            transform: "scale(1)",
            opacity: 1,
          },
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
