import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const proxy = {
    "/api": {
      target: env.API_PROXY_TARGET || "https://soulpass-api.onrender.com",
      changeOrigin: true,
      rewrite: (caminho: string) => caminho.replace(/^\/api/, ""),
    },
  };
  return {
    plugins: [react(), tailwindcss()],
    server: { proxy, allowedHosts: ["terminal.local"] },
    preview: { proxy, allowedHosts: ["terminal.local"] },
  };
});
