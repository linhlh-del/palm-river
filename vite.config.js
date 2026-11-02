import { defineConfig, loadEnv } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, root, ""), ...process.env };
  const supabaseUrl = (env.CMS_SUPABASE_URL || env.VITE_SUPABASE_URL || "").replace(/\/+$/, "");

  return {
    base: "/",
    define: {
      "import.meta.env.VITE_CMS_PROJECT": JSON.stringify("palm-river-mkt"),
      "import.meta.env.VITE_CMS_COLLECT_URL": JSON.stringify(
        env.VITE_CMS_COLLECT_URL || (supabaseUrl ? `${supabaseUrl}/functions/v1/collect` : ""),
      ),
    },
    plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  };
});
