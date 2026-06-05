"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  CircleHelp,
  Loader2,
  Sparkles,
} from "lucide-react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import {
  GlassCard,
  WorkflowPanel,
} from "~/components/cv-flow/JobDescriptionStep";
import { cn } from "~/lib/utils";
import type { RouterOutputs } from "~/trpc/react";

type ApplicationState = NonNullable<
  RouterOutputs["application"]["getApplicationState"]
>;
type GapQuestion = ApplicationState["gapQuestions"][number];

const MAX_CHARACTERS = 1000;
const SUGGESTION_CHIPS = [
  "Use metrics",
  "Be specific",
  "Mention scope",
] as const;

function readQuestionJson(question: GapQuestion) {
  return question.questionJson &&
    typeof question.questionJson === "object" &&
    !Array.isArray(question.questionJson)
    ? (question.questionJson as Record<string, unknown>)
    : {};
}

function questionMeta(question: GapQuestion) {
  const json = readQuestionJson(question);
  const exampleAnswer =
    typeof json.exampleAnswer === "string" && json.exampleAnswer.trim()
      ? json.exampleAnswer
      : typeof json.tinyExample === "string" && json.tinyExample.trim()
        ? json.tinyExample
        : typeof question.answerGuidance === "string" &&
            question.answerGuidance.trim()
          ? question.answerGuidance
          : null;
  const shortTitle =
    typeof json.shortTitle === "string" && json.shortTitle.trim()
      ? json.shortTitle
      : compactQuestionTitle(question.question);

  return {
    exampleAnswer,
    shortTitle,
    why:
      typeof json.whyThisMatters === "string"
        ? json.whyThisMatters
        : (question.whyItMatters ??
          "This gives Taylor a stronger proof point for the final CV."),
  };
}

function compactQuestionTitle(question: string) {
  const cleaned = question
    .replace(/^can you describe /i, "")
    .replace(/^can you share /i, "")
    .replace(/^what /i, "")
    .replace(/^have you /i, "")
    .replace(/\?+$/, "")
    .replace(
      /\b(a|an|the|your|you|to|for|of|and|or|that|this|did|have|has|had)\b/gi,
      " ",
    )
    .replace(/\s+/g, " ")
    .trim();

  const words = cleaned.split(" ").filter(Boolean).slice(0, 4);
  const title = words.join(" ");
  if (!title) return "Gap question";
  return title.charAt(0).toUpperCase() + title.slice(1);
}

function answeredCount(answers: Record<string, string>) {
  return Object.values(answers).filter((value) => value.trim().length > 0)
    .length;
}

export function GapQuestionsStep(props: {
  questions: GapQuestion[];
  error?: string | null;
  isLoading: boolean;
  onBack: () => void;
  onSkip: () => void;
  onSubmit: (
    answers: Array<{
      gapQuestionId: string;
      answerText: string | null;
      skipped: boolean;
    }>,
  ) => void;
}) {
  const answerable = useMemo(
    () =>
      props.questions.filter(
        (question) =>
          question.status === "unanswered" && question.question.trim(),
      ),
    [props.questions],
  );
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedExampleId, setExpandedExampleId] = useState<string | null>(
    null,
  );
  const prefersReducedMotion = useReducedMotion();
  const progressValue = currentIndex + 1;
  const progressTotal = Math.max(answerable.length, 1);
  const progressRatio = progressValue / progressTotal;
  const circumference = 2 * Math.PI * 58;
  const ringProgress = useMotionValue(progressRatio);
  const smoothRingProgress = useSpring(ringProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.8,
  });
  const progressOffset = useTransform(
    smoothRingProgress,
    (value) => circumference * (1 - value),
  );

  useEffect(() => {
    setAnswers((current) => {
      const next = { ...current };
      for (const question of answerable) {
        next[question.id] ??= "";
      }
      return next;
    });
  }, [answerable]);

  useEffect(() => {
    setCurrentIndex((current) =>
      Math.min(current, Math.max(answerable.length - 1, 0)),
    );
  }, [answerable.length]);

  useEffect(() => {
    const controls = animate(ringProgress, progressRatio, {
      duration: prefersReducedMotion ? 0.01 : 0.8,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [prefersReducedMotion, progressRatio, ringProgress]);

  if (answerable.length === 0) {
    return (
      <WorkflowPanel
        eyebrow="Step 3 of 4"
        subtitle="Taylor already has enough useful evidence to write the first CV."
        title="No extra questions needed"
      >
        <GlassCard className="mx-auto max-w-2xl p-8">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[16px] bg-[#2450f4] text-white shadow-[0_14px_28px_rgba(36,80,244,0.22)]">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[20px] font-semibold text-[#081437]">
                Taylor can move straight to writing.
              </p>
              <p className="mt-2 text-[15px] leading-7 text-[#7081a0]">
                Your CV already gives enough role-relevant proof for this pass.
              </p>
            </div>
          </div>
          {props.error ? (
            <p className="mt-4 rounded-[14px] border border-amber-300/45 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              {props.error}
            </p>
          ) : null}
          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <button
              className="inline-flex h-[52px] items-center justify-center rounded-[14px] border border-[#d8e2f3] bg-white px-5 text-[15px] font-medium text-[#41506d] transition hover:text-[#0b4ef3]"
              onClick={props.onBack}
              type="button"
            >
              Back
            </button>
            <button
              className="taylor-premium-button inline-flex h-[56px] items-center justify-center gap-3 rounded-[16px] border px-6 text-[16px] font-medium text-white"
              onClick={props.onSkip}
              type="button"
            >
              Generate my CV
              <ArrowRight className="h-4.5 w-4.5" />
            </button>
          </div>
        </GlassCard>
      </WorkflowPanel>
    );
  }

  const currentQuestion = answerable[currentIndex];
  if (!currentQuestion) return null;
  const currentQuestionId = currentQuestion.id;
  const currentMeta = questionMeta(currentQuestion);
  const isLastQuestion = currentIndex === answerable.length - 1;
  const currentAnswer = answers[currentQuestion.id] ?? "";

  function updateAnswer(questionId: string, value: string) {
    setAnswers((current) => ({
      ...current,
      [questionId]: value.slice(0, MAX_CHARACTERS),
    }));
  }

  function appendHint(hint: (typeof SUGGESTION_CHIPS)[number]) {
    const additions: Record<(typeof SUGGESTION_CHIPS)[number], string> = {
      "Use metrics":
        " Include numbers, timing, volume, or measurable impact if you have them.",
      "Be specific": " Name the project, situation, or result directly.",
      "Mention scope":
        " Add who was involved, what you owned, or how wide the impact was.",
    };
    const nextValue = `${currentAnswer}${currentAnswer ? "" : ""}${additions[hint]}`;
    updateAnswer(currentQuestionId, nextValue);
  }

  function moveNext() {
    if (isLastQuestion) {
      props.onSubmit(
        answerable.map((question) => {
          const answerText = answers[question.id]?.trim() ?? "";
          return {
            gapQuestionId: question.id,
            answerText: answerText || null,
            skipped: !answerText,
          };
        }),
      );
      return;
    }

    setCurrentIndex((current) => Math.min(current + 1, answerable.length - 1));
  }

  function skipCurrent() {
    if (isLastQuestion) return;
    updateAnswer(currentQuestionId, "");
    setCurrentIndex((current) => Math.min(current + 1, answerable.length - 1));
  }

  const questionTransition = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, x: 10, y: 8 },
        animate: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: -10, y: -8 },
      };

  return (
    <WorkflowPanel
      eyebrow="Step 3 of 4"
      subtitle="Answer a few quick questions so we can strengthen your CV."
      title="Fill the gaps"
      className="pb-4 pt-[102px] sm:pb-6 sm:pt-[112px] lg:pt-[118px] xl:pt-[122px]"
      headerClassName="mb-3 sm:mb-4 lg:mb-4"
      titleClassName="text-[40px] font-[620] sm:text-[44px] lg:text-[46px]"
    >
      <div className="mx-auto w-full max-w-[1040px]">
        <div className="grid items-start gap-4 lg:grid-cols-[208px_minmax(0,1fr)]">
          <GlassCard className="p-4 lg:self-start">
            <p className="text-[15px] font-semibold tracking-[-0.02em] text-[#33476b]">
              Your progress
            </p>

            <div className="mt-3 flex items-center justify-center">
              <div className="relative h-[128px] w-[128px]">
                <svg
                  aria-hidden="true"
                  className="h-full w-full -rotate-90"
                  viewBox="0 0 148 148"
                >
                  <circle
                    cx="74"
                    cy="74"
                    fill="none"
                    r="58"
                    stroke="#e7edf8"
                    strokeWidth="6"
                  />
                  <motion.circle
                    cx="74"
                    cy="74"
                    fill="none"
                    r="58"
                    stroke="#2450f4"
                    strokeDasharray={circumference}
                    strokeLinecap="round"
                    strokeWidth="6"
                    style={{ strokeDashoffset: progressOffset }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <div className="flex items-end gap-0.5">
                    <span className="text-[30px] font-semibold leading-none tracking-[-0.05em] text-[#1c2f56]">
                      {progressValue}
                    </span>
                    <span className="pb-0.5 text-[17px] font-medium leading-none text-[#95a3bc]">
                      /{progressTotal}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2.5">
              {answerable.map((question, index) => {
                const meta = questionMeta(question);
                const isCurrent = index === currentIndex;
                const isAnswered = Boolean((answers[question.id] ?? "").trim());
                const isCompleted = index < currentIndex && isAnswered;
                const isFuture =
                  index > currentIndex || (index < currentIndex && !isAnswered);

                return (
                  <div className="flex gap-3" key={question.id}>
                    <div className="flex flex-col items-center">
                      <span
                        className={cn(
                          "grid h-6 w-6 place-items-center rounded-full text-[12px] font-semibold",
                          isCompleted
                            ? "bg-[#2450f4] text-white"
                            : isCurrent
                              ? "bg-[#2450f4] text-white"
                              : "bg-[#e8edf7] text-[#7f91af]",
                        )}
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.span
                            animate={{ opacity: 1, scale: 1 }}
                            className="grid place-items-center"
                            exit={{ opacity: 0, scale: 0.72 }}
                            initial={{ opacity: 0, scale: 0.72 }}
                            key={
                              isCompleted
                                ? `check-${question.id}`
                                : `number-${question.id}-${index + 1}`
                            }
                            transition={{ duration: 0.2, ease: "easeOut" }}
                          >
                            {isCompleted ? (
                              <Check className="h-3.5 w-3.5" />
                            ) : (
                              index + 1
                            )}
                          </motion.span>
                        </AnimatePresence>
                      </span>
                      {index < answerable.length - 1 ? (
                        <span className="mt-1.5 h-5.5 w-px bg-[#e4eaf5]" />
                      ) : null}
                    </div>
                    <p
                      className={cn(
                        "pt-0.5 text-[13px] leading-5",
                        isCurrent
                          ? "font-medium text-[#2450f4]"
                          : isFuture
                            ? "text-[#7f8ea9]"
                            : "text-[#364867]",
                      )}
                    >
                      {meta.shortTitle}
                    </p>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          <GlassCard className="min-h-[420px] p-5 sm:p-6 lg:p-6">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={currentQuestion.id}
                {...questionTransition}
                transition={{
                  duration: prefersReducedMotion ? 0.14 : 0.26,
                  ease: "easeOut",
                }}
              >
                <h2 className="max-w-4xl text-[21px] font-[620] leading-[1.18] tracking-[-0.04em] text-[#081437] sm:text-[23px] lg:text-[24px]">
                  {currentQuestion.question}
                </h2>

                <button
                  className="mt-2.5 inline-flex items-center gap-2 text-[13px] font-medium text-[#2450f4] transition hover:text-[#1543d8]"
                  onClick={() =>
                    setExpandedExampleId((current) =>
                      current === currentQuestion.id
                        ? null
                        : currentQuestion.id,
                    )
                  }
                  type="button"
                >
                  View example
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      expandedExampleId === currentQuestion.id && "rotate-180",
                    )}
                  />
                </button>

                {expandedExampleId === currentQuestion.id &&
                currentMeta.exampleAnswer ? (
                  <div className="mt-2.5 rounded-[16px] border border-[#e3e9f5] bg-[#f8faff] p-3">
                    <p className="text-[12.5px] leading-5 text-[#617391]">
                      {currentMeta.exampleAnswer}
                    </p>
                    <button
                      className="mt-2 inline-flex items-center gap-2 text-[12.5px] font-medium text-[#2450f4] transition hover:text-[#1543d8]"
                      onClick={() =>
                        updateAnswer(
                          currentQuestion.id,
                          currentMeta.exampleAnswer ?? "",
                        )
                      }
                      type="button"
                    >
                      Use as starting point
                    </button>
                  </div>
                ) : null}

                <div className="relative mt-4">
                  <textarea
                    className="h-[160px] w-full resize-none rounded-[16px] border border-[#d8e2f3] bg-white px-4 py-3.5 text-[15px] leading-6 text-[#11203f] outline-none transition placeholder:text-[#a1aec7] focus:border-[#9bb2f5] focus:shadow-[0_0_0_4px_rgba(37,99,235,0.08)] sm:h-[172px]"
                    maxLength={MAX_CHARACTERS}
                    onChange={(event) =>
                      updateAnswer(currentQuestion.id, event.target.value)
                    }
                    placeholder="Type your answer here..."
                    value={currentAnswer}
                  />
                  <span className="absolute bottom-3.5 right-4 text-[13px] text-[#8a99b5]">
                    {currentAnswer.length} / {MAX_CHARACTERS}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {SUGGESTION_CHIPS.map((chip) => (
                    <button
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#e1e8f5] bg-[#f8faff] px-3 py-1.5 text-[11.5px] font-medium text-[#41506d] transition hover:border-[#c8d6f1] hover:text-[#2450f4]"
                      key={chip}
                      onClick={() => appendHint(chip)}
                      type="button"
                    >
                      <CircleHelp className="h-3.5 w-3.5 text-[#2450f4]" />
                      {chip}
                    </button>
                  ))}
                </div>

                <div className="mt-3 rounded-[16px] border border-[#e6edf8] bg-[#f9fbff] px-4 py-2.5">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#6b84b8]">
                    Why this matters
                  </p>
                  <p className="mt-1 text-[12.5px] leading-5 text-[#62728d]">
                    {currentMeta.why}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </GlassCard>
        </div>

        {props.error ? (
          <p className="mt-4 rounded-[14px] border border-amber-300/45 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {props.error}
          </p>
        ) : null}

        <div className="mx-auto mt-4 flex w-full max-w-[1040px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4 text-[16px]">
            <button
              className="inline-flex items-center gap-2 font-medium text-[#41506d] transition hover:text-[#0b4ef3] disabled:pointer-events-none disabled:opacity-35"
              disabled={currentIndex === 0 || props.isLoading}
              onClick={() =>
                setCurrentIndex((current) => Math.max(current - 1, 0))
              }
              type="button"
            >
              <ArrowLeft className="h-4.5 w-4.5" />
              Back
            </button>

            {!isLastQuestion ? (
              <>
                <span className="h-6 w-px bg-[#d7deec]" />
                <button
                  className="font-normal text-[#7b89a4] transition hover:text-[#0b4ef3] disabled:pointer-events-none disabled:opacity-35"
                  disabled={props.isLoading}
                  onClick={skipCurrent}
                  type="button"
                >
                  Skip
                </button>
              </>
            ) : null}
          </div>

          <button
            className="taylor-premium-button inline-flex h-[58px] items-center justify-center gap-3 self-end rounded-[16px] border px-7 text-[17px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
            disabled={props.isLoading}
            onClick={moveNext}
            type="button"
          >
            {props.isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : null}
            {isLastQuestion ? "Generate my CV" : "Next question"}
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </WorkflowPanel>
  );
}
