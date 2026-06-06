"use client";

import {
  CheckSquare,
  ChevronDown,
  Home,
  Loader2,
  LogOut,
  Menu,
  Plus,
  Settings,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { TaylorBrand } from "~/components/TaylorBrand";
import { authClient } from "~/lib/auth-client";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

const currentApplicationStorageKey = "currentApplicationId";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: Home, active: true },
  { href: "/dashboard/applications", label: "Applications", icon: CheckSquare, active: true },
  { href: "/dashboard/profile", label: "Profile", icon: User, active: false },
  { href: "/dashboard/settings", label: "Settings", icon: Settings, active: false },
];

export function NewCvButton(props: { className?: string; onDone?: () => void }) {
  const router = useRouter();
  const utils = api.useUtils();
  const createApplication = api.application.createApplication.useMutation({
    onSuccess: async (data) => {
      localStorage.setItem(currentApplicationStorageKey, data.applicationId);
      await utils.application.listUserApplications.invalidate();
      props.onDone?.();
      router.push(`/?applicationId=${data.applicationId}`);
    },
  });

  return (
    <button
      className={cn(
        "taylor-premium-button inline-flex h-[52px] items-center justify-center gap-3 rounded-[10px] border px-8 text-[16px] font-semibold text-white disabled:pointer-events-none disabled:opacity-70",
        props.className
      )}
      disabled={createApplication.isPending}
      type="button"
      onClick={() => createApplication.mutate()}
    >
      {createApplication.isPending ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <Plus className="h-5 w-5 stroke-[2.5]" />
      )}
      New CV
    </button>
  );
}

function NavList(props: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="grid gap-5">
      {navItems.map((item) => {
        const isActive =
          item.href === "/dashboard"
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = item.icon;
        const className = cn(
          "relative flex h-[54px] items-center gap-4 rounded-[12px] px-4 text-[13px] font-medium transition duration-200",
          isActive
            ? "border border-white/76 bg-[linear-gradient(135deg,rgba(255,255,255,0.68),rgba(231,239,255,0.44))] text-[#071543] shadow-[0_12px_28px_rgba(67,95,166,0.10),inset_0_1px_0_rgba(255,255,255,0.9)]"
            : "border border-transparent text-[#071543]",
          item.active ? "cursor-pointer hover:bg-white/26" : "cursor-default"
        );

        const content = (
          <>
            <Icon className="h-5 w-5 text-[#0a44ff] stroke-[2]" />
            {item.label}
            {isActive ? (
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#155dff] shadow-[0_0_0_4px_rgba(21,93,255,0.08)]" />
            ) : null}
          </>
        );

        return item.active ? (
          <Link
            className={className}
            href={item.href}
            key={item.href}
            onClick={props.onNavigate}
          >
            {content}
          </Link>
        ) : (
          <div className={className} key={item.href} aria-disabled="true">
            {content}
          </div>
        );
      })}
    </nav>
  );
}

function AccountMenu(props: { userEmail: string; userName: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const displayName = props.userName.trim() || props.userEmail.split("@")[0] || "Account";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="relative">
      {open ? (
        <div className="absolute bottom-[76px] left-0 right-0 rounded-[16px] border border-white/70 bg-white/78 p-2 shadow-[0_18px_40px_rgba(35,51,93,0.18)] backdrop-blur-2xl">
          <Link
            className="flex h-11 items-center gap-3 rounded-[12px] px-3 text-[14px] font-semibold text-[#263653] transition hover:bg-[#edf3ff]"
            href="/dashboard/settings"
            onClick={() => setOpen(false)}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <button
            className="mt-1 flex h-11 w-full items-center gap-3 rounded-[12px] px-3 text-left text-[14px] font-semibold text-[#263653] transition hover:bg-[#edf3ff]"
            onClick={() => {
              void authClient.signOut();
              router.push("/");
            }}
            type="button"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      ) : null}
      <button
        className="flex h-[64px] w-full cursor-default items-center gap-3 rounded-[13px] border border-white/50 bg-white/28 px-2.5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.68)]"
        type="button"
      >
        <span className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-full bg-[radial-gradient(circle_at_30%_20%,#638cff,#1746c8)] text-[16px] font-medium text-white shadow-[0_12px_24px_rgba(20,61,170,0.22),inset_0_1px_0_rgba(255,255,255,0.28)]">
          {initial}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[12px] font-medium text-[#101934]">
            {displayName}
          </span>
          <span className="mt-1 block truncate text-[11px] font-medium text-[#536485]">
            {props.userEmail}
          </span>
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-[#33466d]" />
      </button>
    </div>
  );
}

export function DashboardShell(props: {
  children: React.ReactNode;
  userEmail: string;
  userName: string;
}) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_72%_0%,rgba(191,207,255,0.68),transparent_34%),radial-gradient(circle_at_7%_12%,rgba(255,255,255,0.72),transparent_32%),linear-gradient(135deg,#dfe5f4_0%,#d7deee_47%,#cfd8ec_100%)] text-[#08112f] lg:h-dvh lg:min-h-dvh lg:overflow-hidden">
      <div className="flex min-h-screen lg:h-dvh lg:min-h-0">
        <aside className="fixed inset-y-0 left-0 z-30 hidden w-[236px] border-r border-white/42 bg-white/20 px-6 py-8 shadow-[inset_-1px_0_0_rgba(255,255,255,0.28)] backdrop-blur-2xl lg:block">
          <div className="pointer-events-none absolute inset-y-0 right-[-2px] w-[3px] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(174,201,255,0.52)_16%,rgba(255,255,255,0.34)_48%,rgba(174,201,255,0.56)_82%,rgba(255,255,255,0.96)_100%)] shadow-[0_0_14px_rgba(255,255,255,0.72),0_0_24px_rgba(101,145,255,0.26)]" />
          <TaylorBrand markClassName="h-11 w-11" textClassName="text-[16px] font-semibold tracking-[-0.02em]" />
          <div className="mt-[42px]">
            <NavList />
          </div>
          <div className="absolute bottom-5 left-4 right-4">
            <AccountMenu userEmail={props.userEmail} userName={props.userName} />
          </div>
        </aside>

        <section className="min-w-0 flex-1 lg:h-dvh lg:pl-[236px]">
          <header className="sticky top-0 z-20 border-b border-[#dfe7f4]/70 bg-[#f6f9ff]/70 px-4 py-4 backdrop-blur-xl sm:px-6 lg:hidden">
            <div className="mx-auto flex w-full max-w-[1560px] items-center justify-between gap-4">
              <button
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#d8e2f2] bg-white text-[#1c3766] shadow-sm lg:hidden"
                onClick={() => setMobileOpen(true)}
                type="button"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="min-w-0 lg:hidden">
                <TaylorBrand markClassName="h-9 w-9" textClassName="text-[23px] font-extrabold" />
              </div>
              <div className="ml-auto lg:pr-1">
                <NewCvButton />
              </div>
            </div>
          </header>

          <div className="mx-auto w-full max-w-[1580px] px-4 pb-8 sm:px-6 lg:h-dvh lg:px-10 lg:py-7">
            {props.children}
          </div>
        </section>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-[#071226]/45"
            onClick={() => setMobileOpen(false)}
            type="button"
          />
          <div className="relative h-full w-[min(86vw,340px)] border-r border-[#dae3f0] bg-[#f8fbff] px-6 py-7 shadow-2xl">
            <div className="flex items-center justify-between gap-4">
              <TaylorBrand markClassName="h-10 w-10" textClassName="text-[25px] font-extrabold" />
              <button
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#d8e2f2] bg-white text-[#1c3766]"
                onClick={() => setMobileOpen(false)}
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-10">
              <NavList onNavigate={() => setMobileOpen(false)} />
            </div>
            <div className="absolute inset-x-6 bottom-7 grid gap-3">
              <NewCvButton className="w-full" onDone={() => setMobileOpen(false)} />
              <Link
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#d8e2f2] bg-white text-sm font-bold text-[#33466d]"
                href="/dashboard/settings"
                onClick={() => setMobileOpen(false)}
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
              <button
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#d8e2f2] bg-white text-sm font-bold text-[#33466d]"
                onClick={() => {
                  void authClient.signOut();
                  router.push("/");
                }}
                type="button"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
              <p className="truncate text-center text-xs text-[#617294]">{props.userEmail}</p>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

export function EmptyStateNewCvButton() {
  return <NewCvButton className="mt-5" />;
}
