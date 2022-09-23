module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'myBg': '#40b8d9',
        'loaderBg' :'rgb(var(--overlay-loader))'
      },
    },
    screens: {
      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
    fontFamily: {
      'sans': ['Roboto', 'Arial', 'sans-serif'],
    },

  },
  plugins: [],
}
