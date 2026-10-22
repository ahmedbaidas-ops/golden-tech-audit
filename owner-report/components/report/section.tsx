import { cn } from "@/lib/utils"

export function Section({
  id,
  title,
  intro,
  children,
  className,
}: {
  id: string
  title: string
  intro?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} className={cn("scroll-mt-4 space-y-4", className)}>
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-balance">{title}</h2>
        {intro && (
          <p className="max-w-3xl text-lg text-muted-foreground">{intro}</p>
        )}
      </div>
      {children}
    </section>
  )
}
