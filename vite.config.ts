import { defineConfig } from "vite";
import fs from "fs";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

const keyPath = "./localhost+2-key.pem";
const certPath = "./localhost+2.pem";

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 5000,
  },
  server: {
    https: {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    },
  },
});
