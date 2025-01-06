import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(() => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the
  // `VITE_` prefix.
  return {
    // vite config
    define: {
      __APP_ENV__: process.env.VITE_VERCEL_ENV,
      "process.env.VITE_APP_FIREBASE_API": JSON.stringify(
        process.env.VITE_APP_FIREBASE_API
      ),
    },
    plugins: [react()],
  };
});
