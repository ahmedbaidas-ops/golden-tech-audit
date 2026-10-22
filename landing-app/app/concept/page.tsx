import Link from "next/link"
import { Icon, PageHead } from "@/components/ui"
import { FlowConcept } from "@/components/concept/flow/FlowConcept"

export const metadata = { title: "الكونسبت · التكنولوجيا الذهبية" }

const REFS: [string, string][] = [
  ["fd8293eb-3493-46ba-8268-d7e1ee29ee23", "الرئيسية"],
  ["ed315b58-1b1b-4e43-9987-650363135713", "اختيار طريقة الاستلام"],
  ["df0323cd-0957-4804-bf73-003f9d2c46ee", "رف العروض"],
  ["e989d382-e375-4d85-b230-a7ec733421a0", "صفحة المنتج"],
  ["da785096-b092-45df-a96e-85daefda5036", "السلة"],
  ["fa1ff676-4cde-46d5-868a-5f4f235a92a0", "الدفع"],
  ["f7fad26c-057f-4a04-b102-abf5c5a67785", "مراجعة الطلب"],
]

export default function Concept() {
  return (
    <main>
      <PageHead
        meta="تصور تصميمي · رحلة الشراء بترتيب Walmart"
        title="الكونسبت: من الرئيسية إلى تأكيد الطلب"
        sub="أربع شاشات مترابطة: الرئيسية، وصفحة المنتج، والسلة، والدفع. لكل شاشة لقطة من الموقع اليوم وتصور جديد. أخذنا من Walmart ترتيب الصفحات ومكوناتها، وأبقينا الكحلي والذهبي، فالأزرق والأصفر لونا إكسترا. الصور والأسعار من موقعكم يوم 22 أكتوبر 2026."
        actions={
          <Link className="pill-btn" href="/website/">
            <span className="ic">
              <Icon name="web" />
            </span>
            مراجعة الموقع
          </Link>
        }
      />
      <FlowConcept />
      <p className="refs">
        مرجع المكونات: واجهة Walmart على الويب كما وثّقتها Mobbin:{" "}
        {REFS.map(([id, label], i) => (
          <span key={id}>
            {i > 0 && "، "}
            <a href={`https://mobbin.com/screens/${id}`} target="_blank" rel="noopener">
              {label}
            </a>
          </span>
        ))}
        . النصوص الجديدة أمثلة على الصياغة المقترحة، و«الإرجاع خلال 14 يوماً» يحتاج تعديل السياسة أولاً.
      </p>
      <p className="foot">
        إعداد <bdi>Pixilated Studio</bdi>. تصور تصميمي للنقاش وليس متجراً يعمل.
      </p>
    </main>
  )
}
