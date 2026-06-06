"use client";

import { Download, Loader2 } from "lucide-react";
import { useState } from "react";

import { parseStructuredCv } from "~/lib/cvDocument";
import { exportCvDocx, exportCvPdf } from "~/lib/cvExport";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

export function ExportMenu(props: {
  applicationId: string;
  disabled?: boolean;
  className?: string;
  buttonClassName?: string;
  labels?: {
    pdf?: string;
    docx?: string;
  };
}) {
  const [exporting, setExporting] = useState<"pdf" | "docx" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const exportData = api.application.getApplicationExportData.useMutation();

  async function exportApplication(type: "pdf" | "docx") {
    setExporting(type);
    setError(null);
    try {
      const data = await exportData.mutateAsync({ applicationId: props.applicationId });
      const cv = parseStructuredCv(data.cvJson);
      if (!cv) throw new Error("CV data is not ready for export.");
      if (type === "pdf") await exportCvPdf(cv, data.presentationJson);
      else await exportCvDocx(cv, data.presentationJson);
    } catch (exportError) {
      setError(exportError instanceof Error ? exportError.message : "Export failed.");
    } finally {
      setExporting(null);
    }
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2", props.className)}>
      <button
        className={cn(
          "inline-flex h-10 items-center gap-2 rounded-lg border border-[#d8e2f2] bg-white px-3 text-sm font-extrabold text-[#17213d] shadow-sm hover:bg-[#f7faff] disabled:pointer-events-none disabled:opacity-55",
          props.buttonClassName
        )}
        disabled={props.disabled || exporting !== null}
        onClick={() => void exportApplication("pdf")}
        type="button"
      >
        {exporting === "pdf" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        {props.labels?.pdf ?? "PDF"}
      </button>
      <button
        className={cn(
          "inline-flex h-10 items-center gap-2 rounded-lg border border-[#d8e2f2] bg-white px-3 text-sm font-extrabold text-[#17213d] shadow-sm hover:bg-[#f7faff] disabled:pointer-events-none disabled:opacity-55",
          props.buttonClassName
        )}
        disabled={props.disabled || exporting !== null}
        onClick={() => void exportApplication("docx")}
        type="button"
      >
        {exporting === "docx" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        {props.labels?.docx ?? "DOCX"}
      </button>
      {error ? <p className="basis-full text-sm font-bold text-[#c92d2d]">{error}</p> : null}
    </div>
  );
}
