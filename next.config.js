/**
 * `SKIP_ENV_VALIDATION` is only for special build environments that inject
 * runtime secrets later. Local dev and production should use validated env.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  output: "standalone",
};

export default config;
