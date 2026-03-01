/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#FDF6F0",
          secondary: "#F5EDE4",
          dark: "#1C1410",
          "dark-secondary": "#2A1F18",
        },
        foreground: {
          DEFAULT: "#2D1B0E",
          secondary: "#5C4A3A",
          muted: "#9B8B7D",
          "on-dark": "#F5EDE4",
          "on-dark-secondary": "#C4B5A5",
          "on-dark-muted": "#8A7B6D",
        },
        accent: {
          DEFAULT: "#C4653A",
          light: "#E8956A",
          dark: "#A14E2A",
          "on-dark": "#D4764A",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          elevated: "#FFFFFF",
          dark: "#261C15",
          "dark-elevated": "#342720",
        },
        border: {
          DEFAULT: "#E5D9CE",
          dark: "#3D2E24",
        },
        success: {
          DEFAULT: "#5A8A5E",
        },
        warning: {
          DEFAULT: "#D4A843",
        },
        error: {
          DEFAULT: "#C44B3F",
        },
      },
      fontFamily: {
        display: ["PlayfairDisplay"],
        "display-bold": ["PlayfairDisplay-Bold"],
        body: ["System"],
      },
      borderRadius: {
        card: "16px",
        chip: "20px",
        button: "12px",
      },
    },
  },
  plugins: [],
};
