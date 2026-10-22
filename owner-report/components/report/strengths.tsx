import { ThumbsUpIcon } from "@hugeicons/core-free-icons"
import { strengths } from "@/constants/audit"
import { Card, IconTile, Section } from "./section"

export function Strengths() {
  return (
    <Section
      id="strengths"
      n={2}
      icon={ThumbsUpIcon}
      title="نقاط القوة"
      intro="هذه أشياء يتقنها موقعكم اليوم، وسنحافظ عليها في أي تطوير."
    >
      <Card className="p-5 sm:p-8">
        <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 xl:grid-cols-3">
          {strengths.map((s) => (
            <li key={s.key} className="flex gap-4">
              <IconTile name={s.key} tone="good" />
              <div className="min-w-0">
                <p className="text-lg leading-snug font-semibold">{s.title}</p>
                <p className="mt-1 text-base text-(--ink-muted)">{s.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </Section>
  )
}
