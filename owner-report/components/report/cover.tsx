import { report, summary, stats } from "@/constants/audit"
import { cn } from "@/lib/utils"
import { toneFill, toneText } from "@/lib/tone"
import { Card, GoldRule, IconTile } from "./section"

// مقياس نصف دائري يبدأ من اليمين (اتجاه القراءة العربية).
// الحزام الخارجي يبيّن حدود التقييم نفسها المستخدمة في التقرير: أقل من 40، من 40 إلى 69، 70 فأكثر.
function Gauge({ value }: { value: number }) {
  const arc = "M 180 100 A 80 80 0 0 0 20 100"
  const band = "M 194 100 A 94 94 0 0 0 6 100"
  const a = Math.PI * (value / 100)
  const mx = 100 + 80 * Math.cos(a)
  const my = 100 - 80 * Math.sin(a)
  return (
    <div className="relative mx-auto w-full max-w-[17rem]" role="img" aria-label={`درجة الموقع ${value} من 100`}>
      <svg viewBox="0 0 200 112" className="w-full" aria-hidden="true">
        <path d={band} pathLength={100} fill="none" stroke="var(--bad)" strokeWidth="4" strokeDasharray="39.4 100" />
        <path d={band} pathLength={100} fill="none" stroke="var(--warn)" strokeWidth="4" strokeDasharray="0 40.3 29.1 100" />
        <path d={band} pathLength={100} fill="none" stroke="var(--good)" strokeWidth="4" strokeDasharray="0 70.3 29.7 100" />
        <path d={arc} fill="none" stroke="var(--sunken)" strokeWidth="18" strokeLinecap="round" />
        <path d={arc} pathLength={100} fill="none" stroke="var(--navy)" strokeWidth="18" strokeLinecap="round" strokeDasharray={`${value} 100`} />
        <circle cx={mx} cy={my} r="5" fill="var(--on-navy-gold)" stroke="var(--navy)" strokeWidth="2" />
      </svg>
      <span className="absolute -bottom-7 right-[6%] text-[0.9rem] text-(--ink-muted)">0</span>
      <span className="absolute -bottom-7 left-[4%] text-[0.9rem] text-(--ink-muted)">100</span>
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center leading-none">
        <span className="text-[3.4rem] font-bold tracking-tight text-(--ink) tabular-nums">{value}</span>
        <span className="mt-1 text-base text-(--ink-muted)">من 100</span>
      </div>
    </div>
  )
}

const legend = [
  { tone: "bad", label: "يحتاج اهتماماً", range: "أقل من 40" },
  { tone: "warn", label: "يحتاج تحسيناً", range: "من 40 إلى 69" },
  { tone: "good", label: "جيد", range: "70 فأكثر" },
] as const

export function Cover() {
  return (
    <section id="summary" aria-labelledby="summary-title" className="scroll-mt-6">
      <div className="cover relative overflow-hidden rounded-[1.5rem] bg-(--navy) px-6 pt-8 pb-24 text-(--on-navy) sm:px-12 sm:pt-12 sm:pb-28">
        <div aria-hidden="true" className="cover-lines" />
        <div aria-hidden="true" className="cover-seal">
          <span className="text-[2rem] leading-none font-bold">{report.years}</span>
          <span className="text-[0.9rem]">عاماً</span>
        </div>
        <div className="relative max-w-[44rem]">
          <p className="text-base text-(--on-navy-muted)">
            القسم 1 من 5 · تقرير تجربة الزبون · {report.date}
          </p>
          <h1 id="summary-title" className="mt-2 text-[2.2rem] leading-tight font-bold text-(--on-navy-gold) sm:text-[2.8rem]">
            {report.store}
          </h1>
          <p className="mt-1 text-base text-(--on-navy-muted)">
            <bdi>{report.site}</bdi>
          </p>
          <GoldRule className="gold-rule--on-navy mt-5" />
          <p className="mt-5 text-lg text-(--on-navy-muted)">{summary.greeting}</p>
          <p className="mt-3 text-[1.25rem] leading-[1.85] font-medium sm:text-[1.375rem]">{summary.headline}</p>
        </div>
      </div>

      <Card className="relative mx-3 -mt-16 grid gap-6 rounded-[1.5rem] p-5 shadow-(--shadow-raised) sm:mx-8 sm:p-8 lg:grid-cols-[17rem_1fr] lg:gap-10">
        <div className="flex flex-col items-center gap-3">
          <p className="text-lg font-semibold">درجة الموقع</p>
          <div className="mb-6 w-full">
            <Gauge value={summary.score} />
          </div>
          <p className="rounded-full bg-(--warn-soft) px-4 py-1 text-base font-semibold text-(--warn)">
            {summary.scoreNote}
          </p>
          <ul className="w-full space-y-1 text-[0.95rem]">
            {legend.map((l) => (
              <li key={l.tone} className="flex items-center gap-2">
                <span className={cn("size-3 rounded-full", toneFill[l.tone])} />
                <span className="font-semibold">{l.label}</span>
                <span className="ms-auto text-(--ink-muted)">{l.range}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-center gap-4">
          <ul className="grid gap-3">
            {stats.map((s) => (
              <li key={s.key} className="flex items-center gap-3 rounded-2xl bg-(--paper) p-3 sm:gap-4 sm:p-4">
                <IconTile name={s.key} tone={s.tone} size="lg" className="max-sm:size-11 max-sm:[&_svg]:size-6" />
                <span className={cn("w-12 shrink-0 text-center text-[2.1rem] leading-none font-bold tabular-nums sm:w-14 sm:text-[2.4rem]", toneText[s.tone])}>
                  {s.value}
                </span>
                <span className="min-w-0">
                  <span className="block text-lg font-semibold">{s.title}</span>
                  <span className="block text-base text-(--ink-muted)">{s.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="من أين تبدؤون" className="border-t border-dashed border-(--line-strong) pt-5 lg:col-span-2">
          <p className="text-lg font-semibold">من أين تبدؤون؟</p>
          <ol className="mt-3 grid gap-3 sm:grid-cols-3">
            {[
              ["#problems", "أهم 8 أمور للإصلاح", "مع صورة كل مشكلة"],
              ["#plan", "خطة العمل", "ثلاث مراحل"],
              ["#details", "التفاصيل والمصادر", "لمن يريد أن يتعمّق"],
            ].map(([href, label, hint], i) => (
              <li key={href}>
                <a
                  href={href}
                  className="flex min-h-16 items-center gap-3 rounded-2xl bg-(--gold-soft) p-3 ring-1 ring-(--gold)/30 hover:bg-(--surface) hover:ring-(--gold)"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-(--navy) font-bold text-(--on-navy-gold)">
                    {i + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-lg leading-snug font-semibold text-(--ink)">{label}</span>
                    <span className="block text-[0.95rem] text-(--ink-muted)">{hint}</span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </Card>
    </section>
  )
}
