// API configuration utility
// Use environment variables for API URL configuration
export function getApiUrl(path: string): string {
  // For client-side (browser) - use Vite environment variables
  if (typeof window !== "undefined") {
    // In development, use proxy (relative URL)
    // In production, use the environment variable or fallback
    const baseUrl =
      import.meta.env.VITE_API_BASE_URL ||
      (import.meta.env.DEV ? "/api" : "http://localhost:3000");
    return `${baseUrl}${path}`;
  }

  // For server-side rendering (Node.js) - use Node environment variables
  const baseUrl = process.env.API_BASE_URL || "http://localhost:3000";
  return `${baseUrl}${path}`;
}
