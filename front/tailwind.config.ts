import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "champagne": "#D2B68A",
        "velvet": "#222D52",
        "pearl": "#FDFFFF",
        "marble": "E8E4E0",
        "silk": "#EEE5D9"
      },
    },
  },
  plugins: [],
} satisfies Config;
