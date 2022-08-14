import { defineConfig } from 'vite';
import path from "path";
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/components"),
      "@style": path.resolve(__dirname, "./src/style"),
    }
  },
});
