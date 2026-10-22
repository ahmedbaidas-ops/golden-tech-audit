import { cn } from "@/lib/utils"
import { journey } from "@/constants/audit"
import { toneFill } from "@/lib/tone"
import { Section } from "./section"

export function Journey() {
  return (
    <Section
      id="journey"
      title="رحلة الزبون في موقعكم"
      intro="هذه الخطوات التي مشيناها كزبون يريد شراء جهاز ألعاب. اللون الأحمر يعني أن الزبون قد يتوقف هنا."
    >
      <div className="flex flex-wrap gap-2 rounded-lg border bg-card p-4" aria-hidden="true">
        {journey.map((s) => (
          <a
            key={s.n}
            href={`#step-${s.n}`}
            className="flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-base hover:bg-muted"
          >
            <span
              className={cn(
                "grid size-7 place-items-center rounded-full text-sm font-bold text-white tabular-nums",
                toneFill[s.tone]
              )}
            >
              {s.n}
            </span>
            {s.title}
          </a>
        ))}
      </div>

      <ol className="relative space-y-4 border-s-2 border-border ps-6">
        {journey.map((s) => (
          <li key={s.n} id={`step-${s.n}`} className="relative scroll-mt-4">
            <span
              className={cn(
                "absolute -start-[2.45rem] top-4 grid size-9 place-items-center rounded-full text-lg font-bold text-white ring-4 ring-background tabular-nums",
                toneFill[s.tone]
              )}
            >
              {s.n}
            </span>
            <div className="rounded-lg border bg-card p-5">
              <h3 className="text-xl font-bold">{s.title}</h3>
              <p className="text-lg text-muted-foreground">{s.did}</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="rounded-md bg-(--good-soft) p-3">
                  <p className="text-base font-semibold text-(--good)">الجيد</p>
                  <p className="text-lg">{s.good}</p>
                </div>
                <div className="rounded-md bg-(--bad-soft) p-3">
                  <p className="text-base font-semibold text-(--bad)">المشكلة</p>
                  <p className="text-lg">{s.problem}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
