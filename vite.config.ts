import { defineConfig } from "vite";
import path from "path";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@layout": path.resolve(__dirname, "./src/layout"),
      "@style": path.resolve(__dirname, "./src/style"),
      "@util": path.resolve(__dirname, "./src/util"),
      "@api": path.resolve(__dirname, "./src/api"),
    },
  },
});
