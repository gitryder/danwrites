const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./**/*.html'],
  theme: {
    colors: {
      'accent-red': '#DC1616',
      ...colors,
    },
    extend: {
      fontFamily: {
        sans: ['Barlow', ...defaultTheme.fontFamily.sans],
        mono: ['Space Grotesk', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
};
