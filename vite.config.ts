import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const ghPagesBase = process.env["GH_PAGES_BASE"];

export default defineConfig({
  base: ghPagesBase || "/",
  plugins: [react(), tailwindcss()],
  resolve: { tsconfigPaths: true },
});
