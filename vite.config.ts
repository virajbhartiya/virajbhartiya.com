import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import prerender from "@prerenderer/rollup-plugin";
import Renderer from "@prerenderer/renderer-puppeteer";

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1500,
  },
  plugins: [
    react(),
    prerender({
      routes: [
        "/",
        "/blog",
        "/blog/parity-protocol-deterministic-compute-with-teeth",
        "/blog/raftokay-building-raft-consensus-from-scratch",
        "/blog/cognia-personal-memory-infrastructure",
      ],
      renderer: new Renderer({
        maxConcurrentRoutes: 1,
        renderAfterTime: 3000,
      }),
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ["**/*.md"],
});
