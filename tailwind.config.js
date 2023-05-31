/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      myFont: ['Playfair Display'],
      handDrawn: ['Delicious Handrawn', 'cursive'],
      freight: ['FreightSansPro'],
    },
    extend: {
      colors: {
        tile: '#904849',
        fosfor: '#e0ff5b',
        myGray: '#eae8e5',
        myGrayDarker: '#bdb7ad',
      },
    },
  },
  plugins: [],
};
