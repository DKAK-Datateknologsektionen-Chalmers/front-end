module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#2E3C47',
      'grey': '#ECECEC',
      'grey-dark' : '#D8D8D8',
      'success': '#A1F2A9',
      'sucess-dark' : "#85FF91"
     }),
     fontFamily: {
       'poppins':['Poppins', 'ui-sans-serif']
     },
     borderRadius: {
       'perf': '2rem'
     },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
