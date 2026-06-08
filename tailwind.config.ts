import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Locator brand blues — daytime UAE sky
        sky: {
          deep: "#1360ee",
          DEFAULT: "#0a84e3",
          mid: "#08b2e0",
          soft: "#79dffa",
          paler: "#D6ECFB",
          mist: "#EAF4FE",
        },
        brand: {
          DEFAULT: "#0a84e3",
          deep: "#1360ee",
          light: "#5b9bff",
          soft: "#8CC2FF",
        },
        warm: {
          DEFAULT: "#FBEABC",
          deep: "#F6C46A",
        },
        // Surfaces
        bg: {
          base: "#FAFCFF",
          mist: "#F1F6FE",
          card: "#FFFFFF",
          tint: "#EAF2FE",
        },
        // Text ink
        ink: {
          DEFAULT: "#0F1B3A",
          muted: "#4A5878",
          subtle: "#8190AD",
        },
        good: "#14a86b",
        warn: "#f59f0b",
        bad: "#e85a5a",
      },
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
        display: ["Sora", "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: ["72px", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "hero-md": ["48px", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "hero-sm": ["36px", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.75rem",
      },
      boxShadow: {
        glow: "0 0 50px -8px rgba(10,132,227,0.4)",
        card: "0 24px 48px -28px rgba(10,132,227,0.18)",
      },
      keyframes: {
        fadein: { from: { opacity: "0" }, to: { opacity: "1" } },
      },
      animation: {
        fadein: "fadein 0.4s ease",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
