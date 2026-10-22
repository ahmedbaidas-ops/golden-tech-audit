"use client"

import { useRef } from "react"
import { CATEGORIES, HERO_PC, SHELF, type Product } from "@/data/flow"
import { flowImg } from "@/lib/asset"
import { Badge } from "@/components/shadcn/badge"
import { Button } from "@/components/shadcn/button"
import { Carousel, CarouselContent, CarouselItem, useCarousel } from "@/components/shadcn/carousel"
import { Toggle } from "@/components/shadcn/toggle"
import { cssVars, fmt } from "../../ui"
import { Pin, Stepper, Svg, TextLink, type Flow } from "./parts"

const MAX_SAVE = Math.max(...SHELF.map((p) => p.was - p.now))

/** Walmart homepage order: tiles around a hero, round category photos, then a shelf of deals. */
export function Home({ f }: { f: Flow }) {
  const shelf = useRef<HTMLElement>(null)

  return (
    <div className="wm-in wm-body">
      <div className="wm-bento">
        <div className="wm-tile light" style={cssVars({ "--bg": "#eef0f4" })}>
          <h4>آي ماك 24 إنش</h4>
          <span className="shop">تسوّق منتجات أبل</span>
          <span className="from">
            <small>الآن</small>
            <b>6,999</b> ر.س<s>8,999</s>
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={flowImg("imac")} alt="" width={340} height={320} />
        </div>
        <div className="wm-hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={flowImg("banner-18")} alt="إعلان من الموقع: خصم إضافي حتى 18% بمناسبة 18 عاماً" width={1320} height={418} />
        </div>
        <div className="wm-tile light" style={cssVars({ "--bg": "#e6ecf7" })}>
          <h4>لابتوبات الألعاب</h4>
          <span className="shop">تسوّق الآن</span>
          <span className="from">
            <small>تبدأ من</small>
            <b>6,999</b> ر.س
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={flowImg("legion-pro5")} alt="" width={200} height={200} />
        </div>
        <div className="wm-tile light tall wide-img" style={cssVars({ "--bg": "#fbeecb" })}>
          <h4>هدية مع جهاز الألعاب</h4>
          <span className="shop">كيبورد وماوس وسماعة ولوحة ماوس</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={flowImg("gift-set")} alt="" width={305} height={182} />
        </div>
        <div className="wm-bento-mid">
          <div className="wm-tile dark tall" style={cssVars({ "--bg": "#06040b" })}>
            <h4>عروض أجهزة الألعاب</h4>
            <TextLink
              className="text-[0.8rem] font-medium text-white"
              onClick={() => shelf.current?.scrollIntoView({ block: "center", behavior: "smooth" })}
            >
              وفّر حتى {fmt(MAX_SAVE)} ر.س
            </TextLink>
            <span className="from">
              <small>تبدأ من</small>
              <b>{fmt(HERO_PC.now)}</b> ر.س
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={flowImg("pc-rtx5070")} alt="" width={200} height={200} />
          </div>
          <div className="wm-tile dark tall wide-img" style={cssVars({ "--bg": "#0b0b0d" })}>
            <h4>خصم 5% إضافي ببطاقات مدى</h4>
            <span className="shop">بالكود MADA عند الدفع، بلا حد أعلى</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={flowImg("banner-mada5")} alt="" width={512} height={180} />
          </div>
        </div>
        <div className="wm-tile light tall" style={cssVars({ "--bg": "#eef0f4" })}>
          <h4>Alienware 16 بكرت RTX 5070</h4>
          <span className="shop">تسوّق ديل</span>
          <span className="from">
            <small>الآن</small>
            <b>9,399</b> ر.س<s>9,999</s>
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={flowImg("alienware-16")} alt="" width={200} height={200} />
        </div>
      </div>

      <section data-pin={3}>
        <Pin n={3} />
        <div className="wm-h">
          <h3>تسوّق حسب القسم</h3>
        </div>
        <div className="wm-cats">
          {CATEGORIES.map(([k, label]) => (
            <button type="button" className="wm-cat" key={k}>
              <span className="c">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={flowImg(`cat-${k}`)} alt="" width={136} height={136} />
              </span>
              {label}
            </button>
          ))}
        </div>
      </section>

      <section ref={shelf} aria-labelledby="wm-deals">
        <div className="wm-h">
          <div>
            <h3 id="wm-deals">عروض أجهزة الألعاب</h3>
            <p>الأسعار شاملة ضريبة القيمة المضافة</p>
          </div>
          <TextLink>عرض الكل</TextLink>
        </div>
        <Carousel opts={{ direction: "rtl", align: "start", slidesToScroll: "auto" }} aria-label="عروض أجهزة الألعاب">
          <CarouselContent className="py-3">
            {SHELF.map((p, i) => (
              <CarouselItem key={p.id} className="basis-1/2 sm:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6">
                <Card p={p} f={f} first={i === 0} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <ShelfArrows />
        </Carousel>
      </section>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="wm-wide"
        src={flowImg("banner-macbook")}
        alt="إعلان من الموقع: MacBook Pro متوفر الآن بشرائح M5 وM5 Pro وM5 Max"
        width={1320}
        height={366}
        loading="lazy"
      />

      <div className="wm-trust">
        <div>
          <b>ضمان 24 شهراً</b>
          <span>على الأجهزة من التكنولوجيا الذهبية</span>
        </div>
        <div>
          <b>إرجاع خلال 14 يوماً</b>
          <span>بعد تعديل سياسة الإرجاع المقترح</span>
        </div>
        <div>
          <b>4 دفعات بلا فوائد</b>
          <span>مع تابي أو تمارا</span>
        </div>
        <div>
          <b>اسألنا على واتساب</b>
          <span>قبل الشراء وبعده</span>
        </div>
      </div>
    </div>
  )
}

/** Round arrows on the shelf edges; each hides when there is nothing further that way. */
function ShelfArrows() {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel()
  const arrow = "absolute top-[34%] z-10 size-10 rounded-full border border-foreground bg-white shadow-sm disabled:invisible max-md:hidden"
  return (
    <>
      <Button variant="outline" size="icon-lg" className={`${arrow} -start-3`} disabled={!canScrollPrev} onClick={scrollPrev} aria-label="المنتجات السابقة">
        <Svg name="arrow" className="size-5 -scale-x-100" />
      </Button>
      <Button variant="outline" size="icon-lg" className={`${arrow} -end-3`} disabled={!canScrollNext} onClick={scrollNext} aria-label="المنتجات التالية">
        <Svg name="arrow" className="size-5" />
      </Button>
    </>
  )
}

function Card({ p, f, first }: { p: Product; f: Flow; first: boolean }) {
  const q = f.qty[p.id] ?? 0
  // only the device from the audit has a product page in the mock
  const open = p.id === HERO_PC.id ? () => f.go(1) : undefined
  const photo = (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={flowImg(p.img)} alt={open ? "" : p.title} width={200} height={200} loading="lazy" />
  )
  return (
    <div className="wm-card">
      <div className="media">
        {open ? (
          <button type="button" className="img" onClick={open} aria-label={`افتح صفحة ${p.title}`}>
            {photo}
          </button>
        ) : (
          <span className="img">{photo}</span>
        )}
        <Badge className="pointer-events-none absolute start-1.5 top-1.5 rounded-sm border-0 bg-bad px-2 text-[0.72rem] font-bold text-white">
          وفّر {fmt(p.was - p.now)}
        </Badge>
        <Toggle
          aria-label={`أضف ${p.title} إلى المفضلة`}
          className="absolute end-1.5 top-1.5 size-9 min-w-9 rounded-full bg-white p-0 text-foreground shadow-[0_1px_4px_rgb(0_0_0/.18)] hover:bg-white hover:text-bad data-[state=on]:bg-white data-[state=on]:text-bad data-[state=on]:[&_svg]:fill-current"
        >
          <Svg name="heart" className="size-[18px]" />
        </Toggle>
      </div>
      <div className="wm-price" data-pin={first ? 4 : undefined}>
        {first && <Pin n={4} />}
        <span className="now">
          الآن <b>{fmt(p.now)}</b> ر.س
        </span>
        <s>{fmt(p.was)}</s>
      </div>
      <h4>
        {open ? (
          <button type="button" onClick={open}>
            {p.title}
          </button>
        ) : (
          p.title
        )}
      </h4>
      {p.rate && (
        <span className="wm-rate">
          <b>{p.rate}</b> من 5
        </span>
      )}
      <span className="wm-ship">
        توصيل <b>غداً</b> في الرياض
      </span>
      <span className="wm-addwrap" data-pin={first ? 5 : undefined}>
        {first && <Pin n={5} />}
        {q === 0 ? (
          <Button
            variant="outline"
            size="sm"
            className="h-9 rounded-full border-foreground bg-white px-3.5 font-bold shadow-none hover:bg-muted hover:text-foreground"
            onClick={() => f.add(p.id, 1)}
            aria-label={`أضف ${p.title} إلى السلة`}
          >
            <Svg name="plus" />
            أضف
          </Button>
        ) : (
          <Stepper q={q} name={p.title} onChange={(d) => f.add(p.id, d)} />
        )}
      </span>
    </div>
  )
}
