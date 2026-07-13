import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      fileName: () => "v2c-trydan-card.js",
    },
    assetsInlineLimit: Number.MAX_SAFE_INTEGER,
    cssCodeSplit: false,
    emptyOutDir: true,
    minify: "oxc",
    sourcemap: false,
    rollupOptions: {
      output: {
        entryFileNames: "v2c-trydan-card.js",
      },
    },
  },
});
