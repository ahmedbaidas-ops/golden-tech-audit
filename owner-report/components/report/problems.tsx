import { cn } from "@/lib/utils"
import { problems, type Problem } from "@/constants/audit"
import { toneText } from "@/lib/tone"
import { Section } from "./section"

function Urgency({ value }: { value: Problem["urgency"] }) {
  const bad = value === "عاجل"
  return (
    <span
      className={cn(
        "rounded-md px-2.5 py-0.5 text-base font-semibold",
        bad ? "bg-(--bad-soft) text-(--bad)" : "bg-(--warn-soft) text-(--warn)"
      )}
    >
      {value}
    </span>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-4">
      <dt className="text-base font-semibold text-muted-foreground">{label}</dt>
      <dd className="text-lg">{children}</dd>
    </div>
  )
}

export function Problems() {
  return (
    <Section
      id="problems"
      title="أهم 8 ملاحظات"
      intro="رتّبناها من الأهم. لكل ملاحظة: ماذا يرى الزبون، ولماذا هذا مهم، وما الحل."
    >
      <ol className="space-y-4">
        {problems.map((p) => (
          <li key={p.id} className="rounded-lg border bg-card">
            <div className="flex flex-wrap items-center gap-3 border-b px-5 py-4">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-foreground text-lg font-bold text-background tabular-nums">
                {p.id}
              </span>
              <h3 className="flex-1 text-xl font-bold text-balance">{p.title}</h3>
              <Urgency value={p.urgency} />
            </div>

            <dl className="space-y-4 px-5 py-4">
              <Row label="ماذا يرى الزبون">{p.sees}</Row>

              {p.compare && (
                <div
                  className={cn(
                    "grid gap-3",
                    p.compare.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"
                  )}
                >
                  {p.compare.map((c, i) => (
                    <div
                      key={c.label}
                      className={cn(
                        "rounded-md border p-4",
                        i === 0 ? "bg-(--warn-soft)" : "bg-muted"
                      )}
                    >
                      <p className="text-base font-semibold text-muted-foreground">
                        {c.label}
                      </p>
                      <p className="mt-1 text-lg font-medium">«{c.text}»</p>
                    </div>
                  ))}
                </div>
              )}

              {p.table && (
                <div className="max-w-md rounded-md border">
                  <table className="w-full text-lg">
                    <tbody>
                      {p.table.map((r) => (
                        <tr key={r.label} className="border-b last:border-b-0">
                          <td className="px-4 py-2">{r.label}</td>
                          <td
                            className={cn(
                              "px-4 py-2 text-end tabular-nums",
                              r.strong && "font-bold",
                              r.tone && cn("font-semibold", toneText[r.tone])
                            )}
                          >
                            <span dir="ltr">{r.value}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {p.swatches && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {p.swatches.map((s) => (
                    <figure key={s.label} className="m-0 space-y-1">
                      <span
                        className="grid h-12 place-items-center rounded-md text-base font-semibold"
                        style={{ background: s.bg, color: s.fg }}
                        dir="auto"
                      >
                        {s.label}
                      </span>
                      <figcaption className="text-sm text-muted-foreground">
                        {s.where}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}

              {p.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.image.src}
                  alt={p.image.alt}
                  className="w-full max-w-3xl rounded-md border"
                />
              )}

              <Row label="لماذا هذا مهم">{p.why}</Row>
              <div className="rounded-md border-s-4 border-(--good) bg-(--good-soft) p-4">
                <p className="text-base font-semibold text-(--good)">الحل</p>
                <p className="text-lg">{p.fix}</p>
              </div>
            </dl>
          </li>
        ))}
      </ol>
    </Section>
  )
}
