import {
  ArrowDown01Icon,
  BalanceScaleIcon,
  CancelCircleIcon,
  CheckmarkCircle02Icon,
  Alert02Icon,
  DashboardSpeed02Icon,
  FileSearchIcon,
  InformationCircleIcon,
  MinusSignCircleIcon,
  Route01Icon,
  ZapIcon,
} from "@hugeicons/core-free-icons"
import type { IconSvgElement } from "@hugeicons/react"
import { cn } from "@/lib/utils"
import {
  areaScores,
  competitors,
  journey,
  method,
  methodNote,
  quickNotes,
  type Mark,
} from "@/constants/audit"
import { scoreTone, toneFill, toneText } from "@/lib/tone"
import { Card, Icon, IconTile, Section, SourceLink, SourceList } from "./section"

function Fold({
  id,
  icon,
  title,
  hint,
  children,
}: {
  id: string
  icon: IconSvgElement
  title: string
  hint: string
  children: React.ReactNode
}) {
  return (
    <details id={id} className="fold group scroll-mt-6">
      <summary className="flex min-h-16 cursor-pointer list-none items-center gap-4 p-4 sm:p-5 [&::-webkit-details-marker]:hidden">
        <IconTile icon={icon} />
        <span className="min-w-0 flex-1">
          <span className="block text-[1.2rem] leading-snug font-bold">{title}</span>
          <span className="block text-base text-(--ink-muted)">{hint}</span>
        </span>
        <span className="hidden text-base font-semibold text-(--gold-ink) sm:inline">
          <span className="group-open:hidden">افتح</span>
          <span className="hidden group-open:inline">أغلق</span>
        </span>
        <span className="grid size-10 place-items-center rounded-full bg-(--gold-soft) text-(--gold-ink) transition-transform group-open:rotate-180 [&_svg]:size-5">
          <Icon icon={ArrowDown01Icon} />
        </span>
      </summary>
      <div className="border-t border-(--line) p-4 sm:p-6">{children}</div>
    </details>
  )
}

const scoreWord = { good: "جيد", warn: "يحتاج تحسيناً", bad: "يحتاج اهتماماً" }

function Scores() {
  return (
    <ul className="grid gap-x-10 gap-y-4 md:grid-cols-2">
      {areaScores.map((a) => {
        const tone = scoreTone(a.score)
        return (
          <li key={a.key}>
            <div className="flex items-center gap-2 [&_svg]:size-5">
              <Icon name={a.key} className="text-(--ink-muted)" />
              <span className="text-lg">{a.name}</span>
              <span className={cn("ms-auto text-lg font-bold tabular-nums", toneText[tone])}>{a.score}</span>
              <span className={cn("text-[0.95rem]", toneText[tone])}>· {scoreWord[tone]}</span>
            </div>
            <span className="mt-1.5 block h-2.5 overflow-hidden rounded-full bg-(--sunken)">
              <span className={cn("block h-full rounded-full", toneFill[tone])} style={{ width: `${a.score}%` }} />
            </span>
          </li>
        )
      })}
    </ul>
  )
}

const MARK: Record<Mark, { icon: IconSvgElement | null; cls: string; label: string }> = {
  yes: { icon: CheckmarkCircle02Icon, cls: "text-(--good)", label: "نعم" },
  no: { icon: CancelCircleIcon, cls: "text-(--bad)", label: "لا" },
  partial: { icon: MinusSignCircleIcon, cls: "text-(--warn)", label: "جزئياً" },
  na: { icon: null, cls: "text-(--ink-muted)", label: "لم نتحقق" },
}

function MarkCell({ mark, note }: { mark: Mark; note: string }) {
  const m = MARK[mark]
  return (
    <>
      <span className={cn("inline-flex items-center gap-1 font-semibold [&_svg]:size-5", m.cls)}>
        {m.icon && <Icon icon={m.icon} />}
        {m.label}
      </span>
      {note && <span className="mt-0.5 block text-[0.95rem] text-(--ink-muted)">{note}</span>}
    </>
  )
}

const rowIcon: Record<string, string> = {
  delivery: "shipping",
  returns: "returns",
  pickup: "pickup",
  reviews: "reputation",
  builder: "builder",
}

function Competitors() {
  const cols = competitors.columns
  return (
    <div className="space-y-4">
      <p className="text-base text-(--ink-muted)">
        نعم: موجودة وواضحة · جزئياً: موجودة لكن ناقصة · لا: غير موجودة
      </p>
      {/* جدول للشاشات الكبيرة */}
      <div className="hidden overflow-hidden rounded-xl ring-1 ring-(--line) md:block">
        <table className="w-full text-base">
          <thead>
            <tr className="bg-(--sunken)">
              <th className="px-4 py-3 text-start font-semibold">الخدمة</th>
              {cols.map((c) => (
                <th key={c.name} className={cn("px-3 py-3 text-center font-semibold", c.mine && "bg-(--gold-soft)")}>
                  {c.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {competitors.rows.map((r) => (
              <tr key={r.key} className="border-t border-(--line)">
                <td className="px-4 py-3 font-semibold">
                  <span className="flex items-center gap-2 [&_svg]:size-5">
                    <Icon name={rowIcon[r.key]} className="text-(--ink-muted)" />
                    {r.label}
                  </span>
                </td>
                {r.cells.map((c, i) => (
                  <td key={i} className={cn("px-3 py-3 text-center align-top", cols[i].mine && "bg-(--gold-soft)/60")}>
                    <MarkCell {...c} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* بطاقات للجوال */}
      <ul className="space-y-3 md:hidden">
        {competitors.rows.map((r) => (
          <li key={r.key} className="rounded-xl ring-1 ring-(--line)">
            <p className="border-b border-(--line) bg-(--sunken) px-4 py-2 font-semibold">{r.label}</p>
            <dl className="divide-y divide-(--line)">
              {r.cells.map((c, i) => (
                <div key={i} className={cn("flex items-start justify-between gap-3 px-4 py-2", cols[i].mine && "bg-(--gold-soft)")}>
                  <dt className={cn("text-base", cols[i].mine && "font-bold")}>{cols[i].name}</dt>
                  <dd className="text-end">
                    <MarkCell {...c} />
                  </dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
      <SourceList sources={competitors.sources} />
    </div>
  )
}

function Journey() {
  return (
    <ol className="space-y-6">
      {journey.map((s) => (
        <li key={s.n} id={`step-${s.n}`} className="grid gap-4 md:grid-cols-[1fr_minmax(0,22rem)]">
          <div>
            <div className="flex items-center gap-3">
              <span className={cn("grid size-10 shrink-0 place-items-center rounded-full text-lg font-bold text-white tabular-nums", toneFill[s.tone])}>
                {s.n}
              </span>
              <h4 className="text-[1.15rem] font-bold">{s.title}</h4>
            </div>
            <p className="mt-3 flex gap-2 text-lg [&_svg]:mt-1.5 [&_svg]:size-5">
              <Icon icon={CheckmarkCircle02Icon} className="text-(--good)" />
              <span><b className="text-(--good)">ما أعجبنا: </b>{s.good}</span>
            </p>
            <p className="mt-2 flex gap-2 text-lg [&_svg]:mt-1.5 [&_svg]:size-5">
              <Icon icon={Alert02Icon} className={toneText[s.tone]} />
              <span><b className={toneText[s.tone]}>ما يحتاج إصلاحاً: </b>{s.problem}</span>
            </p>
          </div>
          {s.shot && (
            <figure className="m-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.shot.src}
                alt={`صورة خطوة: ${s.title}`}
                width={s.shot.w}
                height={s.shot.h}
                className="block h-auto max-h-64 w-full rounded-xl bg-white object-cover object-top ring-1 ring-(--line-strong)"
              />
              <figcaption className="mt-1 text-[0.95rem] text-(--ink-muted)">صورة من جولتنا، 22 أكتوبر 2026</figcaption>
            </figure>
          )}
        </li>
      ))}
    </ol>
  )
}

function Notes() {
  return (
    <ul className="grid gap-5 lg:grid-cols-2">
      {quickNotes.map((n, i) => (
        <li key={i} className="flex flex-col gap-3 rounded-xl bg-(--paper) p-4 ring-1 ring-(--line)">
          <p className="flex gap-3 text-lg">
            <IconTile name={n.icon} size="sm" />
            <span>{n.text}</span>
          </p>
          {n.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={n.image.src}
              alt={n.image.alt}
              width={n.image.w}
              height={n.image.h}
              className="block h-auto max-h-60 w-full rounded-lg bg-white object-contain ring-1 ring-(--line)"
            />
          )}
          {n.source && (
            <p className="text-[0.95rem]">
              المصدر: <SourceLink source={n.source} />
            </p>
          )}
        </li>
      ))}
    </ul>
  )
}

function Method() {
  return (
    <div className="space-y-4">
      <ul className="grid gap-4 md:grid-cols-2">
        {method.map((m) => (
          <li key={m} className="flex gap-3 text-lg [&_svg]:mt-1.5 [&_svg]:size-5">
            <Icon icon={CheckmarkCircle02Icon} className="text-(--gold-ink)" />
            <span>{m}</span>
          </li>
        ))}
      </ul>
      <p className="flex max-w-[44rem] gap-3 rounded-xl bg-(--sunken) p-4 text-base [&_svg]:mt-1 [&_svg]:size-5">
        <Icon icon={InformationCircleIcon} className="text-(--ink-muted)" />
        <span>{methodNote}</span>
      </p>
    </div>
  )
}

export function Details() {
  return (
    <Section
      id="details"
      n={5}
      icon={FileSearchIcon}
      title="التفاصيل والمصادر"
      intro="لمن يريد أن يتعمّق. اضغطوا على أي عنوان لفتحه."
    >
      <Card className="divide-y divide-(--line) overflow-hidden">
        <Fold id="scores" icon={DashboardSpeed02Icon} title="درجة كل جزء من الموقع" hint="عشرة أجزاء، كل رقم من 100">
          <Scores />
        </Fold>
        <Fold id="competitors" icon={BalanceScaleIcon} title="مقارنة مع المنافسين" hint="إكسترا وجرير وأمازون ونون، من صفحاتهم الرسمية">
          <Competitors />
        </Fold>
        <Fold id="journey" icon={Route01Icon} title="تجربة الشراء خطوة بخطوة" hint="سبع خطوات، مع صورة كل خطوة">
          <Journey />
        </Fold>
        <Fold id="notes" icon={ZapIcon} title="ملاحظات أصغر" hint="ثماني ملاحظات، أغلبها يُصلح في يوم أو يومين">
          <Notes />
        </Fold>
        <Fold id="method" icon={InformationCircleIcon} title="كيف أعددنا التقرير" hint="ما فعلناه، وما لم نختبره بعد">
          <Method />
        </Fold>
      </Card>
    </Section>
  )
}
