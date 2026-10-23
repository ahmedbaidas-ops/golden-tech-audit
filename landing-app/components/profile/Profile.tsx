import Link from "next/link"
import { ABOUT, CASES, MISSION, NUMBERS, TAGLINE, UNITS, UNITS_INTRO, VALUES } from "@/data/profile"
import { asset } from "@/lib/asset"
import { Badge } from "@/components/shadcn/badge"
import { Card } from "@/components/shadcn/card"
import { Separator } from "@/components/shadcn/separator"
import { Count, Icon, SecHead } from "../ui"
import { Units } from "./Units"

const two = (i: number) => String(i + 1).padStart(2, "0")

/** Studio's own mark on the navy hero; it sits first, so it lands on the right in Arabic. */
export function ProfileHero({ logo }: { logo: string | null }) {
  return (
    <section className="reveal mt-[26px] grid items-center gap-8 overflow-hidden rounded-[var(--r-xl)] border border-[rgb(231_196_110/.2)] bg-[radial-gradient(120%_90%_at_100%_0%,rgb(231_196_110/.16),transparent_55%),linear-gradient(150deg,var(--navy-2),var(--navy)_70%)] p-8 text-[var(--on-navy)] md:grid-cols-[auto_minmax(0,1fr)] md:p-12">
      <div className="grid size-36 place-items-center rounded-[var(--r-lg)] bg-white/[.06] ring-1 ring-white/10 md:size-44">
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={asset(logo)} alt="شعار Pixilated Studio" className="w-[78%] object-contain" />
        ) : (
          <span dir="ltr" className="font-heading text-2xl font-bold tracking-tight text-gold-hi">
            Pixilated
          </span>
        )}
      </div>
      <div className="grid gap-4">
        <span className="justify-self-start rounded-full bg-white/10 px-3 py-0.5 text-sm font-semibold text-gold-hi">عرض شركة 2026</span>
        <h1 className="font-heading text-[clamp(2rem,5vw,3.4rem)] leading-tight font-bold">{TAGLINE}</h1>
        <p className="max-w-[38rem] text-[1.15rem] leading-relaxed font-semibold text-gold-hi">{MISSION}</p>
        <p className="max-w-[44rem] text-[var(--on-navy-muted)]">{ABOUT}</p>
      </div>
    </section>
  )
}

export function ProfileBody() {
  return (
    <>
      <section className="sec" aria-labelledby="pf-numbers">
        <SecHead title="أرقامنا" sub="أثر يُقاس بالأرقام." />
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {NUMBERS.map(([n, suffix, label]) => (
            <Card key={label} className="reveal gap-2 rounded-[var(--r-lg)] px-6 py-6">
              <b className="font-heading text-[2.6rem] leading-none font-bold text-[var(--gold-ink)] tabular-nums" dir="ltr">
                <Count to={n} />
                {suffix}
              </b>
              <p className="text-muted-foreground">{label}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="sec">
        <SecHead title="قيمنا" sub="أسس تميزنا." />
        <div className="grid gap-3.5 md:grid-cols-2">
          {VALUES.map(([t, d], i) => (
            <Card key={t} className="reveal grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-1 rounded-[var(--r-lg)] px-6 py-6">
              <span className="row-span-2 font-heading text-2xl font-bold text-gold">{two(i)}</span>
              <h3 className="text-[1.15rem]">{t}</h3>
              <p className="text-muted-foreground">{d}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="sec">
        <SecHead title="وحداتنا" sub="رؤية واحدة. ثلاث خبرات متكاملة." />
        <Card className="reveal gap-5 rounded-[var(--r-lg)] p-[22px]">
          <p className="max-w-[48rem] text-muted-foreground">{UNITS_INTRO}</p>
          <Units units={UNITS} />
        </Card>
      </section>

      <section className="sec">
        <SecHead title="من أعمالنا" sub="ثقة بُنيت على نتائج." />
        <div className="grid gap-5">
          {CASES.map((c) => (
            <Card key={c.name} className="reveal gap-5 rounded-[var(--r-lg)] p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-[1.45rem]">{c.name}</h3>
                <Badge className="rounded-full border-0 bg-accent px-3 py-0.5 font-semibold text-accent-foreground">{c.kind}</Badge>
              </div>
              <p className="max-w-[52rem]">{c.about}</p>
              {c.stats.length > 0 && (
                <div className="grid gap-3 sm:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))]">
                  {c.stats.map(([v, l]) => (
                    <div key={l} className="rounded-[var(--r-md)] bg-muted px-5 py-4">
                      <b dir="ltr" className="block font-heading text-[2rem] leading-tight font-bold text-[var(--gold-ink)]">
                        {v}
                      </b>
                      <span className="text-[0.92rem] text-muted-foreground">{l}</span>
                    </div>
                  ))}
                </div>
              )}
              <p className="text-muted-foreground">{c.result}</p>
              {c.phases && (
                <>
                  <Separator />
                  <div>
                    <span className="text-sm font-bold text-[var(--gold-ink)]">مراحل تنفيذ المشروع</span>
                    <ol className="m-0 list-none p-0 mt-3 grid gap-3 md:grid-cols-3">
                      {c.phases.map(([m, t, d]) => (
                        <li key={m} className="border-s-2 border-gold ps-4">
                          <span className="text-sm text-muted-foreground">{m}</span>
                          <b className="block">{t}</b>
                          <span className="text-[0.92rem] text-muted-foreground">{d}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </>
              )}
            </Card>
          ))}
        </div>
      </section>

      <section className="sec">
        <SecHead title="ما يعنيه هذا للتكنولوجيا الذهبية" sub="الربط من إعدادنا، بين ما في العرض وما وجدناه في المراجعة." />
        <Card className="reveal gap-0 rounded-[var(--r-lg)] p-[22px]">
          {[
            ["نبدأ بالبحث", "هذا التقرير هو خطوة البحث: مراجعة العلامة والموقع وتجربة الشراء قبل أي تصميم.", "/website/"],
            ["تجربة شراء أقصر", "في تنويل اختصرنا تقديم الطلب من 9–14 دقيقة إلى 2–3 دقائق. الكونسبت يطبّق المنطق نفسه على سلة الذهبية ودفعها.", "/concept/"],
            ["نظام تصميم واحد", "سلّمنا أكثر من 30 نظام تصميم، والباقة الأولى تشمل نظاماً من 100 مكوّن لموقعكم.", "/proposal/"],
          ].map(([t, d, href], i) => (
            <div key={t}>
              {i > 0 && <Separator className="my-4" />}
              <div className="grid gap-1 md:grid-cols-[14rem_minmax(0,1fr)_auto] md:items-center md:gap-6">
                <b className="text-[1.05rem]">{t}</b>
                <p className="text-muted-foreground">{d}</p>
                <Link href={href} className="inline-flex items-center gap-2 font-bold text-[var(--gold-ink)] no-underline">
                  افتح
                  <Icon name="arrow" size={18} />
                </Link>
              </div>
            </div>
          ))}
        </Card>
      </section>
    </>
  )
}
