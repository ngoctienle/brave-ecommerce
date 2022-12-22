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
        'secondary-77DAE6': '#77DAE6',
        'secondary-1A162E': '#1A162E',
        'secondary-9E9DA8': '#9E9DA8',
        'secondary-D2D1D6': '#D2D1D6',
        'secondary-EDEDF6': '#EDEDF6',
        'secondary-F8F8FB': '#F8F8FB'
      },
      backgroundColor: {
        FAFAFD: '#FAFAFD',
        F8F8FB: '#F8F8FB',
        EEEEEE: '#EEEEEE',
        F6F6F6: '#F6F6F6'
      },
      borderRadius: {
        20: '20px',
        16: '16px',
        10: '10px',
        8: '8px'
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
        },
        '.b-sd': {
          boxShadow: '0px 20px 60px 10px rgba(237, 237, 246, 0.2)'
        },
        '.fs-26': {
          fontSize: '26px',
          lineHeight: '32px'
        },
        '.fs-22': {
          fontSize: '22px',
          lineHeight: '32px'
        },
        'fs-18': {
          fontSize: '18px',
          lineHeight: '26px'
        },
        '.fs-16': {
          fontSize: '16px',
          lineHeight: '24px'
        },
        '.fs-14': {
          fontSize: '14px',
          lineHeight: '22px'
        },
        '.fs-12': {
          fontSize: '12px',
          lineHeight: '18px'
        },
        '.fs-10': {
          fontSize: '10px',
          lineHeight: '16px'
        },
        '.fs-9': {
          fontSize: '9px',
          lineHeight: '14px'
        }
      })
    }),
    require('@tailwindcss/line-clamp')
  ]
}
