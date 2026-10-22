import { PageHead } from "@/components/ui"
import { Plans } from "@/components/proposal/Plans"

export const metadata = { title: "العرض المالي · Pixilated Studio" }

export default function Proposal() {
  return (
    <main>
      <PageHead
        meta="العرض المالي · Pixilated Studio"
        title="باقتان شهريتان لتنفيذ ما في التقرير"
        sub="الأولى للموقع وتجربة الشراء، والثانية تضيف إعادة بناء الهوية. الأسعار بالريال السعودي، والإجمالي يتغير مع المدة التي تختارونها."
      />
      <section className="sec">
        <Plans />
      </section>
      <p className="foot">
        إعداد <bdi>Pixilated Studio</bdi> لشركة التكنولوجيا الذهبية، 22 أكتوبر 2026.
      </p>
    </main>
  )
}
