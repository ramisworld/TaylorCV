"use client";

import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  Calendar,
  Edit3,
  ExternalLink,
  Globe,
  GraduationCap,
  Link as LinkIcon,
  Loader2,
  MapPin,
  MoreHorizontal,
  Plus,
  Save,
  Trash2,
  User,
  X,
} from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import type { StructuredCareerProfile } from "~/server/cv/cvSchemas";

type Experience = StructuredCareerProfile["experiences"][number];
type Project = StructuredCareerProfile["projects"][number];
type Education = StructuredCareerProfile["education"][number];
type Credential = StructuredCareerProfile["credentials"][number];
type ProfileLink = StructuredCareerProfile["links"][number];

type ModalState =
  | { type: "identity" }
  | { type: "experience"; item?: Experience }
  | { type: "project"; item?: Project }
  | { type: "education"; item?: Education }
  | { type: "credential"; item?: Credential }
  | { type: "link"; item?: ProfileLink }
  | { type: "career" }
  | null;

function makeId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.round(Math.random() * 100000)}`;
}

function splitList(value: string) {
  return value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function joinList(value?: string[]) {
  return (value ?? []).join(", ");
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "T") + (parts[1]?.[0] ?? "")).toUpperCase();
}

function detectLinkType(url: string): ProfileLink["type"] {
  const lower = url.toLowerCase();
  if (lower.includes("linkedin.com")) return "linkedin";
  if (lower.includes("github.com")) return "github";
  if (lower.includes("kaggle.com")) return "kaggle";
  if (lower.includes("medium.com")) return "medium";
  return "website";
}

function formatDates(item: { startDate?: string; endDate?: string; isCurrent?: boolean }) {
  if (!item.startDate && !item.endDate && !item.isCurrent) return null;
  return [item.startDate, item.isCurrent ? "Present" : item.endDate].filter(Boolean).join(" - ");
}

export function ProfileWorkspace(props: { initialProfile: StructuredCareerProfile }) {
  const [profile, setProfile] = useState(props.initialProfile);
  const [modal, setModal] = useState<ModalState>(null);
  const [skillName, setSkillName] = useState("");
  const [saved, setSaved] = useState(false);
  const saveProfile = api.profile.save.useMutation({
    onSuccess: (data) => {
      setProfile(data.profile);
      setSaved(true);
      window.setTimeout(() => setSaved(false), 1600);
    },
  });

  function persist(next: StructuredCareerProfile) {
    setProfile(next);
    setSaved(false);
    saveProfile.mutate({ profile: next });
  }

  function addSkill() {
    const name = skillName.trim();
    if (!name) return;
    persist({
      ...profile,
      skills: [...profile.skills, { id: makeId("skill"), name }],
    });
    setSkillName("");
  }

  return (
    <section className="min-h-0 overflow-y-auto pb-8">
      <div className="grid gap-4">
        <IdentityCard profile={profile} saved={saved} saving={saveProfile.isPending} onEdit={() => setModal({ type: "identity" })} />

        <div className="grid gap-4 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)]">
          <div className="grid content-start gap-4">
            <ProfileCard
              title="Skills"
              actionLabel="Add skill"
              onAction={addSkill}
              actionPrefix={
                <input
                  className="h-9 w-[180px] rounded-[8px] border border-white/70 bg-white/46 px-3 text-[12px] font-medium text-[#102044] outline-none focus:ring-4 focus:ring-blue-200/45"
                  placeholder="Add skill"
                  value={skillName}
                  onChange={(event) => setSkillName(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      addSkill();
                    }
                  }}
                />
              }
            >
              {profile.skills.length ? (
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill) => (
                    <span className="inline-flex h-8 items-center gap-2 rounded-[7px] border border-white/66 bg-white/54 px-3 text-[12px] font-medium text-[#132246] shadow-[inset_0_1px_0_rgba(255,255,255,0.82)]" key={skill.id}>
                      {skill.name}
                      <button
                        aria-label={`Remove ${skill.name}`}
                        className="text-[#2d5bff] hover:text-[#1238dc]"
                        type="button"
                        onClick={() => persist({ ...profile, skills: profile.skills.filter((item) => item.id !== skill.id) })}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <EmptyState label="No skills added yet." />
              )}
            </ProfileCard>

            <ProfileCard title="Projects" actionLabel="Add project" onAction={() => setModal({ type: "project" })}>
              <ScrollableList empty="No projects added yet.">
                {profile.projects.map((project) => (
                  <ProjectRow
                    item={project}
                    key={project.id}
                    onDelete={() => persist({ ...profile, projects: profile.projects.filter((item) => item.id !== project.id) })}
                    onEdit={() => setModal({ type: "project", item: project })}
                  />
                ))}
              </ScrollableList>
            </ProfileCard>

            <ProfileCard title="Certifications / Credentials" actionLabel="Add certification" onAction={() => setModal({ type: "credential" })}>
              <ScrollableList empty="No certifications or credentials yet.">
                {profile.credentials.map((credential) => (
                  <SimpleRow
                    icon={<Award className="h-5 w-5" />}
                    key={credential.id}
                    title={credential.name}
                    subtitle={credential.issuer}
                    onDelete={() => persist({ ...profile, credentials: profile.credentials.filter((item) => item.id !== credential.id) })}
                    onEdit={() => setModal({ type: "credential", item: credential })}
                  />
                ))}
              </ScrollableList>
            </ProfileCard>
          </div>

          <div className="grid content-start gap-4">
            <ProfileCard title="Experience" actionLabel="Add experience" onAction={() => setModal({ type: "experience" })}>
              <ScrollableList empty="No experience added yet.">
                {profile.experiences.map((experience) => (
                  <ExperienceRow
                    item={experience}
                    key={experience.id}
                    onDelete={() => persist({ ...profile, experiences: profile.experiences.filter((item) => item.id !== experience.id) })}
                    onEdit={() => setModal({ type: "experience", item: experience })}
                  />
                ))}
              </ScrollableList>
            </ProfileCard>

            <ProfileCard title="Education" actionLabel="Add education" onAction={() => setModal({ type: "education" })}>
              <ScrollableList empty="No education added yet.">
                {profile.education.map((education) => (
                  <SimpleRow
                    icon={<GraduationCap className="h-5 w-5" />}
                    key={education.id}
                    title={education.qualification}
                    subtitle={[education.institution, formatDates(education)].filter(Boolean).join(" · ")}
                    meta={education.location}
                    onDelete={() => persist({ ...profile, education: profile.education.filter((item) => item.id !== education.id) })}
                    onEdit={() => setModal({ type: "education", item: education })}
                  />
                ))}
              </ScrollableList>
            </ProfileCard>

            <ProfileCard title="Links" actionLabel="Add link" onAction={() => setModal({ type: "link" })}>
              {profile.links.length ? (
                <div className="flex flex-wrap gap-3">
                  {profile.links.map((link) => (
                    <LinkChip
                      item={link}
                      key={link.id}
                      onDelete={() => persist({ ...profile, links: profile.links.filter((item) => item.id !== link.id) })}
                      onEdit={() => setModal({ type: "link", item: link })}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState label="No links added yet." />
              )}
            </ProfileCard>

            <ProfileCard title="Career Details" actionLabel="Edit details" onAction={() => setModal({ type: "career" })}>
              <div className="grid gap-2 sm:grid-cols-2">
                <DetailTile label="Years of experience" value={profile.careerDetails.yearsOfExperience} />
                <DetailTile label="Target roles" value={joinList(profile.careerDetails.targetRoles)} />
                <DetailTile label="Industries of interest" value={joinList(profile.careerDetails.industriesOfInterest)} />
                <DetailTile
                  label="Preferred locations"
                  value={[
                    joinList(profile.careerDetails.preferredLocations),
                    profile.careerDetails.openToRemote ? "Open to Remote" : "",
                  ].filter(Boolean).join(" · ")}
                />
              </div>
            </ProfileCard>
          </div>
        </div>
      </div>

      <ProfileModal
        modal={modal}
        profile={profile}
        onClose={() => setModal(null)}
        onSave={(next) => {
          persist(next);
          setModal(null);
        }}
      />
    </section>
  );
}

function IdentityCard(props: {
  profile: StructuredCareerProfile;
  saved: boolean;
  saving: boolean;
  onEdit: () => void;
}) {
  const basics = props.profile.basics;
  return (
    <section className="rounded-[15px] border border-white/70 bg-white/38 px-5 py-5 shadow-[0_20px_52px_rgba(67,82,128,0.12),inset_0_1px_0_rgba(255,255,255,0.88)] backdrop-blur-2xl">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-5">
          <span className="grid h-[82px] w-[82px] shrink-0 place-items-center rounded-full border border-white/78 bg-[radial-gradient(circle_at_30%_20%,#708fff,#1238cf)] text-[28px] font-medium text-white shadow-[0_18px_38px_rgba(20,61,170,0.22),inset_0_1px_0_rgba(255,255,255,0.28)]">
            {initials(basics.fullName)}
          </span>
          <div className="min-w-0">
            <h2 className="truncate text-[20px] font-semibold text-[#081543]">
              {basics.fullName || "Your name"}
            </h2>
            <p className="mt-1 text-[13px] font-semibold text-[#101934]">
              {basics.currentRole || "Current role"}
            </p>
            {basics.location ? (
              <p className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-medium text-[#536485]">
                <MapPin className="h-4 w-4" />
                {basics.location}
              </p>
            ) : null}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {props.saving ? <Loader2 className="h-4 w-4 animate-spin text-[#2d5bff]" /> : null}
          {props.saved ? <span className="text-[12px] font-semibold text-[#0f8e48]">Saved</span> : null}
          <GlassButton label="Edit profile" icon={<Edit3 className="h-4 w-4" />} onClick={props.onEdit} />
        </div>
      </div>
    </section>
  );
}

function ProfileCard(props: {
  title: string;
  actionLabel: string;
  children: React.ReactNode;
  actionPrefix?: React.ReactNode;
  onAction: () => void;
}) {
  return (
    <section className="min-h-0 rounded-[15px] border border-white/70 bg-white/38 p-4 shadow-[0_20px_52px_rgba(67,82,128,0.12),inset_0_1px_0_rgba(255,255,255,0.88)] backdrop-blur-2xl">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-[17px] font-semibold text-[#081543]">{props.title}</h2>
        <div className="flex items-center gap-2">
          {props.actionPrefix}
          <GlassButton label={props.actionLabel} icon={<Plus className="h-4 w-4" />} onClick={props.onAction} />
        </div>
      </div>
      {props.children}
    </section>
  );
}

function GlassButton(props: { label: string; icon: React.ReactNode; onClick: () => void }) {
  return (
    <button
      className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-white/70 bg-white/54 px-3 text-[12px] font-semibold text-[#1158ff] shadow-[0_10px_24px_rgba(65,82,132,0.08),inset_0_1px_0_rgba(255,255,255,0.78)] transition hover:bg-white/70"
      type="button"
      onClick={props.onClick}
    >
      {props.icon}
      {props.label}
    </button>
  );
}

function EmptyState(props: { label: string }) {
  return (
    <div className="rounded-[12px] border border-dashed border-white/76 bg-white/24 p-5 text-center text-[13px] font-medium text-[#617294]">
      {props.label}
    </div>
  );
}

function ScrollableList(props: { children: React.ReactNode; empty: string }) {
  const children = Array.isArray(props.children) ? props.children.filter(Boolean) : props.children;
  return (
    <div className="max-h-[260px] min-h-0 overflow-y-auto overflow-x-hidden pr-1">
      {Array.isArray(children) && children.length === 0 ? (
        <EmptyState label={props.empty} />
      ) : (
        <div className="grid gap-3">{children}</div>
      )}
    </div>
  );
}

function RowActions(props: { onEdit: () => void; onDelete: () => void; openUrl?: string }) {
  return (
    <details className="group relative">
      <summary className="flex h-8 w-8 cursor-pointer list-none items-center justify-center rounded-[8px] text-[#31598f] transition hover:bg-white/42 [&::-webkit-details-marker]:hidden">
        <MoreHorizontal className="h-4 w-4" />
      </summary>
      <div className="absolute right-0 top-9 z-20 w-[150px] rounded-[12px] border border-white/72 bg-white/90 p-2 shadow-[0_18px_42px_rgba(35,51,93,0.18)] backdrop-blur-2xl">
        {props.openUrl ? (
          <a className="menu-action" href={props.openUrl} rel="noreferrer" target="_blank">
            <ExternalLink className="h-4 w-4" />
            Open
          </a>
        ) : null}
        <button className="menu-action" type="button" onClick={props.onEdit}>
          <Edit3 className="h-4 w-4" />
          Edit
        </button>
        <button className="menu-action text-[#c92d2d]" type="button" onClick={() => window.confirm("Delete this item?") && props.onDelete()}>
          <Trash2 className="h-4 w-4" />
          Delete
        </button>
      </div>
    </details>
  );
}

function ExperienceRow(props: { item: Experience; onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="grid grid-cols-[44px_minmax(0,1fr)_32px] gap-3 rounded-[12px] border border-white/42 bg-white/24 p-3">
      <IconBox><BriefcaseBusiness className="h-5 w-5" /></IconBox>
      <div className="min-w-0">
        <p className="text-[13px] font-semibold text-[#0a122d]">{props.item.title}</p>
        <p className="mt-0.5 text-[12px] font-medium text-[#33466d]">{props.item.company}</p>
        <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-medium text-[#526a9a]">
          {formatDates(props.item) ? <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{formatDates(props.item)}</span> : null}
          {props.item.location ? <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{props.item.location}</span> : null}
        </p>
        {props.item.bullets.length ? (
          <ul className="mt-2 list-disc space-y-1 pl-4 text-[12px] font-medium leading-5 text-[#263653]">
            {props.item.bullets.slice(0, 4).map((bullet) => <li key={bullet.id}>{bullet.text}</li>)}
          </ul>
        ) : null}
      </div>
      <RowActions onDelete={props.onDelete} onEdit={props.onEdit} />
    </div>
  );
}

function ProjectRow(props: { item: Project; onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="grid grid-cols-[44px_minmax(0,1fr)_32px] gap-3 rounded-[12px] border border-white/42 bg-white/24 p-3">
      <IconBox><BookOpen className="h-5 w-5" /></IconBox>
      <div className="min-w-0">
        <p className="text-[13px] font-semibold text-[#0a122d]">{props.item.name}</p>
        {props.item.description ? <p className="mt-1 text-[12px] font-medium leading-5 text-[#33466d]">{props.item.description}</p> : null}
        {props.item.tools?.length ? (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {props.item.tools.map((tool) => <span className="rounded-[6px] bg-white/58 px-2 py-1 text-[11px] font-medium text-[#263653]" key={tool}>{tool}</span>)}
          </div>
        ) : null}
      </div>
      <RowActions onDelete={props.onDelete} onEdit={props.onEdit} />
    </div>
  );
}

function SimpleRow(props: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  meta?: string;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="grid grid-cols-[44px_minmax(0,1fr)_32px] gap-3 rounded-[12px] border border-white/42 bg-white/24 p-3">
      <IconBox>{props.icon}</IconBox>
      <div className="min-w-0">
        <p className="text-[13px] font-semibold text-[#0a122d]">{props.title}</p>
        {props.subtitle ? <p className="mt-1 text-[12px] font-medium text-[#33466d]">{props.subtitle}</p> : null}
        {props.meta ? <p className="mt-1 text-[11px] font-medium text-[#526a9a]">{props.meta}</p> : null}
      </div>
      <RowActions onDelete={props.onDelete} onEdit={props.onEdit} />
    </div>
  );
}

function LinkChip(props: { item: ProfileLink; onEdit: () => void; onDelete: () => void }) {
  const Icon = props.item.type === "github" ? Globe : props.item.type === "linkedin" ? LinkIcon : Globe;
  return (
    <div className="inline-flex h-11 items-center gap-2 rounded-[9px] border border-white/66 bg-white/46 px-3 text-[12px] font-semibold text-[#102044] shadow-[inset_0_1px_0_rgba(255,255,255,0.82)]">
      <Icon className="h-4 w-4 text-[#1158ff]" />
      <span className="max-w-[150px] truncate">{props.item.label}</span>
      <RowActions openUrl={props.item.url} onDelete={props.onDelete} onEdit={props.onEdit} />
    </div>
  );
}

function IconBox(props: { children: React.ReactNode }) {
  return (
    <span className="grid h-10 w-10 place-items-center rounded-[9px] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.76),rgba(229,237,255,0.56))] text-[#31598f] shadow-[0_8px_16px_rgba(54,78,140,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]">
      {props.children}
    </span>
  );
}

function DetailTile(props: { label: string; value?: string }) {
  return (
    <div className="rounded-[10px] border border-white/42 bg-white/24 p-3">
      <p className="text-[11px] font-medium text-[#617294]">{props.label}</p>
      <p className="mt-1 text-[13px] font-semibold text-[#102044]">{props.value || "Not added"}</p>
    </div>
  );
}

function Field(props: {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-[12px] font-semibold text-[#263653]">{props.label}</span>
      {props.multiline ? (
        <textarea
          className="min-h-[86px] rounded-[9px] border border-[#d8e2f2] bg-white/78 px-3 py-2 text-[13px] font-medium leading-5 text-[#102044] outline-none focus:ring-4 focus:ring-blue-200/45"
          placeholder={props.placeholder}
          value={props.value}
          onChange={(event) => props.onChange(event.target.value)}
        />
      ) : (
        <input
          className="h-10 rounded-[9px] border border-[#d8e2f2] bg-white/78 px-3 text-[13px] font-medium text-[#102044] outline-none focus:ring-4 focus:ring-blue-200/45"
          placeholder={props.placeholder}
          value={props.value}
          onChange={(event) => props.onChange(event.target.value)}
        />
      )}
    </label>
  );
}

function ProfileModal(props: {
  modal: ModalState;
  profile: StructuredCareerProfile;
  onClose: () => void;
  onSave: (profile: StructuredCareerProfile) => void;
}) {
  if (!props.modal) return null;
  return (
    <Dialog open onOpenChange={(open) => !open && props.onClose()}>
      <DialogContent className="max-h-[86vh] overflow-y-auto rounded-[16px] border border-white/70 bg-[#f8fbff]/96 p-5 shadow-[0_24px_70px_rgba(35,51,93,0.22)] sm:max-w-[620px]">
        {props.modal.type === "identity" ? <IdentityForm {...props} /> : null}
        {props.modal.type === "experience" ? <ExperienceForm {...props} modal={props.modal} /> : null}
        {props.modal.type === "project" ? <ProjectForm {...props} modal={props.modal} /> : null}
        {props.modal.type === "education" ? <EducationForm {...props} modal={props.modal} /> : null}
        {props.modal.type === "credential" ? <CredentialForm {...props} modal={props.modal} /> : null}
        {props.modal.type === "link" ? <LinkForm {...props} modal={props.modal} /> : null}
        {props.modal.type === "career" ? <CareerForm {...props} /> : null}
      </DialogContent>
    </Dialog>
  );
}

function ModalSaveButton() {
  return (
    <button className="inline-flex h-10 items-center gap-2 rounded-[9px] bg-[#1158ff] px-4 text-[13px] font-semibold text-white shadow-[0_12px_28px_rgba(17,88,255,0.24)]" type="submit">
      <Save className="h-4 w-4" />
      Save
    </button>
  );
}

function IdentityForm(props: { profile: StructuredCareerProfile; onClose: () => void; onSave: (profile: StructuredCareerProfile) => void }) {
  const [fullName, setFullName] = useState(props.profile.basics.fullName);
  const [currentRole, setCurrentRole] = useState(props.profile.basics.currentRole);
  const [location, setLocation] = useState(props.profile.basics.location ?? "");
  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      props.onSave({ ...props.profile, basics: { ...props.profile.basics, fullName, currentRole, location } });
    }}>
      <ModalTitle title="Edit profile" />
      <div className="grid gap-3">
        <Field label="Full name" value={fullName} onChange={setFullName} />
        <Field label="Current role" value={currentRole} onChange={setCurrentRole} />
        <Field label="Location" value={location} onChange={setLocation} />
      </div>
      <ModalFooter onClose={props.onClose} />
    </form>
  );
}

function ExperienceForm(props: { modal: Extract<ModalState, { type: "experience" }>; profile: StructuredCareerProfile; onClose: () => void; onSave: (profile: StructuredCareerProfile) => void }) {
  const item = props.modal.item;
  const [title, setTitle] = useState(item?.title ?? "");
  const [company, setCompany] = useState(item?.company ?? "");
  const [location, setLocation] = useState(item?.location ?? "");
  const [startDate, setStartDate] = useState(item?.startDate ?? "");
  const [endDate, setEndDate] = useState(item?.endDate ?? "");
  const [isCurrent, setIsCurrent] = useState(Boolean(item?.isCurrent));
  const [bullets, setBullets] = useState((item?.bullets ?? []).map((bullet) => bullet.text).join("\n"));
  const [tools, setTools] = useState(joinList(item?.tools));
  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      const next: Experience = {
        id: item?.id ?? makeId("exp"),
        title,
        company,
        location,
        startDate,
        endDate: isCurrent ? "" : endDate,
        isCurrent,
        bullets: splitList(bullets).map((text, index) => ({ id: item?.bullets[index]?.id ?? makeId("bullet"), text })),
        tools: splitList(tools),
      };
      props.onSave({ ...props.profile, experiences: item ? props.profile.experiences.map((current) => current.id === item.id ? next : current) : [...props.profile.experiences, next] });
    }}>
      <ModalTitle title={item ? "Edit experience" : "Add experience"} />
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Title" value={title} onChange={setTitle} />
        <Field label="Company" value={company} onChange={setCompany} />
        <Field label="Location" value={location} onChange={setLocation} />
        <Field label="Start date" value={startDate} onChange={setStartDate} />
        <Field label="End date" value={endDate} onChange={setEndDate} />
        <label className="flex items-center gap-2 pt-6 text-[13px] font-semibold text-[#263653]">
          <input checked={isCurrent} type="checkbox" onChange={(event) => setIsCurrent(event.target.checked)} />
          Current role
        </label>
        <div className="sm:col-span-2"><Field multiline label="Bullets" placeholder="One bullet per line" value={bullets} onChange={setBullets} /></div>
        <div className="sm:col-span-2"><Field label="Tools" placeholder="Python, SQL, AWS" value={tools} onChange={setTools} /></div>
      </div>
      <ModalFooter onClose={props.onClose} />
    </form>
  );
}

function ProjectForm(props: { modal: Extract<ModalState, { type: "project" }>; profile: StructuredCareerProfile; onClose: () => void; onSave: (profile: StructuredCareerProfile) => void }) {
  const item = props.modal.item;
  const [name, setName] = useState(item?.name ?? "");
  const [description, setDescription] = useState(item?.description ?? "");
  const [bullets, setBullets] = useState((item?.bullets ?? []).map((bullet) => bullet.text).join("\n"));
  const [tools, setTools] = useState(joinList(item?.tools));
  const [links, setLinks] = useState((item?.links ?? []).map((link) => [link.label, link.url].filter(Boolean).join(" | ")).join("\n"));
  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      const next: Project = {
        id: item?.id ?? makeId("project"),
        name,
        description,
        bullets: splitList(bullets).map((text, index) => ({ id: item?.bullets?.[index]?.id ?? makeId("bullet"), text })),
        tools: splitList(tools),
        links: links.split(/\n/).map((line, index) => {
          const [label, url] = line.split("|").map((part) => part?.trim() ?? "");
          const resolvedUrl = url || label || "";
          return { id: item?.links?.[index]?.id ?? makeId("link"), label: url ? label : undefined, url: resolvedUrl };
        }).filter((link): link is { id: string; label: string | undefined; url: string } => Boolean(link.url)),
      };
      props.onSave({ ...props.profile, projects: item ? props.profile.projects.map((current) => current.id === item.id ? next : current) : [...props.profile.projects, next] });
    }}>
      <ModalTitle title={item ? "Edit project" : "Add project"} />
      <div className="grid gap-3">
        <Field label="Name" value={name} onChange={setName} />
        <Field multiline label="Description" value={description} onChange={setDescription} />
        <Field multiline label="Bullets" placeholder="One bullet per line" value={bullets} onChange={setBullets} />
        <Field label="Tools" value={tools} onChange={setTools} />
        <Field multiline label="Links" placeholder="Label | https://example.com" value={links} onChange={setLinks} />
      </div>
      <ModalFooter onClose={props.onClose} />
    </form>
  );
}

function EducationForm(props: { modal: Extract<ModalState, { type: "education" }>; profile: StructuredCareerProfile; onClose: () => void; onSave: (profile: StructuredCareerProfile) => void }) {
  const item = props.modal.item;
  const [institution, setInstitution] = useState(item?.institution ?? "");
  const [qualification, setQualification] = useState(item?.qualification ?? "");
  const [field, setField] = useState(item?.field ?? "");
  const [location, setLocation] = useState(item?.location ?? "");
  const [startDate, setStartDate] = useState(item?.startDate ?? "");
  const [endDate, setEndDate] = useState(item?.endDate ?? "");
  const [details, setDetails] = useState((item?.details ?? []).join("\n"));
  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      const next: Education = { id: item?.id ?? makeId("edu"), institution, qualification, field, location, startDate, endDate, details: splitList(details) };
      props.onSave({ ...props.profile, education: item ? props.profile.education.map((current) => current.id === item.id ? next : current) : [...props.profile.education, next] });
    }}>
      <ModalTitle title={item ? "Edit education" : "Add education"} />
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Institution" value={institution} onChange={setInstitution} />
        <Field label="Qualification" value={qualification} onChange={setQualification} />
        <Field label="Field" value={field} onChange={setField} />
        <Field label="Location" value={location} onChange={setLocation} />
        <Field label="Start date" value={startDate} onChange={setStartDate} />
        <Field label="End date" value={endDate} onChange={setEndDate} />
        <div className="sm:col-span-2"><Field multiline label="Details" value={details} onChange={setDetails} /></div>
      </div>
      <ModalFooter onClose={props.onClose} />
    </form>
  );
}

function CredentialForm(props: { modal: Extract<ModalState, { type: "credential" }>; profile: StructuredCareerProfile; onClose: () => void; onSave: (profile: StructuredCareerProfile) => void }) {
  const item = props.modal.item;
  const [name, setName] = useState(item?.name ?? "");
  const [issuer, setIssuer] = useState(item?.issuer ?? "");
  const [type, setType] = useState<NonNullable<Credential["type"]>>(item?.type ?? "certification");
  const [issueDate, setIssueDate] = useState(item?.issueDate ?? "");
  const [expiryDate, setExpiryDate] = useState(item?.expiryDate ?? "");
  const [credentialId, setCredentialId] = useState(item?.credentialId ?? "");
  const [url, setUrl] = useState(item?.url ?? "");
  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      const next: Credential = { id: item?.id ?? makeId("cred"), name, issuer, type: type as Credential["type"], issueDate, expiryDate, credentialId, url };
      props.onSave({ ...props.profile, credentials: item ? props.profile.credentials.map((current) => current.id === item.id ? next : current) : [...props.profile.credentials, next] });
    }}>
      <ModalTitle title={item ? "Edit certification" : "Add certification"} />
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Name" value={name} onChange={setName} />
        <Field label="Issuer" value={issuer} onChange={setIssuer} />
        <label className="grid gap-1.5">
          <span className="text-[12px] font-semibold text-[#263653]">Type</span>
          <select className="h-10 rounded-[9px] border border-[#d8e2f2] bg-white/78 px-3 text-[13px] font-medium text-[#102044]" value={type} onChange={(event) => setType(event.target.value as NonNullable<Credential["type"]>)}>
            {["certification", "licence", "credential", "award", "other"].map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
        <Field label="Issue date" value={issueDate} onChange={setIssueDate} />
        <Field label="Expiry date" value={expiryDate} onChange={setExpiryDate} />
        <Field label="Credential ID" value={credentialId} onChange={setCredentialId} />
        <div className="sm:col-span-2"><Field label="URL" value={url} onChange={setUrl} /></div>
      </div>
      <ModalFooter onClose={props.onClose} />
    </form>
  );
}

function LinkForm(props: { modal: Extract<ModalState, { type: "link" }>; profile: StructuredCareerProfile; onClose: () => void; onSave: (profile: StructuredCareerProfile) => void }) {
  const item = props.modal.item;
  const [label, setLabel] = useState(item?.label ?? "");
  const [url, setUrl] = useState(item?.url ?? "");
  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      const next: ProfileLink = { id: item?.id ?? makeId("link"), label: label || "Website", url, type: item?.type ?? detectLinkType(url) };
      props.onSave({ ...props.profile, links: item ? props.profile.links.map((current) => current.id === item.id ? next : current) : [...props.profile.links, next] });
    }}>
      <ModalTitle title={item ? "Edit link" : "Add link"} />
      <div className="grid gap-3">
        <Field label="Label" value={label} onChange={setLabel} />
        <Field label="URL" value={url} onChange={setUrl} />
      </div>
      <ModalFooter onClose={props.onClose} />
    </form>
  );
}

function CareerForm(props: { profile: StructuredCareerProfile; onClose: () => void; onSave: (profile: StructuredCareerProfile) => void }) {
  const [yearsOfExperience, setYearsOfExperience] = useState(props.profile.careerDetails.yearsOfExperience ?? "");
  const [targetRoles, setTargetRoles] = useState(joinList(props.profile.careerDetails.targetRoles));
  const [industriesOfInterest, setIndustriesOfInterest] = useState(joinList(props.profile.careerDetails.industriesOfInterest));
  const [preferredLocations, setPreferredLocations] = useState(joinList(props.profile.careerDetails.preferredLocations));
  const [openToRemote, setOpenToRemote] = useState(Boolean(props.profile.careerDetails.openToRemote));
  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      props.onSave({ ...props.profile, careerDetails: { yearsOfExperience, targetRoles: splitList(targetRoles), industriesOfInterest: splitList(industriesOfInterest), preferredLocations: splitList(preferredLocations), openToRemote } });
    }}>
      <ModalTitle title="Edit career details" />
      <div className="grid gap-3">
        <Field label="Years of experience" value={yearsOfExperience} onChange={setYearsOfExperience} />
        <Field label="Target roles" value={targetRoles} onChange={setTargetRoles} />
        <Field label="Industries of interest" value={industriesOfInterest} onChange={setIndustriesOfInterest} />
        <Field label="Preferred locations" value={preferredLocations} onChange={setPreferredLocations} />
        <label className="flex items-center gap-2 text-[13px] font-semibold text-[#263653]">
          <input checked={openToRemote} type="checkbox" onChange={(event) => setOpenToRemote(event.target.checked)} />
          Open to remote
        </label>
      </div>
      <ModalFooter onClose={props.onClose} />
    </form>
  );
}

function ModalTitle(props: { title: string }) {
  return (
    <DialogHeader className="mb-4">
      <DialogTitle className="text-[18px] font-semibold text-[#081543]">{props.title}</DialogTitle>
    </DialogHeader>
  );
}

function ModalFooter(props: { onClose: () => void }) {
  return (
    <DialogFooter className="mt-5 border-[#dce5f2] bg-transparent p-0">
      <button className="h-10 rounded-[9px] border border-[#d8e2f2] bg-white px-4 text-[13px] font-semibold text-[#33466d]" type="button" onClick={props.onClose}>
        Cancel
      </button>
      <ModalSaveButton />
    </DialogFooter>
  );
}
