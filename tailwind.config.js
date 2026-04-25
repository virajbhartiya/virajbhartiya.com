/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        fg: "var(--fg)",
        accent: "var(--accent)",
        "accent-blue": "var(--accent-blue)",
        muted: "var(--muted)",
        border: "var(--border)",
        "card-bg": "var(--card-bg)",
      },
      fontFamily: {
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      borderRadius: {
        DEFAULT: "0",
      },
    },
  },
  plugins: [],
};
