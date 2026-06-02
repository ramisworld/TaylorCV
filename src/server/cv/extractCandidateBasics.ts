import "server-only";

import type { DeterministicCandidateBasics } from "./cvSchemas";

const headingPattern =
  /^(summary|profile|experience|employment|work experience|projects|selected projects|education|certifications|licenses|licences|skills|technical skills|portfolio|awards|publications|volunteering)$/i;

function unique(values: string[], maxItems: number) {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))].slice(0, maxItems);
}

function firstMatch(pattern: RegExp, text: string) {
  const match = text.match(pattern);
  return match?.[0] ?? null;
}

function normalizeUrl(url: string) {
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
}

function classifyUrl(url: string) {
  const normalized = normalizeUrl(url);
  if (/linkedin\.com/i.test(normalized)) return "linkedin";
  if (/github\.com/i.test(normalized)) return "github";
  if (
    !/linkedin\.com|github\.com/i.test(normalized) &&
    /portfolio|site|dev|app|io|me|design|studio/i.test(normalized)
  ) {
    return "portfolio";
  }
  return "other";
}

function possibleNameFromText(text: string) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 8);

  for (const line of lines) {
    if (line.length < 3 || line.length > 60) continue;
    if (/@|https?:\/\/|\d{2,}|curriculum vitae|resume/i.test(line)) continue;
    if (!/^[A-Za-z][A-Za-z .'-]+$/.test(line)) continue;
    const words = line.split(/\s+/).filter(Boolean);
    if (words.length >= 2 && words.length <= 4) return line;
  }

  return null;
}

export function extractCandidateBasics(rawCvText: string): DeterministicCandidateBasics {
  const email = firstMatch(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i, rawCvText);
  const phone =
    firstMatch(
      /(?:\+\d{1,3}[\s()-]*)?(?:\d[\s()-]*){7,}\d/g,
      rawCvText
    )?.replace(/\s+/g, " ") ?? null;
  const rawUrls = unique(
    [...rawCvText.matchAll(/(?:https?:\/\/)?(?:www\.)?[A-Za-z0-9.-]+\.[A-Za-z]{2,}(?:\/[^\s)]*)?/g)].map(
      (match) => match[0] ?? ""
    ),
    20
  );

  let linkedin: string | null = null;
  let github: string | null = null;
  let portfolio: string | null = null;
  const otherUrls: string[] = [];

  for (const url of rawUrls) {
    const normalized = normalizeUrl(url);
    const type = classifyUrl(normalized);
    if (type === "linkedin" && !linkedin) {
      linkedin = normalized;
      continue;
    }
    if (type === "github" && !github) {
      github = normalized;
      continue;
    }
    if (type === "portfolio" && !portfolio) {
      portfolio = normalized;
      continue;
    }
    otherUrls.push(normalized);
  }

  const sectionHeadings = unique(
    rawCvText
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => headingPattern.test(line))
      .map((line) => line.replace(/[:|-]+$/, "")),
    12
  );

  return {
    possibleName: possibleNameFromText(rawCvText),
    email,
    phone,
    linkedin,
    github,
    portfolio,
    otherUrls: unique(otherUrls, 12),
    sectionHeadings,
  };
}
