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
    extend: {
      borderRadius: {
        'perf/2': '1.5rem',
        'perf': '2rem'
      },
      inset: {
        '60pct' : '60%'
      },
      minHeight: {
        'perf': '40rem',
        'default' : '48rem',
        'bglogo' : '70rem',
        'hperf' : '85rem'
      }, 
      screens: {
        'hres': '2560px',
        '4k': '3840px'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
