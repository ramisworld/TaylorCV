import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { getAuthSession } from "~/server/auth";
import { db } from "~/server/db";

export async function GET(
  _request: Request,
  context: { params: Promise<{ applicationId: string }> }
) {
  const session = await getAuthSession(await headers());
  const userId = session?.user?.id;
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const { applicationId } = await context.params;
  const draft = await db.cvDraft.findFirst({
    where: {
      applicationId,
      application: { userId },
    },
    select: { html: true },
  });

  if (!draft) return new NextResponse("Not found", { status: 404 });

  return new NextResponse(draft.html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store",
    },
  });
}
