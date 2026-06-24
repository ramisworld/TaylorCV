import "server-only";

import { env } from "../env.js";

export function isMockAiEnabled() {
  return env.USE_MOCK_AI === "true";
}
