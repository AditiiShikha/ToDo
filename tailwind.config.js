/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3B2FA4",
        secondary: "#6C63FF",
        background: "#F5F5FA",
        card: "#FFFFFF",
      },
      fontFamily: {
        display: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        card: "0 2px 24px 0 rgba(59,47,164,0.08)",
        glow: "0 0 0 3px rgba(108,99,255,0.18)",
      },
    },
  },
  plugins: [],
};
