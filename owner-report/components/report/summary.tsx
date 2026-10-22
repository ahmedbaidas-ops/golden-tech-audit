import { cn } from "@/lib/utils"
import { stats, summary, areaScores, issueSplit } from "@/constants/audit"
import { scoreTone, toneBg, toneFill, toneText } from "@/lib/tone"
import { Section } from "./section"

export function Summary() {
  return (
    <Section id="summary" title="الملخص">
      <div className="rounded-lg border bg-(--gold-soft) p-5 sm:p-6">
        <p className="text-lg text-muted-foreground">{summary.greeting}</p>
        <p className="mt-3 text-xl leading-relaxed font-semibold text-balance sm:text-2xl">
          {summary.headline}
        </p>
      </div>

      <div className="grid grid-cols-1 divide-y divide-border rounded-lg border bg-card sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-x-reverse">
        {stats.map((item, i) => (
          <div
            key={item.title}
            className={cn(
              "flex flex-col gap-2 p-5",
              i < 2 && "sm:border-b lg:border-b-0",
              i % 2 === 0 && "sm:border-e lg:border-e-0"
            )}
          >
            <span className="text-base text-muted-foreground">{item.title}</span>
            <div className="flex items-baseline gap-2">
              <span
                className={cn(
                  "text-5xl font-bold tracking-tight tabular-nums",
                  toneText[item.tone]
                )}
              >
                {item.value}
              </span>
              {item.unit && (
                <span className="text-lg text-muted-foreground">{item.unit}</span>
              )}
            </div>
            <span
              className={cn(
                "w-fit rounded-md px-2 py-0.5 text-base font-medium",
                toneBg[item.tone],
                toneText[item.tone]
              )}
            >
              {item.note}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col divide-y divide-border rounded-lg border bg-card lg:flex-row lg:divide-x lg:divide-x-reverse lg:divide-y-0">
        <div className="flex-1 p-5">
          <h3 className="text-lg font-semibold">تقييم كل جزء من الموقع</h3>
          <p className="text-base text-muted-foreground">
            من 100. الأخضر جيد، البرتقالي يحتاج تحسيناً، الأحمر يحتاج اهتماماً.
          </p>
          <ul className="mt-4 space-y-3">
            {areaScores.map((a) => {
              const tone = scoreTone(a.score)
              return (
                <li
                  key={a.name}
                  className="grid grid-cols-[minmax(9rem,13rem)_1fr_3rem] items-center gap-3"
                >
                  <span className="text-base">{a.name}</span>
                  <span className="h-4 overflow-hidden rounded-full bg-muted">
                    <span
                      className={cn("block h-full rounded-full", toneFill[tone])}
                      style={{ width: `${a.score}%` }}
                    />
                  </span>
                  <span
                    className={cn(
                      "text-end text-lg font-bold tabular-nums",
                      toneText[tone]
                    )}
                  >
                    {a.score}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="w-full shrink-0 p-5 lg:w-96">
          <h3 className="text-lg font-semibold">كل الملاحظات</h3>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-4xl font-bold tabular-nums">{issueSplit.total}</span>
            <span className="text-base text-muted-foreground">ملاحظة</span>
          </div>
          <div className="mt-4 flex h-4 w-full gap-0.5 overflow-hidden rounded-md">
            {issueSplit.segments.map((s) => (
              <span
                key={s.label}
                className={cn(
                  "h-full",
                  s.tone === "muted" ? "bg-neutral-300" : toneFill[s.tone]
                )}
                style={{ width: `${(100 * s.value) / issueSplit.total}%` }}
              />
            ))}
          </div>
          <ul className="mt-3 flex flex-wrap gap-4 text-base">
            {issueSplit.segments.map((s) => (
              <li key={s.label} className="flex items-center gap-2">
                <span
                  className={cn(
                    "size-3 rounded-sm",
                    s.tone === "muted" ? "bg-neutral-300" : toneFill[s.tone]
                  )}
                />
                {s.label}: <b className="tabular-nums">{s.value}</b>
              </li>
            ))}
          </ul>
          <table className="mt-5 w-full text-base">
            <thead>
              <tr className="text-sm text-muted-foreground">
                <th className="pb-2 text-start font-normal">أين؟</th>
                <th className="pb-2 text-center font-normal">الكل</th>
                <th className="pb-2 text-center font-normal">عاجل ومهم</th>
              </tr>
            </thead>
            <tbody>
              {issueSplit.byStage.map((r) => (
                <tr key={r.stage} className="h-11 border-t">
                  <td>{r.stage}</td>
                  <td className="text-center tabular-nums">{r.all}</td>
                  <td className="text-center font-semibold text-(--warn) tabular-nums">
                    {r.important}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  )
}
