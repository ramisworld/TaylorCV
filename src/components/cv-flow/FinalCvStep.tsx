"use client";

import { ArrowLeft, Download, FileCheck2, Loader2, RotateCcw } from "lucide-react";

import { A4CvPreview } from "~/components/cv-flow/A4CvPreview";
import { GlassCard } from "~/components/cv-flow/JobDescriptionStep";
import type { StructuredCv } from "~/lib/cvDocument";

export function FinalCvStep(props: {
  cv: StructuredCv | null;
  presentationJson?: unknown;
  exportError?: string | null;
  isExporting: boolean;
  onNew: () => void;
  onPdf: () => void;
  onDocx: () => void;
}) {
  return (
    <section className="mx-auto grid min-h-full w-full max-w-7xl gap-5 px-4 py-6 sm:px-6 lg:grid-cols-[360px_minmax(0,1fr)] lg:px-8">
      <GlassCard className="self-start p-5">
        <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#2450f4]">
          Final CV
        </p>
        <h1 className="mt-3 text-[31px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#080d22]">
          Your tailored one-page CV is ready.
        </h1>
        <p className="mt-3 text-[14px] leading-6 text-[#5f6c84]">
          Review the A4 preview, then export the final CV when you are ready.
        </p>
        <div className="mt-6 grid gap-3">
          <button
            className="inline-flex h-[52px] items-center justify-center gap-3 rounded-[12px] bg-[#2450f4] px-5 text-[15px] font-semibold text-white shadow-[0_16px_34px_rgba(32,71,240,0.28)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!props.cv || props.isExporting}
            onClick={props.onPdf}
            type="button"
          >
            {props.isExporting ? <Loader2 className="h-4.5 w-4.5 animate-spin" /> : <Download className="h-4.5 w-4.5" />}
            Export PDF
          </button>
          <button
            className="inline-flex h-[48px] items-center justify-center gap-3 rounded-[12px] border border-[#d8e0ee] bg-white/74 px-5 text-[14px] font-semibold text-[#314066] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!props.cv || props.isExporting}
            onClick={props.onDocx}
            type="button"
          >
            <Download className="h-4.5 w-4.5" />
            Export DOCX
          </button>
          <button
            className="inline-flex h-[44px] items-center justify-center gap-2 rounded-[11px] text-[13.5px] font-semibold text-[#536078] transition hover:bg-white/60"
            onClick={props.onNew}
            type="button"
          >
            <RotateCcw className="h-4 w-4" />
            Start another CV
          </button>
        </div>
        {props.exportError ? (
          <p className="mt-4 rounded-[12px] border border-amber-300/45 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {props.exportError}
          </p>
        ) : null}
      </GlassCard>
      <div className="min-h-0">
        <div className="mb-3 flex items-center justify-between gap-3 px-1">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/62 px-3 py-1.5 text-[12.5px] font-semibold text-[#314066] shadow-sm backdrop-blur-xl">
            <FileCheck2 className="h-3.5 w-3.5 text-[#2450f4]" />
            A4 one-page preview
          </span>
          <button
            className="hidden items-center gap-2 rounded-full border border-white/70 bg-white/62 px-3 py-1.5 text-[12.5px] font-semibold text-[#314066] shadow-sm backdrop-blur-xl transition hover:bg-white sm:inline-flex"
            onClick={props.onNew}
            type="button"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            New CV
          </button>
        </div>
        <GlassCard className="p-3 sm:min-h-[calc(100dvh-96px)] sm:p-5">
          {props.cv ? (
            <A4CvPreview
              className="flex items-start justify-center overflow-hidden py-2 sm:min-h-[calc(100dvh-150px)]"
              cv={props.cv}
              presentationJson={props.presentationJson}
            />
          ) : (
            <div className="grid min-h-[520px] place-items-center text-[#66728b]">
              CV data is loading.
            </div>
          )}
        </GlassCard>
      </div>
    </section>
  );
}
