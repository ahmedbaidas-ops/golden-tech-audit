"use client"

import { useState } from "react"
import { HERO_PC, SPECS } from "@/data/flow"
import { flowImg } from "@/lib/asset"
import { Badge } from "@/components/shadcn/badge"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/shadcn/breadcrumb"
import { Button } from "@/components/shadcn/button"
import { Card } from "@/components/shadcn/card"
import { Separator } from "@/components/shadcn/separator"
import { ToggleGroup, ToggleGroupItem } from "@/components/shadcn/toggle-group"
import { fmt } from "../../ui"
import { Pin, TextLink, type Flow, type Fulfil } from "./parts"

const SHOTS = [
  { src: flowImg(HERO_PC.img), dark: true, alt: "جهاز الألعاب بكرت RTX 3050، الصورة المستخدمة في الموقع" },
  { src: flowImg("gift-set"), dark: false, alt: "الهدية مع الجهاز: كيبورد وماوس وسماعة ولوحة ماوس" },
]

const TILE =
  "h-auto min-h-[76px] flex-1 flex-col gap-0.5 rounded-lg border border-[#c3c8d2] bg-white px-2 py-3 text-center hover:bg-white hover:text-foreground data-[state=on]:border-2 data-[state=on]:border-navy data-[state=on]:bg-white data-[state=on]:text-foreground"

/** Walmart product page: gallery, details in the middle, a bordered buy box with the fulfilment choice. */
export function Product({ f }: { f: Flow }) {
  const [shot, setShot] = useState("0")
  const inCart = (f.qty[HERO_PC.id] ?? 0) > 0
  const ship = f.fulfil === "ship"
  const s = SHOTS[Number(shot)]
  return (
    <div className="wm-in wm-body tight">
      <Breadcrumb>
        <BreadcrumbList className="gap-1.5 text-xs sm:gap-1.5">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <button type="button" onClick={() => f.go(0)}>
                الرئيسية
              </button>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>بي سي ألعاب</BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>جهاز ألعاب RTX 3050</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="wm-pdp">
        <div className="wm-gallery" data-pin={6}>
          <Pin n={6} />
          <ToggleGroup
            type="single"
            orientation="vertical"
            spacing={2}
            value={shot}
            onValueChange={(v) => v && setShot(v)}
            className="wm-thumbs w-auto flex-col items-start max-[860px]:flex-row"
            aria-label="صور المنتج"
          >
            {SHOTS.map((t, i) => (
              <ToggleGroupItem
                key={t.src}
                value={String(i)}
                aria-label={`الصورة ${i + 1}`}
                className="size-16 rounded-md border border-border bg-white p-0.5 hover:bg-white data-[state=on]:border-2 data-[state=on]:border-navy data-[state=on]:bg-white"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.src} alt="" className="size-full rounded-[4px] object-cover" />
              </ToggleGroupItem>
            ))}
            <span className="wm-thumb todo">صورة من الجانب</span>
            <span className="wm-thumb todo">صورة من الداخل</span>
          </ToggleGroup>
          <div className={s.dark ? "wm-main" : "wm-main light"}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.src} alt={s.alt} />
          </div>
        </div>

        <div className="wm-info">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-sm border-[#9fb3d8] text-navy">
              هدية مع الجهاز
            </Badge>
            <Badge variant="outline" className="rounded-sm border-[#9fb3d8] text-navy">
              ضمان 24 شهراً
            </Badge>
          </div>
          <TextLink className="justify-start">زوروا متجر التكنولوجيا الذهبية</TextLink>
          <h2>{HERO_PC.title}</h2>
          <p className="norate" data-pin={5}>
            <Pin n={5} />
            لا توجد تقييمات بعد. نرسل لكم رابط التقييم بعد التوصيل.
          </p>
          <Separator />
          <h5>عن هذا الجهاز</h5>
          <ul className="wm-spec">
            {SPECS.map(([k, v]) => (
              <li key={k}>
                <b>{k}:</b> <bdi>{v}</bdi>
              </li>
            ))}
          </ul>
          <div className="wm-gift">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={flowImg("gift-set")} alt="" />
            <span>
              <b>هدية مع الجهاز بدون رسوم</b>
              <br />
              كيبورد وماوس وسماعة ولوحة ماوس
            </span>
          </div>
        </div>

        <Card className="sticky top-4 gap-3 rounded-xl px-5 py-5 shadow-[0_1px_6px_rgb(0_0_0/.06)] max-[1100px]:static max-[1100px]:col-span-full">
          <div className="big" data-pin={3}>
            <Pin n={3} />
            <span className="now">
              الآن <b>{fmt(HERO_PC.now)}</b> ر.س
            </span>
            <s>{fmt(HERO_PC.was)} ر.س</s>
          </div>
          <Badge className="justify-self-start rounded-sm border-0 bg-[#eaf5e4] font-bold text-good">وفّرت {fmt(HERO_PC.was - HERO_PC.now)} ر.س</Badge>
          <p className="wm-note">
            السعر شامل الضريبة. أو <b>4 دفعات × {fmt(HERO_PC.now / 4)} ر.س</b> بلا فوائد مع تابي أو تمارا.
          </p>
          <p className="wm-line-ok" data-pin={2}>
            <Pin n={2} />
            <b>إرجاع خلال 14 يوماً</b> من الاستلام · ضمان 24 شهراً
          </p>
          <div data-pin={4}>
            <Pin n={4} />
            <Button
              size="lg"
              className="h-12 w-full rounded-full text-base font-bold active:scale-[.98]"
              onClick={() => {
                if (!inCart) f.add(HERO_PC.id, 1)
                f.go(2)
              }}
            >
              {inCart ? "اذهب إلى السلة" : "أضف إلى السلة"}
            </Button>
          </div>
          <h5>كيف تريد استلامه؟</h5>
          <div data-pin={1}>
            <Pin n={1} />
            <ToggleGroup
              type="single"
              spacing={2}
              value={f.fulfil}
              onValueChange={(v) => v && f.setFulfil(v as Fulfil)}
              className="w-full"
              aria-label="طريقة الاستلام"
            >
              <ToggleGroupItem value="ship" className={TILE}>
                <b className="text-[0.88rem]">توصيل</b>
                <span className="text-[0.76rem] text-muted-foreground">غداً في الرياض</span>
                <span className="text-[0.76rem] text-muted-foreground">3 إلى 6 أيام لبقية المدن</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="pickup" className={TILE}>
                <b className="text-[0.88rem]">استلام من المعرض</b>
                <span className="text-[0.76rem] text-muted-foreground">شارع العليا، الرياض</span>
                <span className="text-[0.76rem] text-muted-foreground">بدون رسوم</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="wm-where">
            <span>{ship ? "التوصيل إلى: الرياض" : "المعرض: شارع العليا، الرياض"}</span>
            <TextLink>غيّر</TextLink>
          </div>
          <Separator />
          <div className="flex justify-center" data-pin={7}>
            <Pin n={7} />
            <TextLink className="font-semibold text-[#146c3a]">اسأل عن هذا الجهاز على واتساب</TextLink>
          </div>
        </Card>
      </div>
    </div>
  )
}
