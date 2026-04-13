import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        jungle: {
          50:  "#f0fdf0",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        safari: {
          tan:    "#d4a853",
          brown:  "#8b5e3c",
          bark:   "#5c3d1e",
          leaf:   "#3d6b2a",
          moss:   "#5a7a3a",
          canopy: "#1a4020",
        },
        kingdom: {
          gold:   "#f5c842",
          orange: "#f07c2a",
          red:    "#d94f2b",
          purple: "#7b3fa0",
          sky:    "#3ab5e6",
          cream:  "#fdf6e3",
        },
      },
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"],
        body:    ["system-ui", "sans-serif"],
      },
      backgroundImage: {
        "jungle-texture": "url('/images/jungle-bg.jpg')",
        "wood-grain":     "url('/images/wood-grain.jpg')",
        "parchment":      "url('/images/parchment.jpg')",
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
        "sway":  "sway 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":       { transform: "translateY(-8px)" },
        },
        sway: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%":       { transform: "rotate(3deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
