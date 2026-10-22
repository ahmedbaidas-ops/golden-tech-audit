import { cn } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  CheckmarkCircle02Icon,
  CancelCircleIcon,
  MinusSignCircleIcon,
} from "@hugeicons/core-free-icons"
import { competitors, priceCompare, type Mark } from "@/constants/audit"
import { Section } from "./section"

const MARK: Record<Mark, { icon: typeof CheckmarkCircle02Icon | null; cls: string; label: string }> = {
  yes: { icon: CheckmarkCircle02Icon, cls: "text-(--good)", label: "نعم" },
  no: { icon: CancelCircleIcon, cls: "text-(--bad)", label: "لا" },
  partial: { icon: MinusSignCircleIcon, cls: "text-(--warn)", label: "جزئياً" },
  na: { icon: null, cls: "text-muted-foreground", label: "لم نتحقق" },
}

export function Competitors() {
  const max = Math.max(...priceCompare.rows.map((r) => r.price))
  return (
    <Section
      id="competitors"
      title="مقارنة بالمنافسين"
      intro="من صفحات المنافسين الرسمية. علامة ✓ تعني أن الخدمة متوفرة وواضحة."
    >
      <div className="relative overflow-x-auto rounded-lg border bg-card">
        <table className="w-full min-w-[46rem] text-base">
          <thead>
            <tr className="border-b bg-muted/60">
              <th className="px-4 py-3 text-start font-semibold">الخدمة</th>
              {competitors.columns.map((c, i) => (
                <th
                  key={c}
                  className={cn(
                    "px-3 py-3 text-center font-semibold",
                    i === 0 && "bg-(--gold-soft)"
                  )}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {competitors.rows.map((r) => (
              <tr key={r.label} className="border-b last:border-b-0">
                <td className="px-4 py-3 font-medium">{r.label}</td>
                {r.cells.map((c, i) => {
                  const m = MARK[c.mark]
                  return (
                    <td
                      key={i}
                      className={cn("px-3 py-3 text-center align-top", i === 0 && "bg-(--gold-soft)/60")}
                    >
                      <span className={cn("inline-flex items-center gap-1 font-semibold", m.cls)}>
                        {m.icon ? (
                          <HugeiconsIcon icon={m.icon} className="size-5" />
                        ) : (
                          "—"
                        )}
                        <span>{m.label}</span>
                      </span>
                      {c.note && (
                        <span className="mt-1 block text-sm text-muted-foreground">
                          {c.note}
                        </span>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-lg border bg-card p-5">
        <h3 className="text-lg font-semibold">نفس المنتج في متاجر أخرى</h3>
        <p className="text-base text-muted-foreground">
          {priceCompare.product} · بالريال شامل الضريبة
        </p>
        <ul className="mt-4 space-y-3">
          {priceCompare.rows.map((r) => (
            <li
              key={r.store}
              className="grid grid-cols-[minmax(8rem,11rem)_1fr_4.5rem] items-center gap-3"
            >
              <span className={cn("text-base", r.mine && "font-bold")}>{r.store}</span>
              <span className="h-5 overflow-hidden rounded-full bg-muted">
                <span
                  className={cn(
                    "block h-full rounded-full",
                    r.mine ? "bg-(--gold)" : "bg-neutral-400"
                  )}
                  style={{ width: `${(100 * r.price) / max}%` }}
                />
              </span>
              <span className="text-end text-lg font-bold tabular-nums">
                {r.price.toLocaleString("en-US")}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-base text-muted-foreground">
          سعركم أعلى بـ 375 ريالاً من إكسترا و200 ريال من جرير لهذا الجهاز.
        </p>
      </div>
    </Section>
  )
}
