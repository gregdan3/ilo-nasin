import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import remarkToc from "remark-toc";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://gregdan3.github.io/ilo-nasin/",
  base: "/ilo-nasin",
  publicDir: "./static",
  integrations: [mdx(), sitemap(), icon()],
  markdown: {
    remarkPlugins: [
      [
        remarkToc,
        {
          heading: "Table of Contents",
          maxDepth: 3,
        },
      ],
    ],
  },
  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
  },
  devToolbar: {
    enabled: false,
  },
});
