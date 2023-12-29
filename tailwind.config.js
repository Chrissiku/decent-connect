/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        teal: "#8B7EF8",
        "dark-gray": "#393434",
        "light-gray": "#F7F8F9 ",
        shade: "#F66E49",
      },
    },
  },
  plugins: [],
};
