import { HugeiconsIcon } from "@hugeicons/react"
import { CheckmarkCircle02Icon } from "@hugeicons/core-free-icons"
import { strengths } from "@/constants/audit"
import { Section } from "./section"

export function Strengths() {
  return (
    <Section
      id="strengths"
      title="ما يعمل جيداً في موقعكم"
      intro="هذه نقاط قوة حقيقية. أي تطوير قادم يجب أن يحافظ عليها."
    >
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {strengths.map((s) => (
          <li key={s.title} className="flex gap-3 rounded-lg border bg-card p-4">
            <HugeiconsIcon
              icon={CheckmarkCircle02Icon}
              className="mt-1 size-6 shrink-0 text-(--good)"
            />
            <div>
              <p className="text-lg font-semibold">{s.title}</p>
              <p className="text-base text-muted-foreground">{s.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
