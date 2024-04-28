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
          default: {
            500: "#000000",
          },
          foreground: {
            500: "#000000",
          },
          success: "#00FF00",//green
          danger: "#FF0000",//red
          warning: "#FFBF00",//yellow
          info: "#00BFFF",//blue
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
      },
      "contrast": {
        extend: "light",
        colors: {
          background: "#000000", // Black background
          foreground: "#87CEEB", // Teal text
        }
      },
      "summer": {
        extend: "light",
        colors: {
          background: "#FDE68A", // Warm yellow for sunshine
          foreground: "#FFFFFF", // White for contrast and freshness
          secondary: "#F97316", // Vibrant orange for energy and fun
          accent: "#10B981", // Teal for a touch of cool, refreshing water
          highlight: "#EAB308", // Golden yellow for warmth and light
        }
      },
      "winter": {
        extend: "light",
        colors: {
          background: "#B4D4E7", // Blue for the sky
          foreground: "#FFFFFF", // White for contrast and freshness
          secondary: "#007FFF", // Vibrant blue for the sea
          accent: "#FF0000", // Red for the fire
          highlight: "#00BFFF", // Teal for the sea
        }
      }
    }
  })],
}