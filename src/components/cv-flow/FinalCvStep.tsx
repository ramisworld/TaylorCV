"use client";

import { ArrowLeft, Download, FileCheck2, Loader2, RotateCcw } from "lucide-react";

import { GlassCard } from "~/components/cv-flow/JobDescriptionStep";
import { RenderedCvPreview } from "~/components/cv-flow/RenderedCvPreview";
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
    <section className="mx-auto min-h-full w-full max-w-7xl px-4 pb-8 pt-[148px] sm:px-6 sm:pt-[188px] lg:px-8 lg:pt-[204px]">
      <div className="mx-auto mb-10 max-w-4xl text-center">
        <p className="text-[13px] font-medium uppercase tracking-[0.24em] text-[#2563eb]">Step 4 of 4</p>
        <h1 className="mt-4 text-balance text-[46px] font-[650] leading-[1.02] tracking-[-0.05em] text-[#081437] sm:text-[60px] lg:text-[68px]">
          Tailored CV ready
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-[18px] leading-8 text-[#7081a0]">
          Review the A4 preview, then export the final CV when you are ready.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[360px_minmax(0,1fr)]">
        <GlassCard className="self-start p-5">
          <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-[#2450f4]">
            Tailored CV
          </p>
          <h2 className="mt-3 text-[31px] font-semibold leading-[1.04] tracking-[-0.04em] text-[#080d22]">
            Your tailored one-page CV is ready.
          </h2>
          <p className="mt-3 text-[14px] leading-6 text-[#7081a0]">
            Export the final version in the format you need.
          </p>
          <div className="mt-6 grid gap-3">
          <button
            className="taylor-premium-button inline-flex h-[52px] items-center justify-center gap-3 rounded-[12px] border px-5 text-[15px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
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
            <span className="inline-flex items-center gap-2 rounded-full border border-[#e2e8f5] bg-white px-3 py-1.5 text-[12.5px] font-semibold text-[#314066] shadow-sm">
              <FileCheck2 className="h-3.5 w-3.5 text-[#2450f4]" />
              A4 one-page preview
            </span>
            <button
              className="hidden items-center gap-2 rounded-full border border-[#e2e8f5] bg-white px-3 py-1.5 text-[12.5px] font-semibold text-[#314066] shadow-sm transition hover:text-[#0b4ef3] sm:inline-flex"
              onClick={props.onNew}
              type="button"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              New CV
            </button>
          </div>
          <GlassCard className="p-3 sm:min-h-[calc(100dvh-96px)] sm:p-5">
            {props.cv ? (
              <RenderedCvPreview
                className="py-2"
                cv={props.cv}
                frameClassName="sm:min-h-[calc(100dvh-150px)]"
                mode="user"
                presentationJson={props.presentationJson}
              />
            ) : (
              <div className="grid min-h-[520px] place-items-center text-[#66728b]">
                CV data is loading.
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
