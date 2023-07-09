import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        c1: "#F5653F",
        m1: colors.gray[900],
        "m1.5": colors.gray[800],
        m2: colors.gray[300],
        "m2.5": colors.gray[200],
        m3: colors.gray[100],
      },
    },
  },
  plugins: [],
};
