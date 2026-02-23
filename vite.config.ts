import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Base path: Use root for custom domain, or '/system-focus/' for GitHub Pages subdirectory
  base: '/',
  server: {
    host: "::",
    port: 8080,
    middlewareMode: false,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Fallback to index.html for client-side routing
  appType: 'spa',
}));
