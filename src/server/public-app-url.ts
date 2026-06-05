const DEVELOPMENT_FALLBACK_ORIGIN = "http://localhost:3000";
const INTERNAL_PRODUCTION_HOSTS = new Set(["0.0.0.0", "localhost", "127.0.0.1", "::1"]);

type HeadersLike = Pick<Headers, "get">;

function isProduction(env: NodeJS.ProcessEnv) {
  return env.NODE_ENV === "production";
}

function firstHeaderValue(value: string | null | undefined) {
  return value?.split(",")[0]?.trim() || null;
}

function parseAbsoluteOrigin(
  value: string,
  source: string,
  env: NodeJS.ProcessEnv
) {
  let url: URL;

  try {
    url = new URL(value);
  } catch {
    throw new Error(`[TaylorCV] ${source} is not a valid absolute URL: ${value}`);
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error(`[TaylorCV] ${source} must use http or https: ${value}`);
  }

  if (isProduction(env) && INTERNAL_PRODUCTION_HOSTS.has(url.hostname.toLowerCase())) {
    throw new Error(
      `[TaylorCV] Refusing to use ${source} in production: ${url.origin}. Configure the public HTTPS origin instead.`
    );
  }

  return url.origin;
}

function resolveOriginFromEnv(
  env: NodeJS.ProcessEnv,
  key: "BETTER_AUTH_URL" | "NEXT_PUBLIC_APP_URL"
) {
  const value = env[key]?.trim();
  if (!value) return null;
  return parseAbsoluteOrigin(value, key, env);
}

function developmentFallback(env: NodeJS.ProcessEnv) {
  if (!isProduction(env)) return DEVELOPMENT_FALLBACK_ORIGIN;

  throw new Error(
    "[TaylorCV] Could not resolve a public app origin in production. Set BETTER_AUTH_URL or NEXT_PUBLIC_APP_URL to the public HTTPS origin."
  );
}

export function getConfiguredPublicAppOrigin(env: NodeJS.ProcessEnv = process.env) {
  return (
    resolveOriginFromEnv(env, "BETTER_AUTH_URL") ??
    resolveOriginFromEnv(env, "NEXT_PUBLIC_APP_URL") ??
    developmentFallback(env)
  );
}

export function getPublicAppOriginFromHeaders(
  headers: HeadersLike,
  env: NodeJS.ProcessEnv = process.env
) {
  const configuredOrigin =
    resolveOriginFromEnv(env, "BETTER_AUTH_URL") ??
    resolveOriginFromEnv(env, "NEXT_PUBLIC_APP_URL");

  if (configuredOrigin) return configuredOrigin;

  const forwardedProto = firstHeaderValue(headers.get("x-forwarded-proto"));
  const forwardedHost = firstHeaderValue(headers.get("x-forwarded-host"));
  const host = firstHeaderValue(headers.get("host"));
  const resolvedHost = forwardedHost ?? host;
  const resolvedProto = forwardedProto ?? (isProduction(env) ? "https" : "http");

  if (resolvedHost) {
    return parseAbsoluteOrigin(
      `${resolvedProto}://${resolvedHost}`,
      forwardedHost ? "x-forwarded-host" : "host",
      env
    );
  }

  return developmentFallback(env);
}

export function toPublicAppUrl(
  path: string,
  options?: { env?: NodeJS.ProcessEnv; headers?: HeadersLike }
) {
  const origin = options?.headers
    ? getPublicAppOriginFromHeaders(options.headers, options.env)
    : getConfiguredPublicAppOrigin(options?.env);

  return new URL(path, origin);
}

export function sanitizeInternalReturnPath(
  value: string | null | undefined,
  fallback = "/dashboard"
) {
  if (!value) return fallback;
  if (!value.startsWith("/") || value.startsWith("//")) return fallback;

  try {
    const url = new URL(value, "https://taylorcv.local");
    if (url.origin !== "https://taylorcv.local") return fallback;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}
