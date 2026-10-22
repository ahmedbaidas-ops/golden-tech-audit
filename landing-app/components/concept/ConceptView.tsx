"use client"

import { useRef, useState } from "react"
import { CHANGES, CX_CATS, CX_ITEMS } from "@/data/concept"
import { Tabs } from "../Tabs"
import { Icon, Logo, cssVars, fmt } from "../ui"

/** Gold numbered marker on the mock; each number matches a row of the change table. */
function Pin({ n }: { n: number }) {
  return (
    <span className="pin" aria-hidden="true" style={cssVars({ "--pi": n })}>
      {n}
    </span>
  )
}

const MAX_SAVE = Math.max(...CX_ITEMS.map((p) => p.save))

/**
 * Before/after of the homepage. "After" is a Walmart-structured homepage in Golden's colours:
 * the cart, favourites and shelf arrows work; everything else is static.
 */
export function ConceptView() {
  const [tab, setTab] = useState(1)
  const [pins, setPins] = useState(true)
  const [cart, setCart] = useState<Record<number, number>>({})
  const [hearts, setHearts] = useState<Record<number, boolean>>({})
  const [bump, setBump] = useState(0)
  const mock = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const count = Object.values(cart).reduce((s, q) => s + q, 0)
  const total = Object.entries(cart).reduce((s, [i, q]) => s + q * CX_ITEMS[Number(i)].now, 0)

  const add = (i: number, d: number) => {
    setCart((c) => ({ ...c, [i]: Math.max(0, (c[i] ?? 0) + d) }))
    setBump((b) => b + 1)
  }
  // RTL: "next" reveals cards further to the left, so it scrolls by a negative amount
  const slide = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * track.current.clientWidth * 0.8 })
  const showPin = (n: number) => {
    setTab(1)
    requestAnimationFrame(() => {
      const el = mock.current?.querySelector<HTMLElement>(`[data-pin="${n}"]`)
      if (!el) return
      el.scrollIntoView({
        block: "center",
        inline: "nearest",
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      })
      el.classList.remove("flash")
      void el.offsetWidth
      el.classList.add("flash")
    })
  }

  return (
    <>
      <div className="cmp-bar">
        <Tabs label="قبل وبعد" labels={["قبل: الموقع اليوم", "بعد: التصور الجديد"]} value={tab} onChange={setTab} />
        {tab === 1 && (
          <label className="toggle">
            <input type="checkbox" checked={pins} onChange={(e) => setPins(e.target.checked)} /> أظهر أرقام التحسينات
          </label>
        )}
      </div>
      <div className="card frame-card reveal">
        <div className="browser" aria-hidden="true">
          <span className="dots">
            <i />
            <i />
            <i />
          </span>
          <span className="url" dir="ltr">
            goldentech.com.sa/ar
          </span>
        </div>
        <div className="shot">
          {tab === 0 ? (
            <figure className="before-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/concept/before.webp"
                alt="الصفحة الرئيسية الحالية لموقع التكنولوجيا الذهبية يوم 22 أكتوبر 2026"
                width={1400}
                height={807}
              />
              <figcaption>الموقع اليوم: لقطة من الصفحة الرئيسية يوم 22 أكتوبر 2026، وقائمة «جميع الأقسام» مفتوحة.</figcaption>
            </figure>
          ) : (
            <div className={pins ? "cx" : "cx no-pins"} ref={mock} role="region" aria-label="تصور الصفحة الرئيسية الجديدة">
              <div className="cx-top">
                <span className="cx-logo">
                  <Logo k="golden" size={40} />
                  <b>التكنولوجيا الذهبية</b>
                </span>
                <span className="cx-deliv" data-pin="1">
                  <Pin n={1} />
                  <span className="ic">
                    <svg>
                      <use href="#i-truck" />
                    </svg>
                  </span>
                  <span>
                    <b>يصلك الخميس</b>
                    <small>الرياض · اطلب قبل 4 عصراً</small>
                  </span>
                </span>
                <label className="cx-search">
                  <input type="search" placeholder="ابحث عن لابتوب، كرت شاشة، طابعة…" aria-label="بحث تجريبي داخل التصور" />
                  <span className="go">
                    <svg>
                      <use href="#i-search" />
                    </svg>
                  </span>
                </label>
                <span className="cx-acts">
                  <span className="cx-wa" data-pin="2">
                    <Pin n={2} />
                    <svg>
                      <use href="#i-chat" />
                    </svg>
                    <span className="lbl">
                      <small>تواصلوا معنا</small>
                      <b>واتساب</b>
                    </span>
                  </span>
                  <span>
                    <svg>
                      <use href="#i-user" />
                    </svg>
                    <span className="lbl">
                      <small>مرحباً</small>
                      <b>حسابي</b>
                    </span>
                  </span>
                  <span className="cx-cart">
                    <svg>
                      <use href="#i-cart" />
                    </svg>
                    <i className={bump ? "cx-badge bump" : "cx-badge"} key={bump}>
                      {count}
                    </i>
                    <span className="lbl">
                      <small>السلة</small>
                      <b>{fmt(total)} ر.س</b>
                    </span>
                  </span>
                </span>
              </div>
              <div className="cx-sub">
                <span className="dd">
                  <svg>
                    <use href="#i-grid" />
                  </svg>
                  الأقسام
                  <svg>
                    <use href="#i-chev" />
                  </svg>
                </span>
                <span className="dd" data-pin="3">
                  <Pin n={3} />
                  <svg>
                    <use href="#i-target" />
                  </svg>
                  حسب الاستخدام
                  <svg>
                    <use href="#i-chev" />
                  </svg>
                </span>
                <i className="sep"></i>
                <span>عروض اليوم</span>
                <span>أجهزة الألعاب</span>
                <span>لابتوبات الأعمال</span>
                <span>الطابعات</span>
                <span>طلبات الشركات</span>
                <span>الضمان والإرجاع</span>
              </div>
              <div className="cx-body">
                <div className="cx-bento">
                  <div className="t t-a">
                    <img src="/concept/p13.webp" alt="" />
                    <h5>صفقة اليوم</h5>
                    <p>
                      جهاز ألعاب <bdi dir="ltr">RTX 5060</bdi> بسعر 5,599 ر.س
                    </p>
                    <span className="big">وفّر 2,350 ر.س</span>
                  </div>
                  <div className="t t-b">
                    <h5>ساعدني أختار جهازي</h5>
                    <p>نسألكم عن الاستخدام والميزانية، ونرشح جهازاً.</p>
                    <span className="big">3 أسئلة</span>
                    <span className="lnk">ابدأ</span>
                  </div>
                  <div className="t hero">
                    <small>أجهزة الألعاب</small>
                    <h5>
                      كروت <bdi dir="ltr">RTX 50</bdi> الجديدة جاهزة للتوصيل
                    </h5>
                    <p>
                      من <b>5,249</b> ر.س
                    </p>
                    <span className="cta">تسوقوا الآن</span>
                    <img src="/concept/p11.webp" alt="" />
                  </div>
                  <div className="t t-c t-mac">
                    <img src="/concept/mac.webp" alt="" />
                    <h5>
                      <bdi dir="ltr">MacBook Pro</bdi> بشريحة <bdi dir="ltr">M5</bdi>
                    </h5>
                    <p>
                      متوفر الآن مع <bdi dir="ltr">M5 Pro</bdi> و<bdi dir="ltr">M5 Max</bdi>
                    </p>
                    <span className="lnk">تسوقوا</span>
                  </div>
                  <div className="t t-d">
                    <h5>قسّطها مع تابي أو تمارا</h5>
                    <span className="big">4 دفعات</span>
                    <span className="lnk">كيف يعمل</span>
                  </div>
                  <div className="t t-e">
                    <h5>لشركتك: اطلب عرض سعر</h5>
                    <p>أجهزة وملحقات بكميات</p>
                    <span className="lnk">اطلب الآن</span>
                  </div>
                  <div className="t t-f">
                    <h5>ضمان من الذهبية</h5>
                    <span className="big">24 شهراً</span>
                    <span className="lnk">التفاصيل</span>
                  </div>
                </div>
                <section>
                  <div className="cx-sec-h">
                    <h4>تسوقوا حسب الاستخدام</h4>
                  </div>
                  <div className="cx-cats">
                    {CX_CATS.map(([label, icon, solid]) => (
                      <span key={label} className={solid ? "cx-cat solid" : "cx-cat"}>
                        <span className="c">
                          <svg>
                            <use href={`#${icon}`} />
                          </svg>
                        </span>
                        {label}
                      </span>
                    ))}
                  </div>
                </section>
                <section className="cx-shelf">
                  <div className="cx-sec-h">
                    <div>
                      <h4>أجهزة ألعاب بأفضل سعر</h4>
                      <p>المنتجات والأسعار من صفحة أجهزة الألعاب في الموقع يوم 22 أكتوبر 2026</p>
                    </div>
                    <span className="all">عرض الكل</span>
                  </div>
                  <button type="button" className="cx-arrow prev" aria-label="المنتجات السابقة" onClick={() => slide(1)}>
                    <svg>
                      <use href="#i-arrow" />
                    </svg>
                  </button>
                  <div className="cx-track" ref={track}>
                    {CX_ITEMS.map((p, i) => {
                      const q = cart[i] ?? 0
                      return (
                        <article className="cx-card" key={p.img}>
                          <div className="img">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={`/concept/${p.img}.webp`} alt={`جهاز ألعاب ${p.gpu}`} width={200} height={200} loading="lazy" />
                            <span className="cx-tag">وفّر {fmt(p.save)} ر.س</span>
                            {p.save === MAX_SAVE && <span className="cx-tag best">أكبر توفير</span>}
                            <button
                              type="button"
                              className="cx-heart"
                              aria-pressed={!!hearts[i]}
                              aria-label={`أضف جهاز ${p.gpu} إلى المفضلة`}
                              onClick={() => setHearts((h) => ({ ...h, [i]: !h[i] }))}
                            >
                              <svg>
                                <use href="#i-heart" />
                              </svg>
                            </button>
                          </div>
                          <p className="price" data-pin={i === 0 ? 4 : undefined}>
                            {i === 0 && <Pin n={4} />}
                            <span className="now">
                              الآن <b>{fmt(p.now)}</b> ر.س
                            </span>
                            <s>{fmt(p.now + p.save)}</s>
                          </p>
                          <p className="inst">أو 4 دفعات × {fmt(p.now / 4)} ر.س</p>
                          <h5>
                            جهاز ألعاب <bdi dir="ltr">{p.gpu}</bdi>
                          </h5>
                          <p className="spec">
                            <bdi dir="ltr">{p.spec}</bdi>
                          </p>
                          {p.rate ? (
                            <p className="rate" data-pin={p.rate === "5.0" ? 6 : undefined}>
                              {p.rate === "5.0" && <Pin n={6} />}
                              <span className="st">★</span> {p.rate} من 5
                            </p>
                          ) : (
                            <p className="rate none">لا تقييمات بعد</p>
                          )}
                          <p className="ship">
                            <svg>
                              <use href="#i-truck" />
                            </svg>
                            يصلك <b>الخميس</b>
                          </p>
                          <div className="cx-buywrap" data-pin={i === 0 ? 5 : undefined}>
                            {i === 0 && <Pin n={5} />}
                            {q ? (
                              <div className="step">
                                <button type="button" aria-label="أنقص الكمية" onClick={() => add(i, -1)}>
                                  −
                                </button>
                                <b aria-live="polite">{q}</b>
                                <button type="button" aria-label="زد الكمية" onClick={() => add(i, 1)}>
                                  +
                                </button>
                              </div>
                            ) : (
                              <button type="button" className="add" onClick={() => add(i, 1)}>
                                <Icon name="plus" />
                                أضف للسلة
                              </button>
                            )}
                          </div>
                        </article>
                      )
                    })}
                  </div>
                  <button type="button" className="cx-arrow next" aria-label="المنتجات التالية" onClick={() => slide(-1)}>
                    <svg>
                      <use href="#i-arrow" />
                    </svg>
                  </button>
                </section>
                <div className="cx-trust" data-pin="7">
                  <Pin n={7} />
                  <div>
                    <svg>
                      <use href="#i-truck" />
                    </svg>
                    <span>
                      وعد توصيل واحد<small>نفس التاريخ في كل صفحة</small>
                    </span>
                  </div>
                  <div>
                    <svg>
                      <use href="#i-return" />
                    </svg>
                    <span>
                      إرجاع خلال 14 يوماً<small>بعد تعديل السياسة</small>
                    </span>
                  </div>
                  <div>
                    <svg>
                      <use href="#i-shield" />
                    </svg>
                    <span>
                      ضمان 24 شهراً<small>من التكنولوجيا الذهبية</small>
                    </span>
                  </div>
                  <div>
                    <svg>
                      <use href="#i-chat" />
                    </svg>
                    <span>
                      واتساب<small>في كل صفحة</small>
                    </span>
                  </div>
                  <div>
                    <svg>
                      <use href="#i-card" />
                    </svg>
                    <span>
                      دفع آمن<small>مدى، بطاقات، تابي، تمارا</small>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <section className="sec" id="c-changes">
        <div className="sec-head reveal">
          <div>
            <h2>ما الذي تغيّر، ولماذا</h2>
            <p>أرقام الأسطر هي نفس الأرقام على التصميم، وزر «أرني» ينقلكم إلى مكان التغيير.</p>
          </div>
        </div>
        <div className="card reveal">
          <div className="chg-row head" aria-hidden="true">
            <span>#</span>
            <span>الموقع اليوم</span>
            <span>في التصور</span>
            <span>يحل</span>
          </div>
          {CHANGES.map((c, i) => (
            <div className="chg-row" key={c.t}>
              <span className="no">{i + 1}</span>
              <span className="was">
                <span className="topic">{c.t}</span>
                <span className="m-lab">الموقع اليوم</span>
                {c.was}
              </span>
              <span>
                <span className="m-lab">في التصور</span>
                {c.now}
              </span>
              <span className="solves">
                <span className={`chip ${c.u}`}>{c.fix}</span>
                <button type="button" className="show-btn" onClick={() => showPin(i + 1)}>
                  <Icon name="pin" />
                  أرني
                </button>
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
