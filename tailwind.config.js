module.exports = {
  purge: ["./pages/**/*.{tsx}", "./components/**/*.{tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "row-green": {
          DEFAULT: "#57CC99",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
