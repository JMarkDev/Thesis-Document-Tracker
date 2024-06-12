/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        main: "#aa0022",
        main_hover: "#8a0620",
        yellow: "#de8f2f",
        yellow_hover: "#c77b1e",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
