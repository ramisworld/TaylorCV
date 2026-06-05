import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

import { anonymousSessionCookieName } from "~/server/services/session.service";
import { getAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import {
  sanitizeInternalReturnPath,
  toPublicAppUrl,
} from "~/server/public-app-url";

export async function GET(request: NextRequest) {
  const applicationId = request.nextUrl.searchParams.get("applicationId");
  const next = sanitizeInternalReturnPath(request.nextUrl.searchParams.get("next"));
  const authSession = await getAuthSession(request.headers);
  const currentPublicUrl = toPublicAppUrl(
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
    { headers: request.headers }
  );

  if (!authSession?.user?.id) {
    const signInUrl = toPublicAppUrl("/auth/sign-in", { headers: request.headers });
    signInUrl.searchParams.set("returnTo", currentPublicUrl.toString());
    return NextResponse.redirect(signInUrl);
  }

  const anonymousSessionId = (await cookies()).get(
    anonymousSessionCookieName
  )?.value;

  if (applicationId && anonymousSessionId) {
    await db.application.updateMany({
      where: {
        id: applicationId,
        anonymousSessionId,
        userId: null,
      },
      data: { userId: authSession.user.id },
    }).catch(() => undefined);
  }

  return NextResponse.redirect(toPublicAppUrl(next, { headers: request.headers }));
}
