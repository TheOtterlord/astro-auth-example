import { defineConfig } from "astro/config";
import vercel from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel({
    mode: 'standalone'
  }),
});