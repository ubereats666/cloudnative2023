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
      lg: "1.25rem",
      xl: "1.5rem",
      "2xl": "1.75rem",
      "3xl": "2rem",
      "4xl": "2.25rem",
      "5xl": "2.5rem",
      "6xl": "3rem",
      "7xl": "4rem",
      "8xl": "4.5rem",
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
        "login-cover": "url('/images/login-cover.png')",
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
  plugins: [],
};
