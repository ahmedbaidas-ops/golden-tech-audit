import {
  ChartUpIcon,
  Clock01Icon,
  PaintBrush01Icon,
  Rocket01Icon,
  Target02Icon,
  TextCheckIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { closing, plan, report } from "@/constants/audit"
import { Card, GoldRule, Icon, IconTile, Section } from "./section"

const phaseIcon = [TextCheckIcon, PaintBrush01Icon, Rocket01Icon]

export function Plan() {
  return (
    <Section
      id="plan"
      n={4}
      icon={Target02Icon}
      title="خطة العمل"
      intro="نبدأ بتصحيح ما يقرؤه الزبون قبل أي تصميم جديد، لأنه الأسرع أثراً."
    >
      <ol className="grid gap-5 lg:grid-cols-3">
        {plan.map((p, i) => (
          <li key={p.key} className="flex">
            <Card className={cn("relative flex w-full flex-col p-5 sm:p-6", i === 0 && "ring-2 ring-(--gold)")}>
              {i === 0 && (
                <span className="absolute -top-3.5 start-5 rounded-full bg-(--gold) px-3 py-0.5 text-[0.95rem] font-bold text-(--navy)">
                  ابدؤوا هنا
                </span>
              )}
              <div className="flex items-center gap-3">
                <IconTile icon={phaseIcon[i]} tone="navy" />
                <div>
                  <p className="text-base font-semibold text-(--gold-ink)">{p.phase}</p>
                  <p className="inline-flex items-center gap-1.5 text-base text-(--ink-muted) [&_svg]:size-4.5">
                    <Icon icon={Clock01Icon} />
                    {p.when}
                  </p>
                </div>
              </div>
              <h3 className="mt-4 text-[1.3rem] leading-snug font-bold">{p.title}</h3>
              <ul className="mt-3 flex-1 space-y-2">
                {p.items.map((it) => (
                  <li key={it} className="flex gap-2 text-lg [&_svg]:mt-1.5 [&_svg]:size-5">
                    <Icon icon={Tick02Icon} className="text-(--gold-ink)" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex gap-3 rounded-xl bg-(--good-soft) p-4 [&_svg]:size-6">
                <Icon icon={ChartUpIcon} className="text-(--good)" />
                <div>
                  <p className="text-base font-bold text-(--good)">ماذا ستلاحظون</p>
                  <p className="text-lg">{p.result}</p>
                </div>
              </div>
            </Card>
          </li>
        ))}
      </ol>

      <div className="relative mt-10 overflow-hidden rounded-[1.5rem] bg-(--navy) px-6 py-8 text-(--on-navy) sm:px-12">
        <div aria-hidden="true" className="cover-lines" />
        <div className="relative max-w-[40rem]">
          <h3 className="text-[1.5rem] font-bold text-(--on-navy-gold)">{closing.title}</h3>
          <GoldRule className="gold-rule--on-navy mt-3" />
          <p className="mt-4 text-lg">{closing.text}</p>
          <p className="mt-4 text-base text-(--on-navy-muted)">
            إعداد <bdi className="font-semibold text-(--on-navy)">{report.preparedBy}</bdi> · {report.date}
          </p>
        </div>
      </div>
    </Section>
  )
}
