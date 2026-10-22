"use client"

import { useState } from "react"
import { HERO_PC, SHELF, type Product } from "@/data/flow"
import { flowImg } from "@/lib/asset"
import { Button } from "@/components/shadcn/button"
import { Card } from "@/components/shadcn/card"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/shadcn/empty"
import { Separator } from "@/components/shadcn/separator"
import { Pin, Stepper, TextLink, sar, type Flow } from "./parts"

/** Walmart cart: the fulfilment band on top of the items, the summary card with its button first. */
export function Cart({ f }: { f: Flow }) {
  const [removed, setRemoved] = useState<{ p: Product; q: number } | null>(null)
  const items = SHELF.filter((p) => (f.qty[p.id] ?? 0) > 0)
  const ship = f.fulfil === "ship"
  const remove = (p: Product) => {
    const q = f.qty[p.id] ?? 0
    f.add(p.id, -q)
    setRemoved({ p, q })
  }
  const undo = removed && (
    <p role="status" className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-navy px-5 py-3 text-sm text-white">
      حذفنا «{removed.p.title}» من السلة.
      <TextLink
        className="font-bold text-gold"
        onClick={() => {
          f.add(removed.p.id, removed.q)
          setRemoved(null)
        }}
      >
        تراجع
      </TextLink>
    </p>
  )

  if (!items.length)
    return (
      <div className="wm-in wm-body tight">
        {undo}
        <Empty className="border border-dashed py-12">
          <EmptyHeader>
            <EmptyTitle className="text-lg">سلتك فارغة</EmptyTitle>
            <EmptyDescription>أضف جهازاً من العروض لترى السلة الجديدة.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button className="h-11 rounded-full px-6 font-bold" onClick={() => f.go(0)}>
              تسوّق العروض
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    )

  return (
    <div className="wm-in wm-body tight">
      <h2 className="wm-title">
        السلة <span>({f.count} منتج)</span>
      </h2>
      {undo}
      <div className="wm-cartgrid">
        <div className="wm-col">
          <h3 className="wm-fhead">طريقة الاستلام</h3>
          <Card className="gap-0 rounded-lg py-0 shadow-[0_1px_4px_rgb(0_0_0/.05)]">
            <div className="wm-band" data-pin={2}>
              <Pin n={2} />
              <div className="row">
                <b>{ship ? "توصيل غداً بدون رسوم" : "استلام من المعرض بدون رسوم"}</b>
                <TextLink onClick={() => f.setFulfil(ship ? "pickup" : "ship")}>{ship ? "أفضّل الاستلام" : "أفضّل التوصيل"}</TextLink>
              </div>
              <span>{ship ? "داخل الرياض، ومن 3 إلى 6 أيام عمل لبقية المدن." : "شارع العليا، الرياض. نرسل لك رسالة عندما يجهز طلبك."}</span>
            </div>
            {items.map((p, i) => (
              <div key={p.id}>
                {i > 0 && <Separator />}
                <Item p={p} f={f} first={i === 0} onRemove={() => remove(p)} />
              </div>
            ))}
            {(f.qty[HERO_PC.id] ?? 0) > 0 && (
              <>
                <Separator />
                <div className="wm-item">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="thumb light" src={flowImg("gift-set")} alt="" />
                  <div>
                    <h4>هدية: كيبورد وماوس وسماعة ولوحة ماوس</h4>
                    <div className="meta">
                      <span>تأتي مع جهاز الألعاب RTX 3050</span>
                    </div>
                  </div>
                  <div className="p">
                    <b>بدون رسوم</b>
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
        <div className="wm-col">
          <Card className="gap-3 rounded-lg px-5 py-5 shadow-[0_1px_4px_rgb(0_0_0/.05)]" data-pin={1}>
            <Pin n={1} />
            <Button size="lg" className="h-12 w-full rounded-full text-base font-bold active:scale-[.98]" onClick={() => f.go(3)}>
              تابع إلى الدفع
            </Button>
            <div className="wm-row">
              <span>المجموع ({f.count} منتج)</span>
              <span>{sar(f.total)}</span>
            </div>
            <div className="wm-row">
              <span>{ship ? "التوصيل" : "الاستلام"}</span>
              <span className="ok">بدون رسوم</span>
            </div>
            <div className="wm-row">
              <span>ضريبة القيمة المضافة</span>
              <span>مشمولة في السعر</span>
            </div>
            <Separator />
            <div className="wm-row total border-0 pt-0">
              <span>الإجمالي</span>
              <b>{sar(f.total)}</b>
            </div>
          </Card>
          <p className="wm-saving">وفّرت {sar(f.saved)} في هذا الطلب</p>
          <p className="wm-split">
            أو 4 دفعات بلا فوائد مع تابي أو تمارا: <b>{sar(f.total / 4)}</b> لكل دفعة.
          </p>
        </div>
      </div>
    </div>
  )
}

function Item({ p, f, first, onRemove }: { p: Product; f: Flow; first: boolean; onRemove: () => void }) {
  const q = f.qty[p.id] ?? 0
  return (
    <div className="wm-item">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={p.dark ? "thumb" : "thumb light"} src={flowImg(p.img)} alt="" />
      <div>
        <h4>{p.title}</h4>
        <div className="meta" data-pin={first ? 3 : undefined}>
          {first && <Pin n={3} />}
          <span>
            <b>إرجاع خلال 14 يوماً</b>
          </span>
          <span>ضمان 24 شهراً من التكنولوجيا الذهبية</span>
        </div>
      </div>
      <div className="p">
        <b>{sar(p.now * q)}</b>
        <s>{sar(p.was * q)}</s>
      </div>
      <div className="foot">
        <TextLink onClick={onRemove}>احذف</TextLink>
        <TextLink>احفظ لوقت لاحق</TextLink>
        <Stepper q={q} min={1} name={p.title} onChange={(d) => f.add(p.id, d)} />
      </div>
    </div>
  )
}
