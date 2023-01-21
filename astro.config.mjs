import { defineConfig } from "astro/config";
import node from "@astrojs/node";
// NOTE: something weird is happening in edge, but it's not our fault
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: "server",
  // adapter: node({
  //   mode: 'directory'
  // })
  adapter: vercel(),
});