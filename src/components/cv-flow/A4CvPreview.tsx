"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

import { CVDocumentRenderer } from "~/components/CVDocumentRenderer";
import type { StructuredCv } from "~/lib/cvDocument";
import { buildCvRenderModel } from "~/lib/cvRenderModel";

export function A4CvPreview(props: {
  cv: StructuredCv;
  presentationJson?: unknown;
  className?: string;
  cropToFrame?: boolean;
  fitToHeight?: boolean;
  maxScale?: number;
  viewportHeightOffset?: number;
  documentStyle?: CSSProperties;
}) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.72);
  const model = useMemo(
    () => buildCvRenderModel(props.cv, props.presentationJson),
    [props.cv, props.presentationJson]
  );

  useEffect(() => {
    console.info("CV_RENDER_METRICS", {
      renderTarget: "client_preview",
      ...model.metrics,
    });
  }, [model.metrics]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const resize = () => {
      const rect = frame.getBoundingClientRect();
      const maxScale = props.maxScale ?? 1;
      const viewportHeightOffset = props.viewportHeightOffset ?? 176;
      const widthScale = Math.max(0.28, Math.min(maxScale, (rect.width - 2) / 794));
      if (props.fitToHeight === false) {
        setScale(widthScale);
        return;
      }
      const heightScale = Math.max(0.28, Math.min(maxScale, (window.innerHeight - viewportHeightOffset) / 1123));
      setScale(Math.min(widthScale, heightScale));
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(frame);
    window.addEventListener("resize", resize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [props.fitToHeight, props.maxScale, props.viewportHeightOffset]);

  return (
    <div className={props.className} ref={frameRef}>
      <div
        className="mx-auto"
        style={{
          height: props.cropToFrame ? "100%" : 1123 * scale,
          overflow: props.cropToFrame ? "hidden" : undefined,
          width: 794 * scale,
        }}
      >
        <div
          style={{
            height: props.cropToFrame ? "100%" : 1123,
            overflow: props.cropToFrame ? "hidden" : undefined,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: 794,
          }}
        >
          <CVDocumentRenderer
            className="!m-0"
            cv={props.cv}
            presentationJson={props.presentationJson}
            style={
              {
                ...(props.cropToFrame
                  ? {
                      borderTopLeftRadius: "18px",
                      borderTopRightRadius: "18px",
                      boxShadow: "none",
                      height: "100%",
                      minHeight: "100%",
                    }
                  : null),
                ...props.documentStyle,
              }
            }
          />
        </div>
      </div>
    </div>
  );
}
