import { reactRouter } from "@react-router/dev/vite";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: "/",
    plugins: [reactRouter(), tsconfigPaths()],
    build: {
      outDir: "dist",
    },
    preview: {
      port: 8080,
      strictPort: true,
    },
    server: {
      port: 8080,
      strictPort: true,
      host: true,
      origin: "http://0.0.0.0:8080",
      proxy: {
        "/api": {
          target: "http://back-end:3000",
          changeOrigin: true,
        },
        "/*.data": {
          target: "http://back-end:3000/api",
          changeOrigin: true,
          rewrite: (path) => path.replace(/\.data$/, ""),
        },
      },
    },
    // Define global constant replacements
    define: {
      "import.meta.env.VITE_API_BASE_URL": JSON.stringify(
        env.API_BASE_URL || "http://localhost:3000"
      ),
    },
  };
});
