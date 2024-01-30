import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: "https://berti.sh",
  integrations: [tailwind(), sitemap()],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  markdown: {
    gfm: true,
    shikiConfig: { theme: "catppuccin-mocha" },
  },
});
