/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    container: false
  },
  theme: {
    extend: {
      colors: {
        'primary-F94545': '#F94545',
        'primary-67B044': '#67B044',
        'primary-0071DC': '#0071DC',
        'primary-7644E1': '#7644E1',
        'primary-FFB700': '#FFB700',
        'primary-1A162E': '#1A162E',
        'primary-77DAE6': '#77DAE6'
      },
      backgroundColor: {
        FAFAFD: '#FAFAFD',
        F8F8FB: '#F8F8FB',
        EEEEEE: '#EEEEEE'
      }
    },
    fontFamily: {
      'brave-ecom': 'Source Sans Pro, Arial, sans-serif'
    }
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.container': {
          maxWidth: theme('columns.7xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4')
        }
      })
    })
  ]
}
