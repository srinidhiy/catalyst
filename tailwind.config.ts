import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#717BB9",//"#004C3F",
          200: "#9599E1",
          300: "#002E24"
        },
        black: {
          100: "#212625",
          200: "#424C4A",
          300: "#57605E",
          400: "#82918E",
          500: "#212326"
        },
        secondary: {
          200: "#FFBC9F"
        },
        tertiary: {
          200: "#EAEBFF",
          300: "#FFFFFF"
        }
      },
      fontFamily: {
        "head": ["Plus Jakarta Sans", "sans-serif"],
        "body": ["DM Sans", "sans-serif"]
      },
      opacity: {
        "15": ".15"
      }
    },
  },
  plugins: [],
}
export default config
