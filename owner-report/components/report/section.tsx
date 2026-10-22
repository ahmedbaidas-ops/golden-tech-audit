import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import { LinkSquare02Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { ICONS, MIRROR } from "@/lib/icons"
import type { Source, Tone } from "@/constants/audit"

export const TOTAL_SECTIONS = 5

export function Icon({
  name,
  icon,
  className,
}: {
  name?: string
  icon?: IconSvgElement
  className?: string
}) {
  const def = icon ?? (name ? ICONS[name] : undefined)
  if (!def) return null
  return (
    <HugeiconsIcon
      icon={def}
      strokeWidth={1.8}
      aria-hidden="true"
      className={cn("shrink-0", name && MIRROR.has(name) && "-scale-x-100", className)}
    />
  )
}

const tileTone: Record<Tone | "gold" | "navy", string> = {
  good: "bg-(--good-soft) text-(--good)",
  warn: "bg-(--warn-soft) text-(--warn)",
  bad: "bg-(--bad-soft) text-(--bad)",
  gold: "bg-(--gold-soft) text-(--gold-ink) ring-1 ring-(--gold)/25",
  navy: "bg-(--navy) text-(--on-navy-gold)",
}

export function IconTile({
  name,
  icon,
  tone = "gold",
  size = "md",
  className,
}: {
  name?: string
  icon?: IconSvgElement
  tone?: Tone | "gold" | "navy"
  size?: "sm" | "md" | "lg"
  className?: string
}) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center",
        size === "sm" && "size-10 rounded-xl [&_svg]:size-5",
        size === "md" && "size-12 rounded-xl [&_svg]:size-6",
        size === "lg" && "size-14 rounded-2xl [&_svg]:size-7",
        tileTone[tone],
        className
      )}
    >
      <Icon name={name} icon={icon} />
    </span>
  )
}

// خط ذهبي مزدوج ينتهي بمعيّن صغير، يتكرر تحت كل عنوان
export function GoldRule({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("gold-rule", className)}>
      <span />
    </span>
  )
}

export function Section({
  id,
  n,
  icon,
  title,
  intro,
  children,
  className,
}: {
  id: string
  n: number
  icon: IconSvgElement
  title: string
  intro?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("scroll-mt-6", className)}>
      <header className="mb-6 flex items-start gap-4">
        <IconTile icon={icon} size="lg" />
        <div className="min-w-0">
          <p className="text-[0.9rem] font-semibold text-(--gold-ink)">
            القسم {n} من {TOTAL_SECTIONS}
          </p>
          <h2 id={`${id}-title`} className="text-[1.6rem] leading-snug font-bold text-balance sm:text-[1.8rem]">
            {title}
          </h2>
          <GoldRule className="mt-2" />
          {intro && <p className="mt-3 max-w-[42rem] text-lg text-(--ink-muted)">{intro}</p>}
        </div>
      </header>
      {children}
    </section>
  )
}

// نص يحتوي أرقاماً بإشارة سالب أو كلمات إنجليزية محاطة بـ U+2066…U+2069
// يُعرض داخل عنصر من اليسار لليمين حتى لا تنقلب الإشارة
export function Rich({ text }: { text: string }) {
  const parts = text.split(/\u2066(.*?)\u2069/)
  return (
    <>
      {parts.map((part, i) =>
        i % 2 ? (
          <span key={i} dir="ltr" className="whitespace-nowrap">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  )
}

export function SourceList({ sources }: { sources: Source[] }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 text-[0.95rem]">
      <span className="font-semibold text-(--ink-muted)">المصادر:</span>
      <ul className="contents">
        {sources.map((s) => (
          <li key={s.label} className="me-3">
            <SourceLink source={s} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Card({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-(--surface) shadow-(--shadow-card) ring-1 ring-(--line)",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function SourceLink({ source, className }: { source: Source; className?: string }) {
  if (!source.url) return <span className={className}>{source.label}</span>
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1 py-1.5 text-(--gold-ink) underline decoration-(--gold)/50 underline-offset-4 hover:decoration-(--gold-ink)",
        className
      )}
    >
      <bdi dir="rtl">{source.label}</bdi>
      <HugeiconsIcon icon={LinkSquare02Icon} strokeWidth={1.8} aria-hidden="true" className="size-4 shrink-0" />
    </a>
  )
}
