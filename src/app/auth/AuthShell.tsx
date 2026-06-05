"use client";

import {
  FileText,
  Loader2,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
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
  if (result?.error) throw new Error(result.error.message ?? "Authentication failed.");
  return result;
}

export function AuthShell() {
  const params = useSearchParams();
  const mode = authMode(params);
  const context = params.get("context");
  const isSignIn = mode === "sign-in";
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isGooglePending, setIsGooglePending] = useState(false);

  const title = isSignIn ? "Sign in to TaylorCV" : "Create your account";
  const subtitle = isSignIn
    ? "Continue to your dashboard, billing, and saved CVs."
    : context === "unlock"
      ? "Create your account to unlock and save your tailored CV."
      : "Create your account to generate, save, and export your tailored CVs.";
  const emailButtonLabel = isSignIn ? "Continue with email" : "Continue with email";
  const successMessage = isSignIn
    ? "Check your email for a secure sign-in link."
    : "Check your email to finish creating your account.";
  const bottomPrompt = isSignIn ? "Don’t have an account?" : "Already have an account?";
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
        console.info("[TaylorCV auth] Google sign-in origin", window.location.origin);
        console.info("[TaylorCV auth] Google sign-in callbackURL", resolvedCallbackURL);
      }
      await authCall(
        authClient.signIn.social({
          provider: "google",
          callbackURL: resolvedCallbackURL,
        })
      );
    } catch (googleError) {
      setError(
        googleError instanceof Error
          ? googleError.message
          : "Google sign-in is not available right now."
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
        })
      );
      setMessage(successMessage);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "TaylorCV could not send the sign-in link."
      );
    } finally {
      setIsPending(false);
    }
  }

  return (
    <main className="signup-auth-page relative min-h-screen overflow-x-hidden text-[#081633]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(248,251,255,0.04)_0%,rgba(248,251,255,0.08)_40%,rgba(248,251,255,0.62)_61%,rgba(255,255,255,0.88)_100%),radial-gradient(circle_at_78%_45%,rgba(255,255,255,0.82),rgba(255,255,255,0.50)_30%,transparent_56%),linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_46%,rgba(5,18,46,0.10)_100%)]" />

      <header className="relative z-10 flex items-center justify-between px-7 pt-7 md:px-16 md:pt-10 xl:px-[72px]">
        <TaylorLogoMark className="h-12 w-12 md:h-14 md:w-14" />
        <div className="mr-2 mt-1 hidden items-center gap-2.5 text-[16px] font-semibold text-[#536985] sm:flex xl:mr-[72px]">
          <ShieldCheck className="h-6 w-6 text-[#1e58cf]" />
          Your data is secure
        </div>
      </header>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-88px)] w-full max-w-[1660px] items-center gap-8 px-5 pb-8 pt-8 md:px-14 lg:pb-8 lg:pt-0 xl:grid-cols-[minmax(650px,1fr)_minmax(600px,660px)] xl:gap-8">
        <div className="hidden max-w-[760px] self-start pt-[12vh] xl:block">
          <h1 className="text-[64px] font-bold leading-[1.08] tracking-normal text-[#061735] 2xl:text-[76px]">
            Your best career
            <br />
            move starts here.
          </h1>
          <p className="mt-8 text-[26px] font-medium leading-[1.4] text-[#24395f]">
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

          <div className="mt-[20vh]">
            <p className="text-[20px] font-bold text-white drop-shadow-[0_2px_8px_rgba(5,18,46,0.55)]">
              Trusted by 11,000+ NZ job seekers
            </p>
            <div
              aria-label="5 star rating"
              className="mt-4 flex gap-2 text-[32px] leading-none text-[#ffc21a] drop-shadow-[0_2px_8px_rgba(5,18,46,0.42)]"
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
          className="mx-auto w-full max-w-[660px] rounded-[28px] border border-white/76 bg-white/82 px-5 py-7 shadow-[0_34px_110px_rgba(32,54,90,0.30)] backdrop-blur-2xl sm:px-12 sm:py-12 lg:px-16 lg:py-12 xl:min-h-[700px]"
          onSubmit={submit}
        >
          <h2 className="text-center text-[38px] font-bold leading-tight tracking-normal text-[#071833] sm:text-[48px]">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-[440px] text-center text-[18px] leading-8 text-[#667892]">
            {subtitle}
          </p>

          <button
            className="mt-9 flex h-[66px] w-full cursor-pointer items-center justify-center gap-4 rounded-lg border border-[#d7e0ed] bg-white text-[19px] font-semibold text-[#14213b] shadow-[0_14px_30px_rgba(22,34,59,0.18),0_1px_0_rgba(255,255,255,0.95)_inset] transition hover:-translate-y-0.5 hover:bg-[#fbfdff] hover:shadow-[0_18px_36px_rgba(22,34,59,0.22)] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isPending || isGooglePending}
            onClick={continueWithGoogle}
            type="button"
          >
            {isGooglePending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Image
                alt=""
                className="h-8 w-8"
                height={32}
                src="/assets/company-logos/google.svg"
                width={32}
              />
            )}
            Continue with Google
          </button>

          <div className="my-7 flex items-center gap-5 text-[16px] font-semibold text-[#687996]">
            <span className="h-px flex-1 bg-[#dfe6ef]" />
            or
            <span className="h-px flex-1 bg-[#dfe6ef]" />
          </div>

          <div className="space-y-5">
            <label className="relative block">
              <Mail className="pointer-events-none absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-[#7588a5]" />
              <input
                className="h-[64px] w-full rounded-lg border border-[#dbe4ef] bg-white/90 px-16 text-[17px] font-medium text-[#0f1d35] outline-none transition placeholder:text-[#8190a7] focus:border-[#286ff0] focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                required
                type="email"
                value={email}
              />
            </label>
          </div>

          {error ? (
            <p className="mt-4 rounded-xl border border-amber-300/50 bg-amber-50/90 p-3 text-sm font-medium text-amber-900">
              {error}
            </p>
          ) : null}
          {message ? (
            <p className="mt-4 rounded-xl border border-emerald-300/50 bg-emerald-50/90 p-3 text-sm font-medium text-emerald-900">
              {message}
            </p>
          ) : null}

          <button
            className="taylor-premium-button mt-7 flex h-[68px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg border text-[20px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isPending || isGooglePending}
            type="submit"
          >
            {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
            {emailButtonLabel}
          </button>

          <p className="mt-6 text-center text-[17px] font-medium text-[#64748b]">
            {bottomPrompt}{" "}
            <Link className="font-semibold text-[#246df1] hover:text-[#1559d0]" href={bottomLinkHref}>
              {bottomLinkLabel}
            </Link>
          </p>

          <div className="mt-8 border-t border-[#dfe6ef] pt-7">
            <div className="grid gap-4 sm:grid-cols-3 sm:gap-4">
              {[
                { icon: Sparkles, title: "AI-powered", subtitle: "CV builder" },
                { icon: FileText, title: "ATS optimised", subtitle: "Higher response rate" },
                { icon: ShieldCheck, title: "Secure & private", subtitle: "Your data is safe" },
              ].map((item) => (
                <div className="flex min-w-0 items-center gap-3" key={item.title}>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#eef3ff] text-[#246df1] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                    <item.icon className="h-6 w-6" />
                  </span>
                  <span className="min-w-0 text-left">
                    <span className="block text-[13px] font-bold leading-tight text-[#152848]">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-[12px] leading-snug text-[#78879a]">
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
