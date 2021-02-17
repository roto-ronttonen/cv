module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#FF5A5F',
        'primary-light': '#ff7b7f',
        'primary-dark': '#cc484c',
        secondary: '#00A699',
        'secondary-light': '#33b8ad',
        'secondary-dark': '#00857a',
      },
      height: {
        section: '30rem',
      },
      minHeight: {
        section: '30rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
