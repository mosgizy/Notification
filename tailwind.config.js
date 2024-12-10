/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: 'hsl(210, 60%, 98%)',
          200: 'hsl(211, 68%, 94%)',
          300: 'hsl(205, 33%, 90%)',
        },
        secondary: {
          100: 'hsl(219, 14%, 63%)',
          200: 'hsl(219, 12%, 42%)',
          300: 'hsl(224, 21%, 14%)',
          400: 'hsl(1, 90%, 64%)',
          500: 'hsl(219, 85%, 26%)',
        },
      },
    },
  },
  plugins: [],
}
