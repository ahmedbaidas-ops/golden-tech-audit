import {
  Alert02Icon,
  AlertCircleIcon,
  AlertDiamondIcon,
  AnalyticsDownIcon,
  Calendar03Icon,
  Idea01Icon,
  Image01Icon,
  LegalDocument01Icon,
  Store01Icon,
  ViewIcon,
} from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { problems, type Problem } from "@/constants/audit"
import { Card, Icon, IconTile, Section, SourceLink } from "./section"

const phaseName = { 1: "الأولى", 2: "الثانية" } as const

function Label({ icon, children }: { icon: Parameters<typeof Icon>[0]["icon"]; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-base font-semibold text-(--ink-muted) [&_svg]:size-5">
      <Icon icon={icon} />
      {children}
    </p>
  )
}

function Evidence({ p }: { p: Problem }) {
  if (p.proof) {
    return (
      <figure className="m-0">
        <Label icon={Image01Icon}>الدليل من موقعكم</Label>
        <a
          href={p.proof.src}
          target="_blank"
          rel="noopener"
          className="mt-2 block overflow-hidden rounded-xl bg-white ring-1 ring-(--line-strong) hover:ring-(--gold)"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.proof.src} alt={p.proof.alt} width={p.proof.w} height={p.proof.h} className="block h-auto w-full" />
        </a>
        <figcaption className="mt-2 text-base text-(--ink-muted)">
          {p.proof.caption}{" "}
          <a href={p.proof.src} target="_blank" rel="noopener" className="font-semibold whitespace-nowrap text-(--gold-ink) underline underline-offset-4">
            كبّروا الصورة
          </a>
        </figcaption>
        {p.quote && (
          <blockquote className="mt-4 rounded-xl border-s-4 border-(--warn) bg-(--warn-soft) p-4">
            <p className="text-lg font-medium">«{p.quote.text}»</p>
            <p className="mt-1 text-base">
              <SourceLink source={p.quote.source} />
            </p>
          </blockquote>
        )}
      </figure>
    )
  }
  if (p.compare) {
    return (
      <div>
        <Label icon={Image01Icon}>الدليل: سياساتكم وسياسات المنافسين</Label>
        <ul className="mt-2 grid gap-3 sm:grid-cols-2">
          {p.compare.map((c) => (
            <li
              key={c.label}
              className={cn(
                "rounded-xl p-4",
                c.mine ? "bg-(--gold-soft) ring-2 ring-(--gold)/50 sm:col-span-2" : "bg-(--paper) ring-1 ring-(--line)"
              )}
            >
              <p className="flex items-center gap-2 text-base font-semibold [&_svg]:size-5">
                {c.mine && <Icon icon={Store01Icon} className="text-(--gold-ink)" />}
                {c.label}
              </p>
              <p className="mt-1 text-xl font-bold">{c.text}</p>
              <p className="mt-1 text-[0.95rem]">
                <SourceLink source={c.source} />
              </p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
  if (p.buttons) {
    return (
      <div>
        <Label icon={Image01Icon}>الدليل: نفس الزر في خمس صفحات</Label>
        <ul className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {p.buttons.map((b) => (
            <li key={b.src} className="flex flex-col items-center gap-2 rounded-xl bg-white p-3 ring-1 ring-(--line)">
              <span className="grid h-16 w-full place-items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.src} alt={`زر في ${b.where}`} width={b.w} height={b.h} className="h-auto max-h-16 w-auto max-w-full" />
              </span>
              <span className="text-center text-[0.95rem] text-(--ink-muted)">{b.where}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }
  return null
}

export function Problems() {
  return (
    <Section
      id="problems"
      n={3}
      icon={Alert02Icon}
      title="أهم 8 أمور للإصلاح"
      intro="مرتّبة من الأهم. مع كل واحدة صورتها من موقعكم، ولماذا تهمّكم، والحل."
    >
      <ol className="space-y-8">
        {problems.map((p) => {
          const urgent = p.urgency === "عاجل"
          return (
            <li key={p.id} id={`problem-${p.id}`} className="scroll-mt-6">
              <Card className="overflow-hidden">
                <div className={cn("h-1.5", urgent ? "bg-(--bad)" : "bg-(--warn)")} />
                <header className="px-5 pt-5 sm:px-8 sm:pt-7">
                  <div className="flex flex-wrap items-center gap-2 text-base">
                    <span className="rounded-full bg-(--navy) px-3 py-0.5 font-semibold text-(--on-navy)">
                      {p.id} من 8
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 font-semibold [&_svg]:size-4.5",
                        urgent ? "bg-(--bad-soft) text-(--bad)" : "bg-(--warn-soft) text-(--warn)"
                      )}
                    >
                      <Icon icon={urgent ? AlertDiamondIcon : AlertCircleIcon} />
                      {p.urgency}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-(--gold-soft) px-3 py-0.5 font-semibold text-(--gold-ink) [&_svg]:size-4.5">
                      <Icon icon={Calendar03Icon} />
                      يُصلح في المرحلة {phaseName[p.phase]}
                    </span>
                  </div>
                  <div className="mt-4 flex items-start gap-4">
                    <IconTile name={p.icon} tone={urgent ? "bad" : "warn"} className="max-sm:size-10 max-sm:[&_svg]:size-5" />
                    <h3 className="pt-1 text-[1.2rem] leading-snug font-bold sm:pt-1.5 sm:text-[1.45rem] sm:text-balance">
                      {p.title}
                    </h3>
                  </div>
                </header>

                <div className="problem-grid px-5 py-6 sm:px-8">
                  <div className="[grid-area:sees]">
                    <Label icon={ViewIcon}>ما يراه الزبون</Label>
                    <p className="mt-1 max-w-[40rem] text-lg">{p.sees}</p>
                  </div>
                  <div className="[grid-area:proof]">
                    <Evidence p={p} />
                  </div>
                  <div className="[grid-area:why]">
                    <Label icon={AnalyticsDownIcon}>لماذا يهمّكم</Label>
                    <p className="mt-1 max-w-[40rem] text-lg">{p.why}</p>
                    {p.whySource && (
                      <p className="mt-1 text-[0.95rem]">
                        المصدر: <SourceLink source={p.whySource} />
                      </p>
                    )}
                    {p.legal && (
                      <div className="mt-4 flex gap-3 rounded-xl bg-(--bad-soft) p-4 [&_svg]:size-6">
                        <Icon icon={LegalDocument01Icon} className="text-(--bad)" />
                        <p className="text-base">
                          <b className="text-(--bad)">تنبيه قانوني: </b>
                          {p.legal}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="[grid-area:fix]">
                    <div className="flex gap-3 rounded-xl bg-(--good-soft) p-4 sm:p-5">
                      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white text-(--good) [&_svg]:size-5">
                        <Icon icon={Idea01Icon} />
                      </span>
                      <div>
                        <p className="text-base font-bold text-(--good)">الحل</p>
                        <p className="text-lg">{p.fix}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <footer className="border-t border-(--line) bg-(--paper) px-5 py-3 text-[0.95rem] sm:px-8">
                  <span className="font-semibold text-(--ink-muted)">المصادر: </span>
                  {p.sources.map((s, i) => (
                    <span key={s.label}>
                      {i > 0 && <span className="text-(--ink-muted)"> · </span>}
                      <SourceLink source={s} />
                    </span>
                  ))}
                </footer>
              </Card>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
