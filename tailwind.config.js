/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
        writeSubBg: "#02A4D8",
        green: "#00FF00",
        forestGreen: "#228B22",
        gold: "#FFD700",
        navy: "#000080",
        "modal-bg": "#CCCCCC",
        skyBlue: "#00bfff",
      },
      dropShadow: {
        shadow: "5px 5px 5px rgba(255, 255, 255, 0.4)",
      },
      boxShadow: {
        writeShadow:
          "10px 0 10px -10px rgba(255, 255, 255, 0.3), -10px 0 10px -10px rgba(255, 255, 255, 0.3)",
      },
    },
  },
  plugins: [],
};
