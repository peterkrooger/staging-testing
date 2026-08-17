import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    // Pin PostCSS to our own empty config so Vite doesn't search parent
    // directories and pick up a stray Tailwind config (e.g. in .Trash).
    postcss: "./postcss.config.js",
  },
});