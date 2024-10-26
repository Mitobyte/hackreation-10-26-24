import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const serverUrl = "http://localhost:3006"; // Keep server port updated with the server env file
const clientPort = 3007;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { proxy: { "/trpc": serverUrl }, port: clientPort, host: "127.0.0.1" },
  preview: { port: clientPort },
  resolve: {
    alias: {
      "@client": "/src",
      "@shared": "/../shared",
    },
  },
});
