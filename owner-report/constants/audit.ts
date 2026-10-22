// محتوى تقرير تجربة الزبون لموقع التكنولوجيا الذهبية
// المصدر: جولة حيّة في الموقع (22 أكتوبر 2026) + صفحات السياسات + مقارنة المنافسين + أبحاث Baymard
// كل ادعاء في هذا الملف له دليل: صورة من الجولة، أو رابط للصفحة، أو رابط للدراسة.

export const report = {
  store: "التكنولوجيا الذهبية",
  site: "goldentech.com.sa",
  date: "22 أكتوبر 2026",
  preparedBy: "Pixilated Studio",
  years: "18",
}

export type Tone = "good" | "warn" | "bad"
export type Source = { label: string; url?: string }

// روابط المصادر المستخدمة أكثر من مرة
const S = {
  shot: { label: "صورة من جولتنا في الموقع، 22 أكتوبر 2026" },
  terms: {
    label: "صفحة الشروط والأحكام",
    url: "https://goldentech.com.sa/en/terms-and-conditions",
  },
  returns: {
    label: "صفحة الإرجاع والاستبدال",
    url: "https://goldentech.com.sa/en/return-exchange",
  },
  faq: { label: "صفحة الأسئلة الشائعة", url: "https://goldentech.com.sa/ar/faqs" },
  baymardCart: {
    label: "Baymard: أسباب ترك سلة الشراء، استبيان 2025",
    url: "https://baymard.com/lists/cart-abandonment-rate",
  },
  extraReturns: {
    label: "إكسترا: سياسة الإرجاع",
    url: "https://www.extra.com/en-sa/returnexchange",
  },
  amazonReturns: {
    label: "أمازون: سياسة الإرجاع",
    url: "https://www.amazon.sa/-/en/gp/help/customer/display.html?nodeId=GKM69DUUYKQWKWX7",
  },
  noonReturns: {
    label: "نون: سياسة الإرجاع",
    url: "https://www.noon.com/saudi-en/return-policy/",
  },
  jarirReturns: {
    label: "جرير: سياسة الإرجاع",
    url: "https://www.jarir.com/sa-en/customer-care/return-and-exchange",
  },
} satisfies Record<string, Source>

export const summary = {
  greeting:
    "جرّبنا الشراء من موقعكم كأننا زبون يريد جهاز ألعاب، من إعلان جوجل حتى الدفع.",
  headline:
    "موقعكم قوي في عرض المنتجات وفي البحث. أكثر ما يُقلق الزبون أمران: وعود التوصيل والإرجاع تختلف من صفحة لأخرى، وخطوة الدفع غير واضحة. إصلاحهما أولاً هو أسرع طريق لطلبات أكثر.",
  score: 48,
  scoreNote: "أساس جيد نبني عليه",
  readingGuide:
    "اقرؤوا الخلاصة، ثم «أهم 8 أمور للإصلاح» ومع كل واحدة صورتها من موقعكم، ثم «خطة العمل».",
}

export const stats: { key: string; title: string; value: string; note: string; tone: Tone }[] = [
  { key: "strengths", title: "نقاط قوة", value: "12", note: "يتقنها موقعكم اليوم", tone: "good" },
  { key: "urgent", title: "ملاحظات عاجلة", value: "2", note: "نبدأ بها أولاً", tone: "bad" },
  { key: "important", title: "ملاحظات مهمة", value: "16", note: "تُبطئ الزبون أو تُضعف ثقته", tone: "warn" },
]

export const strengths: { key: string; title: string; text: string }[] = [
  { key: "search", title: "البحث السريع", text: "تظهر المنتجات فوراً مع الصور والأسعار." },
  { key: "finder", title: "أداة اختيار الكمبيوتر", text: "يختار الزبون المعالج والذاكرة وكرت الشاشة فيرى الأجهزة المناسبة." },
  { key: "filters", title: "فلاتر وترتيب بالسعر", text: "تسعة فلاتر للمواصفات، وترتيب من الأرخص للأغلى." },
  { key: "specs", title: "جدول مواصفات مفصّل", text: "يذكر ماركة كل قطعة داخل الجهاز." },
  { key: "sticky", title: "زر الشراء يبقى ظاهراً", text: "السعر وزر السلة أمام الزبون أثناء القراءة." },
  { key: "warranty", title: "الضمان واضح", text: "«ضمان 24 شهراً» تحت السعر مباشرة." },
  { key: "guest", title: "شراء بدون حساب واستلام من المعرض", text: "الزبون يشتري دون تسجيل، ويستلم من المعرض." },
  { key: "shipping", title: "الشحن المجاني ظاهر في السلة", text: "شريط أخضر يخبر الزبون بالشحن المجاني." },
  { key: "payments", title: "طرق دفع محلية", text: "مدى، فيزا، ماستركارد، تابي، تمارا، وتقسيط البطاقات." },
  { key: "official", title: "البيانات الرسمية موجودة", text: "السجل التجاري والرقم الضريبي ورمز الريال الجديد." },
  { key: "arabic", title: "موقع عربي كامل", text: "النسخة العربية كاملة ومرتبة من اليمين لليسار." },
  { key: "reputation", title: "سمعة ممتازة خارج الموقع", text: "تقييم المحل بين 4.5 و4.8 من 5 في مواقع التقييم." },
]

export type Proof = { src: string; alt: string; caption: string; w: number; h: number }

export type Problem = {
  id: string
  icon: string
  urgency: "عاجل" | "مهم"
  phase: 1 | 2
  title: string
  sees: string
  proof?: Proof
  quote?: { text: string; source: Source }
  compare?: { label: string; text: string; mine?: boolean; source: Source }[]
  buttons?: { src: string; w: number; h: number; where: string }[]
  why: string
  whySource?: Source
  legal?: string
  fix: string
  sources: Source[]
}

export const problems: Problem[] = [
  {
    id: "1",
    icon: "delivery",
    urgency: "عاجل",
    phase: 1,
    title: "الموقع يعطي وعدين مختلفين عن مدة التوصيل",
    sees: "صفحة المنتج تقول «24 ساعة» داخل الرياض، وصفحة الشروط تقول من 3 إلى 7 أيام عمل.",
    proof: {
      src: "evidence/proof-delivery.webp",
      alt: "صندوق التوصيل في صفحة المنتج: Delivery in Riyadh: 24 hours, other cities: 3-6 business days",
      caption: "صفحة المنتج (النسخة الإنجليزية): «التوصيل في الرياض 24 ساعة، والمدن الأخرى من 3 إلى 6 أيام عمل».",
      w: 440,
      h: 74,
    },
    quote: {
      text: "داخل الرياض من 3 إلى 7 أيام عمل، وخارج الرياض من 7 إلى 10 أيام عمل.",
      source: S.terms,
    },
    why: "الزبون الذي يرى وعدين يشكّ في الاثنين. 20 من كل 100 زبون يتركون الطلب لأن التوصيل بطيء.",
    whySource: S.baymardCart,
    fix: "وعد واحد لكل مدينة، يُكتب كتاريخ: «يصلك يوم الخميس إذا طلبت قبل الساعة 4 عصراً»، ونفس الوعد في كل الصفحات.",
    sources: [S.shot, S.terms, S.faq],
  },
  {
    id: "2",
    icon: "returns",
    urgency: "عاجل",
    phase: 1,
    title: "سياسة الإرجاع ضيّقة: 7 أيام وللعيوب فقط",
    sees: "الإرجاع فقط إذا كان في الجهاز عيب. الإكسسوارات لا تُرجع، وطلبات التقسيط لا تُرجع.",
    compare: [
      { label: "التكنولوجيا الذهبية", text: "7 أيام، للعيوب فقط", mine: true, source: S.returns },
      { label: "إكسترا", text: "14 يوماً للطلبات أونلاين", source: S.extraReturns },
      { label: "أمازون", text: "15 يوماً", source: S.amazonReturns },
      { label: "نون", text: "15 يوماً للمنتج المغلق", source: S.noonReturns },
    ],
    why: "13 من كل 100 زبون يتركون الشراء بسبب سياسة الإرجاع.",
    whySource: S.baymardCart,
    legal:
      "نظام التجارة الإلكترونية في المملكة يعطي المستهلك حق الإلغاء خلال 7 أيام للمنتج غير المستخدم، لذلك ننصح بمراجعة قانونية لهذه الصفحة.",
    fix: "إرجاع خلال 14 يوماً للمنتج المغلق، بشروط مكتوبة بوضوح، ورسم واحد معروف، ونموذج إرجاع على الموقع.",
    sources: [S.returns, S.terms],
  },
  {
    id: "3",
    icon: "cart",
    urgency: "مهم",
    phase: 1,
    title: "أرقام السلة تُربك الزبون",
    sees: "سعر الجهاز 4,699 ريالاً، لكن «المجموع الفرعي» 4,086، و«إجمالي التوفير −1,900» يبدو كأنه خصم إضافي.",
    proof: {
      src: "evidence/proof-cart.webp",
      alt: "ملخص السلة: Subtotal 4,086، Tax 613، Total Savings -1,900، Order Total 4,699",
      caption: "صفحة السلة: المجموع الفرعي 4,086 والتوفير −1,900، والإجمالي يبقى 4,699.",
      w: 950,
      h: 380,
    },
    why: "الزبون يرى رقماً أقل من سعر الجهاز، وخصماً لا يَنقص من الإجمالي، فيظن أن في الحساب خطأ. 12 من كل 100 زبون يتركون الشراء عندما لا يفهمون المبلغ النهائي.",
    whySource: S.baymardCart,
    fix: "كل المبالغ شاملة الضريبة، و«وفّرت 1,900 ريال» كملاحظة خضراء منفصلة خارج الحساب.",
    sources: [S.shot],
  },
  {
    id: "4",
    icon: "otp",
    urgency: "مهم",
    phase: 1,
    title: "رمز الجوال قبل الدفع غير واضح",
    sees: "بعد كتابة رقم الجوال تظهر رسالة حمراء بالإنجليزي، وزر داكن مكتوب عليه «Send Otp» (أي: أرسل الرمز). لم نعرف هل الزر يعمل أم لا.",
    proof: {
      src: "evidence/proof-otp.webp",
      alt: "حقل رقم الجوال مع زر Send Otp ورسالة Please verify your phone number first",
      caption: "صفحة الدفع: «Please verify your phone number first» أي «تحقق من رقم جوالك أولاً». أخفينا رقم الجوال.",
      w: 460,
      h: 150,
    },
    why: "صفحة الدفع أغلى لحظة في الموقع. 17 من كل 100 زبون يتركون الشراء لأن خطوات الدفع طويلة أو معقدة.",
    whySource: S.baymardCart,
    fix: "رسالة واضحة بالعربي: «سنرسل لك رمزاً من 4 أرقام»، وزر بلون زر الشراء، والتحقق عند الضغط على «إتمام الطلب».",
    sources: [S.shot],
  },
  {
    id: "5",
    icon: "reviews",
    urgency: "مهم",
    phase: 2,
    title: "لا توجد تقييمات من الزبائن على المنتجات",
    sees: "في صفحة المنتج: «There are no ratings» أي «لا توجد تقييمات».",
    proof: {
      src: "evidence/proof-reviews.webp",
      alt: "قسم التقييمات في صفحة المنتج: There are no ratings",
      caption: "صفحة جهاز RTX 3050: قسم التقييمات فارغ.",
      w: 720,
      h: 235,
    },
    why: "الزبون يصدّق زبوناً مثله أكثر من الإعلان. سمعتكم خارج الموقع ممتازة، لكنها لا تظهر داخله.",
    fix: "رسالة واتساب بعد التوصيل تطلب تقييم المنتج، وعرض تقييم المحل من جوجل في الموقع.",
    sources: [
      S.shot,
      {
        label: "magicpin: 4.8 من 379 تقييماً",
        url: "https://magicpin.com/saudi-arabia/Riyadh/Al-Shumaisi/Electronics/Golden-Technology/store/228503c",
      },
      { label: "Cybo: 4.5 من 173 تقييماً", url: "https://www.cybo.com/SA-biz/golden-technology-التكنولوجيا-الذهبية" },
    ],
  },
  {
    id: "6",
    icon: "photos",
    urgency: "مهم",
    phase: 2,
    title: "صور أجهزة الألعاب متشابهة",
    sees: "أغلب الأجهزة بنفس صورة الصندوق، ويتغير فقط اسم كرت الشاشة المكتوب عليها.",
    proof: {
      src: "evidence/proof-plp.webp",
      alt: "أربعة أجهزة ألعاب في قسم PC Gaming بنفس الصورة، يتغير فقط اسم كرت الشاشة",
      caption: "قسم أجهزة الألعاب: أربعة أجهزة مختلفة بنفس الصورة.",
      w: 604,
      h: 294,
    },
    why: "جهاز بسعر 4,699 ريالاً يحتاج صوراً حقيقية تُقنع الزبون أنه يشتري جهازاً جُمّع عندكم.",
    fix: "تصوير كل جهاز من الأمام والجانب ومن الداخل، مع معرض صور في صفحة المنتج.",
    sources: [S.shot],
  },
  {
    id: "7",
    icon: "buttons",
    urgency: "مهم",
    phase: 2,
    title: "زر الشراء بخمسة أشكال مختلفة",
    sees: "نفس المهمة (اشترِ الآن) لها لون وشكل مختلف في كل صفحة.",
    buttons: [
      { src: "evidence/btn-pdp-add.webp", w: 162, h: 44, where: "صفحة المنتج والسلة" },
      { src: "evidence/btn-plp-add.webp", w: 137, h: 22, where: "صفحات الأقسام" },
      { src: "evidence/btn-pdp-buy.webp", w: 178, h: 44, where: "صفحة المنتج" },
      { src: "evidence/btn-otp.webp", w: 180, h: 67, where: "خطوة رمز الجوال" },
      { src: "evidence/btn-place-order.webp", w: 170, h: 26, where: "إتمام الطلب" },
    ],
    why: "عندما يتغير شكل الزر من صفحة لأخرى، يبحث الزبون عنه بدل أن يضغطه.",
    fix: "زر شراء واحد بلون واحد في كل الموقع، وزر ثانوي واحد لباقي الأفعال.",
    sources: [S.shot],
  },
  {
    id: "8",
    icon: "whatsapp",
    urgency: "مهم",
    phase: 1,
    title: "لا يوجد واتساب للتواصل",
    sees: "أسفل كل صفحة روابط فيسبوك وتويتر وانستغرام ويوتيوب ولينكدإن، ولا يوجد واتساب في أي صفحة جرّبناها.",
    proof: {
      src: "evidence/proof-contact.webp",
      alt: "أسفل الموقع: أيقونات التواصل الاجتماعي ومعلومات الاتصال بدون واتساب",
      caption: "أسفل الموقع: خمس منصات، وهاتف وبريد، بدون واتساب.",
      w: 730,
      h: 320,
    },
    why: "الزبون في السعودية يسأل على واتساب قبل أن يشتري جهازاً غالياً. إذا لم يجد من يجيبه، يسأل المنافس.",
    fix: "زر واتساب ثابت في كل الصفحات، ورسائل تلقائية بحالة الطلب.",
    sources: [S.shot],
  },
]

export const plan = [
  {
    key: "p1",
    phase: "المرحلة الأولى",
    when: "خلال 6 أسابيع",
    title: "تصحيح ما يقرؤه الزبون",
    items: [
      "وعد واحد للتوصيل والإرجاع في كل الصفحات",
      "ترتيب أرقام السلة",
      "توضيح خطوة رمز الجوال",
      "زر واتساب",
      "إعلان جوجل يفتح صفحة المنتج نفسه",
      "تصحيح الأخطاء الإملائية",
    ],
    result: "زبائن أقل يترددون عند الدفع، ومصروف إعلان أقل مقابل كل طلب.",
  },
  {
    key: "p2",
    phase: "المرحلة الثانية",
    when: "خلال 3 أشهر",
    title: "تحسين الشراء والشكل",
    items: [
      "شكل واحد للأزرار ومربعات المنتجات والأسعار",
      "صفحة منتج جديدة: صور حقيقية وتقييمات وتاريخ التوصيل",
      "قوائم حسب حاجة الزبون: دراسة، ألعاب، عمل، تصميم",
    ],
    result: "زبائن أكثر يضيفون للسلة، وثقة أعلى في الموقع.",
  },
  {
    key: "p3",
    phase: "المرحلة الثالثة",
    when: "خلال 6 أشهر",
    title: "النمو والتميّز",
    items: [
      "أداة تجميع جهاز الألعاب حسب الطلب",
      "صفحة طلبات الشركات وعروض الأسعار",
      "رسائل بعد البيع وطلب التقييم",
    ],
    result: "ميزة لا يقدّمها جرير ولا إكسترا ولا أمازون ولا نون، وزبائن يرجعون.",
  },
]

export const closing = {
  title: "نبدأ معكم بالمرحلة الأولى؟",
  text: "يسعد فريق Pixilated Studio أن يجلس معكم، ويشرح كل نقطة في هذا التقرير، ونتفق معاً على أول خطوة.",
}

// ———— التفاصيل (مطوية في الصفحة) ————

export const areaScores: { key: string; name: string; score: number }[] = [
  { key: "plp", name: "صفحات الأقسام والفلاتر", score: 72 },
  { key: "search", name: "البحث في الموقع", score: 69 },
  { key: "checkout", name: "السلة والدفع", score: 60 },
  { key: "home", name: "الصفحة الرئيسية", score: 50 },
  { key: "pdp", name: "صفحة المنتج", score: 47 },
  { key: "trust", name: "الثقة وخدمة العملاء", score: 44 },
  { key: "content", name: "اللغة والمحتوى", score: 35 },
  { key: "nav", name: "القوائم وترتيب الأقسام", score: 33 },
  { key: "ui", name: "التصميم والأزرار", score: 31 },
  { key: "delivery", name: "التوصيل والإرجاع", score: 29 },
]

export type Mark = "yes" | "no" | "partial" | "na"

export const competitors = {
  columns: [
    { name: "التكنولوجيا الذهبية", mine: true },
    { name: "إكسترا" },
    { name: "جرير" },
    { name: "أمازون" },
    { name: "نون" },
  ],
  rows: [
    {
      key: "delivery",
      label: "التوصيل في الرياض",
      cells: [
        { mark: "partial", note: "24 ساعة، والشروط تقول من 3 إلى 7 أيام" },
        { mark: "yes", note: "من يوم إلى 3 أيام" },
        { mark: "yes", note: "نفس اليوم قبل 5 مساءً" },
        { mark: "yes", note: "نفس اليوم لمشتركي برايم" },
        { mark: "yes", note: "نفس اليوم لمشتركي نون ون" },
      ],
    },
    {
      key: "returns",
      label: "مدة الإرجاع",
      cells: [
        { mark: "no", note: "7 أيام، للعيوب فقط" },
        { mark: "yes", note: "14 يوماً" },
        { mark: "partial", note: "3 أيام، والإلكترونيات للعيوب فقط" },
        { mark: "yes", note: "15 يوماً" },
        { mark: "yes", note: "15 يوماً" },
      ],
    },
    {
      key: "pickup",
      label: "الاستلام من المعرض",
      cells: [
        { mark: "yes", note: "" },
        { mark: "yes", note: "خلال ساعة" },
        { mark: "yes", note: "" },
        { mark: "no", note: "" },
        { mark: "no", note: "" },
      ],
    },
    {
      key: "reviews",
      label: "تقييمات الزبائن",
      cells: [
        { mark: "no", note: "" },
        { mark: "yes", note: "" },
        { mark: "yes", note: "" },
        { mark: "yes", note: "" },
        { mark: "yes", note: "" },
      ],
    },
    {
      key: "builder",
      label: "تجميع جهاز ألعاب حسب الطلب",
      cells: [
        { mark: "no", note: "فرصة لتتميزوا" },
        { mark: "no", note: "" },
        { mark: "no", note: "" },
        { mark: "no", note: "" },
        { mark: "no", note: "" },
      ],
    },
  ] as { key: string; label: string; cells: { mark: Mark; note: string }[] }[],
  sources: [
    { label: "إكسترا: التوصيل", url: "https://www.extra.com/en-sa/delivery" },
    S.extraReturns,
    { label: "جرير: وعد التوصيل", url: "https://www.jarir.com/sa-en/delivery-promise" },
    S.jarirReturns,
    {
      label: "أمازون: التوصيل في نفس اليوم",
      url: "https://www.amazon.sa/-/en/gp/help/customer/display.html?nodeId=GTFUTRQF459U3H3Y",
    },
    S.amazonReturns,
    S.noonReturns,
  ] as Source[],
}

export type Step = {
  n: number
  icon: string
  title: string
  good: string
  problem: string
  tone: Tone
  shot?: { src: string; w: number; h: number }
}

export const journey: Step[] = [
  { n: 1, icon: "google", title: "الدخول من إعلان جوجل", good: "البحث والعروض واضحة، وصفقة اليوم قوية.", problem: "الإعلان يفتح الصفحة الرئيسية وليس المنتج المطلوب.", tone: "warn", shot: { src: "evidence/step-1-home.webp", w: 900, h: 519 } },
  { n: 2, icon: "search", title: "البحث عن كرت شاشة", good: "نتائج فورية بالصور والأسعار.", problem: "قائمة «عمليات البحث الأخيرة» تعرض ما كتبه زبائن آخرون.", tone: "warn", shot: { src: "evidence/step-2-recent.webp", w: 1040, h: 258 } },
  { n: 3, icon: "list", title: "تصفّح أجهزة الألعاب", good: "أداة اختيار، وفلاتر، وترتيب بالسعر.", problem: "صور الأجهزة متشابهة، والأسماء طويلة جداً.", tone: "warn", shot: { src: "evidence/step-3-list.webp", w: 900, h: 923 } },
  { n: 4, icon: "product", title: "صفحة المنتج", good: "السعر واضح، والضمان 24 شهراً، وجدول المواصفات مفصّل.", problem: "وعد التوصيل يخالف الشروط، ولا توجد تقييمات.", tone: "bad", shot: { src: "evidence/step-4-product.webp", w: 900, h: 519 } },
  { n: 5, icon: "cart", title: "السلة", good: "الشحن المجاني واضح.", problem: "أرقام المجموع تُربك.", tone: "bad", shot: { src: "evidence/step-5-cart.webp", w: 900, h: 432 } },
  { n: 6, icon: "location", title: "بيانات التوصيل والدفع", good: "شراء بدون حساب، وخريطة للموقع، واستلام من المعرض، وطرق دفع محلية.", problem: "خطوة رمز الجوال غير واضحة، وزر «Place Order» أزرق بلون مختلف.", tone: "bad", shot: { src: "evidence/step-6-checkout.webp", w: 900, h: 956 } },
  { n: 7, icon: "login", title: "تسجيل الدخول", good: "الصفحة بسيطة.", problem: "رابط «Create an account» باهت ويصعب رؤيته.", tone: "warn", shot: { src: "evidence/step-8-login.webp", w: 480, h: 360 } },
]

export const quickNotes: {
  icon: string
  text: string
  image?: { src: string; alt: string; w: number; h: number }
  source?: Source
}[] = [
  {
    icon: "text",
    text: "خطأ إملائي في إعلان الصفحة الرئيسية: كُتبت pergormance والصحيح performance.",
    image: { src: "evidence/pc-gaming-banner.webp", alt: "إعلان PC GAMING في الصفحة الرئيسية", w: 1200, h: 214 },
  },
  {
    icon: "shuffle",
    text: "مربعات الأقسام في الصفحة الرئيسية تتحرك، فلا يجد الزبون القسم في نفس المكان.",
    image: { src: "evidence/category-tiles.webp", alt: "مربعات الأقسام في الصفحة الرئيسية", w: 1200, h: 134 },
  },
  {
    icon: "percent",
    text: "ثلاثة عروض تقسيط مختلفة في صف واحد، كل واحد بشروط مختلفة.",
    image: { src: "evidence/instalment-banners.webp", alt: "إعلانات التقسيط في الصفحة الرئيسية", w: 1200, h: 216 },
  },
  {
    icon: "cursor",
    text: "كل بطاقة منتج فيها زر ذهبي بنفس لون العناوين والأشرطة، فلا يبرز زر الشراء.",
    image: { src: "evidence/gold-buttons.webp", alt: "بطاقات اللابتوب بأزرار ذهبية", w: 1200, h: 394 },
  },
  {
    icon: "building",
    text: "لا توجد صفحة لطلبات الشركات. أحد الزبائن كتب طلب عرض سعر داخل مربع البحث (السطر الأخير في الصورة).",
    image: { src: "evidence/step-2-recent.webp", alt: "قائمة عمليات البحث الأخيرة وفيها طلب عرض سعر", w: 1040, h: 258 },
  },
  {
    icon: "text",
    text: "أخطاء في أسفل الموقع: «Usefull links» و«Warrnty» و«© 2025».",
    image: { src: "evidence/proof-contact.webp", alt: "أسفل الموقع", w: 730, h: 320 },
  },
  {
    icon: "delivery",
    text: "رسوم التوصيل في الشروط «20 ريالاً لكل طلب»، وفي الأسئلة الشائعة «10 ريالات للطلب أقل من 200»، وفي السلة «شحن مجاني».",
    source: S.terms,
  },
  {
    icon: "lock",
    text: "الأسئلة الشائعة تقول «يجب أن تكون مسجلاً لتشتري»، بينما صفحة الدفع تسمح بالشراء بدون حساب.",
    source: { label: "الأسئلة الشائعة (إنجليزي)", url: "https://goldentech.com.sa/en/faqs" },
  },
]

export const method = [
  "تصفّحنا الموقع بالعربي والإنجليزي كأننا زبون، من الصفحة الرئيسية حتى صفحة الدفع، يوم 22 أكتوبر 2026، وصوّرنا كل خطوة.",
  "قرأنا صفحات الشروط والإرجاع والضمان والأسئلة الشائعة، وكل اقتباس في التقرير له رابط.",
  "قارنّا الموقع مع إكسترا وجرير وأمازون ونون من صفحاتهم الرسمية.",
  "الأرقام عن سلوك الزبائن من معهد بايمارد (Baymard)، وهو معهد متخصص في تجربة التسوق الإلكتروني.",
  "قسنا 110 نقطة، ولكل نقطة وزن حسب تأثيرها على البيع، ومنها خرجت الدرجة 48.",
]

export const methodNote =
  "لم نختبر الموقع على الجوال بعد، ولا الدفع عبر Apple Pay في متصفح Safari. سنضيفهما في النسخة القادمة."
