"use client";

import {
  AlertCircle,
  CheckCircle2,
  Download,
  Eye,
  FileText,
  Loader2,
  LogOut,
  Mic,
  Plus,
  UploadCloud,
  WandSparkles,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { TaylorBrand } from "~/components/TaylorBrand";
import { Button } from "~/components/ui/button";
import { authClient } from "~/lib/auth-client";
import { cn } from "~/lib/utils";
import { api, type RouterOutputs } from "~/trpc/react";

type DashboardState = RouterOutputs["application"]["getDashboardState"];
type Questions = RouterOutputs["application"]["createApplication"]["questions"];
type DashboardApplication = NonNullable<DashboardState>["applications"][number];
type CandidateVault = NonNullable<NonNullable<DashboardState>["vault"]>;

type FlowStep = "cv" | "job" | "questions" | "generating" | "preview";

function firstName(name: string, email: string) {
  return (name.trim() || email.split("@")[0] || "there").split(/\s+/)[0] ?? "there";
}

function statusLabel(status: string) {
  if (status === "ready") return "Ready";
  if (status === "failed") return "Needs retry";
  if (status === "generating") return "Generating";
  if (status === "questions_ready") return "Questions ready";
  return "Draft";
}

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(value);
}

function answersByQuestionId(value: unknown) {
  if (!Array.isArray(value)) return {};
  return value.reduce<Record<string, string>>((acc, item) => {
    if (
      item &&
      typeof item === "object" &&
      "questionId" in item &&
      "answer" in item &&
      typeof item.questionId === "string" &&
      typeof item.answer === "string"
    ) {
      acc[item.questionId] = item.answer;
    }
    return acc;
  }, {});
}

function linesToText(values: string[] | undefined) {
  return (values ?? []).join("\n");
}

function textToLines(value: string) {
  return value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function csvToText(values: string[] | undefined) {
  return (values ?? []).join(", ");
}

function textToCsv(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function linksToText(links: Array<{ label: string; url: string }> | undefined) {
  return (links ?? []).map((link) => `${link.label} | ${link.url}`).join("\n");
}

function textToLinks(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return null;
      const [label, ...urlParts] = trimmed.split("|").map((part) => part.trim());
      const url = urlParts.join("|").trim();
      if (label && url) return { label, url };
      if (/^(https?:\/\/|www\.)/i.test(trimmed)) {
        const normalizedUrl = trimmed.startsWith("www.") ? `https://${trimmed}` : trimmed;
        const host = normalizedUrl.replace(/^https?:\/\//i, "").split(/[/?#]/)[0] || "Link";
        return { label: host, url: normalizedUrl };
      }
      return null;
    })
    .filter((link): link is { label: string; url: string } => Boolean(link));
}

async function extractFileText(file: File) {
  const name = file.name.toLowerCase();
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
    return pages.join("\n\n");
  }
  if (name.endsWith(".docx")) {
    const mammoth = await import("mammoth");
    const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
    return result.value;
  }
  return file.text();
}

export function DashboardWorkspace(props: {
  userEmail: string;
  userName: string;
}) {
  const utils = api.useUtils();
  const stateQuery = api.application.getDashboardState.useQuery();
  const refetchDashboard = stateQuery.refetch;
  const state = stateQuery.data;
  const [flowOpen, setFlowOpen] = useState(false);
  const [step, setStep] = useState<FlowStep>("cv");
  const [cvText, setCvText] = useState("");
  const [cvFileName, setCvFileName] = useState<string | null>(null);
  const [jobText, setJobText] = useState("");
  const [questions, setQuestions] = useState<Questions | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [extraNotes, setExtraNotes] = useState("");
  const [activeApplicationId, setActiveApplicationId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isReadingFile, setIsReadingFile] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [welcomeDismissed, setWelcomeDismissed] = useState(false);
  const [vaultDraft, setVaultDraft] = useState<CandidateVault | null>(null);
  const [vaultDirty, setVaultDirty] = useState(false);
  const generationTargetRef = useRef<string | null>(null);

  const hasLoadedState = Boolean(state);
  const hasProfile = Boolean(state?.profile);
  const shouldShowWelcome =
    state && !state.profile && state.applications.length === 0 && !flowOpen && !welcomeDismissed;
  const applications = state?.applications ?? [];
  const hasGeneratingApplication = applications.some((application) => application.status === "generating");
  const activeApplication = activeApplicationId
    ? applications.find((application) => application.id === activeApplicationId)
    : null;
  const activePreviewUrl = activeApplicationId
    ? `/api/applications/${activeApplicationId}/preview`
    : null;

  useEffect(() => {
    if (!vaultDirty) setVaultDraft(state?.vault ?? null);
  }, [state?.vault, vaultDirty]);

  useEffect(() => {
    if (!hasGeneratingApplication && step !== "generating") return;
    const intervalId = window.setInterval(() => {
      void refetchDashboard();
    }, 4000);
    return () => window.clearInterval(intervalId);
  }, [hasGeneratingApplication, refetchDashboard, step]);

  useEffect(() => {
    if (!activeApplication) return;

    if (activeApplication.hasDraft && flowOpen && step !== "preview") {
      generationTargetRef.current = null;
      setActiveApplicationId(activeApplication.id);
      setFlowOpen(true);
      setWelcomeDismissed(true);
      setStep("preview");
      setError(null);
      return;
    }

    if (activeApplication.status === "failed" && step === "generating") {
      generationTargetRef.current = null;
      if (activeApplication.questions) setQuestions(activeApplication.questions);
      setAnswers(answersByQuestionId(activeApplication.answers));
      setExtraNotes(activeApplication.extraNotes ?? "");
      setFlowOpen(true);
      setWelcomeDismissed(true);
      setStep("questions");
      setError(activeApplication.error ?? "TaylorCV generation failed. Please retry.");
    }
  }, [activeApplication, flowOpen, step]);

  const createApplication = api.application.createApplication.useMutation({
    onSuccess: (data) => {
      setQuestions(data.questions);
      setActiveApplicationId(data.applicationId);
      setAnswers({});
      setFlowOpen(true);
      setWelcomeDismissed(true);
      setStep("questions");
      setError(null);
      void utils.application.getDashboardState.invalidate();
    },
    onError: (mutationError) => setError(mutationError.message),
  });

  const saveAnswers = api.application.saveAnswers.useMutation();

  const updateVault = api.application.updateVault.useMutation({
    onSuccess: (data) => {
      setVaultDraft(data.vault);
      setVaultDirty(false);
      setError(null);
      void utils.application.getDashboardState.invalidate();
    },
    onError: (mutationError) => setError(mutationError.message),
  });

  const generate = api.application.generate.useMutation({
    onSuccess: async (data, variables) => {
      await utils.application.getDashboardState.invalidate();
      if (generationTargetRef.current !== variables.applicationId) return;
      setActiveApplicationId(variables.applicationId);
      setFlowOpen(true);
      setWelcomeDismissed(true);
      setError(null);
      if (data.status === "ready") {
        generationTargetRef.current = null;
        setStep("preview");
      } else {
        setStep("generating");
      }
    },
    onError: (mutationError, variables) => {
      void utils.application.getDashboardState.invalidate();
      if (generationTargetRef.current !== variables.applicationId) return;
      generationTargetRef.current = null;
      setFlowOpen(true);
      setWelcomeDismissed(true);
      setStep("questions");
      setError(mutationError.message);
    },
  });

  const retryGeneration = api.application.retryGeneration.useMutation({
    onSuccess: async (data, variables) => {
      await utils.application.getDashboardState.invalidate();
      if (generationTargetRef.current !== variables.applicationId) return;
      setActiveApplicationId(variables.applicationId);
      setFlowOpen(true);
      setWelcomeDismissed(true);
      setError(null);
      if (data.status === "ready") {
        generationTargetRef.current = null;
        setStep("preview");
      } else {
        setStep("generating");
      }
    },
    onError: (mutationError, variables) => {
      void utils.application.getDashboardState.invalidate();
      if (generationTargetRef.current !== variables.applicationId) return;
      generationTargetRef.current = null;
      setFlowOpen(true);
      setWelcomeDismissed(true);
      setStep("questions");
      setError(mutationError.message);
    },
  });

  const isBusy =
    createApplication.isPending ||
    saveAnswers.isPending ||
    generate.isPending ||
    retryGeneration.isPending ||
    updateVault.isPending;
  const isGenerationInFlight =
    step === "generating" ||
    saveAnswers.isPending ||
    generate.isPending ||
    retryGeneration.isPending;

  function startFlow(existingState?: DashboardState) {
    generationTargetRef.current = null;
    setError(null);
    setFlowOpen(true);
    setWelcomeDismissed(false);
    setStep(existingState?.profile ? "job" : "cv");
    setQuestions(null);
    setActiveApplicationId(null);
    setAnswers({});
    setExtraNotes("");
    setJobText("");
    setCvText("");
    setCvFileName(null);
  }

  function openQuestions(application: DashboardApplication) {
    generationTargetRef.current = null;
    if (!application.questions) {
      setError("TaylorCV could not find the saved questions for this CV. Start a new CV or retry generation.");
      return;
    }
    setQuestions(application.questions);
    setAnswers(answersByQuestionId(application.answers));
    setExtraNotes(application.extraNotes ?? "");
    setActiveApplicationId(application.id);
    setError(null);
    setFlowOpen(true);
    setWelcomeDismissed(true);
    setStep("questions");
  }

  async function readFile(file: File) {
    setIsReadingFile(true);
    setCvFileName(file.name);
    setError(null);
    try {
      const text = await extractFileText(file);
      if (!text.trim()) {
        setError("TaylorCV could not read text from that file. Paste your CV text instead.");
        return;
      }
      setCvText(text.slice(0, 35_000));
    } catch (fileError) {
      console.error(fileError);
      setError("TaylorCV could not read that file. Paste your CV text instead.");
    } finally {
      setIsReadingFile(false);
    }
  }

  function submitJob() {
    setFlowOpen(true);
    setWelcomeDismissed(true);
    if (!jobText.trim()) {
      setError("Paste the job description first.");
      return;
    }
    if (!hasProfile && !cvText.trim()) {
      setStep("cv");
      setError("Upload or paste your current CV first.");
      return;
    }
    const rawCvText = hasProfile ? undefined : cvText.trim();
    createApplication.mutate({
      jobText,
      rawCvText,
      rawCvFileName: rawCvText ? cvFileName ?? undefined : undefined,
    });
  }

  async function generateFinalCv() {
    const applicationId = activeApplicationId;
    const questionList = questions?.questions;
    if (!applicationId || !questionList) {
      setFlowOpen(true);
      setStep("questions");
      setError("TaylorCV could not find the saved questions for this CV. Start a new CV or retry generation.");
      return;
    }
    generationTargetRef.current = applicationId;
    setFlowOpen(true);
    setWelcomeDismissed(true);
    setStep("generating");
    setError(null);
    try {
      await saveAnswers.mutateAsync({
        applicationId,
        answers: questionList.map((question) => ({
          questionId: question.id,
          answer: answers[question.id] ?? "",
        })),
        extraNotes,
      });
      await generate.mutateAsync({ applicationId });
    } catch (mutationError) {
      if (generationTargetRef.current !== applicationId) return;
      generationTargetRef.current = null;
      setFlowOpen(true);
      setWelcomeDismissed(true);
      setStep("questions");
      setError(
        mutationError instanceof Error
          ? mutationError.message
          : "TaylorCV generation failed."
      );
    }
  }

  function retryFinalCv(application: DashboardApplication) {
    if (!application.questions) {
      setError("TaylorCV could not find the saved questions for this CV. Start a new CV or retry generation.");
      return;
    }
    generationTargetRef.current = application.id;
    setQuestions(application.questions);
    setAnswers(answersByQuestionId(application.answers));
    setExtraNotes(application.extraNotes ?? "");
    setActiveApplicationId(application.id);
    setFlowOpen(true);
    setWelcomeDismissed(true);
    setStep("generating");
    setError(null);
    retryGeneration.mutate({ applicationId: application.id });
  }

  function openGenerating(application: DashboardApplication) {
    generationTargetRef.current = application.id;
    if (application.questions) setQuestions(application.questions);
    setAnswers(answersByQuestionId(application.answers));
    setExtraNotes(application.extraNotes ?? "");
    setActiveApplicationId(application.id);
    setFlowOpen(true);
    setWelcomeDismissed(true);
    setStep("generating");
    setError(null);
  }

  function startDictation() {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results?.[0]?.[0]?.transcript;
      if (transcript) setExtraNotes((current) => [current, transcript].filter(Boolean).join(" "));
    };
    recognition.start();
  }

  const speechSupported = useMemo(
    () =>
      typeof window !== "undefined" &&
      Boolean((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition),
    []
  );

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#edf3ff_0%,#f8fbff_46%,#eef7f2_100%)] text-[#08112f]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1420px] flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between gap-4">
          <TaylorBrand markClassName="h-10 w-10" textClassName="text-[23px] font-bold" />
          <div className="flex items-center gap-3">
            <Button
              className="h-10 rounded-lg bg-[#1158ff] px-4 text-sm font-semibold text-white hover:bg-[#0d49d8]"
              disabled={!hasLoadedState}
              onClick={() => startFlow(state)}
              type="button"
            >
              <Plus className="h-4 w-4" />
              New CV
            </Button>
            <button
              className="grid h-10 w-10 place-items-center rounded-lg border border-white/70 bg-white/64 text-[#263653] shadow-[0_12px_28px_rgba(55,74,118,0.10)] backdrop-blur-xl"
              onClick={() => void authClient.signOut().then(() => (window.location.href = "/"))}
              type="button"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>

        <section className="mt-8 grid flex-1 gap-6 lg:grid-cols-[minmax(0,0.84fr)_minmax(420px,0.52fr)]">
          <div>
            <p className="text-sm font-semibold text-[#536485]">Dashboard</p>
            <h1 className="mt-2 text-[34px] font-semibold leading-tight tracking-normal text-[#071026]">
              Welcome back, {firstName(props.userName, props.userEmail)}.
            </h1>
            <p className="mt-2 max-w-[650px] text-[15px] font-medium leading-[1.55] text-[#617294]">
              Create one-page CVs from real evidence, answer the missing-proof questions, and download the same PDF you preview.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <Metric label="Tailored CVs" value={hasLoadedState ? applications.length : "-"} />
              <Metric label="Profile" value={hasLoadedState ? hasProfile ? "Saved" : "Needed" : "Loading"} />
              <Metric label="Latest" value={hasLoadedState ? applications[0] ? statusLabel(applications[0].status) : "None" : "-"} />
            </div>

            {vaultDraft ? (
              <CandidateVaultEditor
                isDirty={vaultDirty}
                isSaving={updateVault.isPending}
                onChange={(nextVault) => {
                  setVaultDraft(nextVault);
                  setVaultDirty(true);
                }}
                onSave={() => updateVault.mutate(vaultDraft)}
                vault={vaultDraft}
              />
            ) : null}

            <div className="mt-7">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Your CVs</h2>
                {stateQuery.isFetching ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              </div>
              {stateQuery.isError && !state ? (
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
                  <p className="flex gap-2 text-sm font-semibold text-amber-900">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    TaylorCV could not load your dashboard.
                  </p>
                  <Button
                    className="mt-4 h-9 rounded-lg bg-[#1158ff] px-4 text-sm font-semibold text-white hover:bg-[#0d49d8]"
                    onClick={() => void refetchDashboard()}
                    type="button"
                  >
                    Retry
                  </Button>
                </div>
              ) : !hasLoadedState ? (
                <div className="rounded-lg border border-dashed border-[#cbd8ee] bg-white/42 p-8 text-center">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin text-[#1158ff]" />
                  <p className="mt-3 text-sm font-semibold text-[#617294]">Loading dashboard...</p>
                </div>
              ) : applications.length ? (
                <div className="grid gap-3 md:grid-cols-2">
                  {applications.map((application) => (
                    <article
                      className="rounded-lg border border-white/70 bg-white/62 p-4 shadow-[0_16px_38px_rgba(55,74,118,0.10)] backdrop-blur-xl"
                      key={application.id}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-[15px] font-semibold">{application.targetRole}</p>
                          <p className="mt-1 truncate text-sm font-medium text-[#617294]">
                            {application.company ?? "Company not detected"} · {formatDate(application.createdAt)}
                          </p>
                        </div>
                        <span className="rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-[#1158ff]">
                          {application.matchScore ?? "-"}%
                        </span>
                      </div>
                      {application.error ? (
                        <p className="mt-3 flex gap-2 rounded-lg bg-rose-50 p-2 text-xs font-semibold text-rose-800">
                          <AlertCircle className="h-4 w-4 shrink-0" />
                          {application.error}
                        </p>
                      ) : null}
                      <div className="mt-4 flex items-center gap-2">
                        {application.hasDraft ? (
                          <>
                            <button
                              className="inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-lg border border-[#dce5f4] bg-white text-sm font-semibold text-[#17305d]"
                              onClick={() => {
                                generationTargetRef.current = null;
                                setActiveApplicationId(application.id);
                                setFlowOpen(true);
                                setWelcomeDismissed(true);
                                setStep("preview");
                              }}
                              type="button"
                            >
                              <Eye className="h-4 w-4" />
                              Preview
                            </button>
                            <a
                              className="inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-lg bg-[#1158ff] text-sm font-semibold text-white"
                              href={`/api/applications/${application.id}/pdf`}
                            >
                              <Download className="h-4 w-4" />
                              PDF
                            </a>
                          </>
                        ) : application.status === "questions_ready" || application.status === "answers_saved" ? (
                          <button
                            className="inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-lg bg-[#1158ff] text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                            disabled={isBusy}
                            onClick={() => openQuestions(application)}
                            type="button"
                          >
                            Continue
                          </button>
                        ) : application.status === "generating" ? (
                          <button
                            className="inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-lg bg-white text-sm font-semibold text-[#17305d]"
                            onClick={() => openGenerating(application)}
                            type="button"
                          >
                            <Loader2 className="h-4 w-4 animate-spin text-[#1158ff]" />
                            View progress
                          </button>
                        ) : application.status === "failed" ? (
                          <button
                            className="inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-lg bg-[#1158ff] text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                            disabled={isBusy}
                            onClick={() => retryFinalCv(application)}
                            type="button"
                          >
                            Retry
                          </button>
                        ) : (
                          <span className="inline-flex h-9 items-center rounded-lg bg-white px-3 text-sm font-semibold text-[#617294]">
                            {statusLabel(application.status)}
                          </span>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-[#cbd8ee] bg-white/42 p-8 text-center">
                  <FileText className="mx-auto h-8 w-8 text-[#1158ff]" />
                  <p className="mt-3 text-base font-semibold">No tailored CVs yet.</p>
                  <p className="mt-1 text-sm font-medium text-[#617294]">Start with your current CV and a job description.</p>
                  <Button
                    className="mt-5 h-10 rounded-lg bg-[#1158ff] px-4 text-white hover:bg-[#0d49d8]"
                    disabled={!hasLoadedState}
                    onClick={() => startFlow(state)}
                    type="button"
                  >
                    Create first CV
                  </Button>
                </div>
              )}
            </div>
          </div>

          <aside className="rounded-lg border border-white/76 bg-white/54 p-5 shadow-[0_24px_64px_rgba(55,74,118,0.12)] backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#eef3ff] text-[#1158ff]">
                <WandSparkles className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold">How TaylorCV works</p>
                <p className="mt-1 text-sm font-medium text-[#617294]">Evidence in, one-page PDF out.</p>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {["Upload your existing CV", "Paste the target job", "Answer missing-proof questions", "Preview and download the PDF"].map((item, index) => (
                <div className="flex items-center gap-3 rounded-lg border border-white/70 bg-white/56 p-3" key={item}>
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#1158ff] text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <span className="text-sm font-semibold text-[#263653]">{item}</span>
                </div>
              ))}
            </div>
          </aside>
        </section>
      </div>

      {(flowOpen || shouldShowWelcome) ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#071226]/42 p-4 backdrop-blur-sm">
          <section className="max-h-[92vh] w-full max-w-[980px] overflow-hidden rounded-lg border border-white/78 bg-white/76 shadow-[0_34px_100px_rgba(16,32,74,0.24)] backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/70 px-5 py-4">
              <div>
                <p className="text-sm font-bold text-[#1158ff]">TaylorCV workflow</p>
                <h2 className="mt-1 text-xl font-semibold">
                  {step === "cv" ? "Upload your current CV" : step === "job" ? "Paste the job description" : step === "questions" ? "Strengthen this CV" : step === "generating" ? "Building your PDF" : "Your CV is ready"}
                </h2>
              </div>
              <button
                className={cn(
                  "h-9 rounded-lg border border-[#dce5f4] bg-white px-3 text-sm font-semibold",
                  isGenerationInFlight && "cursor-not-allowed opacity-60"
                )}
                disabled={isGenerationInFlight}
                onClick={() => {
                  setFlowOpen(false);
                  setWelcomeDismissed(true);
                }}
                type="button"
              >
                Close
              </button>
            </div>

            <div
              className={cn(
                "p-5",
                step === "questions"
                  ? "flex h-[calc(92vh-74px)] flex-col overflow-hidden"
                  : "max-h-[calc(92vh-74px)] overflow-auto"
              )}
            >
              {error ? (
                <p className="mb-4 flex gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm font-semibold text-amber-900">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </p>
              ) : null}

              {step === "cv" ? (
                <div className="grid gap-4 lg:grid-cols-[0.52fr_0.48fr]">
                  <label className="grid min-h-[220px] cursor-pointer place-items-center rounded-lg border border-dashed border-[#b8c8e6] bg-white/56 p-6 text-center">
                    <input
                      className="hidden"
                      accept=".pdf,.docx,.txt,text/plain,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) void readFile(file);
                      }}
                      type="file"
                    />
                    <span>
                      {isReadingFile ? (
                        <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#1158ff]" />
                      ) : (
                        <UploadCloud className="mx-auto h-9 w-9 text-[#1158ff]" />
                      )}
                      <span className="mt-3 block text-base font-semibold">
                        {cvFileName ?? "Upload PDF, DOCX or text"}
                      </span>
                      <span className="mt-1 block text-sm font-medium text-[#617294]">
                        We extract the evidence and save it as your base profile.
                      </span>
                    </span>
                  </label>
                  <textarea
                    className="min-h-[220px] resize-none rounded-lg border border-[#dce5f4] bg-white/74 p-4 text-sm font-medium outline-none focus:border-[#1158ff]"
                    onChange={(event) => setCvText(event.target.value)}
                    placeholder="Or paste your current CV text here..."
                    value={cvText}
                  />
                  <div className="flex justify-end lg:col-span-2">
                    <Button
                      className="h-10 rounded-lg bg-[#1158ff] px-5 text-white hover:bg-[#0d49d8]"
                      disabled={!cvText.trim() || isReadingFile}
                      onClick={() => {
                        setFlowOpen(true);
                        setWelcomeDismissed(true);
                        setError(null);
                        setStep("job");
                      }}
                      type="button"
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              ) : null}

              {step === "job" ? (
                <div>
                  <textarea
                    className="min-h-[320px] w-full resize-none rounded-lg border border-[#dce5f4] bg-white/74 p-4 text-sm font-medium outline-none focus:border-[#1158ff]"
                    onChange={(event) => setJobText(event.target.value)}
                    placeholder="Paste the full job description..."
                    value={jobText}
                  />
                  <div className="mt-4 flex justify-end">
                    <Button
                      className="h-10 rounded-lg bg-[#1158ff] px-5 text-white hover:bg-[#0d49d8]"
                      disabled={createApplication.isPending || !jobText.trim()}
                      onClick={submitJob}
                      type="button"
                    >
                      {createApplication.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                      Analyse fit
                    </Button>
                  </div>
                </div>
              ) : null}

              {step === "questions" && questions ? (
                <div className="flex min-h-0 flex-1 flex-col gap-3">
                  <div className="grid min-h-0 flex-1 auto-rows-fr gap-2 lg:grid-cols-3">
                    {questions.questions.map((question) => (
                      <label className="flex min-h-0 flex-col rounded-lg border border-[#dce5f4] bg-white/70 p-3" key={question.id}>
                        <span className="text-[13px] font-bold leading-snug">{question.question}</span>
                        <span className="mt-1 text-[11px] font-semibold leading-snug text-[#617294]">{question.whyItMatters}</span>
                        <textarea
                          className="mt-2 min-h-0 flex-1 resize-none rounded-lg border border-[#dce5f4] bg-white p-2.5 text-sm font-medium leading-snug outline-none focus:border-[#1158ff]"
                          onChange={(event) =>
                            setAnswers((current) => ({ ...current, [question.id]: event.target.value }))
                          }
                          placeholder="Concrete proof, metric, or context..."
                          value={answers[question.id] ?? ""}
                        />
                      </label>
                    ))}
                  </div>
                  <div className="grid shrink-0 gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                    <div className="rounded-lg border border-[#dce5f4] bg-white/70 p-3">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-bold">Anything else we should know?</p>
                        {speechSupported ? (
                          <button
                            className={cn(
                              "inline-flex h-8 items-center gap-2 rounded-lg border px-3 text-xs font-bold",
                              isListening ? "border-[#1158ff] bg-[#eef3ff] text-[#1158ff]" : "border-[#dce5f4] bg-white"
                            )}
                            onClick={startDictation}
                            type="button"
                          >
                            <Mic className="h-3.5 w-3.5" />
                            Dictate
                          </button>
                        ) : null}
                      </div>
                      <textarea
                        className="mt-2 h-20 w-full resize-none rounded-lg border border-[#dce5f4] bg-white p-2.5 text-sm font-medium leading-snug outline-none focus:border-[#1158ff] sm:h-16"
                        onChange={(event) => setExtraNotes(event.target.value)}
                        placeholder="Extra context, constraints, achievements, or metrics..."
                        value={extraNotes}
                      />
                    </div>
                    <Button
                      className="h-10 w-full rounded-lg bg-[#1158ff] px-5 text-white hover:bg-[#0d49d8] lg:w-auto"
                      disabled={isBusy}
                      onClick={() => void generateFinalCv()}
                      type="button"
                    >
                      {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <WandSparkles className="h-4 w-4" />}
                      Build final CV
                    </Button>
                  </div>
                </div>
              ) : null}

              {step === "generating" ? (
                <div className="grid min-h-[360px] place-items-center text-center">
                  <div>
                    <Loader2 className="mx-auto h-9 w-9 animate-spin text-[#1158ff]" />
                    <p className="mt-4 text-lg font-semibold">Writing, verifying and fitting your CV.</p>
                    <p className="mt-2 text-sm font-medium text-[#617294]">
                      This usually takes 25-35 seconds.
                    </p>
                  </div>
                </div>
              ) : null}

              {step === "preview" && activePreviewUrl && activeApplicationId ? (
                <div>
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <p className="flex items-center gap-2 text-sm font-bold text-[#08743b]">
                      <CheckCircle2 className="h-4 w-4" />
                      PDF ready
                    </p>
                    <a
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#1158ff] px-4 text-sm font-semibold text-white"
                      href={`/api/applications/${activeApplicationId}/pdf`}
                    >
                      <Download className="h-4 w-4" />
                      Download PDF
                    </a>
                  </div>
                  <iframe
                    className="h-[70vh] w-full rounded-lg border border-[#dce5f4] bg-white"
                    src={activePreviewUrl}
                    title="TaylorCV preview"
                  />
                </div>
              ) : null}
            </div>
          </section>
        </div>
      ) : null}
    </main>
  );
}

function Metric(props: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-white/70 bg-white/58 p-4 shadow-[0_16px_38px_rgba(55,74,118,0.08)] backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.04em] text-[#617294]">{props.label}</p>
      <p className="mt-2 text-2xl font-semibold">{props.value}</p>
    </div>
  );
}

function CandidateVaultEditor(props: {
  vault: CandidateVault;
  isDirty: boolean;
  isSaving: boolean;
  onChange: (vault: CandidateVault) => void;
  onSave: () => void;
}) {
  const vault = props.vault;
  const about = vault.about ?? { targetRoles: [] };
  const preferences = vault.preferences ?? { roleTypes: [], industries: [], locations: [], exclusions: [] };

  function updateVault(patch: Partial<CandidateVault>) {
    props.onChange({ ...vault, ...patch });
  }

  function updateBasics(patch: Partial<CandidateVault["basics"]>) {
    updateVault({ basics: { ...vault.basics, ...patch } });
  }

  function updateAbout(patch: Partial<CandidateVault["about"]>) {
    updateVault({ about: { ...about, ...patch } });
  }

  function updatePreferences(patch: Partial<CandidateVault["preferences"]>) {
    updateVault({ preferences: { ...preferences, ...patch } });
  }

  function updateExperience(index: number, patch: Partial<CandidateVault["experience"][number]>) {
    updateVault({
      experience: vault.experience.map((item, itemIndex) =>
        itemIndex === index ? { ...item, ...patch } : item
      ),
    });
  }

  function updateProject(index: number, patch: Partial<CandidateVault["projects"][number]>) {
    updateVault({
      projects: vault.projects.map((item, itemIndex) =>
        itemIndex === index ? { ...item, ...patch } : item
      ),
    });
  }

  function updateEducation(index: number, patch: Partial<CandidateVault["education"][number]>) {
    updateVault({
      education: vault.education.map((item, itemIndex) =>
        itemIndex === index ? { ...item, ...patch } : item
      ),
    });
  }

  const inputClass =
    "h-9 rounded-lg border border-[#dce5f4] bg-white/80 px-3 text-sm font-medium outline-none focus:border-[#1158ff]";
  const textClass =
    "min-h-[76px] resize-none rounded-lg border border-[#dce5f4] bg-white/80 p-3 text-sm font-medium outline-none focus:border-[#1158ff]";
  const labelClass = "grid gap-1.5 text-xs font-bold uppercase tracking-[0.04em] text-[#617294]";

  return (
    <section className="mt-7 rounded-lg border border-white/70 bg-white/62 p-4 shadow-[0_16px_38px_rgba(55,74,118,0.10)] backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Candidate Vault</h2>
          <p className="mt-1 text-sm font-medium text-[#617294]">Saved profile evidence used for every tailored CV.</p>
        </div>
        <Button
          className="h-9 rounded-lg bg-[#1158ff] px-4 text-sm font-semibold text-white hover:bg-[#0d49d8]"
          disabled={!props.isDirty || props.isSaving}
          onClick={props.onSave}
          type="button"
        >
          {props.isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Save Vault
        </Button>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <label className={labelClass}>
          Name
          <input className={inputClass} onChange={(event) => updateBasics({ fullName: event.target.value })} value={vault.basics.fullName} />
        </label>
        <label className={labelClass}>
          Headline
          <input className={inputClass} onChange={(event) => updateBasics({ currentTitle: event.target.value })} value={vault.basics.currentTitle ?? ""} />
        </label>
        <label className={labelClass}>
          Email
          <input className={inputClass} onChange={(event) => updateBasics({ email: event.target.value })} value={vault.basics.email ?? ""} />
        </label>
        <label className={labelClass}>
          Phone
          <input className={inputClass} onChange={(event) => updateBasics({ phone: event.target.value })} value={vault.basics.phone ?? ""} />
        </label>
        <label className={labelClass}>
          Location
          <input className={inputClass} onChange={(event) => updateBasics({ location: event.target.value })} value={vault.basics.location ?? ""} />
        </label>
        <label className={labelClass}>
          Target Roles
          <input className={inputClass} onChange={(event) => updateAbout({ targetRoles: textToCsv(event.target.value) })} value={csvToText(about.targetRoles)} />
        </label>
        <label className={labelClass}>
          Seniority
          <select
            className={inputClass}
            onChange={(event) => updateVault({ seniority: event.target.value as CandidateVault["seniority"] })}
            value={vault.seniority}
          >
            <option value="intern">Intern</option>
            <option value="junior">Junior</option>
            <option value="intermediate">Intermediate</option>
            <option value="senior">Senior</option>
            <option value="research">Research</option>
          </select>
        </label>
        <label className={labelClass}>
          Availability
          <input className={inputClass} onChange={(event) => updateAbout({ availability: event.target.value })} value={about.availability ?? ""} />
        </label>
        <label className={labelClass}>
          Work Rights
          <input className={inputClass} onChange={(event) => updateAbout({ workRights: event.target.value })} value={about.workRights ?? ""} />
        </label>
        <label className={`${labelClass} md:col-span-2`}>
          Links
          <textarea
            className={textClass}
            onChange={(event) => updateBasics({ links: textToLinks(event.target.value) })}
            placeholder="LinkedIn | https://..."
            value={linksToText(vault.basics.links)}
          />
        </label>
        <label className={`${labelClass} md:col-span-2`}>
          About
          <textarea className={textClass} onChange={(event) => updateAbout({ summary: event.target.value })} value={about.summary ?? ""} />
        </label>
        <label className={`${labelClass} md:col-span-2`}>
          Extra Info
          <textarea className={textClass} onChange={(event) => updateAbout({ extraInfo: event.target.value })} value={about.extraInfo ?? ""} />
        </label>
      </div>

      <details className="mt-4 rounded-lg border border-[#dce5f4] bg-white/48 p-3" open>
        <summary className="cursor-pointer text-sm font-bold">Experience</summary>
        <div className="mt-3 space-y-3">
          {vault.experience.map((item, index) => (
            <div className="grid gap-2 rounded-lg border border-[#dce5f4] bg-white/70 p-3 md:grid-cols-2" key={`${item.company}-${item.role}-${index}`}>
              <input className={inputClass} onChange={(event) => updateExperience(index, { role: event.target.value })} placeholder="Role" value={item.role} />
              <input className={inputClass} onChange={(event) => updateExperience(index, { company: event.target.value })} placeholder="Company" value={item.company} />
              <input className={inputClass} onChange={(event) => updateExperience(index, { location: event.target.value })} placeholder="Location" value={item.location ?? ""} />
              <input className={inputClass} onChange={(event) => updateExperience(index, { dates: event.target.value })} placeholder="Dates" value={item.dates ?? ""} />
              <textarea className={`${textClass} md:col-span-2`} onChange={(event) => updateExperience(index, { bullets: textToLines(event.target.value) })} placeholder="Bullets, one per line" value={linesToText(item.bullets)} />
              <input className={`${inputClass} md:col-span-2`} onChange={(event) => updateExperience(index, { tools: textToCsv(event.target.value) })} placeholder="Tools, comma separated" value={csvToText(item.tools)} />
              <textarea
                className={`${textClass} md:col-span-2`}
                onChange={(event) => updateExperience(index, { links: textToLinks(event.target.value) })}
                placeholder="Links, one per line"
                value={linksToText(item.links)}
              />
              <button
                className="h-8 rounded-lg border border-[#dce5f4] bg-white px-3 text-xs font-bold text-[#617294] md:col-span-2"
                onClick={() => updateVault({ experience: vault.experience.filter((_, itemIndex) => itemIndex !== index) })}
                type="button"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#dce5f4] bg-white px-3 text-sm font-semibold text-[#17305d]"
            onClick={() =>
              updateVault({
                experience: [
                  ...vault.experience,
                  { role: "", company: "", bullets: [], tools: [], links: [] },
                ],
              })
            }
            type="button"
          >
            <Plus className="h-4 w-4" />
            Add Experience
          </button>
        </div>
      </details>

      <details className="mt-3 rounded-lg border border-[#dce5f4] bg-white/48 p-3">
        <summary className="cursor-pointer text-sm font-bold">Projects</summary>
        <div className="mt-3 space-y-3">
          {vault.projects.map((item, index) => (
            <div className="grid gap-2 rounded-lg border border-[#dce5f4] bg-white/70 p-3 md:grid-cols-2" key={`${item.name}-${index}`}>
              <input className={inputClass} onChange={(event) => updateProject(index, { name: event.target.value })} placeholder="Project name" value={item.name} />
              <input className={inputClass} onChange={(event) => updateProject(index, { descriptor: event.target.value })} placeholder="Descriptor" value={item.descriptor ?? ""} />
              <input className={`${inputClass} md:col-span-2`} onChange={(event) => updateProject(index, { dates: event.target.value })} placeholder="Dates" value={item.dates ?? ""} />
              <textarea className={`${textClass} md:col-span-2`} onChange={(event) => updateProject(index, { bullets: textToLines(event.target.value) })} placeholder="Bullets, one per line" value={linesToText(item.bullets)} />
              <input className={`${inputClass} md:col-span-2`} onChange={(event) => updateProject(index, { tools: textToCsv(event.target.value) })} placeholder="Tools, comma separated" value={csvToText(item.tools)} />
              <textarea
                className={`${textClass} md:col-span-2`}
                onChange={(event) => updateProject(index, { links: textToLinks(event.target.value) })}
                placeholder="Links, one per line"
                value={linksToText(item.links)}
              />
              <button
                className="h-8 rounded-lg border border-[#dce5f4] bg-white px-3 text-xs font-bold text-[#617294] md:col-span-2"
                onClick={() => updateVault({ projects: vault.projects.filter((_, itemIndex) => itemIndex !== index) })}
                type="button"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#dce5f4] bg-white px-3 text-sm font-semibold text-[#17305d]"
            onClick={() =>
              updateVault({
                projects: [
                  ...vault.projects,
                  { name: "", bullets: [], tools: [], links: [] },
                ],
              })
            }
            type="button"
          >
            <Plus className="h-4 w-4" />
            Add Project
          </button>
        </div>
      </details>

      <details className="mt-3 rounded-lg border border-[#dce5f4] bg-white/48 p-3">
        <summary className="cursor-pointer text-sm font-bold">Education</summary>
        <div className="mt-3 space-y-3">
          {vault.education.map((item, index) => (
            <div className="grid gap-2 rounded-lg border border-[#dce5f4] bg-white/70 p-3 md:grid-cols-2" key={`${item.institution}-${index}`}>
              <input className={inputClass} onChange={(event) => updateEducation(index, { institution: event.target.value })} placeholder="Institution" value={item.institution} />
              <input className={inputClass} onChange={(event) => updateEducation(index, { degree: event.target.value })} placeholder="Degree" value={item.degree ?? ""} />
              <input className={`${inputClass} md:col-span-2`} onChange={(event) => updateEducation(index, { dates: event.target.value })} placeholder="Dates" value={item.dates ?? ""} />
              <textarea className={`${textClass} md:col-span-2`} onChange={(event) => updateEducation(index, { details: textToLines(event.target.value) })} placeholder="Details, one per line" value={linesToText(item.details)} />
              <button
                className="h-8 rounded-lg border border-[#dce5f4] bg-white px-3 text-xs font-bold text-[#617294] md:col-span-2"
                onClick={() => updateVault({ education: vault.education.filter((_, itemIndex) => itemIndex !== index) })}
                type="button"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#dce5f4] bg-white px-3 text-sm font-semibold text-[#17305d]"
            onClick={() =>
              updateVault({
                education: [
                  ...vault.education,
                  { institution: "", details: [] },
                ],
              })
            }
            type="button"
          >
            <Plus className="h-4 w-4" />
            Add Education
          </button>
        </div>
      </details>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <label className={labelClass}>
          Skills
          <textarea className={textClass} onChange={(event) => updateVault({ skills: textToCsv(event.target.value) })} value={csvToText(vault.skills)} />
        </label>
        <label className={labelClass}>
          Certifications
          <textarea className={textClass} onChange={(event) => updateVault({ certifications: textToLines(event.target.value) })} value={linesToText(vault.certifications)} />
        </label>
        <label className={labelClass}>
          Metrics
          <textarea className={textClass} onChange={(event) => updateVault({ metrics: textToLines(event.target.value) })} value={linesToText(vault.metrics)} />
        </label>
        <label className={labelClass}>
          Achievements
          <textarea className={textClass} onChange={(event) => updateVault({ achievements: textToLines(event.target.value) })} value={linesToText(vault.achievements)} />
        </label>
        <label className={labelClass}>
          Role Preferences
          <textarea
            className={textClass}
            onChange={(event) => updatePreferences({ roleTypes: textToLines(event.target.value) })}
            value={linesToText(preferences.roleTypes)}
          />
        </label>
        <label className={labelClass}>
          Industry Preferences
          <textarea
            className={textClass}
            onChange={(event) => updatePreferences({ industries: textToLines(event.target.value) })}
            value={linesToText(preferences.industries)}
          />
        </label>
        <label className={labelClass}>
          Location Preferences
          <textarea
            className={textClass}
            onChange={(event) => updatePreferences({ locations: textToLines(event.target.value) })}
            value={linesToText(preferences.locations)}
          />
        </label>
        <label className={labelClass}>
          Exclusions
          <textarea
            className={textClass}
            onChange={(event) => updatePreferences({ exclusions: textToLines(event.target.value) })}
            value={linesToText(preferences.exclusions)}
          />
        </label>
      </div>
    </section>
  );
}
