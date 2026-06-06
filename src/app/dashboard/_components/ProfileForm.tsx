"use client";

import { Loader2, Save } from "lucide-react";
import { useState } from "react";

import { api } from "~/trpc/react";

type ProfileFormValues = {
  fullName: string;
  email: string;
  location: string;
  linkedIn: string;
  github: string;
  portfolio: string;
  otherLinks: string;
  currentTargetTitle: string;
  baseCv: string;
};

export function ProfileForm(props: { initialValues: ProfileFormValues }) {
  const [values, setValues] = useState(props.initialValues);
  const [saved, setSaved] = useState(false);
  const updateProfile = api.auth.updateDashboardProfile.useMutation({
    onSuccess: () => setSaved(true),
  });

  function setValue(key: keyof ProfileFormValues, value: string) {
    setSaved(false);
    setValues((current) => ({ ...current, [key]: value }));
  }

  return (
    <form
      className="grid gap-5"
      onSubmit={(event) => {
        event.preventDefault();
        updateProfile.mutate(values);
      }}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full name" value={values.fullName} onChange={(value) => setValue("fullName", value)} />
        <Field disabled label="Email" value={values.email} onChange={() => null} />
        <Field label="Location" value={values.location} onChange={(value) => setValue("location", value)} />
        <Field label="Current target title" value={values.currentTargetTitle} onChange={(value) => setValue("currentTargetTitle", value)} />
        <Field label="LinkedIn" value={values.linkedIn} onChange={(value) => setValue("linkedIn", value)} />
        <Field label="GitHub" value={values.github} onChange={(value) => setValue("github", value)} />
        <Field label="Portfolio" value={values.portfolio} onChange={(value) => setValue("portfolio", value)} />
        <Field label="Other links" value={values.otherLinks} onChange={(value) => setValue("otherLinks", value)} />
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-extrabold text-[#25385f]">Base uploaded CV</span>
        <textarea
          className="min-h-[260px] rounded-[14px] border border-[#d8e2f2] bg-white px-4 py-3 text-sm font-medium leading-6 text-[#17213d] shadow-sm outline-none transition placeholder:text-[#94a1b8] focus:border-[#1158ff] focus:ring-4 focus:ring-blue-200/60"
          value={values.baseCv}
          onChange={(event) => setValue("baseCv", event.target.value)}
        />
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <button
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#1158ff] px-5 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(17,88,255,0.24)] disabled:pointer-events-none disabled:opacity-65"
          disabled={updateProfile.isPending}
          type="submit"
        >
          {updateProfile.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save profile
        </button>
        {saved ? <span className="text-sm font-bold text-[#09a74f]">Saved</span> : null}
        {updateProfile.error ? (
          <span className="text-sm font-bold text-[#c92d2d]">{updateProfile.error.message}</span>
        ) : null}
      </div>
    </form>
  );
}

function Field(props: {
  label: string;
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-extrabold text-[#25385f]">{props.label}</span>
      <input
        className="h-12 rounded-[14px] border border-[#d8e2f2] bg-white px-4 text-sm font-bold text-[#17213d] shadow-sm outline-none transition placeholder:text-[#94a1b8] focus:border-[#1158ff] focus:ring-4 focus:ring-blue-200/60 disabled:bg-[#f4f7fb] disabled:text-[#78849a]"
        disabled={props.disabled}
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
      />
    </label>
  );
}
