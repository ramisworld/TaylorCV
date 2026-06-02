"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import { CvGeneratingStep } from "~/components/cv-flow/CvGeneratingStep";
import { FlowShell, type FlowShellStage } from "~/components/cv-flow/FlowShell";
import { CvUploadStep } from "~/components/cv-flow/CvUploadStep";
import { FinalCvStep } from "~/components/cv-flow/FinalCvStep";
import { GapQuestionsStep } from "~/components/cv-flow/GapQuestionsStep";
import { JobDescriptionStep } from "~/components/cv-flow/JobDescriptionStep";
import { LandingPage } from "~/components/landing/LandingPage";
import { parseStructuredCv } from "~/lib/cvDocument";
import { exportCvDocx, exportCvPdf } from "~/lib/cvExport";
import { api, type RouterOutputs } from "~/trpc/react";

const currentApplicationStorageKey = "currentApplicationId";
const pendingPlanStorageKey = "pendingPlanKey";
const staleApplicationErrorFragments = [
  "does not belong to this anonymous session",
  "does not belong to this session",
] as const;

type ApplicationState = NonNullable<RouterOutputs["application"]["getApplicationState"]>;

type FlowStage = FlowShellStage;

function isStaleApplicationError(message: string) {
  const normalized = message.toLowerCase();
  return staleApplicationErrorFragments.some((fragment) => normalized.includes(fragment));
}

function clientErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Taylor could not start a new CV.";
}

function friendlyError(message: string) {
  if (/OpenAI provider edge error 520/i.test(message)) {
    return "Taylor hit a temporary OpenAI edge error. Try again shortly.";
  }
  if (/Unexpected token|<!DOCTYPE|not valid JSON|JSON\.parse|html/i.test(message)) {
    return "Taylor could not reach the analysis service cleanly. Check that the app server is running, then try again.";
  }
  if (/OpenAI Responses API (?:failed|returned)|OpenAI Responses API failed with HTTP|HTML error page returned by upstream/i.test(message)) {
    return "Taylor could not complete the AI step. Review your API configuration or try again shortly.";
  }
  if (message === "ACCOUNT_REQUIRED") return "Sign in to export your CV.";
  if (message === "QUOTA_EXCEEDED" || message === "FREE_CV_LIMIT_REACHED") {
    return "Your current plan has no CV exports remaining.";
  }
  return message;
}

function deriveFlowStage(state: ApplicationState | null): FlowStage {
  if (state?.cvDraft) return "final_cv";
  if (state?.gapQuestions.length) return "gap_questions";
  if (state?.candidateProfileRow) return "gap_questions";
  if (state?.job) return "cv_upload";
  return "job_description";
}

function hasOpenQuestions(state: ApplicationState | null) {
  return (state?.gapQuestions ?? []).some(
    (question) => question.status === "unanswered" && question.question.trim()
  );
}

export default function Home() {
  const utils = api.useUtils();
  const [showLanding, setShowLanding] = useState(true);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [resumedApplicationId, setResumedApplicationId] = useState<string | null>(null);
  const [stage, setStage] = useState<FlowStage>("job_description");
  const [jobText, setJobText] = useState("");
  const [candidateText, setCandidateText] = useState("");
  const [candidateFileName, setCandidateFileName] = useState<string | null>(null);
  const [isCandidateFileReading, setIsCandidateFileReading] = useState(false);
  const [candidateAnalysisState, setCandidateAnalysisState] = useState<
    "idle" | "analyzing" | "success"
  >("idle");
  const [error, setError] = useState<string | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const recoveryPromiseRef = useRef<Promise<string | null> | null>(null);

  const createApplication = api.application.createApplication.useMutation({
    onSuccess: (data) => {
      localStorage.setItem(currentApplicationStorageKey, data.applicationId);
      setApplicationId(data.applicationId);
      setResumedApplicationId(null);
      setShowLanding(false);
      setStage("job_description");
      window.history.pushState(null, "", `/?applicationId=${data.applicationId}`);
    },
    onError: (mutationError) => setError(friendlyError(mutationError.message)),
  });

  const stateQuery = api.application.getApplicationState.useQuery(
    { applicationId: applicationId ?? "" },
    {
      enabled: !!applicationId,
      retry: false,
    }
  );
  const state = stateQuery.data ?? null;
  const cv = useMemo(
    () => parseStructuredCv(state?.cvDraft?.cvJson ?? null),
    [state?.cvDraft?.cvJson]
  );

  function clearClientApplicationState(options?: { preserveDraft?: boolean }) {
    localStorage.removeItem(currentApplicationStorageKey);
    localStorage.removeItem(pendingPlanStorageKey);
    if (!options?.preserveDraft) {
      setJobText("");
      setCandidateText("");
      setCandidateFileName(null);
    }
    setCandidateAnalysisState("idle");
    setError(null);
    setExportError(null);
  }

  useEffect(() => {
    const qualityWarnings = Array.isArray(
      (state?.cvDraft?.builderOutputJson as { qualityWarnings?: unknown } | null | undefined)
        ?.qualityWarnings
    )
      ? ((state?.cvDraft?.builderOutputJson as { qualityWarnings?: unknown[] }).qualityWarnings ?? []).filter(
          (warning): warning is string => typeof warning === "string" && warning.length > 0
        )
      : [];

    if (process.env.NODE_ENV !== "production" && qualityWarnings.length > 0) {
      console.info("CV_COMPOSER_QUALITY_WARNINGS", {
        applicationId,
        warnings: qualityWarnings,
      });
    }
  }, [applicationId, state?.cvDraft?.builderOutputJson]);

  function recoverFromStaleApplication(preserveDraft = true) {
    clearClientApplicationState({ preserveDraft });
    setApplicationId(null);
    setResumedApplicationId(null);
    setShowLanding(false);
    setStage("job_description");
    window.history.replaceState(null, "", "/");

    recoveryPromiseRef.current ??= createApplication
      .mutateAsync()
      .then((data) => data.applicationId)
      .catch((recoveryError) => {
        setError(clientErrorMessage(recoveryError));
        return null;
      })
      .finally(() => {
        recoveryPromiseRef.current = null;
      });

    return recoveryPromiseRef.current;
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("applicationId");
    if (requested) {
      localStorage.setItem(currentApplicationStorageKey, requested);
      setApplicationId(requested);
      setShowLanding(false);
      return;
    }
    setShowLanding(true);
  }, []);

  useEffect(() => {
    if (!applicationId || !state || resumedApplicationId === applicationId) return;
    setResumedApplicationId(applicationId);
    if (stage !== "cv_generating") {
      setStage(deriveFlowStage(state));
    }
    setJobText((current) => state.job?.rawText ?? current);
    setCandidateText((current) => state.candidateProfileRow?.rawCvText ?? current);
  }, [applicationId, resumedApplicationId, stage, state]);

  useEffect(() => {
    if (!applicationId || !stateQuery.error) return;
    if (isStaleApplicationError(stateQuery.error.message)) {
      void recoverFromStaleApplication(true);
      return;
    }
    setError(friendlyError(stateQuery.error.message));
  }, [applicationId, stateQuery.error]);

  const submitJob = api.application.submitJob.useMutation({
    onSuccess: async (_data, variables) => {
      localStorage.setItem(currentApplicationStorageKey, variables.applicationId);
      await utils.application.getApplicationState.invalidate({
        applicationId: variables.applicationId,
      });
      setStage("cv_upload");
      setError(null);
    },
    onError: (mutationError, variables) => {
      if (isStaleApplicationError(mutationError.message)) {
        void recoverFromStaleApplication(true).then((freshApplicationId) => {
          if (!freshApplicationId) return;
          setError(null);
          submitJob.mutate({
            applicationId: freshApplicationId,
            rawJobText: variables.rawJobText,
          });
        });
        return;
      }
      setError(friendlyError(mutationError.message));
      setStage("job_description");
    },
  });

  const submitCandidate = api.application.submitCandidate.useMutation({
    onSuccess: async (_data, variables) => {
      await utils.application.getApplicationState.invalidate({
        applicationId: variables.applicationId,
      });
      setCandidateAnalysisState("success");
      setError(null);
      await new Promise((resolve) => window.setTimeout(resolve, 700));
      setCandidateAnalysisState("idle");
      setStage("gap_questions");
    },
    onError: (mutationError) => {
      setCandidateAnalysisState("idle");
      if (isStaleApplicationError(mutationError.message)) {
        void recoverFromStaleApplication(true);
        return;
      }
      setError(friendlyError(mutationError.message));
      if (hasOpenQuestions(state)) {
        setStage("gap_questions");
      }
    },
  });

  const submitGapAnswers = api.application.submitGapAnswers.useMutation({
    onSuccess: async (_data, variables) => {
      await utils.application.getApplicationState.invalidate({
        applicationId: variables.applicationId,
      });
      startCvGeneration(variables.applicationId);
    },
    onError: (mutationError) => {
      if (isStaleApplicationError(mutationError.message)) {
        void recoverFromStaleApplication(true);
        return;
      }
      setError(friendlyError(mutationError.message));
      setStage("gap_questions");
    },
  });

  const generateCv = api.application.generateCv.useMutation({
    onSuccess: async (_data, variables) => {
      await utils.application.getApplicationState.invalidate({
        applicationId: variables.applicationId,
      });
      setStage("final_cv");
      setError(null);
    },
    onError: (mutationError) => {
      if (isStaleApplicationError(mutationError.message)) {
        void recoverFromStaleApplication(true);
        return;
      }
      setError(friendlyError(mutationError.message));
      if (hasOpenQuestions(state)) {
        setStage("gap_questions");
      } else {
        setStage("cv_upload");
      }
    },
  });

  const authorizeExport = api.application.authorizeExport.useMutation();

  const resetApplication = api.application.resetApplication.useMutation({
    onSuccess: (data) => {
      clearClientApplicationState({ preserveDraft: false });
      localStorage.setItem(currentApplicationStorageKey, data.applicationId);
      setApplicationId(data.applicationId);
      setResumedApplicationId(null);
      setShowLanding(false);
      setStage("job_description");
      window.history.replaceState(null, "", `/?applicationId=${data.applicationId}`);
    },
    onError: (mutationError) => {
      if (isStaleApplicationError(mutationError.message)) {
        void recoverFromStaleApplication(false);
        return;
      }
      setError(friendlyError(mutationError.message));
    },
  });

  async function readCandidateFile(file: File) {
    setIsCandidateFileReading(true);
    setCandidateAnalysisState("idle");
    setCandidateFileName(file.name);
    try {
      const name = file.name.toLowerCase();
      let text = "";
      if (file.type === "application/pdf" || name.endsWith(".pdf")) {
        const pdfjs = await import("pdfjs-dist/webpack.mjs");
        const data = new Uint8Array(await file.arrayBuffer());
        const pdf = await pdfjs.getDocument({ data }).promise;
        const pages: string[] = [];
        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
          const page = await pdf.getPage(pageNumber);
          const content = await page.getTextContent();
          pages.push(content.items.map((item) => ("str" in item ? item.str : "")).join(" "));
        }
        text = pages.join("\n\n");
      } else if (name.endsWith(".docx")) {
        const mammoth = await import("mammoth");
        const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
        text = result.value;
      } else {
        text = await file.text();
      }
      if (!text.trim()) {
        setError("Taylor could not read text from that file. Paste your CV text instead.");
        return;
      }
      setCandidateText(text.slice(0, 30_000));
      setError(null);
    } catch (error) {
      console.error("CV file read error:", error);
      setError("Taylor could not read that file. Paste your CV text instead.");
    } finally {
      setIsCandidateFileReading(false);
    }
  }

  function enterWorkspace() {
    setError(null);
    const storedApplicationId = localStorage.getItem(currentApplicationStorageKey);
    if (storedApplicationId) {
      setApplicationId(storedApplicationId);
      setShowLanding(false);
      setStage("job_description");
      window.history.pushState(null, "", `/?applicationId=${storedApplicationId}`);
      return;
    }
    createApplication.mutate();
  }

  function startCvGeneration(targetApplicationId = applicationId) {
    if (!targetApplicationId) return;
    setStage("cv_generating");
    setError(null);
    generateCv.mutate({ applicationId: targetApplicationId });
  }

  async function exportWithGate(kind: "pdf" | "docx") {
    if (!cv || !applicationId || !state?.cvDraft) return;
    setExportError(null);
    setIsExporting(true);
    try {
      await authorizeExport.mutateAsync({
        applicationId,
        cvDraftId: state.cvDraft.id,
      });
      if (kind === "pdf") await exportCvPdf(cv, state.cvDraft.presentationJson);
      else await exportCvDocx(cv, state.cvDraft.presentationJson);
    } catch (exportFailure) {
      const message =
        exportFailure instanceof Error ? exportFailure.message : "Export failed.";
      if (message === "ACCOUNT_REQUIRED") {
        const next = `/?applicationId=${applicationId}`;
        window.location.href = `/auth/claim?applicationId=${encodeURIComponent(applicationId)}&next=${encodeURIComponent(next)}`;
        return;
      }
      setExportError(friendlyError(message));
    } finally {
      setIsExporting(false);
    }
  }

  if (showLanding) {
    return (
      <LandingPage
        error={error}
        isLoading={createApplication.isPending}
        onGetStarted={enterWorkspace}
      />
    );
  }

  const waiting =
    submitJob.isPending ||
    submitCandidate.isPending ||
    submitGapAnswers.isPending ||
    generateCv.isPending;

  return (
    <FlowShell stage={stage}>
      <AnimatePresence mode="wait">
        {stage === "job_description" ? (
          <JobDescriptionStep
            error={error}
            isLoading={submitJob.isPending}
            key="job"
            onChange={setJobText}
            onSubmit={() => {
              if (!applicationId) return;
              setError(null);
              submitJob.mutate({ applicationId, rawJobText: jobText });
            }}
            value={jobText}
          />
        ) : null}
        {stage === "cv_upload" ? (
          <CvUploadStep
            analysisState={candidateAnalysisState}
            error={error}
            fileName={candidateFileName}
            isLoading={submitCandidate.isPending || candidateAnalysisState !== "idle"}
            isReadingFile={isCandidateFileReading}
            key="cv-upload"
            onBack={() => {
              setCandidateAnalysisState("idle");
              setStage("job_description");
            }}
            onFile={(file) => void readCandidateFile(file)}
            onSubmit={() => {
              if (!applicationId) return;
              setError(null);
              setCandidateAnalysisState("analyzing");
              submitCandidate.mutate({ applicationId, rawCvText: candidateText });
            }}
            value={candidateText}
          />
        ) : null}
        {stage === "gap_questions" ? (
          <GapQuestionsStep
            error={error}
            isLoading={waiting}
            key="gap-questions"
            onBack={() => setStage("cv_upload")}
            onSkip={() => {
              if (!applicationId) return;
              if (hasOpenQuestions(state)) {
                submitGapAnswers.mutate({
                  applicationId,
                  answers: (state?.gapQuestions ?? []).map((question) => ({
                    gapQuestionId: question.id,
                    answerText: null,
                    skipped: true,
                  })),
                });
                return;
              }
              startCvGeneration();
            }}
            onSubmit={(answers) => {
              if (!applicationId) return;
              setError(null);
              submitGapAnswers.mutate({ applicationId, answers });
            }}
            questions={state?.gapQuestions ?? []}
          />
        ) : null}
        {stage === "cv_generating" ? <CvGeneratingStep key="generating" /> : null}
        {stage === "final_cv" ? (
          <FinalCvStep
            cv={cv}
            exportError={exportError}
            isExporting={isExporting || authorizeExport.isPending}
            key="final"
            onDocx={() => void exportWithGate("docx")}
            onNew={() => {
              if (applicationId) resetApplication.mutate({ applicationId });
            }}
            onPdf={() => void exportWithGate("pdf")}
            presentationJson={state?.cvDraft?.presentationJson}
          />
        ) : null}
      </AnimatePresence>
    </FlowShell>
  );
}
