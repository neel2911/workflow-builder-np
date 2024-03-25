/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx,ts}"],
  theme: {
    extend: {
      colors: {
        background: "#1B192B",
        text: "#f8f8f2",
        border: "#333154",
        card: "#333154",
        previewBackground: "#4caf5030",
        previewBorder: "#4caf50",
      },
    },
  },
  plugins: [],
};
