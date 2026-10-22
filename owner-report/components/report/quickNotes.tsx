import { quickNotes } from "@/constants/audit"
import { Section } from "./section"

export function QuickNotes() {
  return (
    <Section
      id="notes"
      title="ملاحظات سريعة"
      intro="أمور أصغر، أغلبها يُصلح في يوم أو يومين. الصور من صفحتكم الرئيسية بالعربي."
    >
      <ul className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {quickNotes.map((n, i) => (
          <li key={i} className="flex flex-col gap-3 rounded-lg border bg-card p-4">
            <p className="text-lg">
              <span className="me-2 font-bold text-(--gold) tabular-nums">{i + 1}.</span>
              {n.text}
            </p>
            {n.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={n.image.src}
                alt={n.image.alt}
                loading="lazy"
                className="max-h-72 w-full rounded-md border object-contain"
              />
            )}
          </li>
        ))}
      </ul>
    </Section>
  )
}
