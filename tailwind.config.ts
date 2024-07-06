import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        bold: ["Bold"],
        medium: ["Medium"],
      },
      screens: {
        xs: "512px",
      },
      colors: {
        default: {
          50: "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          400: "#a1a1aa",
          500: "#71717a",
          600: "#52525b",
          700: "#3f3f46",
          800: "#27272a",
          900: "#18181b",
        },
        primary: {
          50: "#e6f1fe",
          100: "#cce3fd",
          200: "#99c7fb",
          300: "#66aaf9",
          400: "#338ef7",
          500: "#006FEE",
          600: "#005bc4",
          700: "#004493",
          800: "#002e62",
          900: "#001731",
        },
        secondary: {
          50: "#f2eafa",
          100: "#e4d4f4",
          200: "#c9a9e9",
          300: "#ae7ede",
          400: "#9353d3",
          500: "#7828c8",
          600: "#6020a0",
          700: "#481878",
          800: "#301050",
          900: "#180828",
        },
        danger: {
          50: "#fee7ef",
          100: "#fdd0df",
          200: "#faa0bf",
          300: "#f871a0",
          400: "#f54180",
          500: "#f31260",
          600: "#c20e4d",
          700: "#920b3a",
          800: "#610726",
          900: "#310413",
        },
        warning: {
          50: "#fefce8",
          100: "#fdedd3",
          200: "#fbdba7",
          300: "#f9c97c",
          400: "#f7b750",
          500: "#f5a524",
          600: "#c4841d",
          700: "#936316",
          800: "#62420e",
          900: "#312107",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), nextui()],
};

export default config;
