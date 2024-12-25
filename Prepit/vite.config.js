import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["pdf-lib", "tesseract.js", "@google/generative-ai"],
      output: {
        globals: {
          "tesseract.js": "Tesseract",
          "@google/generative-ai": "GoogleGenerativeAI",
        },
      },
    },
  },
  optimizeDeps: {
    include: ["pdf-lib", "tesseract.js", "@google/generative-ai"],
  },
  define: {
    "process.env": {},
  },
});
