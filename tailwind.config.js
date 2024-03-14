/** @type {import('tailwindcss').Config} */
import scrollbar, { nocompatible } from "tailwind-scrollbar";

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
        studyBanner: "#2F3031",
        gray: "#98A2B3",
        navBg: "#24272E",
        icons: "#C4CBDA",
        title: "#00A3FF",
        warning: "#FF0000",
        softwarning: "#FFFF00",
        buttonGreen: "#4CAF50",
        writeSubBg: "#02A4D8",
        green: "#00FF00",
        forestGreen: "#228B22",
        gold: "#FFD700",
        navy: "#000080",
        "modal-bg": "#CCCCCC",
        skyBlue: "#00bfff",
        studyCardBg: "#333333",
        darkgreen: "#4CAF50",
      },
      dropShadow: {
        shadow: "5px 5px 5px rgba(255, 255, 255, 0.4)",
        cardShadow: "0px 0px 8px rgba(255, 255, 255, 0.25)",
      },
      boxShadow: {
        writeShadow:
          "10px 0 10px -10px rgba(255, 255, 255, 0.3), -10px 0 10px -10px rgba(255, 255, 255, 0.3)",
        cardShadow: "0px 0px 10px rgba(255, 255, 255, 0.25)",
        hoverShadow: "0px 0px 12px rgba(255, 255, 255, 0.4)",
      },
    },
  },
  plugins: [scrollbar],
};
