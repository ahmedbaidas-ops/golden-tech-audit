import Link from "next/link"
import { Kpi, Count, LogoStack, PageHead } from "@/components/ui"
import { SectionNav } from "@/components/SectionNav"
import { Channels, Segments } from "@/components/brand/Company"
import { Swot } from "@/components/brand/Swot"
import { PositionMaps } from "@/components/brand/PositionMaps"
import { Archetype, Emotions, Traits, Values } from "@/components/brand/Personality"
import { AssessRows, Avoid, Directions, Hypotheses, NotValues, Pillars, Products, ToneSliders } from "@/components/brand/Static"
import { Icon } from "@/components/ui"

export const metadata = { title: "مراجعة العلامة التجارية · التكنولوجيا الذهبية" }

const SECTIONS: [string, string][] = [
  ["b-company", "الشركة"],
  ["b-audience", "الجمهور"],
  ["b-competitors", "المنافسون"],
  ["b-position", "التموضع"],
  ["b-gaps", "الفجوات والاتجاهات"],
  ["b-personality", "الشخصية"],
  ["b-values", "القيم والمشاعر"],
  ["b-pillars", "ركائز المحتوى"],
]

export default function BrandAudit() {
  return (
    <main>
      <PageHead
        title="مراجعة العلامة التجارية"
        sub="الذهبية متجر يبيع أجهزة علامات عالمية، فما يميزها هو سبب شراء الزبون منها بدل متجر آخر يبيع الجهاز نفسه."
        actions={
          <Link className="pill-btn primary" href="/website/">
            <span className="ic">
              <Icon name="web" />
            </span>
            مراجعة الموقع
          </Link>
        }
      />
      <div className="promise-band reveal">
        <div>
          <small>الوعد المقترح للعلامة</small>
          <b>نجعل التقنية أسهل في الفهم والاختيار وأكثر جدارة بالثقة.</b>
          <span className="en">We make technology easier to understand, choose, and trust.</span>
        </div>
      </div>
      <section className="kpis" aria-label="العلامة في أرقام">
        <Kpi
          label="الشخصية الأساسية"
          icon="mask"
          value={
            <b className="num">
              <Count to={70} />%
            </b>
          }
          extra={<span className="chip gold">الحكيم</span>}
          foot={
            <>
              والقريب من الناس <b className="num">30%</b>
            </>
          }
        />
        <Kpi
          label="المنافسون"
          icon="scale"
          tone="gold"
          value={
            <b className="num">
              <Count to={4} />
            </b>
          }
          extra={<LogoStack keys={["jarir", "extra", "amazon", "noon"]} size={32} />}
          foot="مباشران ومنصتان إلكترونيتان"
        />
        <Kpi
          label="خرائط التموضع"
          icon="map"
          tone="gold"
          value={
            <b className="num">
              <Count to={3} />
            </b>
          }
          extra={<span className="chip warn">فرضيات عمل</span>}
          foot="التواصل، والجمهور، وسبب فتح الموقع"
        />
        <Kpi
          label="ركائز المحتوى"
          icon="pillar"
          tone="gold"
          value={
            <b className="num">
              <Count to={5} />
            </b>
          }
          foot="الأساسية: الإرشاد المبني على الخبرة"
        />
      </section>
      <SectionNav label="أقسام مراجعة العلامة" items={SECTIONS} />

      <section className="sec" id="b-company">
        <div className="sec-head reveal">
          <div>
            <h2>من هي الذهبية</h2>
            <p>
              تأسست في الرياض عام 2009، وتعمل بقسمين: البيع بالتجزئة (المعارض في الرياض والموقع الإلكتروني) والبيع بالجملة على المستوى
              المحلي.
            </p>
          </div>
        </div>
        <div className="grid-2">
          <div className="insight reveal">
            <span className="label">أهم نقطة لفهم الشركة</span>
            <p>
              هي ليست علامة تجارية تصنع اللابتوبات بنفسها، بل تعمل في تجارة وتوزيع منتجات علامات تقنية عالمية، وتربط بين المنتجات والمشترين
              عبر قنوات البيع.
            </p>
            <p>
              قيمة الشركة لا تأتي من مواصفات الجهاز وحدها، بل أيضاً من سبب اختيار العميل الشراء منها بدلاً من متجر آخر يبيع الجهاز نفسه.
            </p>
          </div>
          <div className="card reveal">
            <span className="label">نموذج العمل: اختاروا قناة</span>
            <Channels />
            <p className="note" style={{ marginTop: "14px" }}>
              وجود البيع بالتجزئة والجملة مدعوم بملف الشركة؛ أما حجم الإيرادات ونسبة كل مسار في المبيعات فلا تتوافر عنها بيانات موثقة.
            </p>
          </div>
        </div>
        <Products />
        <div className="card reveal" style={{ marginTop: "18px" }}>
          <span className="label">استنتاج استراتيجي</span>
          <p style={{ marginTop: "6px" }}>
            تعدد قنوات البيع فرصة للشركة، لكنه يفرض تحدياً في توحيد تجربة العميل؛ فالمشتري الفردي يحتاج إلى سهولة الاختيار والسعر والضمان،
            بينما تحتاج الشركة التي تشتري بالجملة إلى التوريد الموثوق والتوافق مع احتياجاتها وخدمة ما بعد البيع.
          </p>
        </div>
      </section>

      <section className="sec" id="b-audience">
        <div className="sec-head reveal">
          <div>
            <h2>من هم العملاء المستهدفون</h2>
            <p>ليس كل من يشتري لابتوباً جمهوراً واحداً. أربع شرائح، لكل واحدة ما يهمها وفرصة مختلفة للذهبية.</p>
          </div>
        </div>
        <div className="card reveal">
          <Segments />
        </div>
      </section>

      <section className="sec" id="b-competitors">
        <div className="sec-head reveal">
          <div>
            <h2>المنافسون وتحليل SWOT</h2>
            <p>اختاروا متجراً لترَوا نقاط قوته وضعفه والفرص والتهديدات أمامه.</p>
          </div>
        </div>
        <div className="card reveal">
          <Swot />
        </div>
        <div className="insight reveal" style={{ marginTop: "18px" }}>
          <span className="label">التحدي الاستراتيجي</span>
          <p>لماذا أشتري هذا الجهاز من الذهبية تحديداً، وليس من جرير أو أمازون أو متجر آخر؟</p>
          <p>
            الإجابة قد تكون السعر، أو التخصص التقني، أو التوفر، أو التوصية المناسبة، أو الضمان والخدمة. لكن لا يمكن اعتماد أي منها كميزة
            تنافسية مؤكدة قبل مقارنتها فعلياً مع المنافسين.
          </p>
        </div>
      </section>

      <section className="sec" id="b-position">
        <div className="sec-head reveal">
          <div>
            <h2>خرائط التموضع</h2>
            <p>ثلاث خرائط تضع الذهبية بين منافسيها. اضغطوا على أي متجر لقراءة موقعه، وفعّلوا «أظهر الهدف» لترَوا إلى أين نقترح أن تتحرك.</p>
          </div>
        </div>
        <div className="card reveal">
          <PositionMaps />
        </div>
      </section>

      <section className="sec" id="b-gaps">
        <div className="sec-head reveal">
          <div>
            <h2>الفجوات والاتجاهات</h2>
            <p>تقييم أولي للهوية، ثم أربع فرضيات نختبرها بدل افتراض وجود مشكلات، ثم ثلاثة اتجاهات تموضع تستحق الاختبار.</p>
          </div>
        </div>
        <div className="grid-2">
          <div className="card reveal">
            <span className="label">التقييم الأولي للهوية والتموضع</span>
            <table className="tbl" style={{ marginTop: "6px" }}>
              <thead>
                <tr>
                  <th>البعد</th>
                  <th>الملاحظة الأولية</th>
                </tr>
              </thead>
              <tbody>
                <AssessRows />
              </tbody>
            </table>
          </div>
          <div>
            <span className="label">أربع فرضيات نختبرها</span>
            <Hypotheses />
          </div>
        </div>
        <div style={{ marginTop: "22px" }}>
          <span className="label">ثلاثة اتجاهات تموضع تستحق الاختبار</span>
          <p className="note" style={{ marginTop: "4px" }}>
            لا ننصح بالبدء بشعار جديد أو تغيير الألوان قبل حسم السؤال الأهم: ما القيمة التي تريد الذهبية أن تشتهر بها؟
          </p>
          <Directions />
          <p className="note" style={{ marginTop: "10px" }}>
            هذه اتجاهات مقترحة وليست تموضعاً نهائياً. يُختار الاتجاه بناءً على احتياجات العملاء، وأداء الشركة، وقدراتها الفعلية، والفجوات
            الموجودة لدى المنافسين.
          </p>
        </div>
      </section>

      <section className="sec" id="b-personality">
        <div className="sec-head reveal">
          <div>
            <h2>شخصية العلامة</h2>
            <p>نموذج الشخصية الأساسي والثانوي، ونبرة الصوت، وما يجب أن تكون عليه العلامة وما لا يجب.</p>
          </div>
        </div>
        <div className="grid-2">
          <div className="card reveal">
            <span className="label">النموذج الشخصي (Archetype): اضغطوا على الجزء</span>
            <Archetype />
          </div>
          <div className="card reveal">
            <span className="label">نبرة الصوت</span>
            <ToneSliders />
          </div>
        </div>
        <div className="card reveal" style={{ marginTop: "18px" }}>
          <Traits />
        </div>
      </section>

      <section className="sec" id="b-values">
        <div className="sec-head reveal">
          <div>
            <h2>القيم والمشاعر</h2>
            <p>القيم تشرح كيف يجب أن تعمل الذهبية، والمشاعر تشرح ما يجب أن يشعر به الزبون عند التعامل معها.</p>
          </div>
        </div>
        <div className="grid-2">
          <div>
            <span className="label">القيم مرتبة حسب الأولوية</span>
            <Values />
          </div>
          <div className="card reveal">
            <span className="label">قيم لا ننصح بتبنيها</span>
            <NotValues />
          </div>
        </div>
        <div style={{ marginTop: "26px" }}>
          <span className="label">المشاعر التي يجب أن تصل للجمهور: اضغطوا على شعور</span>
          <Emotions />
        </div>
        <div className="grid-2" style={{ marginTop: "18px" }}>
          <div className="card reveal">
            <span className="label">مشاعر لا نريد أن يربطها الجمهور بالذهبية</span>
            <Avoid />
          </div>
          <div className="insight outcome reveal">
            <small>الأثر العاطفي للعلامة · Brand Emotional Outcome</small>
            <p>خلّي كل قرار تقني قرارًا واثقًا.</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: ".92rem", color: "var(--on-navy-muted)", marginTop: "12px" }}>
              هذه هي الاستجابة العاطفية التي نريد بناءها، وليست ادعاءً بأن الجمهور يشعر بها اليوم. حتى تصبح حقيقة، يجب أن تظهر في المحتوى،
              وخدمة العملاء، ووضوح المعلومات، وتجربة الشراء الفعلية.
            </p>
          </div>
        </div>
      </section>

      <section className="sec" id="b-pillars">
        <div className="sec-head reveal">
          <div>
            <h2>ركائز المحتوى</h2>
            <p>خمس ركائز، لكل واحدة فكرة ورسالة ومواضيع وهدف عاطفي. الأولى هي الركيزة الأساسية.</p>
          </div>
        </div>
        <Pillars />
        <div className="cta-row">
          <Link className="btn dark" href="/website/">
            انتقلوا إلى مراجعة الموقع ←
          </Link>
        </div>
      </section>
      <p className="foot">
        المصدر: لوحة مراجعة العلامة من <bdi>Pixilated Studio</bdi>. مواقع الذهبية وجرير وإكسترا مبنية على مراجعة صفحاتهم، وأمازون ونون من
        معرفة السوق العامة؛ كلها فرضيات عمل تحتاج تأكيداً.
      </p>
    </main>
  )
}
