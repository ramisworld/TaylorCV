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
    include: {
      application: {
        select: {
          jobAnalysisJson: true,
        },
      },
    },
  });

  if (!draft) return new NextResponse("Not found", { status: 404 });

  return new NextResponse(Buffer.from(draft.pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="taylorcv-${applicationId}.pdf"`,
      "Cache-Control": "private, no-store",
    },
  });
}
