import test from "node:test";
import assert from "node:assert/strict";

import {
  getConfiguredPublicAppOrigin,
  getPublicAppOriginFromHeaders,
  sanitizeInternalReturnPath,
} from "./public-app-url.ts";

function headersFrom(values: Record<string, string>) {
  const headers = new Headers();
  for (const [key, value] of Object.entries(values)) {
    headers.set(key, value);
  }
  return headers;
}

test("uses BETTER_AUTH_URL in production", () => {
  const origin = getConfiguredPublicAppOrigin({
    NODE_ENV: "production",
    BETTER_AUTH_URL: "https://taylorcv.rami.co.nz",
  });

  assert.equal(origin, "https://taylorcv.rami.co.nz");
});

test("uses forwarded proto and host when env vars are absent", () => {
  const origin = getPublicAppOriginFromHeaders(
    headersFrom({
      "x-forwarded-proto": "https",
      "x-forwarded-host": "taylorcv.rami.co.nz",
    }),
    {
      NODE_ENV: "production",
    }
  );

  assert.equal(origin, "https://taylorcv.rami.co.nz");
});

test("rejects 0.0.0.0 as a production public origin", () => {
  assert.throws(
    () =>
      getConfiguredPublicAppOrigin({
        NODE_ENV: "production",
        BETTER_AUTH_URL: "https://0.0.0.0:8080",
      }),
    /Refusing to use BETTER_AUTH_URL in production/
  );
});

test("accepts an internal next path", () => {
  assert.equal(sanitizeInternalReturnPath("/dashboard"), "/dashboard");
});

test("rejects an external https next path", () => {
  assert.equal(
    sanitizeInternalReturnPath("https://evil.com", "/dashboard"),
    "/dashboard"
  );
});

test("rejects a protocol-relative next path", () => {
  assert.equal(sanitizeInternalReturnPath("//evil.com", "/dashboard"), "/dashboard");
});

test("uses the fallback when next is missing", () => {
  assert.equal(sanitizeInternalReturnPath(null, "/dashboard"), "/dashboard");
});
