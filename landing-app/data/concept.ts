// Concept homepage data. Products, prices and savings are the gaming PCs on the site's
// PC Gaming page on 22 Oct 2026 (price shown and saving shown; was = price + saving).
export type CxItem = { img: string; gpu: string; spec: string; now: number; save: number; rate?: string }
export type Change = { t: string; was: string; now: string; fix: string; u: "bad" | "warn" | "gold" }

export const CX_ITEMS: CxItem[] = [
  { img: "p10", gpu: "RTX 3050 6GB", spec: "Core i5-14400F · 16GB · 1TB SSD", now: 4699, save: 1900 },
  { img: "p11", gpu: "RTX 5050 8GB", spec: "Core i5-14400F · 16GB · 1TB SSD", now: 5249, save: 850 },
  { img: "p12", gpu: "RTX 3050 6GB", spec: "Ryzen 5 7600X · 16GB · 1TB SSD", now: 5299, save: 1700 },
  { img: "p13", gpu: "RTX 5060 8GB", spec: "Core i5-14400F · 16GB · 1TB SSD", now: 5599, save: 2350, rate: "5.0" },
  { img: "p30", gpu: "RTX 5060 Ti 16GB", spec: "Ryzen 7 7800X3D · 16GB · 1TB SSD", now: 8599, save: 950 },
  { img: "p31", gpu: "RTX 5060 Ti 16GB", spec: "Core i7-14700F · 32GB · 1TB SSD", now: 9299, save: 1700 },
  { img: "p32", gpu: "RTX 5070 12GB", spec: "Core i7-14700F · 32GB · 1TB SSD", now: 9399, save: 1200, rate: "4.5" },
  { img: "p33", gpu: "RX 9070 XT 16GB", spec: "Core i7-14700K · 32GB · 1TB SSD", now: 9899, save: 2100 },
]

export const CX_CATS: [string, string, number?][] = [
  ["كل العروض", "i-tag", 1],
  ["للدراسة", "i-book"],
  ["للألعاب", "i-game"],
  ["للعمل", "i-brief"],
  ["للتصميم", "i-brush"],
  ["الطابعات", "i-printer"],
  ["الإكسسوارات", "i-head"],
]

export const CHANGES: Change[] = [
  {
    t: "وعد التوصيل",
    was: "«24 ساعة» في صفحة المنتج، و«3 إلى 7 أيام عمل» في صفحة الشروط",
    now: "تاريخ واحد في رأس كل صفحة: «يصلك الخميس، اطلب قبل 4 عصراً»",
    fix: "الملاحظة 1",
    u: "bad",
  },
  { t: "التواصل", was: "خمس منصات وهاتف وبريد أسفل الصفحة، ولا واتساب", now: "واتساب في رأس كل صفحة", fix: "الملاحظة 8", u: "warn" },
  {
    t: "التصفح",
    was: "«جميع الأقسام» بأسماء أنواع المنتجات",
    now: "«حسب الاستخدام»: دراسة، ألعاب، عمل، تصميم",
    fix: "خطة المرحلة الثانية",
    u: "gold",
  },
  {
    t: "السعر",
    was: "سعر أحمر، وسعر قديم مشطوب، ونسبة خصم، ومبلغ توفير: أربع إشارات للخصم نفسه",
    now: "«الآن 4,699» واضح بالأخضر، والقديم مشطوب، و«وفّر 1,900» شارة واحدة",
    fix: "الملاحظة 3",
    u: "warn",
  },
  {
    t: "زر الشراء",
    was: "خمسة أشكال للزر نفسه في خمس صفحات",
    now: "زر واحد «أضف للسلة» بلون واحد، يتحول إلى عدّاد",
    fix: "الملاحظة 7",
    u: "warn",
  },
  {
    t: "التقييمات",
    was: "أغلب المنتجات بلا تقييم من الزبائن",
    now: "التقييم على البطاقة حين يوجد، و«لا تقييمات بعد» حين لا يوجد، ورسالة واتساب بعد التوصيل تطلبه",
    fix: "الملاحظة 5",
    u: "warn",
  },
  {
    t: "الإرجاع والثقة",
    was: "إرجاع 7 أيام وللعيوب فقط، ومكتوب في صفحة الشروط",
    now: "شريط ثقة في كل صفحة: إرجاع 14 يوماً بعد تعديل السياسة، وضمان 24 شهراً، ووسائل الدفع",
    fix: "الملاحظة 2",
    u: "bad",
  },
]
