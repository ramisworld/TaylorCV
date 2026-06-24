import type { NextRequest } from "next/server";

import { auth } from "~/server/auth";

export const runtime = "nodejs";

async function handler(request: NextRequest) {
  const response = await auth.handler(request);
  if (
    process.env.NODE_ENV === "development" &&
    process.env.TAYLORCV_DEBUG_AUTH === "true" &&
    request.nextUrl.pathname.endsWith("/sign-in/social") &&
    request.method === "POST"
  ) {
    response
      .clone()
      .json()
      .then((body) => {
        const authUrl = typeof body?.url === "string" ? body.url : "";
        const redirectUri = authUrl
          ? new URL(authUrl).searchParams.get("redirect_uri")
          : null;
        console.info("[TaylorCV auth] social auth URL", authUrl);
        console.info("[TaylorCV auth] social redirect_uri", redirectUri);
      })
      .catch(() => undefined);
  }
  return response;
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
};
