"use client";

import { ArrowRight, Check, FileText, FolderOpen, Loader2, ShieldCheck, Upload } from "lucide-react";
import { useMemo, useState } from "react";

import { GlassCard, WorkflowPanel } from "~/components/cv-flow/JobDescriptionStep";
import { cn } from "~/lib/utils";

export function CvUploadStep(props: {
  value: string;
  fileName: string | null;
  error?: string | null;
  isLoading: boolean;
  isReadingFile: boolean;
  onBack: () => void;
  onChange: (value: string) => void;
  onFile: (file: File) => void;
  onSubmit: () => void;
}) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const uploadInputId = "cv-upload";
  const hasText = !!props.value.trim();
  const fileLabel = props.isReadingFile
    ? "Reading file..."
    : props.fileName ?? (hasText ? "CV text ready" : null);
  const canSubmit = hasText && !props.isReadingFile && !props.isLoading;

  function handleFile(file: File) {
    const tenMb = 10 * 1024 * 1024;
    if (!/\.(pdf|docx|txt)$/i.test(file.name)) {
      setLocalError("Choose a PDF, DOCX, or TXT file.");
      return;
    }
    if (file.size > tenMb) {
      setLocalError("Choose a CV under 10MB.");
      return;
    }
    setLocalError(null);
    props.onFile(file);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragActive(false);
    const file = event.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  const wordEstimate = useMemo(
    () => props.value.trim().split(/\s+/).filter(Boolean).length,
    [props.value]
  );

  return (
    <WorkflowPanel
      eyebrow="Step 2 of 4"
      subtitle="Upload a CV file or paste the text. Taylor will keep the facts, then tailor the framing."
      title="Add your current CV."
    >
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <GlassCard className="p-5">
          <input
            accept=".pdf,.docx,.txt"
            className="sr-only"
            id={uploadInputId}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) handleFile(file);
              event.currentTarget.value = "";
            }}
            type="file"
          />
          <div
            className={cn(
              "flex min-h-[308px] flex-col items-center justify-center rounded-[16px] border border-dashed px-6 py-8 text-center transition",
              isDragActive
                ? "border-[#2450f4] bg-[#2450f4]/10"
                : "border-[#9fb2db] bg-white/48"
            )}
            onDragEnter={(event) => {
              event.preventDefault();
              setIsDragActive(true);
            }}
            onDragLeave={() => setIsDragActive(false)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}
          >
            <span className="grid h-[82px] w-[82px] place-items-center rounded-[22px] border border-[#cbd7ee] bg-white text-[#2450f4] shadow-[0_18px_38px_rgba(36,80,244,0.16)]">
              <Upload className="h-8 w-8" />
            </span>
            <h2 className="mt-5 text-[22px] font-semibold tracking-[-0.025em] text-[#080d22]">
              Drop your CV here
            </h2>
            <p className="mt-2 text-[14px] text-[#66728b]">PDF, DOCX or TXT under 10MB</p>
            <label
              aria-disabled={props.isReadingFile}
              className={cn(
                "mt-5 inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-[11px] bg-[#080d22] px-5 text-[14px] font-semibold text-white shadow-[0_14px_28px_rgba(8,13,34,0.16)] transition hover:scale-[1.02] hover:bg-[#152040] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2047f0]/20",
                props.isReadingFile && "pointer-events-none opacity-60"
              )}
              htmlFor={uploadInputId}
            >
              {props.isReadingFile ? <Loader2 className="h-4 w-4 animate-spin" /> : <FolderOpen className="h-4 w-4" />}
              {props.isReadingFile ? "Reading..." : "Choose file"}
            </label>
            {fileLabel ? (
              <div className="mt-5 flex w-full max-w-[430px] items-center justify-center gap-2 rounded-[12px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-[13px] font-semibold text-emerald-900">
                <Check className="h-4 w-4" />
                <span className="truncate">{fileLabel}</span>
              </div>
            ) : null}
          </div>
        </GlassCard>
        <GlassCard className="p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[14px] font-semibold text-[#080d22]">Or paste CV text</p>
              <p className="mt-1 text-[12.5px] text-[#66728b]">
                {wordEstimate > 0 ? `${wordEstimate.toLocaleString()} words detected` : "Helpful if the file parser misses anything"}
              </p>
            </div>
            <FileText className="h-5 w-5 text-[#2450f4]" />
          </div>
          <textarea
            className="mt-4 h-[308px] w-full resize-none rounded-[16px] border border-[#cad8f2]/70 bg-white/72 px-5 py-5 text-[15px] leading-6 text-[#111827] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] placeholder:text-[#66728b] transition focus:border-[#2450f4]/55 focus:bg-white focus:shadow-[0_0_0_4px_rgba(36,80,244,0.12)]"
            maxLength={30_000}
            onChange={(event) => props.onChange(event.target.value)}
            placeholder="Paste your current CV text here..."
            value={props.value}
          />
        </GlassCard>
      </div>
      {localError || props.error ? (
        <p className="mt-4 rounded-[12px] border border-amber-300/45 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {localError ?? props.error}
        </p>
      ) : null}
      <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          className="inline-flex h-11 items-center justify-center rounded-[11px] border border-[#d8e0ee] bg-white/70 px-5 text-[14px] font-semibold text-[#314066] transition hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2047f0]/14"
          onClick={props.onBack}
          type="button"
        >
          Back
        </button>
        <button
          className="inline-flex h-[54px] items-center justify-center gap-3 rounded-[12px] border border-[#4269ff]/30 bg-[linear-gradient(180deg,#3768ff_0%,#2250f4_54%,#1743df_100%)] px-7 text-[15px] font-semibold text-white shadow-[0_16px_34px_rgba(32,71,240,0.28)] transition hover:scale-[1.01] hover:shadow-[0_18px_38px_rgba(32,71,240,0.34)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2047f0]/24 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={!canSubmit}
          onClick={props.onSubmit}
          type="button"
        >
          {props.isLoading ? <Loader2 className="h-4.5 w-4.5 animate-spin" /> : <ShieldCheck className="h-4.5 w-4.5" />}
          Build my profile
          <ArrowRight className="h-4.5 w-4.5" />
        </button>
      </div>
    </WorkflowPanel>
  );
}
