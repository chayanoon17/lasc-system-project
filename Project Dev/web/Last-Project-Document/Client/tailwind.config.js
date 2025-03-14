import withMT from "@material-tailwind/react/utils/withMT";
 
export default withMT({
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('tailwindcss'),
    // eslint-disable-next-line no-undef
    require('autoprefixer'),
  ],
});