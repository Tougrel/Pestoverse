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
      
      spacing: {
        '128': '32rem',
      },

      zIndex: {
        500: "500",
      },
      keyframes: theme => ({
        scalein: {
          '0%': { transform: 'scale(1.0)' },
          '100%': { transform: 'scale(2.0)' }
        },
        sunfire: {
          'from': { boxShadow: `0 0 50px ${theme.colors.yellow[200]}` },
          'to': { boxShadow: `0 0 100px ${theme.colors.yellow[200]}` }
        },
        rotation: {
          'from': { transform: 'rotate(0)' },
          'to': { transform: 'rotate(360deg)' },
        }
      }),
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
} satisfies Config;
