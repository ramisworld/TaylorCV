import { notFound } from "next/navigation";

import { DevCvLoadingPreview } from "./DevCvLoadingPreview";

export default function DevCvLoadingPreviewPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return <DevCvLoadingPreview />;
}
