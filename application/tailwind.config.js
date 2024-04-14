import {nextui} from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: {
            DEFAULT: "#500000",
            foreground: "#FFFFFF",
          },
          secondary: "#998542",
        }
      },
      dark: {
        colors: {
          primary: {
            DEFAULT: "#500000",
            foreground: "#FFFFFF",
          },
          secondary: "#998542",
        }
      },
      "red": {
        extend: "light",
        colors: {
          background: "#500000",
          foreground: "#FFFFFF",
          secondary: "#998542",
        }
      }
    }
  })],
}
