// Concept purchase flow. Products, prices and images come from goldentech.com.sa on 22 Oct 2026:
// the PC Gaming product page we tested, and the site search for "rtx 5070". "was" is the struck price shown.

// dark: the photo sits on black, as on the site
export type Product = { id: string; img: string; brand: string; title: string; now: number; was: number; rate?: string; dark?: boolean }

// the device we bought in the audit: its product page, cart and checkout are the before shots
export const HERO_PC: Product = {
  id: "pc3050",
  img: "pc-rtx3050",
  brand: "التكنولوجيا الذهبية",
  title: "جهاز ألعاب Core i5-14400F، رام 16GB، تخزين 1TB، كرت RTX 3050 6GB، ويندوز 11",
  now: 4699,
  was: 6599,
  dark: true,
}

export const SHELF: Product[] = [
  HERO_PC,
  { id: "aero", img: "aero-x16", brand: "Gigabyte", title: "لابتوب ألعاب جيجابايت Aero X16 EG63H بمعالج AMD", now: 6999, was: 8999 },
  { id: "alien", img: "alienware-16", brand: "Dell", title: "لابتوب ألعاب ديل Alienware 16 Aurora AC16250، كرت RTX 5070", now: 9399, was: 9999 },
  { id: "pc5070", img: "pc-rtx5070", brand: "التكنولوجيا الذهبية", title: "جهاز ألعاب Core i7-14700F، رام 32GB، كرت RTX 5070 12GB", now: 9399, was: 10599, rate: "4.5", dark: true },
  { id: "legion5", img: "legion-pro5", brand: "Lenovo", title: "لابتوب ألعاب لينوفو Legion Pro 5 16IAX10", now: 11989, was: 12999 },
  { id: "strix", img: "rog-strix-g815", brand: "ASUS", title: "لابتوب ألعاب أسوس ROG Strix G815LR", now: 12499, was: 14399 },
  { id: "legionT7", img: "legion-t7", brand: "Lenovo", title: "جهاز ألعاب لينوفو Legion T7 34IAS10، كرت RTX 5070 Ti", now: 13999, was: 16999, dark: true },
]

// the site's own category row, right to left as it appears on the homepage
export const CATEGORIES: [string, string][] = [
  ["server", "السيرفرات"],
  ["gaming-monitor", "شاشات الألعاب"],
  ["apple", "منتجات أبل"],
  ["gaming-pc", "بي سي ألعاب"],
  ["desktop", "الكمبيوتر المكتبي"],
  ["laptop", "كمبيوتر لابتوب"],
  ["projector", "البروجيكتور"],
  ["scanner", "الماسح الضوئي"],
]

// specs as listed on the product page
export const SPECS: [string, string][] = [
  ["المعالج", "Intel Core i5-14400F (الجيل 14)"],
  ["الذاكرة", "16GB Patriot Viper Venom RGB DDR5 6000MHz"],
  ["التخزين", "1TB SSD M.2"],
  ["كرت الشاشة", "ASUS Dual GeForce RTX 3050 6GB"],
  ["التبريد", "HIGHEND V90 ARGB+PWM"],
  ["نظام التشغيل", "Windows 11 Professional"],
]

export type Step = { key: string; label: string; url: string; before: string; w: number; h: number; beforeAlt: string; beforeNote: string }

export const STEPS: Step[] = [
  {
    key: "home",
    label: "الرئيسية",
    url: "goldentech.com.sa/ar",
    before: "before-home",
    w: 1400,
    h: 807,
    beforeAlt: "الصفحة الرئيسية الحالية",
    beforeNote: "الصفحة الرئيسية اليوم، وقائمة «جميع الأقسام» مفتوحة.",
  },
  {
    key: "product",
    label: "صفحة المنتج",
    url: "goldentech.com.sa/ar/pc-gaming-intel-core-i5-14400f-rtx-3050",
    before: "before-product",
    w: 1400,
    h: 807,
    beforeAlt: "صفحة المنتج الحالية",
    beforeNote: "صفحة الجهاز الذي اشتريناه: زران للشراء بلونين، و«24 ساعة» للتوصيل هنا مقابل «3 إلى 7 أيام» في الشروط.",
  },
  {
    key: "cart",
    label: "السلة",
    url: "goldentech.com.sa/ar/checkout/cart",
    before: "before-cart",
    w: 1400,
    h: 462,
    beforeAlt: "السلة الحالية",
    beforeNote: "السلة اليوم: مجموع فرعي 4,086 وضريبة 613 و«توفير» بالسالب 1,900، والإجمالي 4,699.",
  },
  {
    key: "checkout",
    label: "الدفع",
    url: "goldentech.com.sa/ar/checkout",
    before: "before-otp",
    w: 730,
    h: 336,
    beforeAlt: "خطوة رمز الجوال الحالية",
    beforeNote: "خطوة رمز الجوال اليوم: رسالة حمراء بالإنجليزي، وزر داكن «Send Otp».",
  },
]

export type Change = { pin: number; title: string; was: string; now: string; fix: string; tone: "bad" | "warn" | "gold" }

// what each screen changes, numbered like the pins on the design
export const CHANGES: Record<string, Change[]> = {
  home: [
    { pin: 1, title: "موعد التوصيل", was: "لا يظهر في الرئيسية، و«24 ساعة» في صفحة المنتج مقابل «3 إلى 7 أيام» في الشروط", now: "موعد واحد في رأس كل صفحة: «يصلك غداً»", fix: "الملاحظة 1", tone: "bad" },
    { pin: 2, title: "واتساب", was: "لا يوجد في أي صفحة", now: "في رأس كل صفحة", fix: "الملاحظة 8", tone: "warn" },
    { pin: 3, title: "الأقسام", was: "قائمة نصية طويلة تفتح فوق الإعلان", now: "صور الأقسام نفسها من موقعكم، في صف واحد واضح", fix: "خطة المرحلة الثانية", tone: "gold" },
    { pin: 4, title: "السعر", was: "سعر أحمر وقديم مشطوب ونسبة خصم ومبلغ توفير", now: "سعر واحد واضح، والقديم مشطوب، وشارة توفير واحدة", fix: "الملاحظة 3", tone: "warn" },
    { pin: 5, title: "زر الإضافة", was: "خمسة أشكال للزر نفسه", now: "زر «أضف» واحد بنفس الشكل في كل البطاقات", fix: "الملاحظة 7", tone: "warn" },
  ],
  product: [
    { pin: 1, title: "طريقة الاستلام", was: "«24 ساعة» هنا و«3 إلى 7 أيام» في الشروط، والاستلام من المعرض مخفي حتى الدفع", now: "خياران واضحان قبل الشراء: توصيل بموعد، أو استلام من المعرض", fix: "الملاحظة 1", tone: "bad" },
    { pin: 2, title: "الإرجاع", was: "7 أيام وللعيوب فقط، ومكتوب في صفحة الشروط", now: "سطر الإرجاع بجانب زر الشراء (14 يوماً بعد تعديل السياسة)", fix: "الملاحظة 2", tone: "bad" },
    { pin: 3, title: "السعر والتوفير", was: "سعر أحمر ونسبة ومبلغ توفير بالأخضر في سطر واحد", now: "السعر أولاً، ثم «وفّرت 1,900 ر.س» في سطر مستقل", fix: "الملاحظة 3", tone: "warn" },
    { pin: 4, title: "زر الشراء", was: "زران: «أضف للسلة» ذهبي و«اشتر الآن» كحلي", now: "زر واحد «أضف إلى السلة»", fix: "الملاحظة 7", tone: "warn" },
    { pin: 5, title: "التقييمات", was: "«كن أول من يقيّم» بخط صغير", now: "حالة واضحة، ورسالة بعد التوصيل تطلب التقييم", fix: "الملاحظة 5", tone: "warn" },
    { pin: 6, title: "الصور", was: "صورة صندوق تتكرر في معظم الأجهزة", now: "مكان لصور الجهاز نفسه من الأمام والجانب والداخل", fix: "الملاحظة 6", tone: "warn" },
    { pin: 7, title: "السؤال قبل الشراء", was: "لا يوجد واتساب", now: "«اسأل عن هذا الجهاز على واتساب» تحت زر الشراء", fix: "الملاحظة 8", tone: "warn" },
  ],
  cart: [
    { pin: 1, title: "الإجمالي", was: "مجموع فرعي 4,086 + ضريبة 613 + «توفير» −1,900 = 4,699", now: "سعر واحد شامل الضريبة، والإجمالي 4,699، والتوفير ملاحظة خارج الحساب", fix: "الملاحظة 3", tone: "warn" },
    { pin: 2, title: "موعد الوصول", was: "لا يظهر في السلة", now: "«يصلك غداً» فوق المنتجات، مع زر التغيير", fix: "الملاحظة 1", tone: "bad" },
    { pin: 3, title: "الإرجاع والضمان", was: "غير ظاهرين", now: "تحت كل منتج", fix: "الملاحظة 2", tone: "bad" },
  ],
  checkout: [
    { pin: 1, title: "رمز الجوال", was: "رسالة حمراء بالإنجليزي وزر «Send Otp» داكن", now: "شرح بالعربي، و4 خانات للرمز، ومهلة لإعادة الإرسال", fix: "الملاحظة 4", tone: "warn" },
    { pin: 2, title: "زر التأكيد", was: "أزرق «Place Order» بلون لا يظهر في بقية الموقع", now: "نفس لون زر الشراء، ومعطّل مع شرح حتى يتأكد الرقم", fix: "الملاحظة 7", tone: "warn" },
    { pin: 3, title: "التقسيط", was: "«Pay 4 interest-free payments» بالإنجليزي وبدون قيمة الدفعة", now: "بالعربي مع قيمة كل دفعة: 4 × 1,174.75 ر.س", fix: "خطة المرحلة الأولى", tone: "gold" },
  ],
}
