import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://chat-application-ed5w.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
