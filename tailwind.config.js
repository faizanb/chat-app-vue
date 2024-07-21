/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      spacing: {
        '15%': '15%',
        '16.666667%': '16.666667%',
        '35%': '35%',
        '95%': '95%',
        '99%': '99%'
      }
    }
  },
  plugins: [require('flowbite/plugin')]
};
