"use client";

import { FileText, Loader2, Mail, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { TaylorLogoMark } from "~/components/TaylorBrand";
import { authClient } from "~/lib/auth-client";

function redirectTarget(params: URLSearchParams) {
  return params.get("returnTo") || params.get("callbackUrl") || "/dashboard";
}

function callbackURL(params: URLSearchParams) {
  const target = redirectTarget(params);
  if (typeof window === "undefined") return target;

  const currentOrigin = window.location.origin;
  const resolvedUrl = new URL(target, currentOrigin);
  return `${currentOrigin}${resolvedUrl.pathname}${resolvedUrl.search}${resolvedUrl.hash}`;
}

function authMode(params: URLSearchParams) {
  return params.get("mode") === "sign-up" ? "sign-up" : "sign-in";
}

function replaceMode(params: URLSearchParams, mode: "sign-in" | "sign-up") {
  const next = new URLSearchParams(params.toString());
  next.set("mode", mode);
  const query = next.toString();
  return query ? `/auth?${query}` : `/auth?mode=${mode}`;
}

async function authCall<T>(fn: Promise<T>) {
  const result = (await fn) as { error?: { message?: string } | null };
  if (result?.error) {
    throw new Error(result.error.message ?? "Authentication failed.");
  }
  return result;
}

const featureItems = [
  { icon: Sparkles, title: "AI-powered", subtitle: "CV builder" },
  { icon: FileText, title: "ATS optimised", subtitle: "Higher response rate" },
  {
    icon: ShieldCheck,
    title: "Secure & private",
    subtitle: "Your data is safe",
  },
];

export function AuthShell() {
  const params = useSearchParams();
  const mode = authMode(params);
  const isSignIn = mode === "sign-in";

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isGooglePending, setIsGooglePending] = useState(false);

  const title = isSignIn ? "Sign in to TaylorCV" : "Create your account";
  const subtitle = isSignIn
    ? "Continue to your dashboard"
    : "Create your account to unlock and save your tailored CV.";
  const successMessage = isSignIn
    ? "Check your email for a secure sign-in link."
    : "Check your email to finish creating your account.";
  const bottomPrompt = isSignIn
    ? "Don’t have an account?"
    : "Already have an account?";
  const bottomLinkLabel = isSignIn ? "Create account" : "Sign in";
  const bottomLinkHref = replaceMode(params, isSignIn ? "sign-up" : "sign-in");

  async function continueWithGoogle() {
    setIsGooglePending(true);
    setIsPending(false);
    setError(null);
    setMessage(null);

    try {
      const resolvedCallbackURL = callbackURL(params);

      if (process.env.NODE_ENV !== "production") {
        console.info(
          "[TaylorCV auth] Google sign-in origin",
          window.location.origin,
        );
        console.info(
          "[TaylorCV auth] Google sign-in callbackURL",
          resolvedCallbackURL,
        );
      }

      await authCall(
        authClient.signIn.social({
          provider: "google",
          callbackURL: resolvedCallbackURL,
        }),
      );
    } catch (googleError) {
      setError(
        googleError instanceof Error
          ? googleError.message
          : "Google sign-in is not available right now.",
      );
      setIsGooglePending(false);
    }
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsPending(true);
    setIsGooglePending(false);
    setError(null);
    setMessage(null);

    try {
      await authCall(
        authClient.signIn.magicLink({
          email,
          name: isSignIn ? undefined : email.split("@")[0] || "TaylorCV user",
          callbackURL: redirectTarget(params),
        }),
      );
      setMessage(successMessage);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "TaylorCV could not send the sign-in link.",
      );
    } finally {
      setIsPending(false);
    }
  }

  return (
    <main className="signup-auth-page relative min-h-screen overflow-x-hidden text-[#081633] lg:h-screen lg:overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(248,251,255,0.02)_0%,rgba(248,251,255,0.04)_39%,rgba(248,251,255,0.42)_56%,rgba(255,255,255,0.96)_100%),radial-gradient(circle_at_78%_43%,rgba(255,255,255,0.9),rgba(255,255,255,0.54)_31%,transparent_57%),linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.02)_52%,rgba(5,18,46,0.11)_100%)]" />

      <header className="relative z-10 flex items-start justify-between px-5 pt-5 md:px-[54px] md:pt-[32px]">
        <TaylorLogoMark className="h-[42px] w-[42px] md:h-[42px] md:w-[42px]" />

        <div className="hidden items-center gap-2 text-[13px] font-semibold text-[#536985] sm:flex md:mr-[72px] md:mt-[8px]">
          <ShieldCheck className="h-4 w-4 text-[#1e58cf]" />
          Your data is secure
        </div>
      </header>

      <section className="relative z-10 grid min-h-[calc(100vh-68px)] w-full gap-8 px-5 pb-6 pt-6 md:px-[54px] lg:min-h-[calc(100vh-74px)] lg:grid-cols-[56%_44%] lg:items-center lg:gap-0 lg:pb-0 lg:pt-0">
        <div className="hidden self-start pl-[120px] pt-[58px] lg:block 2xl:pl-[120px]">
          <h1 className="max-w-[660px] text-[clamp(52px,3.65vw,72px)] font-bold leading-[1.08] tracking-normal text-[#061735]">
            <span className="block whitespace-nowrap">Your best career</span>
            <span className="block whitespace-nowrap">move starts here.</span>
          </h1>

          <p className="mt-[28px] max-w-[480px] text-[clamp(20px,1.32vw,25px)] font-semibold leading-[1.34] text-[#24395f]">
            {isSignIn ? (
              <>
                Sign back in and keep building
                <br />
                stronger CVs with TaylorCV.
              </>
            ) : (
              <>
                Create your account and let&apos;s build a
                <br />
                CV that opens doors.
              </>
            )}
          </p>

          <div className="mt-[clamp(145px,23vh,240px)]">
            <p className="text-[17px] font-bold text-white drop-shadow-[0_2px_8px_rgba(5,18,46,0.55)]">
              Trusted by 11,000+ NZ job seekers
            </p>

            <div
              aria-label="5 star rating"
              className="mt-3 flex gap-1.5 text-[30px] leading-none text-[#ffc21a] drop-shadow-[0_2px_8px_rgba(5,18,46,0.42)]"
            >
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
          </div>
        </div>

        <form
          className="mx-auto flex w-full max-w-[520px] flex-col rounded-[24px] border border-white/80 bg-white/[0.91] px-6 py-8 shadow-[0_22px_62px_rgba(32,54,90,0.16)] backdrop-blur-2xl sm:px-10 lg:mr-[clamp(34px,8.2vw,168px)] lg:h-[560px] lg:-mt-[18px] lg:px-[50px] lg:py-[34px]"
          onSubmit={submit}
        >
          <h2 className="text-center text-[clamp(30px,2.05vw,34px)] font-bold leading-[1.12] tracking-normal text-[#071833]">
            {title}
          </h2>

          <p className="mx-auto mt-[14px] max-w-[350px] text-center text-[14px] font-medium leading-[1.55] text-[#667892]">
            {subtitle}
          </p>

          <button
            className="mt-[38px] flex h-[50px] w-full cursor-pointer items-center justify-center gap-3 rounded-[7px] border border-[#d7e0ed] bg-white text-[15px] font-semibold text-[#14213b] shadow-[0_10px_24px_rgba(22,34,59,0.11),0_1px_0_rgba(255,255,255,0.95)_inset] transition hover:-translate-y-0.5 hover:bg-[#fbfdff] hover:shadow-[0_14px_28px_rgba(22,34,59,0.14)] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isPending || isGooglePending}
            onClick={continueWithGoogle}
            type="button"
          >
            {isGooglePending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Image
                alt=""
                className="h-[22px] w-[22px]"
                height={22}
                src="/assets/company-logos/google.svg"
                width={22}
              />
            )}
            Continue with Google
          </button>

          <div className="my-[22px] flex items-center gap-4 text-[13px] font-semibold text-[#687996]">
            <span className="h-px flex-1 bg-[#dfe6ef]" />
            or
            <span className="h-px flex-1 bg-[#dfe6ef]" />
          </div>

          <label className="relative block">
            <Mail className="pointer-events-none absolute left-[18px] top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-[#7588a5]" />
            <input
              className="h-[50px] w-full rounded-[7px] border border-[#dbe4ef] bg-white/90 pl-[50px] pr-4 text-[14px] font-semibold text-[#0f1d35] outline-none transition placeholder:text-[#8190a7] focus:border-[#286ff0] focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email address"
              required
              type="email"
              value={email}
            />
          </label>

          {error ? (
            <p className="mt-3 rounded-lg border border-amber-300/50 bg-amber-50/90 p-2.5 text-xs font-medium text-amber-900">
              {error}
            </p>
          ) : null}

          {message ? (
            <p className="mt-3 rounded-lg border border-emerald-300/50 bg-emerald-50/90 p-2.5 text-xs font-medium text-emerald-900">
              {message}
            </p>
          ) : null}

          <button
            className="taylor-premium-button mt-[20px] flex h-[52px] w-full cursor-pointer items-center justify-center gap-2 rounded-[7px] border text-[16px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isPending || isGooglePending}
            type="submit"
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Continue with email
          </button>

          <p className="mt-[18px] text-center text-[13px] font-semibold text-[#64748b]">
            {bottomPrompt}{" "}
            <Link
              className="font-semibold text-[#246df1] hover:text-[#1559d0]"
              href={bottomLinkHref}
            >
              {bottomLinkLabel}
            </Link>
          </p>

          <div className="mt-auto border-t border-[#dfe6ef] pt-[22px]">
            <div className="grid grid-cols-3 gap-[20px]">
              {featureItems.map((item) => (
                <div
                  className="flex min-w-0 items-center gap-[10px]"
                  key={item.title}
                >
                  <span className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-[10px] bg-[#eef3ff] text-[#246df1] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                    <item.icon className="h-[17px] w-[17px]" />
                  </span>

                  <span className="min-w-0 text-left">
                    <span className="block text-[11px] font-bold leading-[1.15] text-[#152848]">
                      {item.title}
                    </span>
                    <span className="mt-[3px] block text-[10px] leading-[1.25] text-[#78879a]">
                      {item.subtitle}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}
