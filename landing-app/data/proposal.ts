// Pixilated Studio's two monthly plans for Golden Technology, as set by the studio. Prices in SAR.
export type Plan = {
  id: string
  no: number
  name: string
  en: string
  monthly: number
  months: number[]
  includes: [string, string][]
  covers: { label: string; href: string }[]
}

export const PLANS: Plan[] = [
  {
    id: "ux",
    no: 1,
    name: "تجربة المستخدم والواجهات",
    en: "Monthly UX/UI",
    monthly: 13500,
    months: [6, 12],
    includes: [
      ["استراتيجية تجربة المستخدم", "UX strategy"],
      ["تحسين الموقع وإعادة تصميمه", "Enhancements · revamp"],
      ["نظام تصميم من 100 مكوّن", "Design system · 100 components"],
    ],
    covers: [{ label: "الملاحظات الثماني في مراجعة الموقع", href: "/website/" }],
  },
  {
    id: "brand",
    no: 2,
    name: "تجربة المستخدم والواجهات وإعادة بناء الهوية",
    en: "UX/UI + Rebranding",
    monthly: 16000,
    months: [6],
    includes: [
      ["الاستراتيجية", "Strategy"],
      ["تجربة المستخدم والواجهات", "UX/UI"],
      ["إعادة بناء الهوية", "Rebranding"],
    ],
    covers: [
      { label: "الملاحظات الثماني في مراجعة الموقع", href: "/website/" },
      { label: "فجوات التموضع في مراجعة العلامة", href: "/brand/" },
    ],
  },
]
