/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.75rem",
      "4xl": "2rem",
      "5xl": "2.25rem", // 36
      "6xl": "2.5rem", //40
      "7xl": "3rem", //48
      "8xl": "4rem", //64
      "9xl": "4.5rem", //72
    },
    extend: {
      colors: {
        primary: "#278E0E",
        secondary: "#FFB620",
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
        "login-cover": "url('/images/login-cover.png')",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
      },
    },
  },
  plugins: [],
};
