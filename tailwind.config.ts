import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
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
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        ocean: {
          deep: "hsl(var(--ocean-deep))",
          mid: "hsl(var(--ocean-mid))",
          surface: "hsl(var(--ocean-surface))",
          glow: "hsl(var(--ocean-glow))",
        },
        status: {
          connected: "hsl(var(--status-connected))",
          disconnected: "hsl(var(--status-disconnected))",
          warning: "hsl(var(--status-warning))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
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
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(var(--ocean-glow) / 0.3), 0 0 60px hsl(var(--ocean-glow) / 0.1)" },
          "50%": { boxShadow: "0 0 30px hsl(var(--ocean-glow) / 0.5), 0 0 80px hsl(var(--ocean-glow) / 0.2)" },
        },
        "pulse-connected": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(var(--status-connected) / 0.3), 0 0 60px hsl(var(--status-connected) / 0.1)" },
          "50%": { boxShadow: "0 0 30px hsl(var(--status-connected) / 0.5), 0 0 80px hsl(var(--status-connected) / 0.2)" },
        },
        "float-up": {
          "0%": { transform: "translateY(0)", opacity: "0.6" },
          "100%": { transform: "translateY(-20px)", opacity: "0" },
        },
        "ripple": {
          "0%": { transform: "scale(1)", opacity: "0.4" },
          "100%": { transform: "scale(1.5)", opacity: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "slide-up": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "pulse-connected": "pulse-connected 2s ease-in-out infinite",
        "float-up": "float-up 2s ease-out infinite",
        "ripple": "ripple 1.5s ease-out infinite",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "spin-slow": "spin-slow 8s linear infinite",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
