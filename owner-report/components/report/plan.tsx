import { plan, method, methodNote } from "@/constants/audit"
import { Section } from "./section"

export function Plan() {
  return (
    <Section
      id="plan"
      title="خطة العمل المقترحة"
      intro="نبدأ بتصحيح ما يقرؤه الزبون قبل أي تصميم جديد، لأنه الأسرع أثراً."
    >
      <ol className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {plan.map((p) => (
          <li key={p.phase} className="flex flex-col rounded-lg border bg-card">
            <div className="border-b px-5 py-4">
              <p className="text-base font-semibold text-(--gold)">
                {p.phase} · {p.when}
              </p>
              <h3 className="text-xl font-bold">{p.title}</h3>
            </div>
            <ul className="flex-1 space-y-2 px-5 py-4">
              {p.items.map((it) => (
                <li key={it} className="flex gap-2 text-lg">
                  <span className="mt-3 size-2 shrink-0 rounded-full bg-(--gold)" />
                  {it}
                </li>
              ))}
            </ul>
            <div className="m-4 mt-0 rounded-md bg-(--good-soft) p-3">
              <p className="text-base font-semibold text-(--good)">ماذا ستلاحظون</p>
              <p className="text-lg">{p.result}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}

export function Method() {
  return (
    <Section id="method" title="كيف أعددنا هذا التقرير">
      <div className="rounded-lg border bg-card p-5">
        <ul className="space-y-2">
          {method.map((m) => (
            <li key={m} className="flex gap-2 text-lg">
              <span className="mt-3 size-2 shrink-0 rounded-full bg-foreground/50" />
              {m}
            </li>
          ))}
        </ul>
        <p className="mt-4 rounded-md bg-muted p-3 text-base text-muted-foreground">
          {methodNote}
        </p>
      </div>
    </Section>
  )
}
