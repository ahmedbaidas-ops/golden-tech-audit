"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn/popover"
import { ToggleGroup, ToggleGroupItem } from "@/components/shadcn/toggle-group"
import { Logo } from "../../ui"
import { FULFIL, Pin, Svg, sar, type Flow, type Fulfil } from "./parts"

const DEPTS = ["عروض الأسبوع", "لابتوبات", "بي سي ألعاب", "شاشات", "طابعات", "منتجات أبل", "قطع الكمبيوتر", "السيرفرات"]

const OPT =
  "h-auto flex-col items-start gap-0.5 rounded-xl border-2 border-transparent bg-white/10 p-3 text-start text-white hover:bg-white/15 hover:text-white data-[state=on]:border-gold data-[state=on]:bg-gold/15 data-[state=on]:text-white"

/** Walmart's header: logo, a dark "how do you want your items" pill, a wide search, two text links and the cart. */
export function Header({ f, pins }: { f: Flow; pins: boolean }) {
  const ship = f.fulfil === "ship"
  const fl = FULFIL[f.fulfil]
  return (
    <>
      <div className="wm-top">
        <div className="wm-in">
          <button type="button" className="wm-logo" onClick={() => f.go(0)} aria-label="الصفحة الرئيسية في التصور">
            <Logo k="golden" size={40} />
            <b>التكنولوجيا الذهبية</b>
          </button>
          <div className="wm-pillwrap" data-pin={pins ? 1 : undefined}>
            {pins && <Pin n={1} />}
            <Popover>
              <PopoverTrigger className="wm-pill">
                <span>
                  <b>{fl.title}</b>
                  <small>{fl.sub}</small>
                </span>
                <Svg name="chev" />
              </PopoverTrigger>
              <PopoverContent align="start" sideOffset={8} className="wm-tokens w-80 rounded-2xl border-0 bg-navy p-4 text-white shadow-xl">
                <p className="mb-3 text-sm font-bold">كيف تريد استلام طلبك؟</p>
                <ToggleGroup
                  type="single"
                  spacing={2}
                  value={f.fulfil}
                  onValueChange={(v) => v && f.setFulfil(v as Fulfil)}
                  className="grid w-full grid-cols-2"
                  aria-label="طريقة الاستلام"
                >
                  <ToggleGroupItem value="ship" className={OPT}>
                    <b>توصيل</b>
                    <span className="text-xs text-white/75">غداً في الرياض</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem value="pickup" className={OPT}>
                    <b>استلام</b>
                    <span className="text-xs text-white/75">من المعرض</span>
                  </ToggleGroupItem>
                </ToggleGroup>
                <p className="mt-3 rounded-lg bg-white p-3 text-[0.84rem] leading-relaxed text-foreground">
                  {ship
                    ? "التوصيل داخل الرياض خلال 24 ساعة، ومن 3 إلى 6 أيام عمل لبقية المدن."
                    : "استلم طلبك من معرضنا في شارع العليا بالرياض. نرسل لك رسالة عندما يجهز."}
                </p>
              </PopoverContent>
            </Popover>
          </div>
          <label className="wm-search">
            <input type="search" placeholder="ابحث عن لابتوب، كرت شاشة، طابعة…" aria-label="بحث تجريبي داخل التصور" />
            <span className="go">
              <Svg name="search" />
            </span>
          </label>
          <div className="wm-acts">
            <span className="wm-act wm-wa" data-pin={pins ? 2 : undefined}>
              {pins && <Pin n={2} />}
              <small>اسألنا على</small>
              <b>واتساب</b>
            </span>
            <span className="wm-act">
              <small>أهلاً</small>
              <b>حسابي</b>
            </span>
            <button type="button" className="wm-act wm-cart" onClick={() => f.go(2)} aria-label={`السلة: ${f.count} منتج`}>
              <Svg name="cart" />
              <i key={f.bump} className={f.bump ? "n bump" : "n"}>
                {f.count}
              </i>
              <b>{sar(f.total)}</b>
            </button>
          </div>
        </div>
      </div>
      <div className="wm-sub">
        <div className="wm-in">
          <span className="dd">
            كل الأقسام
            <Svg name="chev" />
          </span>
          <span className="dd">
            الخدمات
            <Svg name="chev" />
          </span>
          <span className="sep" />
          {DEPTS.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
      </div>
    </>
  )
}
