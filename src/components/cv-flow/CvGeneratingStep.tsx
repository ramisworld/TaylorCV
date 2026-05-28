"use client";

import { FileCheck2, Loader2, PenTool, SearchCheck } from "lucide-react";

import { GlassCard, WorkflowPanel } from "~/components/cv-flow/JobDescriptionStep";

export function CvGeneratingStep() {
  const steps = [
    { label: "Strategy", copy: "Choosing the CV angle", Icon: SearchCheck },
    { label: "Writing", copy: "Turning proof into concise bullets", Icon: PenTool },
    { label: "Structure", copy: "Checking the A4 one-page layout", Icon: FileCheck2 },
  ];

  return (
    <WorkflowPanel
      eyebrow="Step 4 of 4"
      subtitle="Taylor is choosing the strongest honest angle, writing the CV, and checking the one-page structure."
      title="Writing your tailored CV."
    >
      <div className="grid gap-5 lg:grid-cols-[360px_minmax(0,1fr)]">
        <GlassCard className="p-6">
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 place-items-center rounded-[16px] bg-[#2450f4] text-white shadow-[0_16px_34px_rgba(32,71,240,0.28)]">
              <Loader2 className="h-6 w-6 animate-spin" />
            </span>
            <div>
              <p className="text-[18px] font-semibold text-[#080d22]">Taylor is writing</p>
              <p className="mt-1 text-[13.5px] leading-5 text-[#66728b]">This usually takes a short moment.</p>
            </div>
          </div>
          <div className="mt-7 space-y-4">
            {steps.map(({ label, copy, Icon }) => (
              <div className="flex items-center gap-3" key={label}>
                <span className="grid h-9 w-9 place-items-center rounded-[10px] border border-[#d8e0ee] bg-white/74 text-[#2450f4]">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <span>
                  <span className="block text-[13.5px] font-semibold text-[#080d22]">{label}</span>
                  <span className="block text-[12.5px] text-[#66728b]">{copy}</span>
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="overflow-hidden p-5">
          <div className="mx-auto aspect-[210/297] max-h-[68vh] w-full max-w-[560px] rounded-[8px] bg-white px-8 py-9 shadow-[0_22px_60px_rgba(36,64,118,0.16)]">
            <div className="h-8 w-64 rounded bg-[#080d22]" />
            <div className="mt-2 h-3 w-72 rounded bg-[#d7e1f5]" />
            <div className="mt-8 space-y-7">
              {[0, 1, 2, 3, 4].map((section) => (
                <div key={section}>
                  <div className="h-px w-full bg-[#d4d4d8]" />
                  <div className="mt-3 h-3 w-36 rounded bg-[#2450f4]/80" />
                  <div className="mt-3 space-y-2">
                    <div className="h-2.5 w-full rounded bg-[#e5e7eb]" />
                    <div className="h-2.5 w-11/12 rounded bg-[#e5e7eb]" />
                    <div className="h-2.5 w-8/12 rounded bg-[#e5e7eb]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
    </WorkflowPanel>
  );
}
