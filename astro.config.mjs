import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  output: "server",
  integrations: [react(), tailwind()],
  adapter: cloudflare(),
  redirects: {
    "/cv":
      "https://fberti.notion.site/Fernando-Berti-cd746de05b434cd7a19f024af98826b1",
    "cv-pdf": "https://drive.proton.me/urls/6B3HWC6N0M#G9SeM46Xw8jH",
  },
  vite: {
    resolve: {
      // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
      // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
      alias: import.meta.env.PROD && {
        "react-dom/server": "react-dom/server.edge",
      },
    },
  },
});
