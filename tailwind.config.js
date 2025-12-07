/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "slate-main": "#212B3C",
        "main": "#1C2536",
        validate: {
          1: "#f1f1f1",
          2: "#d0d0d0",
          3: "#1e2b3e",
          4: "#1770ff",
          5: "#c0c0c0",
          6: "#000AFF",
          7: "#d9d900",
          8: "#ffffe0",
        },
      },
      screens: {
        md: "768px",
        "s-md": { max: "769px" },
        "m-md": { max: "1024px" },
        "l-md": { max: "1280px" },
      },
      spacing: {
        sm: "0.5rem",
        md: "1rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
		jakarta: ["Jakarta", "sans-serif"],
      },
    },
  },
  plugins: [],
};
