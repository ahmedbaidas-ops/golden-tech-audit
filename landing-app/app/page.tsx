import Link from "next/link"
import { AREAS } from "@/data/audit"
import { Count, Icon, Kpi, LogoStack, PageHead, cssVars } from "@/components/ui"

export default function Overview() {
  return (
    <main>
      <PageHead
        title="تدقيق التكنولوجيا الذهبية"
        sub="من هي الذهبية، ولمن تبيع، وأين تقف أمام جرير وإكسترا وأمازون ونون. ثم ما يمر به الزبون على الموقع من إعلان جوجل حتى الدفع."
        actions={
          <>
            <Link className="pill-btn" href="/brand/">
              <span className="ic">
                <Icon name="brand" />
              </span>
              مراجعة العلامة
            </Link>
            <Link className="pill-btn primary" href="/website/">
              <span className="ic">
                <Icon name="web" />
              </span>
              مراجعة الموقع
            </Link>
          </>
        }
      />

      <section className="kpis" aria-label="أهم الأرقام">
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
          label="أمور للإصلاح"
          icon="flag"
          tone="bad"
          value={
            <b className="num">
              <Count to={8} />
            </b>
          }
          extra={<span className="chip bad">2 عاجل</span>}
          foot={
            <>
              و<b className="num">6</b> مهمة، مرتّبة من الأهم
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
          foot="يتقنها الموقع اليوم"
        />
        <Kpi
          label="منافسون في المقارنة"
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
      </section>

      <div className="doors">
        <Link className="door reveal" href="/brand/">
          <div className="door-top">
            <span className="kicker">المراجعة الأولى</span>
            <span className="go-btn" aria-hidden="true">
              <Icon name="arrow" />
            </span>
          </div>
          <h2>مراجعة العلامة التجارية</h2>
          <p>الشركة ونموذج عملها، والجمهور، والمنافسون، وخرائط التموضع، والشخصية والقيم والمشاعر، وركائز المحتوى.</p>
          <div className="door-viz">
            <LogoStack keys={["golden", "jarir", "extra", "amazon", "noon"]} size={40} />
            <span>
              <b>الذهبية</b> أمام جرير وإكسترا وأمازون ونون
            </span>
          </div>
        </Link>
        <Link className="door reveal" href="/website/">
          <div className="door-top">
            <span className="kicker">المراجعة الثانية</span>
            <span className="go-btn" aria-hidden="true">
              <Icon name="arrow" />
            </span>
          </div>
          <h2>مراجعة الموقع الإلكتروني</h2>
          <p>
            جرّبنا الشراء من <bdi>goldentech.com.sa</bdi> كأننا زبون يريد جهاز ألعاب، من إعلان جوجل حتى الدفع، وصوّرنا كل خطوة.
          </p>
          <div className="door-viz">
            <span className="spark" aria-hidden="true">
              {AREAS.map((a, i) => (
                <i key={a[0]} className={a[1] < 40 ? "lo" : undefined} style={cssVars({ "--v": a[1], "--i": i })} />
              ))}
            </span>
            <span>
              عشرة أجزاء، أضعفها <b>التوصيل والإرجاع</b> بدرجة 29
            </span>
          </div>
        </Link>
      </div>

      <Link className="teaser reveal" href="/concept/">
        <div>
          <h2>كيف قد تبدو الصفحة الرئيسية؟</h2>
          <p>الصفحة الرئيسية بترتيب Walmart وألوان الذهبية، بجانب لقطة من الموقع الحالي، مع سبعة تغييرات مرقّمة.</p>
          <span className="go-line">
            شاهدوا قبل وبعد
            <Icon name="arrow" />
          </span>
        </div>
        <div className="ba" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <figure>
            <img src="/concept/before.webp" alt="" />
            <figcaption>قبل</figcaption>
          </figure>
          <figure className="mini-after">
            <div className="m1">
              <b />
              <i />
              <em />
            </div>
            <div className="m2" />
            <div className="m3">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <figcaption>بعد</figcaption>
          </figure>
        </div>
      </Link>

      <div className="bridge reveal">
        <p>
          العلامة تعد الزبون بـ<b>«خلّي كل قرار تقني قرارًا واثقًا»</b>. والموقع اليوم يعطي وعدين مختلفين عن التوصيل، وأرقاماً في السلة تربك
          الزبون. لهذا نقترح قراءة المراجعتين معاً.
        </p>
      </div>
      <p className="landing-foot">
        إعداد <bdi>Pixilated Studio</bdi>. مراجعة الموقع بتاريخ 22 أكتوبر 2026. خرائط التموضع وتحليل المنافسين فرضيات عمل تحتاج تأكيداً من
        بيانات العملاء.
      </p>
    </main>
  )
}
