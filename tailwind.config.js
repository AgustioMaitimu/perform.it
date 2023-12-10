/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dimPink: '#c0767d',
        lightGray: '#eceef0',
        veryDarkBlue: '#070d31',
      },
    },
  },
  plugins: [],
};

