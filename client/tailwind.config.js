/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7c3aed", // violet-600
        secondary: "#1e293b", // slate-800
        muted: "#64748b", // slate-500
        background: "#eef2ff", // indigo-50
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
        bloom: "0 0 20px rgba(124, 58, 237, 0.2)",
      },
    },
  },
  plugins: [],
};
