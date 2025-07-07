import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
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
        heading: ['var(--font-playfair-display)', 'Georgia', 'serif'],
        body: ['var(--font-outfit)', 'sans-serif'],
      },
      fontSize: {
        'h1': 'var(--h1-size)',
        'h2': 'var(--h2-size)',
        'h3': 'var(--h3-size)',
        'body': 'var(--body-size)',
        'small': 'var(--small-size)',
      },
      lineHeight: {
        'body': 'var(--line-height)',
        'heading': 'var(--line-height-heading)',
      },
      spacing: {
        'section': 'var(--section-padding)',
        'grid-gap': 'var(--grid-gap)',
      },
      maxWidth: {
        'container': 'var(--container-max-width)',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#1C1C1E", // black from Design.json
          foreground: "#F5F5F2", // off-white from Design.json
        },
        secondary: {
          DEFAULT: "#F5F5F2", // off-white from Design.json
          foreground: "#1C1C1E", // black from Design.json
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#7D7D7D", // grey from Design.json
          foreground: "#F5F5F2", // off-white from Design.json
        },
        accent: {
          DEFAULT: "#D4AF37", // gold from Design.json
          foreground: "#1C1C1E", // black from Design.json
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(10px)" }
        },
        "scale-up": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.03)" }
        },
        "lift-up": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-5px)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "bounce": "bounce 2s ease-in-out infinite",
        "scale-up": "scale-up 0.3s ease forwards",
        "lift-up": "lift-up 0.3s ease forwards"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
