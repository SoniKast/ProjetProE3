import express from "express";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { createRequestHandler } from "@react-router/express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

// Serve static assets from build/client
app.use(express.static(path.join(__dirname, "build/client")));

// Handle SSR with React Router
const buildPath = path.join(__dirname, "build");

// Import the server build - convert Windows path to file URL
import(`${pathToFileURL(path.join(buildPath, "server", "index.js"))}`).then(build => {
  app.all(
    "*",
    createRequestHandler({
      build,
      getLoadContext() {
        return {};
      }
    })
  );

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(err => {
  console.error("Failed to import server build:", err);
  process.exit(1);
});