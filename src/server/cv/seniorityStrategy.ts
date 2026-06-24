import type { Seniority } from "./agentSchemas";

export const senioritySectionOrder: Record<Seniority, string[]> = {
  intern: ["education", "projects", "skills", "experience"],
  junior: ["summary", "experience", "projects", "skills", "education"],
  intermediate: ["summary", "experience", "skills", "projects", "education"],
  senior: ["summary", "experience", "skills", "education"],
  research: ["publications", "experience", "projects", "education"],
};

export function sectionOrderForSeniority(seniority: Seniority) {
  return senioritySectionOrder[seniority];
}

export function strategyBlockForSeniority(seniority: Seniority) {
  const order = sectionOrderForSeniority(seniority).join(" -> ");

  if (seniority === "intern") {
    return `Seniority strategy: intern. Use section order ${order}. Lead with education and practical projects. Experience is optional and should not be inflated.`;
  }
  if (seniority === "junior") {
    return `Seniority strategy: junior. Use section order ${order}. Keep the summary short, show real work first, then separate projects clearly.`;
  }
  if (seniority === "intermediate") {
    return `Seniority strategy: intermediate. Use section order ${order}. Lead with work impact, keep projects only when they add role-relevant proof.`;
  }
  if (seniority === "senior") {
    return `Seniority strategy: senior. Use section order ${order}. Experience must be impact-led. Include projects only when flagship-level and directly relevant.`;
  }

  return `Seniority strategy: research. Use section order ${order}. Lead with publications only when the profile contains real publications. Keep research proof clear and evidence-backed.`;
}
