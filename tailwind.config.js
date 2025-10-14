/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        'sp': '0 3px 12px 0 rgba(0, 0, 0, 0.2)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      fontFamily: {
        sans: ['Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      //this is animation class
      animation: {
        fade: 'yellowFade 3s ease-in-out;',
      },
      keyframes: {
        yellowFade: {
          '0%': { backgroundColor: 'yellow' },
          '100%': { backgroundColor: 'transparent' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // enable better form styles
  ],
}
