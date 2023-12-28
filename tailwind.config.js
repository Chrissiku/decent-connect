/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        teal: "#17A398",
        "dark-gray": "#393434",
        "light-gray": "#F7F8F9 ",
        shade: "#AF3B6E",
      },
    },
  },
  plugins: [],
};
