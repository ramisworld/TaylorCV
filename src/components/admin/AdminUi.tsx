import Link from "next/link";

import { cn } from "~/lib/utils";

function baseCardClassName() {
  return "rounded-3xl border border-slate-200/90 bg-white shadow-[0_16px_44px_rgba(15,23,42,0.06)]";
}

export function AdminShell(props: {
  children: React.ReactNode;
  currentPath?: string;
  userEmail?: string | null;
}) {
  const navItems = [
    { href: "/admin", label: "Overview" },
    { href: "/admin/applications", label: "Applications" },
  ];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#f3f7fc_100%)] text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-10">
          <div className="flex items-center gap-6">
            <Link className="text-sm font-semibold tracking-[0.16em] text-slate-900 uppercase" href="/admin">
              TaylorCV Admin
            </Link>
            <nav className="flex items-center gap-2">
              {navItems.map((item) => {
                const active =
                  props.currentPath === item.href ||
                  (item.href !== "/admin" && props.currentPath?.startsWith(item.href));

                return (
                  <Link
                    className={cn(
                      "rounded-lg px-3 py-2 text-sm font-medium transition",
                      active
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    )}
                    href={item.href}
                    key={item.href}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">Admin</p>
            <p className="text-sm font-medium text-slate-700">{props.userEmail ?? "—"}</p>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10">{props.children}</main>
    </div>
  );
}

export function AdminForbiddenState(props: {
  email?: string | null;
  isAllowedEmail: boolean;
  hasGoogleAccount: boolean;
}) {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_16px_50px_rgba(15,23,42,0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">403</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950">
          Admin access denied
        </h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Signed-in users still need an allowed admin email and a linked Google account.
        </p>
        <dl className="mt-6 grid gap-3 text-sm text-slate-700">
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <dt>Email</dt>
            <dd className="font-medium text-slate-900">{props.email ?? "Unknown"}</dd>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <dt>Allowed by `ADMIN_EMAILS`</dt>
            <dd className={cn("font-medium", props.isAllowedEmail ? "text-emerald-700" : "text-rose-700")}>
              {props.isAllowedEmail ? "Yes" : "No"}
            </dd>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <dt>Google account linked</dt>
            <dd className={cn("font-medium", props.hasGoogleAccount ? "text-emerald-700" : "text-rose-700")}>
              {props.hasGoogleAccount ? "Yes" : "No"}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export function AdminPageHeader(props: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className={cn(baseCardClassName(), "mb-6 flex flex-col gap-5 p-6 sm:flex-row sm:items-end sm:justify-between")}>
      <div className="max-w-3xl">
        {props.eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">{props.eyebrow}</p>
        ) : null}
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">{props.title}</h1>
        {props.description ? (
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-[15px]">{props.description}</p>
        ) : null}
      </div>
      {props.action ? <div>{props.action}</div> : null}
    </div>
  );
}

export function AdminCard(props: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <section className={cn(baseCardClassName(), "p-5", props.className)}>
      {props.title || props.description || props.action ? (
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {props.title ? (
              <h2 className="text-base font-semibold tracking-[-0.02em] text-slate-950">{props.title}</h2>
            ) : null}
            {props.description ? (
              <p className="mt-1 text-sm leading-6 text-slate-500">{props.description}</p>
            ) : null}
          </div>
          {props.action ? <div>{props.action}</div> : null}
        </div>
      ) : null}
      {props.children}
    </section>
  );
}

export function AdminStatCard(props: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className={cn(baseCardClassName(), "p-5")}>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{props.label}</p>
      <p className="mt-3 text-[2rem] font-semibold tracking-[-0.04em] text-slate-950">{props.value}</p>
      {props.hint ? <p className="mt-2 min-h-[2.5rem] text-sm leading-5 text-slate-500">{props.hint}</p> : null}
    </div>
  );
}

export function AdminStatusBadge(props: {
  tone?: "neutral" | "success" | "warning" | "danger" | "info";
  children: React.ReactNode;
}) {
  const toneClasses = {
    neutral: "border-slate-200 bg-slate-100 text-slate-700",
    success: "border-emerald-200 bg-emerald-50 text-emerald-700",
    warning: "border-amber-200 bg-amber-50 text-amber-700",
    danger: "border-rose-200 bg-rose-50 text-rose-700",
    info: "border-blue-200 bg-blue-50 text-blue-700",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
        toneClasses[props.tone ?? "neutral"]
      )}
    >
      {props.children}
    </span>
  );
}

export function AdminJsonPanel(props: {
  value: unknown;
  className?: string;
  emptyLabel?: string;
}) {
  let normalizedValue = props.value;
  if (typeof props.value === "string") {
    try {
      normalizedValue = JSON.parse(props.value);
    } catch {
      normalizedValue = props.value;
    }
  }
  const content =
    normalizedValue == null
      ? props.emptyLabel ?? "No data."
      : typeof normalizedValue === "string"
        ? normalizedValue
        : JSON.stringify(normalizedValue, null, 2);

  return (
    <pre
      className={cn(
        "max-h-[720px] overflow-auto rounded-xl border border-slate-200 bg-slate-950 p-4 text-xs leading-6 text-slate-100",
        props.className
      )}
    >
      {content}
    </pre>
  );
}

export function AdminTextPanel(props: {
  value: string | null | undefined;
  className?: string;
  emptyLabel?: string;
}) {
  return (
    <pre
      className={cn(
        "max-h-[720px] overflow-auto whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700",
        props.className
      )}
    >
      {props.value?.trim() || props.emptyLabel || "No text."}
    </pre>
  );
}

export function AdminTabs(props: {
  basePath: string;
  currentTab: string;
  tabs: Array<{ id: string; label: string }>;
}) {
  return (
    <div className="mb-5 flex flex-wrap gap-2">
      {props.tabs.map((tab) => {
        const active = props.currentTab === tab.id;
        return (
          <Link
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm font-medium transition",
              active
                ? "border-blue-200 bg-blue-50 text-blue-700"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
            )}
            href={tab.id === "preview" ? props.basePath : `${props.basePath}?tab=${tab.id}`}
            key={tab.id}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}

export function AdminKeyValueGrid(props: {
  items: Array<{ label: string; value: React.ReactNode }>;
  columns?: 2 | 3 | 4;
}) {
  const cols =
    props.columns === 4
      ? "xl:grid-cols-4"
      : props.columns === 3
        ? "lg:grid-cols-3"
        : "md:grid-cols-2";

  return (
    <dl className={cn("grid gap-3", cols)}>
      {props.items.map((item) => (
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3" key={item.label}>
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{item.label}</dt>
          <dd className="mt-2 break-words text-sm font-medium text-slate-900">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function AdminTable(props: {
  headers: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
        <thead className="bg-slate-50">
          <tr>
            {props.headers.map((header) => (
              <th
                className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500"
                key={header}
                scope="col"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">{props.children}</tbody>
      </table>
    </div>
  );
}

export function AdminTableCell(props: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={cn("px-4 py-3 align-top text-sm text-slate-700", props.className)}>{props.children}</td>;
}

export function AdminTableRow(props: {
  children: React.ReactNode;
}) {
  return <tr className="hover:bg-slate-50/70">{props.children}</tr>;
}
