import type { Config } from "tailwindcss";

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#2B303B",
        navigation: "#16181D",
      },

      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },

      zIndex: {
        500: "500",
      },
      keyframes: {
        scalein: {
          '0%': { transform: 'scale(1.0)' },
          '100%': { transform: 'scale(2.0)' }
        }
      }
    },
  },
} satisfies Config;
