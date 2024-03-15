/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        noir: '#000000',
        blanc: '#FFFFFF',
        bleu: '#12225D',
        violet: '#74279E',
  },
    },
    },
  variants: {
    extend: {},
  },
  plugins: [],
};



