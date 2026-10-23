"use client"

import type { Unit } from "@/data/profile"
import { TabPanel } from "../Tabs"

/** The studio's three units as tabs; each panel lists that unit's services. */
export function Units({ units }: { units: Unit[] }) {
  return (
    <TabPanel
      label="وحدات Pixilated"
      labels={units.map((u) => (
        <span key={u.en} dir="ltr">
          {u.en.replace("Pixilated ", "")}
        </span>
      ))}
      render={(i) => {
        const u = units[i]
        return (
          <div className="grid gap-5">
            <div>
              <span dir="ltr" className="text-sm font-semibold text-[var(--gold-ink)]">
                {u.en}
              </span>
              <h3 className="mt-1 text-[1.35rem]">{u.title}</h3>
              {u.lead && <p className="mt-2 max-w-[46rem] text-muted-foreground">{u.lead}</p>}
            </div>
            {u.services.length > 0 && (
              <ol className="m-0 list-none p-0 grid gap-3 md:grid-cols-2">
                {u.services.map(([t, d, en], j) => (
                  <li key={t} className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 rounded-[var(--r-md)] bg-muted px-5 py-4">
                    <span className="row-span-3 font-heading font-bold text-gold">{String(j + 1).padStart(2, "0")}</span>
                    <b>{t}</b>
                    {en && (
                      <span dir="ltr" className="justify-self-start text-sm text-muted-foreground">
                        {en}
                      </span>
                    )}
                    {d && <span className="mt-1 text-[0.95rem] text-muted-foreground">{d}</span>}
                  </li>
                ))}
              </ol>
            )}
          </div>
        )
      }}
    />
  )
}
