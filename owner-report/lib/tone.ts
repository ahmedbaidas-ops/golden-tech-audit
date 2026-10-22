import type { Tone } from "@/constants/audit"

export const toneText: Record<Tone, string> = {
  good: "text-(--good)",
  warn: "text-(--warn)",
  bad: "text-(--bad)",
}

export const toneBg: Record<Tone, string> = {
  good: "bg-(--good-soft)",
  warn: "bg-(--warn-soft)",
  bad: "bg-(--bad-soft)",
}

export const toneFill: Record<Tone, string> = {
  good: "bg-(--good)",
  warn: "bg-(--warn)",
  bad: "bg-(--bad)",
}

export function scoreTone(score: number): Tone {
  if (score >= 70) return "good"
  if (score >= 40) return "warn"
  return "bad"
}
