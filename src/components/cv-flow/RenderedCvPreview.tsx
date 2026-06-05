"use client";

import type { CSSProperties } from "react";

import { A4CvPreview } from "~/components/cv-flow/A4CvPreview";
import type { StructuredCv } from "~/lib/cvDocument";
import { cn } from "~/lib/utils";

export function RenderedCvPreview(props: {
  cv: StructuredCv;
  presentationJson?: unknown;
  mode: "admin" | "user";
  debug?: boolean;
  className?: string;
  frameClassName?: string;
  documentStyle?: CSSProperties;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[24px] border",
        props.mode === "admin"
          ? "border-slate-200 bg-[linear-gradient(180deg,#eef4ff_0%,#f8fbff_100%)] p-4"
          : "border-[#d8e0ee] bg-[linear-gradient(180deg,#edf4ff_0%,#f8fbff_100%)] p-3",
        props.className
      )}
    >
      <A4CvPreview
        className={cn("flex items-start justify-center", props.frameClassName)}
        cv={props.cv}
        documentStyle={props.documentStyle}
        fitToHeight={props.mode !== "admin"}
        maxScale={props.mode === "admin" ? 1 : 1.02}
        presentationJson={props.presentationJson}
        viewportHeightOffset={props.mode === "admin" ? 120 : 176}
      />
      {props.debug ? (
        <p className="mt-3 text-xs leading-5 text-slate-500">
          Rendered with the same structured CV parser and A4 preview pipeline used by the user flow.
        </p>
      ) : null}
    </div>
  );
}
