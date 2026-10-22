"use client"

import { useEffect, useRef, useState } from "react"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { flowImg } from "@/lib/asset"
import { Button } from "@/components/shadcn/button"
import { Card } from "@/components/shadcn/card"
import { Input } from "@/components/shadcn/input"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/shadcn/input-otp"
import { Label } from "@/components/shadcn/label"
import { RadioGroup, RadioGroupItem } from "@/components/shadcn/radio-group"
import { Separator } from "@/components/shadcn/separator"
import { Spinner } from "@/components/shadcn/spinner"
import { fmt } from "../../ui"
import { Pin, Svg, TextLink, sar, type Flow } from "./parts"

const WAIT = 30
// in the demo any four digits pass, except 0000, which shows the wrong-code state
const WRONG = "0000"

type Otp = "idle" | "sending" | "sent" | "checking" | "wrong" | "ok"

const PRIMARY = "h-12 w-full rounded-full text-base font-bold active:scale-[.98]"

/** Walmart checkout: a bare header, sections in one card, and the place-order button on top of the summary. */
export function Checkout({ f }: { f: Flow }) {
  const [phone, setPhone] = useState("")
  const [touched, setTouched] = useState(false)
  const [otp, setOtp] = useState<Otp>("idle")
  const [code, setCode] = useState("")
  const [left, setLeft] = useState(0)
  const [pay, setPay] = useState("card")
  const [placing, setPlacing] = useState(false)
  const [done, setDone] = useState(false)
  const timers = useRef<number[]>([])
  const ship = f.fulfil === "ship"
  const okPhone = /^5\d{8}$/.test(phone)
  const badPhone = touched && phone.length > 0 && !okPhone
  const verified = otp === "ok"
  const vat = (f.total * 15) / 115
  const quarter = fmt(Math.round((f.total / 4) * 100) / 100)

  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms))
  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  useEffect(() => {
    if (left <= 0) return
    const t = setTimeout(() => setLeft((l) => l - 1), 1000)
    return () => clearTimeout(t)
  }, [left])

  const send = () => {
    setOtp("sending")
    later(() => {
      setOtp("sent")
      setCode("")
      setLeft(WAIT)
    }, 700)
  }
  const check = (v: string) => {
    setOtp("checking")
    later(() => setOtp(v === WRONG ? "wrong" : "ok"), 600)
  }
  const place = () => {
    setPlacing(true)
    later(() => setDone(true), 900)
  }

  const PAY = [
    { k: "card", t: "بطاقة مدى أو بطاقة ائتمانية", s: "ادفع المبلغ كاملاً الآن", em: sar(f.total) },
    { k: "tabby", t: "تابي: 4 دفعات بلا فوائد", s: "الدفعة الأولى اليوم", em: `4 × ${quarter}` },
    { k: "tamara", t: "تمارا: 4 دفعات بلا فوائد", s: "الدفعة الأولى اليوم", em: `4 × ${quarter}` },
    { k: "bank", t: "تقسيط بالبطاقة الائتمانية", s: "حسب شروط البنك المصدر للبطاقة", em: "" },
  ]

  return (
    <>
      <div className="wm-co-top">
        <div className="wm-in">
          <Button
            variant="ghost"
            size="icon-lg"
            className="rounded-full text-white hover:bg-white/10 hover:text-white"
            onClick={() => f.go(2)}
            aria-label="العودة إلى السلة"
          >
            <Svg name="chev" className="size-5 -rotate-90" />
          </Button>
          <h3>إتمام الطلب</h3>
        </div>
      </div>
      {done ? (
        <div className="wm-in">
          <div className="wm-done" role="status">
            <span className="tick" aria-hidden="true">
              ✓
            </span>
            <h3>وصلنا طلبك</h3>
            <p className="wm-help">
              {ship ? "يصلك غداً في الرياض." : "نرسل لك رسالة عندما يجهز طلبك في المعرض."} أرسلنا التفاصيل في رسالة إلى{" "}
              <bdi dir="ltr">+966 {phone}</bdi>.
            </p>
            <Button className="h-11 rounded-full px-6 font-bold" onClick={f.reset}>
              العودة إلى الرئيسية
            </Button>
          </div>
        </div>
      ) : (
        <div className="wm-in wm-body tight">
          <div className="wm-cartgrid">
            <Card className="gap-0 rounded-lg py-0 shadow-[0_1px_4px_rgb(0_0_0/.05)]">
              <div className="wm-band">
                <div className="row">
                  <b>{ship ? "توصيل غداً بدون رسوم" : "استلام من المعرض بدون رسوم"}</b>
                  <TextLink onClick={() => f.setFulfil(ship ? "pickup" : "ship")}>غيّر</TextLink>
                </div>
                <span>{ship ? "إلى عنوانك في الرياض." : "شارع العليا، الرياض. نحتفظ بطلبك حتى تستلمه."}</span>
              </div>

              <section className="wm-sec" data-pin={1} aria-labelledby="co-phone">
                <Pin n={1} />
                <header>
                  <h4 id="co-phone">رقم الجوال</h4>
                  {verified && <span className="done">تم تأكيد الرقم</span>}
                </header>
                {otp === "idle" || otp === "sending" ? (
                  <form
                    className="grid max-w-[420px] gap-3"
                    onSubmit={(e) => {
                      e.preventDefault()
                      setTouched(true)
                      if (okPhone) send()
                    }}
                  >
                    <div className="grid gap-1.5">
                      <Label htmlFor="wm-phone" className="text-[0.8rem] font-bold">
                        رقم الجوال
                      </Label>
                      <div dir="ltr" className="flex h-12 overflow-hidden rounded-[4px] border border-[#74767c] focus-within:border-navy focus-within:ring-2 focus-within:ring-navy">
                        <span className="grid place-items-center border-e border-border bg-muted px-3 text-[0.92rem] text-muted-foreground">+966</span>
                        <Input
                          id="wm-phone"
                          inputMode="numeric"
                          autoComplete="tel-national"
                          placeholder="5X XXX XXXX"
                          aria-invalid={badPhone}
                          aria-describedby="wm-phone-help"
                          value={phone}
                          onBlur={() => setTouched(true)}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 9))}
                          className="h-full flex-1 rounded-none border-0 bg-white text-base tracking-wider shadow-none focus-visible:ring-0"
                        />
                      </div>
                      <p id="wm-phone-help" className={badPhone ? "text-[0.8rem] text-bad" : "wm-help"}>
                        {badPhone ? "اكتب رقماً سعودياً من 9 أرقام يبدأ بـ 5." : "نرسل رمزاً من 4 أرقام في رسالة نصية."}
                      </p>
                    </div>
                    <Button type="submit" className="h-11 justify-self-end rounded-full px-6 font-bold" disabled={otp === "sending"}>
                      {otp === "sending" ? (
                        <>
                          <Spinner aria-hidden="true" />
                          نرسل الرمز…
                        </>
                      ) : (
                        "أرسل الرمز"
                      )}
                    </Button>
                  </form>
                ) : verified ? (
                  <p className="wm-help">
                    سنرسل تحديثات الطلب إلى <bdi dir="ltr">+966 {phone}</bdi>.
                  </p>
                ) : (
                  <div className="grid gap-3">
                    <div className="wm-actions">
                      <p className="wm-help">
                        أرسلنا الرمز إلى <bdi dir="ltr">+966 {phone}</bdi>
                      </p>
                      <TextLink
                        onClick={() => {
                          setOtp("idle")
                          setCode("")
                        }}
                      >
                        غيّر الرقم
                      </TextLink>
                    </div>
                    <div dir="ltr" className="flex justify-end">
                      <InputOTP
                        maxLength={4}
                        pattern={REGEXP_ONLY_DIGITS}
                        value={code}
                        onChange={(v) => {
                          setCode(v)
                          if (otp === "wrong") setOtp("sent")
                        }}
                        onComplete={check}
                        disabled={otp === "checking"}
                        aria-label="رمز التأكيد"
                        autoFocus
                      >
                        <InputOTPGroup className="gap-2">
                          {[0, 1, 2, 3].map((i) => (
                            <InputOTPSlot
                              key={i}
                              index={i}
                              aria-invalid={otp === "wrong"}
                              className="size-14 rounded-[4px] border border-[#74767c] bg-white font-heading text-xl font-bold first:rounded-[4px] first:border-l last:rounded-[4px] data-[active=true]:border-navy data-[active=true]:ring-2 data-[active=true]:ring-navy"
                            />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                    <div className="wm-actions" aria-live="polite">
                      {otp === "checking" ? (
                        <p className="wm-help flex items-center gap-2">
                          <Spinner aria-hidden="true" /> نتحقق من الرمز…
                        </p>
                      ) : otp === "wrong" ? (
                        <p className="text-[0.8rem] text-bad">الرمز غير صحيح. راجع الرسالة واكتبه مرة أخرى.</p>
                      ) : (
                        <p className="wm-help">للعرض: أي 4 أرقام تنجح، و0000 تعرض حالة الخطأ.</p>
                      )}
                      {left > 0 ? (
                        <p className="wm-help">أعد الإرسال بعد 0:{String(left).padStart(2, "0")}</p>
                      ) : (
                        <TextLink onClick={send}>أعد إرسال الرمز</TextLink>
                      )}
                    </div>
                  </div>
                )}
              </section>

              <section className="wm-sec" data-pin={3} aria-labelledby="co-pay">
                <Pin n={3} />
                <header>
                  <h4 id="co-pay">طريقة الدفع</h4>
                </header>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="wm-logos" src={flowImg("pay-logos")} alt="مدى وماستركارد وفيزا" width={275} height={70} />
                <RadioGroup value={pay} onValueChange={setPay} className="gap-2" aria-labelledby="co-pay">
                  {PAY.map((o) => (
                    <Label
                      key={o.k}
                      htmlFor={`pay-${o.k}`}
                      className="grid cursor-pointer grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-border px-4 py-3 text-[0.9rem] leading-normal font-normal has-[[data-state=checked]]:border-2 has-[[data-state=checked]]:border-navy has-[[data-state=checked]]:px-[15px] has-[[data-state=checked]]:py-[11px]"
                    >
                      <RadioGroupItem
                        value={o.k}
                        id={`pay-${o.k}`}
                        className="size-5 border-[#74767c] text-navy data-[state=checked]:border-navy [&_svg]:size-2.5 [&_svg]:fill-navy"
                      />
                      <span>
                        {o.t}
                        <small className="block text-[0.78rem] text-muted-foreground">{o.s}</small>
                      </span>
                      {o.em && (
                        <em dir="ltr" className="text-[0.86rem] font-bold whitespace-nowrap not-italic">
                          {o.em}
                        </em>
                      )}
                    </Label>
                  ))}
                </RadioGroup>
              </section>
            </Card>

            <div className="wm-col">
              <Card className="gap-3 rounded-lg px-5 py-5 shadow-[0_1px_4px_rgb(0_0_0/.05)]">
                <div data-pin={2}>
                  <Pin n={2} />
                  <Button className={PRIMARY} disabled={!verified || placing} onClick={place}>
                    {placing ? (
                      <>
                        <Spinner aria-hidden="true" />
                        نرسل طلبك…
                      </>
                    ) : (
                      `أكّد الطلب · ${sar(f.total)}`
                    )}
                  </Button>
                </div>
                <p className="wm-legal">{verified ? "بالضغط على الزر توافق على الشروط وسياسة الإرجاع." : "أكّد رقم جوالك أولاً لتفعيل الزر."}</p>
                <Separator />
                <div className="wm-row">
                  <span>المجموع ({f.count} منتج)</span>
                  <span>{sar(f.total)}</span>
                </div>
                <div className="wm-row">
                  <span>{ship ? "التوصيل" : "الاستلام"}</span>
                  <span className="ok">بدون رسوم</span>
                </div>
                <div className="wm-row">
                  <span>منها ضريبة القيمة المضافة 15%</span>
                  <span>{sar(vat)}</span>
                </div>
                <Separator />
                <div className="wm-row total border-0 pt-0">
                  <span>الإجمالي</span>
                  <b>{sar(f.total)}</b>
                </div>
              </Card>
              <p className="wm-saving">وفّرت {sar(f.saved)} في هذا الطلب</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
