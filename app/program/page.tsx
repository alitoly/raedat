import type { Metadata } from 'next';
import Program from '@/components/Program';
import PageHero from '@/components/PageHero';
import { phases } from '@/lib/data';
import { breadcrumbSchema } from '@/lib/site';

export const metadata: Metadata = {
  title: 'البرنامج المتكامل في ريادة الأعمال',
  description:
    'البرنامج المتكامل في حاضنة رائدات: اثنتا عشرة محطة تدريبية من أول فكرة إلى التوسّع والاستدامة، تستهدف تسعين امرأة عُمانية في المرحلة الأولى.',
  alternates: { canonical: '/program' },
};

const breadcrumb = breadcrumbSchema([
  { name: 'الرئيسية', url: '/' },
  { name: 'البرنامج المتكامل', url: '/program' },
]);

export default function ProgramPage() {
  return (
    <main className="page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <PageHero
        src="/images/site/photo-3.webp"
        alt="جلسة تدريبية ضمن برنامج حاضنة رائدات"
        position="center 35%"
        kicker="البرنامج المتكامل"
        title="البرنامج المتكامل في ريادة الأعمال"
        intro="اثنتا عشرة محطة متّصلة تأخذ الرائدة من أول فكرة إلى مشروع مستدام، يتخللها تأهيل عملي واحتضان لتسعين امرأة عُمانية."
      />

      <Program />

      <section className="section" id="audience">
        <div className="split">
          <div className="split__stats" data-reveal>
            <span className="kicker">الفئة المستهدفة</span>
            <h2 className="display section__title">٩٠ امرأة عُمانية في المرحلة الأولى</h2>
            <p className="section__intro">احتُضنت تسعون امرأة عُمانية للاستفادة من الدعم والتأهيل في بيئة داعمة ومحفّزة للنمو المستدام.</p>
            <div className="stat-row">
              <div className="stat"><span className="stat__num" data-count="30">0</span><span className="stat__label">من ذوي الاحتياجات الخاصة</span></div>
              <div className="stat"><span className="stat__num" data-count="30">0</span><span className="stat__label">من الأسر المنتجة</span></div>
              <div className="stat"><span className="stat__num" data-count="30">0</span><span className="stat__label">باحثة عن عمل</span></div>
            </div>
          </div>
          <div className="split__phases" data-reveal>
            <h3 className="phases__title">آلية التنفيذ — ست مراحل</h3>
            <ol className="timeline">
              {phases.map((p, i) => (
                <li key={p}><span className="timeline__no">{i + 1}</span><div><b>{p}</b></div></li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
