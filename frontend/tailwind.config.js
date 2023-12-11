/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: ["text-danger", "text-warning", "text-safe"],
  theme: {
    fontSize: {
      12: ["0.75rem", { fontWeight: "700" }],
      14: ["0.875rem", { fontWeight: "700" }],
      16: ["1rem", { fontWeight: "700" }],
      20: ["1.25rem", { fontWeight: "700" }],
      24: ["1.5rem", { fontWeight: "700" }],
      28: ["1.75rem", { fontWeight: "700" }],
      32: ["2rem", { fontWeight: "700" }],
      36: ["2.25rem", { fontWeight: "700" }],
      40: ["2.5rem", { fontWeight: "700" }],
      48: ["3rem", { fontWeight: "700" }],
      56: ["3.5rem", { fontWeight: "700" }],
      64: ["4rem", { fontWeight: "700" }],
      72: ["4.5rem", { fontWeight: "700" }],
    },
    extend: {
      colors: {
        // Text Color
        t: {
          title: "#484848",
          subtitle: "#7E7E7E",
          paragraph: "#484848",
          invert: "#F8F8F8",
        },
        // Box Color (Container Color)
        primary: "#278E0E",
        secondary: "#66E347",
        warning: "#FFB703",
        danger: "#FA4949",
        safe: "#278E0E",
        invert: "#F8F8F8",
        white: "#FFFFFF",
        green: {
          1: "#C9FFBC",
          2: "#66E347",
          4: "#4ABA21",
          6: "#278E0E",
          8: "#197303",
          9: "#0E4900",
        },
        gray: {
          1: "#F8F8F8",
          2: "#E8E8E8",
          4: "#C3C3C3",
          6: "#7E7E7E",
          8: "#484848",
          9: "#000000",
        },
        glassmorphism: "rgba(16, 16, 18, 0.60)",
      },
      boxShadow: {
        card: "0px 4px 12px 0px rgba(0, 0, 0, 0.50)",
      },
      backgroundImage: {
        "login-cover": "url('/login-cover.png')",
        "home-welcome": "url('/IMG_6677.jpg')",
      },
      screens: {
        // Mobile
        xs: "425px",
        // Tablet
        sm: "640px",
        // Laptop
        md: "768px",
        // Large Screen
        lg: "1024px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
