import type { Config } from "tailwindcss";

export default {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#0F3A50",
        secondary: "#2B8AAF",
        gray: {
          500: "#6B7280",
          600: "#4B5563", // more accessibility focused color
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
