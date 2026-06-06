import { notFound } from "next/navigation";

import { RenderedCvPreview } from "~/components/cv-flow/RenderedCvPreview";
import {
  CompanyMark,
  StatusChip,
} from "../../_components/DashboardCards";
import { ExportMenu } from "../../_components/ExportMenu";
import { StatusSelect } from "../../_components/StatusSelect";
import {
  compactDate,
  getApplicationTitle,
  getCompanyName,
  getDashboardApplication,
  getParsedLatestCv,
  requireDashboardUser,
} from "../../dashboard-utils";

export default async function ApplicationDetailPage(props: {
  params: Promise<{ applicationId: string }>;
}) {
  const params = await props.params;
  const user = await requireDashboardUser(
    `/dashboard/applications/${params.applicationId}`
  );
  const application = await getDashboardApplication(user.id, params.applicationId);

  if (!application) notFound();

  const title = getApplicationTitle(application);
  const companyName = getCompanyName(application);
  const parsedCv = getParsedLatestCv(application);

  return (
    <div className="grid gap-7">
      <section className="rounded-[18px] border border-[#dce5f2] bg-white p-6 shadow-[0_20px_60px_rgba(47,68,115,0.08)] sm:p-7">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-start">
          <div className="flex min-w-0 gap-5">
            <CompanyMark companyName={companyName} />
            <div className="min-w-0">
              <h1 className="truncate text-[30px] font-black leading-tight tracking-normal text-[#071026]">
                {title}
              </h1>
              <p className="mt-1 text-[18px] font-extrabold text-[#33466d]">{companyName}</p>
              <p className="mt-3 text-sm font-bold text-[#617294]">
                Created {compactDate(application.createdAt)}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            <StatusChip status={application.trackingStatus} />
            <StatusSelect
              applicationId={application.id}
              value={application.trackingStatus}
            />
            <ExportMenu
              applicationId={application.id}
              disabled={!parsedCv}
            />
          </div>
        </div>
      </section>

      <section className="grid gap-7 xl:grid-cols-[420px_minmax(0,1fr)]">
        <div className="grid content-start gap-5">
          <details className="rounded-[18px] border border-[#dce5f2] bg-white p-5 shadow-[0_20px_60px_rgba(47,68,115,0.08)]" open>
            <summary className="cursor-pointer text-[18px] font-black text-[#071026]">
              Job description
            </summary>
            <div className="mt-4 grid gap-3 text-sm font-medium leading-6 text-[#33466d]">
              {application.job?.summary ? <p>{application.job.summary}</p> : null}
              <pre className="max-h-[360px] overflow-auto whitespace-pre-wrap rounded-[12px] bg-[#f7faff] p-4 font-sans text-sm leading-6 text-[#33466d]">
                {application.job?.rawText ?? "No job description saved yet."}
              </pre>
            </div>
          </details>

          <section className="rounded-[18px] border border-[#dce5f2] bg-white p-5 shadow-[0_20px_60px_rgba(47,68,115,0.08)]">
            <h2 className="text-[18px] font-black text-[#071026]">Gap questions & answers</h2>
            {application.gapQuestions.length === 0 ? (
              <p className="mt-3 text-sm font-bold text-[#617294]">
                No gap questions were needed for this application.
              </p>
            ) : (
              <div className="mt-4 grid gap-4">
                {application.gapQuestions.map((question) => {
                  const answers = application.gapAnswers.filter(
                    (answer) => answer.gapQuestionId === question.id
                  );

                  return (
                    <div className="rounded-[12px] bg-[#f7faff] p-4" key={question.id}>
                      <p className="text-sm font-extrabold leading-6 text-[#17213d]">
                        {question.question}
                      </p>
                      {answers.length ? (
                        <div className="mt-3 grid gap-2">
                          {answers.map((answer) => (
                            <p className="text-sm font-medium leading-6 text-[#33466d]" key={answer.id}>
                              {answer.rawUserAnswer ||
                                answer.metricText ||
                                answer.followUpText ||
                                answer.elaboration ||
                                (answer.skipped ? "Skipped" : "Answered")}
                            </p>
                          ))}
                        </div>
                      ) : (
                        <p className="mt-3 text-sm font-bold text-[#8490a8]">Not answered yet.</p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        <section className="rounded-[18px] border border-[#dce5f2] bg-white p-5 shadow-[0_20px_60px_rgba(47,68,115,0.08)] sm:p-7">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-[22px] font-black text-[#071026]">Latest rendered CV</h2>
              <p className="mt-1 text-sm font-bold text-[#617294]">
                The same structured CV renderer used by preview and export.
              </p>
            </div>
          </div>
          {parsedCv ? (
            <RenderedCvPreview
              cv={parsedCv.cv}
              mode="full"
              presentationJson={parsedCv.draft.presentationJson}
            />
          ) : (
            <div className="rounded-[14px] border border-dashed border-[#cfd9eb] bg-[#f8fbff] p-10 text-center">
              <p className="text-lg font-black text-[#071026]">No CV draft yet.</p>
              <p className="mt-2 text-sm font-bold text-[#617294]">
                Finish the CV flow to generate the rendered preview.
              </p>
            </div>
          )}
        </section>
      </section>
    </div>
  );
}
