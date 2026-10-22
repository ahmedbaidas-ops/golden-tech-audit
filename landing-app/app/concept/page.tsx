import Link from "next/link"
import { Icon, PageHead } from "@/components/ui"
import { ConceptView } from "@/components/concept/ConceptView"

export const metadata = { title: "الكونسبت · التكنولوجيا الذهبية" }

export default function Concept() {
  return (
    <main>
      <PageHead
        meta="تصور تصميمي · ترتيب مستوحى من Walmart"
        title="الكونسبت: الصفحة الرئيسية من جديد"
        sub="أخذنا من Walmart ترتيب الصفحة: بحث كبير في الأعلى وموعد التوصيل بجانبه، والأقسام حسب الاستخدام، وبطاقات منتج فيها السعر والتوفير وموعد الوصول. وأبقينا الكحلي والذهبي، فالأزرق والأصفر لونا إكسترا."
        actions={
          <Link className="pill-btn" href="/website/">
            <span className="ic">
              <Icon name="web" />
            </span>
            مراجعة الموقع
          </Link>
        }
      />
      <ConceptView />
      <p className="refs">
        مرجع الترتيب: واجهة Walmart على الويب كما وثّقتها Mobbin:{" "}
        <a href="https://mobbin.com/screens/fd8293eb-3493-46ba-8268-d7e1ee29ee23" target="_blank" rel="noopener">
          الصفحة الرئيسية
        </a>
        ،{" "}
        <a href="https://mobbin.com/screens/df0323cd-0957-4804-bf73-003f9d2c46ee" target="_blank" rel="noopener">
          رفوف المنتجات
        </a>
        ،{" "}
        <a href="https://mobbin.com/screens/ed315b58-1b1b-4e43-9987-650363135713" target="_blank" rel="noopener">
          اختيار طريقة الاستلام
        </a>
        ،{" "}
        <a href="https://mobbin.com/screens/e989d382-e375-4d85-b230-a7ec733421a0" target="_blank" rel="noopener">
          صفحة المنتج
        </a>
        . النصوص الجديدة في التصور أمثلة على الصياغة المقترحة، والأزرار تعمل للعرض فقط.
      </p>
      <p className="foot">
        إعداد <bdi>Pixilated Studio</bdi>. تصور تصميمي للنقاش وليس متجراً يعمل.
      </p>
    </main>
  )
}
