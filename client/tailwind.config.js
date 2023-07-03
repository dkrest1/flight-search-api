/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'hero-img': "url('/src/Assets/hero-image.jpeg')"
      },
    },
  },
  plugins: [],
}

