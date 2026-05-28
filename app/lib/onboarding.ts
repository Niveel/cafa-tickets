import { promises as fs } from "fs";
import path from "path";

export interface OnboardingContent {
  title: string;
  paragraphs: string[];
}

const ONBOARDING_FILE_PATH = path.join(process.cwd(), "docs", "onboard.txt");

const FALLBACK_TITLE = "How Cafa Tickets Helps People Find and Attend Local Events";

function normalizeText(rawText: string): string {
  return rawText
    .replace(/â€™/g, "'")
    .replace(/â€œ|â€/g, '"')
    .replace(/â€“/g, "-")
    .replace(/â€”/g, "-")
    .replace(/â€¦/g, "...")
    .replace(/â€‹/g, "")
    .trim();
}

export async function getOnboardingContent(): Promise<OnboardingContent> {
  const rawText = await fs.readFile(ONBOARDING_FILE_PATH, "utf-8");
  const normalized = normalizeText(rawText);
  const lines = normalized
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.length) {
    return { title: FALLBACK_TITLE, paragraphs: [] };
  }

  const [title, ...paragraphs] = lines;
  return { title: title || FALLBACK_TITLE, paragraphs };
}
