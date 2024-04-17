import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  build: {
    inlineStylesheets: 'never'
  },
  output: 'server',
  adapter: vercel(),
});
