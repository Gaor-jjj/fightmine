/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        pixelify: ["PixelifySans-Regular", "sans-serif"],
        pixelifyM: ["PixelifySans-Medium", "sans-serif"],
        pixelifySb: ["PixelifySans-SemiBold", "sans-serif"],
        pixelifyB: ["PixelifySans-Bold", "sans-serif"]
      },
      colors: {
        primary: "#C3B091",
        secondary: "#8E7F6B",
        brown: {
          500: '#C3B091',
          700: '#8E7F6B',
          900: '#3D2206', 
        },
      }
    },
  },
  plugins: [],
}