/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      login: "#2D55FB",
      white: "#FFFFFF",
      back: "#1F2228",
      form: "#101828",
      loginBtn: "#1570EF",
      btnwhite: "#FCFCFD",
      gray: "#98A2B3",
      navBg: "#24272E",
      icons: "#C4CBDA",
      title: "#00A3FF",
      warning: "#FF0000",
      softwarning: "#FFFF00",
    },
    extend: {
      dropShadow: {
        shadow: "0 8px 8px rgba(211, 218, 226, 1)",
      },
    },
  },
  plugins: [],
};
