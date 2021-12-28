const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: true, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      amber: colors.amber,
      black: colors.black,
      blue: colors.blue,
      cyan: colors.cyan,
      emerald: colors.emerald,
      fuchsia: colors.fuchsia,
      gray: colors.trueGray,
      blueGray: colors.blueGray,
      coolGray: colors.coolGray,
      trueGray: colors.trueGray,
      warmGray: colors.warmGray,
      green: colors.green,
      indigo: colors.indigo,
      lime: colors.lime,
      orange: colors.orange,
      pink: colors.pink,
      purple: colors.purple,
      red: colors.red,
      rose: colors.rose,
      sky: colors.sky, //warn - As of Tailwind CSS v2.2, `lightBlue` has been renamed to `sky`.
      teal: colors.teal,
      violet: colors.violet,
      yellow: colors.amber,
      white: colors.white,
    },
    extend: {
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
        mono: ['SFMono-Regular', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
