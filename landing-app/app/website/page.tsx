import Link from "next/link"
import { Count, FULL_REPORT, Icon, Kpi, PageHead, SecHead, TEAM_BOARD } from "@/components/ui"
import { SectionNav } from "@/components/SectionNav"
import { AreaChart } from "@/components/website/AreaChart"
import { FixesTable, PhasePlan, ScoreGauge } from "@/components/website/Parts"

export const metadata = { title: "مراجعة الموقع · التكنولوجيا الذهبية" }

const SECTIONS: [string, string][] = [
  ["w-score", "الدرجة والأجزاء"],
  ["w-fixes", "أهم 8 أمور"],
  ["w-plan", "خطة العمل"],
]

export default function WebsiteAudit() {
  return (
    <main>
      <PageHead
        title="مراجعة الموقع الإلكتروني"
        sub="موقعكم قوي في عرض المنتجات وفي البحث. أكثر ما يُقلق الزبون أمران: وعود التوصيل والإرجاع تختلف من صفحة لأخرى، وخطوة الدفع غير واضحة. راجعناه يوم 22 أكتوبر 2026."
        actions={
          <>
            <a className="pill-btn" href={TEAM_BOARD} target="_blank" rel="noopener">
              <span className="ic">
                <Icon name="grid" />
              </span>
              لوحة الفريق
            </a>
            <a className="pill-btn primary" href={FULL_REPORT} target="_blank" rel="noopener">
              <span className="ic">
                <Icon name="doc" />
              </span>
              التقرير الكامل
            </a>
          </>
        }
      />
      <section className="kpis" aria-label="الموقع في أرقام">
        <Kpi
          accent
          label="درجة الموقع"
          icon="gauge"
          value={
            <b className="num">
              <Count to={48} />
            </b>
          }
          extra={
            <>
              <span className="k-of">من 100</span>
              <span className="chip on-dark">متوسط</span>
            </>
          }
          foot={
            <>
              قسنا <b className="num">110</b> نقطة، لكل نقطة وزن
            </>
          }
        />
        <Kpi
          label="ملاحظات عاجلة"
          icon="flag"
          tone="bad"
          value={
            <b className="num">
              <Count to={2} />
            </b>
          }
          foot="كلاهما في المرحلة الأولى"
        />
        <Kpi
          label="ملاحظات مهمة"
          icon="list"
          tone="gold"
          value={
            <b className="num">
              <Count to={6} />
            </b>
          }
          foot={
            <>
              <b className="num">3</b> في المرحلة الأولى و<b className="num">3</b> في الثانية
            </>
          }
        />
        <Kpi
          label="نقاط قوة"
          icon="check"
          tone="good"
          value={
            <b className="num">
              <Count to={12} />
            </b>
          }
          foot="أساس جيد نبني عليه"
        />
      </section>
      <SectionNav label="أقسام مراجعة الموقع" items={SECTIONS} />

      <section className="sec" id="w-score">
        <SecHead
          title="الدرجة وأجزاء الموقع"
          sub="قسنا 110 نقطة، لكل نقطة وزن حسب تأثيرها على البيع، ثم جمعناها في عشرة أجزاء، كل جزء من 100."
        />
        <div className="row-2">
          <AreaChart />
          <div className="card gauge-card reveal">
            <div className="card-head">
              <h3>درجة الموقع</h3>
              <span className="chip warn">متوسط</span>
            </div>
            <ScoreGauge />
            <div className="minis">
              <div className="mini">
                <span>نقاط القياس</span>
                <p>
                  <b className="num">110</b>
                </p>
              </div>
              <div className="mini">
                <span>أمور للإصلاح</span>
                <p>
                  <b className="num">8</b>
                  <span className="chip bad">2 عاجل</span>
                </p>
              </div>
            </div>
            <p className="note" style={{ marginTop: 12 }}>
              الأقوى صفحات الأقسام (72) والبحث (69)، والأضعف التوصيل والإرجاع (29) والتصميم (31).
            </p>
          </div>
        </div>
      </section>

      <section className="sec" id="w-fixes">
        <SecHead
          title="أهم 8 أمور للإصلاح"
          sub="مرتّبة من الأهم. اضغطوا على أي سطر لترَوا ما يراه الزبون والحل. الصور والمصادر في التقرير الكامل."
        />
        <FixesTable />
      </section>

      <section className="sec" id="w-plan">
        <SecHead title="خطة العمل" sub="نبدأ بتصحيح ما يقرؤه الزبون قبل أي تصميم جديد، لأنه الأسرع أثراً." />
        <PhasePlan />
        <div className="cta-row">
          <a className="btn dark" href={FULL_REPORT} target="_blank" rel="noopener">
            اقرأ التقرير الكامل
          </a>
          <Link className="btn line" href="/brand/">
            → مراجعة العلامة التجارية
          </Link>
        </div>
      </section>
      <p className="foot">
        إعداد <bdi>Pixilated Studio</bdi>. الأرقام عن سلوك الزبائن من معهد بايمارد (Baymard). لم نختبر الموقع على الجوال بعد، ولا الدفع عبر
        Apple Pay في متصفح Safari.
      </p>
    </main>
  )
}
