"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Loader2, Upload } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import { cn } from "~/lib/utils";

const statusMessages = [
  "Reading your CV",
  "Extracting your experience",
  "Matching evidence to the role",
  "Scoring your strongest proof",
  "Finding gaps to strengthen",
  "Preparing your questions",
] as const;

const ringRadius = 132;
const ringCircumference = 2 * Math.PI * ringRadius;

function AnimatedDots() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCount((current) => ((current % 3) + 1) as 1 | 2 | 3);
    }, 420);

    return () => window.clearInterval(interval);
  }, []);

  return <span className="inline-block w-[18px] text-left text-[#8390ab]">{".".repeat(count)}</span>;
}

export function CvUploadStep(props: {
  value: string;
  fileName: string | null;
  error?: string | null;
  isLoading: boolean;
  isReadingFile: boolean;
  analysisState: "idle" | "analyzing" | "success";
  onBack: () => void;
  onFile: (file: File) => void;
  onSubmit: () => void;
}) {
  const inputId = useId();
  const [isDragActive, setIsDragActive] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const hasSelectedFile = Boolean(props.fileName && props.value.trim());
  const isAnalyzing = props.analysisState === "analyzing";
  const isSuccess = props.analysisState === "success";
  const canSubmit = hasSelectedFile && !props.isReadingFile && !props.isLoading;
  const surfaceError = localError ?? props.error ?? null;

  useEffect(() => {
    if (!isAnalyzing) {
      setMessageIndex(0);
      return;
    }

    let cancelled = false;
    let timeoutId: number | null = null;

    const schedule = () => {
      const duration = 3000 + Math.round(Math.random() * 1800);
      timeoutId = window.setTimeout(() => {
        if (cancelled) return;
        setMessageIndex((current) => (current + 1) % statusMessages.length);
        schedule();
      }, duration);
    };

    schedule();

    return () => {
      cancelled = true;
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [isAnalyzing]);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    if (!(isAnalyzing || isSuccess)) {
      setProgress(0);
      return;
    }

    if (isSuccess) {
      const startedAt = performance.now();
      const startValue = progressRef.current;
      let frameId = 0;

      const tick = (now: number) => {
        const elapsed = now - startedAt;
        const duration = 560;
        const eased = 1 - Math.pow(1 - Math.min(elapsed / duration, 1), 3);
        setProgress(startValue + (1 - startValue) * eased);
        if (elapsed < duration) frameId = window.requestAnimationFrame(tick);
      };

      frameId = window.requestAnimationFrame(tick);
      return () => window.cancelAnimationFrame(frameId);
    }

    const startedAt = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const target = Math.min(0.94, 0.94 * (1 - Math.exp(-elapsed / 6500)));
      setProgress((current) => (target > current ? target : current));
      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [isAnalyzing, isSuccess]);

  function handleFile(file: File) {
    const tenMb = 10 * 1024 * 1024;
    const isAccepted =
      file.type === "application/pdf" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      /\.(pdf|docx)$/i.test(file.name);

    if (!isAccepted) {
      setLocalError("Upload a PDF or DOCX file.");
      return;
    }

    if (file.size > tenMb) {
      setLocalError("Upload a file under 10MB.");
      return;
    }

    setLocalError(null);
    props.onFile(file);
  }

  function handleDrop(event: React.DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragActive(false);
    if (props.isLoading || props.isReadingFile) return;
    const file = event.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  const progressOffset = useMemo(
    () => ringCircumference * (1 - Math.max(0, Math.min(progress, 1))),
    [progress]
  );

  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto flex min-h-[100dvh] w-full flex-col items-center px-4 pb-10 pt-[148px] sm:px-6 sm:pb-12 sm:pt-[188px] lg:px-8 lg:pt-[204px]"
      exit={{ opacity: 0, y: -12 }}
      initial={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      <div className="mx-auto w-full max-w-4xl text-center">
        <p className="text-[13px] font-medium uppercase tracking-[0.24em] text-[#2563eb]">
          Step 2 of 4
        </p>
        <h1 className="mt-4 text-balance text-[46px] font-[650] leading-[1.02] tracking-[-0.05em] text-[#081437] sm:text-[60px] lg:text-[68px]">
          Upload your CV
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-[16px] font-normal leading-7 text-[#7081a0] sm:mt-5 sm:text-[18px] sm:leading-8">
          We&apos;ll review your CV and see how you match.
        </p>
      </div>

      <div className="mt-8 flex w-full flex-col items-center sm:mt-12">
        <input
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="sr-only"
          id={inputId}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) handleFile(file);
            event.currentTarget.value = "";
          }}
          type="file"
        />

        <label
          className={cn(
            "group relative grid h-[272px] w-[272px] cursor-pointer place-items-center rounded-full transition-all duration-300 sm:h-[332px] sm:w-[332px]",
            props.isLoading && "cursor-default",
            isDragActive && !props.isLoading && "scale-[1.015]",
            surfaceError && !props.isLoading && "drop-shadow-[0_0_0_rgba(0,0,0,0)]"
          )}
          htmlFor={props.isLoading ? undefined : inputId}
          onDragEnter={(event) => {
            event.preventDefault();
            if (!props.isLoading && !props.isReadingFile) setIsDragActive(true);
          }}
          onDragLeave={() => setIsDragActive(false)}
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
        >
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.96)_0%,rgba(244,247,255,0.88)_54%,rgba(224,232,255,0.58)_100%)] shadow-[0_24px_78px_rgba(174,190,232,0.24)]" />
          <div className="absolute inset-[9px] rounded-full border border-[#edf1fb] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(248,250,255,0.94)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.95)]" />
          <div className="absolute inset-[-18px] rounded-full bg-[radial-gradient(circle,rgba(162,180,255,0.18)_0%,rgba(162,180,255,0.06)_52%,transparent_72%)] blur-xl" />

          <svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full -rotate-90"
            viewBox="0 0 300 300"
          >
            <defs>
              <linearGradient id="cv-upload-progress" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#0b4ef3" />
                <stop offset="60%" stopColor="#3166ff" />
                <stop offset="100%" stopColor="#6a6dff" />
              </linearGradient>
            </defs>
            <circle
              cx="150"
              cy="150"
              fill="none"
              r={ringRadius}
              stroke={isDragActive && !props.isLoading ? "#d7e2ff" : "#e8edf9"}
              strokeWidth="8"
            />
            <motion.circle
              animate={{ strokeDashoffset: progressOffset, opacity: isAnalyzing || isSuccess ? 1 : 0 }}
              cx="150"
              cy="150"
              fill="none"
              initial={false}
              r={ringRadius}
              stroke="url(#cv-upload-progress)"
              strokeDasharray={ringCircumference}
              strokeLinecap="round"
              strokeWidth="8"
              transition={{ duration: isSuccess ? 0.52 : 0.26, ease: "easeOut" }}
            />
          </svg>

          <div className="relative z-10 flex max-w-[200px] flex-col items-center text-center sm:max-w-[240px]">
            <AnimatePresence mode="wait">
              {isAnalyzing || isSuccess ? (
                <motion.div
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center"
                  exit={{ opacity: 0, scale: 0.96 }}
                  initial={{ opacity: 0, scale: 0.96 }}
                  key={isSuccess ? "success" : `status-${messageIndex}`}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                >
                  {isSuccess ? (
                    <>
                      <span className="grid h-[74px] w-[74px] place-items-center rounded-full bg-[linear-gradient(180deg,#165dff_0%,#0b4ef3_100%)] text-white shadow-[0_18px_42px_rgba(11,78,243,0.24)]">
                        <Check className="h-9 w-9" />
                      </span>
                      <p className="mt-5 text-[24px] font-normal tracking-[-0.03em] text-[#09112f] sm:mt-6 sm:text-[27px]">
                        Ready
                      </p>
                      <p className="mt-2 text-[15px] leading-6 text-[#73809b]">
                        Taking you to your gap questions.
                      </p>
                    </>
                  ) : (
                    <>
                      <span className="grid h-[62px] w-[62px] place-items-center rounded-full bg-white/88 text-[#0b4ef3] shadow-[0_14px_32px_rgba(144,162,214,0.18)] ring-1 ring-[#e8edf7]">
                        <Loader2 className="h-7 w-7 animate-spin" />
                      </span>
                      <p className="mt-5 text-[21px] font-normal tracking-[-0.03em] text-[#09112f] sm:mt-6 sm:text-[24px]">
                        {statusMessages[messageIndex]}
                        <AnimatedDots />
                      </p>
                      <p className="mt-2 text-[14px] leading-6 text-[#7d88a1]">
                        We&apos;re extracting the strongest evidence for this role.
                      </p>
                    </>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center"
                  exit={{ opacity: 0, scale: 0.96 }}
                  initial={{ opacity: 0, scale: 0.96 }}
                  key="idle"
                  transition={{ duration: 0.22, ease: "easeOut" }}
                >
                  <span
                    className={cn(
                      "grid h-[62px] w-[62px] place-items-center rounded-full bg-[linear-gradient(180deg,rgba(241,245,255,0.96)_0%,rgba(232,238,252,0.92)_100%)] text-[#0b4ef3] shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_10px_28px_rgba(158,175,223,0.16)] ring-1 ring-[#e3e8f5] transition-transform duration-300 sm:h-[68px] sm:w-[68px]",
                      isDragActive && "scale-[1.03]"
                    )}
                  >
                    <Upload className="h-7 w-7 sm:h-8 sm:w-8" />
                  </span>
                  <p className="mt-5 text-[20px] font-medium tracking-[-0.03em] text-[#0b122e] sm:mt-6 sm:text-[22px]">
                    Click to upload
                  </p>
                  <p className="mt-2 text-[15px] leading-6 text-[#74809a]">or drag and drop</p>
                  {props.isReadingFile ? (
                    <p className="mt-5 text-[14px] leading-6 text-[#5870b2]">Preparing your file...</p>
                  ) : hasSelectedFile ? (
                    <div className="mt-5 inline-flex max-w-full items-center gap-2 rounded-full bg-white/82 px-4 py-2 text-[13px] text-[#4f5d7c] shadow-[0_8px_20px_rgba(160,176,218,0.12)] ring-1 ring-[#e5eaf6]">
                      <Check className="h-3.5 w-3.5 text-[#0b4ef3]" />
                      <span className="truncate">{props.fileName}</span>
                    </div>
                  ) : null}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </label>

        <p className="mt-6 text-[14px] font-normal tracking-[-0.01em] text-[#7d88a1] sm:mt-8 sm:text-[15px]">
          PDF or DOCX • Max 10MB
        </p>

        {surfaceError ? (
          <p className="mt-4 rounded-full border border-[#f2d0c4] bg-white/84 px-4 py-2.5 text-[13px] text-[#9a4a34] shadow-[0_10px_24px_rgba(188,123,96,0.08)]">
            {surfaceError}
          </p>
        ) : null}

        <button
          className="mt-8 inline-flex h-[58px] min-w-[268px] items-center justify-center gap-3 rounded-[16px] border border-[#4b70ff]/18 bg-[linear-gradient(180deg,#2162ff_0%,#0b4ef3_100%)] px-8 text-[17px] font-medium tracking-[-0.02em] text-white shadow-[0_16px_32px_rgba(11,78,243,0.24)] transition hover:translate-y-[-1px] hover:shadow-[0_20px_38px_rgba(11,78,243,0.28)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0b4ef3]/18 disabled:cursor-not-allowed disabled:opacity-55 sm:mt-9 sm:h-[62px] sm:min-w-[286px] sm:text-[18px]"
          disabled={!canSubmit}
          onClick={props.onSubmit}
          type="button"
        >
          Upload and continue
          <ArrowRight className="h-5 w-5" />
        </button>

        <button
          className="mt-4 text-[14px] font-normal text-[#74809a] transition hover:text-[#0b4ef3]"
          disabled={props.isLoading}
          onClick={props.onBack}
          type="button"
        >
          Back
        </button>
      </div>
    </motion.section>
  );
}
