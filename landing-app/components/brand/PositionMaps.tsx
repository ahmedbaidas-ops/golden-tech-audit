"use client"

import { useState } from "react"
import { BRANDS, MAPS, ORDER, type BrandKey, type PositionMap } from "@/data/audit"
import { TabPanel } from "../Tabs"
import { Icon, Logo, cssVars } from "../ui"
import { asset } from "@/lib/asset"
import { Label } from "@/components/shadcn/label"
import { Switch } from "@/components/shadcn/switch"

// map coordinates run from -1 to 1 on both axes, as drawn on the brand board
const SIZE = 420
const PAD = 56
const C = SIZE / 2
const R = (SIZE - PAD * 2) / 2
const px = (x: number) => C + x * R
const py = (y: number) => C - y * R

function Pin({ k, m, n, sel, onPick }: { k: BrandKey; m: PositionMap; n: number; sel: boolean; onPick: () => void }) {
  const [x, y] = m.pos[k]
  const big = k === "golden"
  const r = big ? 19 : 15
  const cx = px(x)
  const cy = py(y)
  return (
    <g
      className={sel ? "brand sel" : "brand"}
      style={cssVars({ "--i": n })}
      tabIndex={0}
      role="button"
      aria-label={BRANDS[k].name}
      aria-pressed={sel}
      onClick={onPick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onPick()
        }
      }}
    >
      <circle className="hit" cx={cx} cy={cy} r={30} />
      {big && <circle className="ring" cx={cx} cy={cy} r={r + 6} />}
      <circle className="bg" cx={cx} cy={cy} r={r} />
      {k === "noon" ? (
        <>
          <clipPath id={`cp-${m.k}`}>
            <circle cx={cx} cy={cy} r={r} />
          </clipPath>
          <image
            href={asset("logos/noon.webp")}
            x={cx - r}
            y={cy - r}
            width={2 * r}
            height={2 * r}
            clipPath={`url(#cp-${m.k})`}
            preserveAspectRatio="xMidYMid slice"
          />
        </>
      ) : (
        <image href={asset(`logos/${k}.webp`)} x={cx - r * 0.8} y={cy - r * 0.8} width={r * 1.6} height={r * 1.6} />
      )}
      <circle className="edge" cx={cx} cy={cy} r={r} />
      <text x={cx} y={cy + r + (big ? 24 : 18)} textAnchor="middle">
        {BRANDS[k].name}
      </text>
    </g>
  )
}

function MapPanel({ m }: { m: PositionMap }) {
  const [sel, setSel] = useState<BrandKey>("golden")
  const [target, setTarget] = useState(false)
  const z = m.zone
  const mv = m.move
  return (
    <>
      <div className="today-target">
        <div>
          <small>اليوم</small>
          {m.today.replace(/^اليوم: /, "")}
        </div>
        <span className="arrow" aria-hidden="true">
          <Icon name="arrow" />
        </span>
        <div>
          <small>الهدف</small>
          {m.target.replace(/^الهدف: /, "")}
        </div>
      </div>
      <div className="map-wrap">
        <div>
          <svg
            className={target ? "map show-target" : "map"}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            role="img"
            aria-label={`خريطة تموضع: ${m.tab}`}
          >
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0 0L10 5L0 10z" fill="var(--gold)" />
              </marker>
            </defs>
            <rect className="quad-bg" x={px(-1)} y={py(1)} width={2 * R} height={2 * R} rx="18" />
            {z && <rect className="target" x={px(z[0])} y={py(z[3])} width={px(z[2]) - px(z[0])} height={py(z[1]) - py(z[3])} rx="14" />}
            <line className="axis" x1={px(-1)} y1={C} x2={px(1)} y2={C} />
            <line className="axis" x1={C} y1={py(-1)} x2={C} y2={py(1)} />
            <text className="axis-label" x={px(-1) + 8} y={C - 10} textAnchor="start">
              {m.x[0]}
            </text>
            <text className="axis-label" x={px(1) - 8} y={C - 10} textAnchor="end">
              {m.x[2]}
            </text>
            <text className="axis-label" x={C} y={py(1) - 10} textAnchor="middle">
              {m.y[2]}
            </text>
            <text className="axis-label" x={C} y={py(-1) + 20} textAnchor="middle">
              {m.y[0]}
            </text>
            <text className="axis-title" x={C} y={22} textAnchor="middle">
              {m.yt}
            </text>
            <text className="axis-title" x={C} y={SIZE - 8} textAnchor="middle">
              {m.xt}
            </text>
            {m.segs?.map((g) => (
              <g className="seg" key={g[0]}>
                <rect x={px(g[1]) - 41} y={py(g[2]) - 11} width={82} height={22} rx="11" />
                <text x={px(g[1])} y={py(g[2]) + 4} textAnchor="middle">
                  {g[0]}
                </text>
              </g>
            ))}
            {mv && (
              <path
                className="move"
                pathLength={1}
                d={`M${px(mv[0])} ${py(mv[1])} Q ${px((mv[0] + mv[2]) / 2) + 20} ${py((mv[1] + mv[3]) / 2) - 20} ${px(mv[2])} ${py(mv[3])}`}
              />
            )}
            {/* golden is drawn last so it sits on top */}
            {[...ORDER].reverse().map((k, n) => (
              <Pin key={k} k={k} m={m} n={n} sel={sel === k} onPick={() => setSel(k)} />
            ))}
          </svg>
          <div className="picks" role="group" aria-label="اختاروا متجراً">
            {ORDER.map((k) => (
              <button key={k} type="button" className="pick" aria-pressed={sel === k} onClick={() => setSel(k)}>
                <Logo k={k} size={30} />
                {BRANDS[k].name}
              </button>
            ))}
          </div>
          {z ? (
            <div className="flex min-h-11 items-center gap-2.5">
              <Switch id={`target-${m.tab}`} checked={target} onCheckedChange={setTarget} />
              <Label htmlFor={`target-${m.tab}`} className="text-base font-semibold">
                أظهر الهدف على الخريطة
              </Label>
            </div>
          ) : (
            <p className="note">لا تحدد هذه الخريطة منطقة هدف، بل اتجاهاً في الاستنتاج.</p>
          )}
        </div>
        <div>
          <div className="card" style={{ boxShadow: "none" }} aria-live="polite">
            <div className="note-head">
              <Logo k={sel} size={40} />
              <b>{BRANDS[sel].name}</b>
            </div>
            <p style={{ marginTop: 8 }}>{m.notes[sel]}</p>
          </div>
          <dl className="reading" style={{ marginTop: 14 }}>
            {m.reading.map((r) => (
              <div key={r[0]} style={{ display: "contents" }}>
                <dt>{r[0]}</dt>
                <dd>{r[1]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </>
  )
}

export function PositionMaps() {
  return <TabPanel labels={MAPS.map((m) => m.tab)} render={(i) => <MapPanel m={MAPS[i]} />} />
}
