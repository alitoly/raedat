import { icons } from './Icons';

const C = 2 * Math.PI * 80; // ring circumference
const SEG = (C * 52) / 360; // visible arc per segment (52° of each 60° slot)

// navy → periwinkle → pink sweep matching the cream/pink/periwinkle/navy palette
const criteria = [
  { c: '#304463', t: 'استمرار العمل خلال آخر ٣ أشهر' },
  { c: '#4a5a85', t: 'تحقيق دخل فعلي شهري أو موسمي' },
  { c: '#7d8abc', t: 'توسعة الخدمات أو دخول شراكة جديدة' },
  { c: '#a585c0', t: 'تسجيل قانوني للنشاط التجاري' },
  { c: '#cf6cae', t: 'خطة تطوير محدّثة للمشروع' },
  { c: '#ffc7ed', t: 'استمرار التفاعل مع الزبائن والمجتمع الرقمي' },
];

const dims = [
  { n: '٠١', icon: 'doc', t: 'التحوّل لمشروع', d: 'مشاريع أُطلقت بنجاح بعد ٣–٦ أشهر من البرنامج.', variant: 'white', badge: 'blue', deco: 'dots' },
  { n: '٠٢', icon: 'fund', t: 'الوصول للتمويل', d: 'نسبة المشاركات اللواتي حصلن على تمويل أو شراكة.', variant: 'sage', badge: 'blue', deco: 'grid' },
  { n: '٠٣', icon: 'star', t: 'النمو المهاري', d: 'تطوّر المهارات القيادية والريادية عبر البرنامج.', variant: 'white', badge: 'blue', deco: 'wave' },
  { n: '٠٤', icon: 'briefcase', t: 'الأثر الاقتصادي', d: 'الوظائف المُولّدة ومساهمة المشاريع محليًا.', variant: 'navy', badge: 'white', deco: 'wave' },
  { n: '٠٥', icon: 'growth', t: 'الاستدامة المؤسسية', d: 'المشاريع المسجّلة والمستمرة بعد عامٍ من التخرّج.', variant: 'white', badge: 'blue', deco: 'grid' },
  { n: '٠٦', icon: 'people', t: 'الأثر المجتمعي', d: 'المبادرات المنبثقة ونمو شبكة رائدات الأعمال.', variant: 'sage', badge: 'sage', deco: 'grid' },
];

function Deco({ kind }: { kind: string }) {
  if (kind === 'wave')
    return (
      <svg className="dcard__deco dcard__wave" viewBox="0 0 52 8" fill="none" aria-hidden>
        <path d="M0 4 Q 6.5 0 13 4 T 26 4 T 39 4 T 52 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  if (kind === 'dots') return <span className="dcard__deco dcard__tridots" aria-hidden>● ● ●</span>;
  return <span className="dcard__deco dcard__grid" aria-hidden />;
}

export default function Impact() {
  return (
    <>
      {/* sustainability index — ring of the 6 criteria + the formula */}
      <section className="section sust" data-reveal>
        <div className="ring" aria-hidden>
          <svg viewBox="0 0 200 200">
            {criteria.map((c, i) => (
              <circle
                key={i}
                className="ring__seg"
                cx="100" cy="100" r="80"
                stroke={c.c}
                strokeDasharray={`${SEG} ${C}`}
                style={{ transform: `rotate(${i * 60 - 90}deg)`, transformOrigin: '100px 100px', transitionDelay: `${i * 0.1}s` }}
              />
            ))}
          </svg>
          <div className="ring__core">
            <b>٢ / ٦</b>
            <span>معايير الاستدامة</span>
          </div>
        </div>

        <div className="sust__body">
          <span className="kicker">مؤشر الاستدامة</span>
          <h2 className="display sust__title">يُعتبر المشروع مستدامًا بتحقيق معيارين من ستة</h2>
          <p className="sust__eq">
            نسبة الاستدامة (%) ={' '}
            <span>المشاريع المستمرة بعد ١٢ شهرًا ÷ إجمالي المشاريع المحتضنة</span> × ١٠٠
          </p>
          <ul className="criteria">
            {criteria.map((c, i) => (
              <li key={i} className="crit">
                <span className="crit__dot" style={{ background: c.c }} />
                <p>{c.t}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* impact dimensions — editorial grid, not cards */}
      <section className="section">
        <div className="section__head" data-reveal>
          <span className="kicker">أبعاد القياس</span>
          <h2 className="display section__title">ستة أبعاد لقياس الأثر</h2>
          <p className="section__intro">من التحوّل لمشروع إلى الأثر المجتمعي — مؤشرات تتبع رحلة الرائدة بعد الحاضنة.</p>
        </div>
        <div className="dims" data-reveal-group>
          {dims.map((d, i) => (
            <article key={d.n} className={`dcard dcard--${d.variant} dcard--s${i}`}>
              <span className={`dcard__icon badge--${d.badge}`}>{icons[d.icon]}</span>
              <div className="dcard__text">
                <h3>{d.t}</h3>
                <p>{d.d}</p>
              </div>
              <span className="dcard__num">{d.n}</span>
              <Deco kind={d.deco} />
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
