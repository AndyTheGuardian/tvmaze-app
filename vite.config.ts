import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "TV Episode Guide",
        short_name: "EP Guide",
        description: "Browse TV shows and episodes",

        theme_color: "#000000",
        background_color: "#000000",

        display: "standalone",

        start_url: "/",

        icons: [
          {
            src: "TVIcon-48.png",
            sizes: "48x48",
            type: "image/png",
          },
          {
            src: "TVIcon-72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "TVIcon-96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "TVIcon-128.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "TVIcon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "TVIcon-384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "TVIcon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "TVIcon-1024.png",
            sizes: "1024x1024",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
