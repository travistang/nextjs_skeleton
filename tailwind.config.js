const color = (name, prefix) => ({ opacityVariable, opacityValue }) => {
  if (opacityValue !== undefined) {
    return `rgba(var(${prefix}-${name}), ${opacityValue})`;
  }
  if (opacityVariable !== undefined) {
    return `rgba(var(${prefix}-${name}), var(${opacityVariable}, 1))`;
  }
  return `rgb(var(${prefix}-${name}))`;
};

const colorScale = (name, prefix = "--twc") =>
  [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].reduce(
    (acc, step) => ({
      ...acc,
      [step]: color(`${name}-${step}`, prefix),
    }),
    {}
  );

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: colorScale("primary", "--color"),
        secondary: colorScale("secondary", "--color"),
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
