import type { Metadata } from 'next';
import ProfileCard from '@/components/ProfileCard';
import CardSwap, { Card } from '@/components/CardSwap';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'عن الحاضنة',
  description:
    'حاضنة رائدات — أول حاضنة نسائية متخصصة في ريادة الأعمال على مستوى الوطن العربي، تابعة لأكاديمية المرأة العُمانية. تعرّفي على دلالات الاسم ورسالة الحاضنة.',
  alternates: { canonical: '/about' },
};

const nameMeanings = [
  { num: '٠١', t: 'يعكس روح الريادة', d: 'اسمٌ يختصر جوهر المبادرة ويُجسّد قيمتها.' },
  { num: '٠٢', t: 'يتناسب مع الرسالة', d: 'منسجم مع المهمة والرؤية التي قامت عليها الحاضنة.' },
  { num: '٠٣', t: 'يعزّز الهوية النسائية', d: 'مظلّة نسائية واحدة تتكاتف تحتها الخبرات.' },
  { num: '٠٤', t: 'يدعو للإلهام', d: 'محفّزٌ يدفع نحو المبادرة والإبداع.' },
  { num: '٠٥', t: 'سهل التذكّر وجذّاب', d: 'اسمٌ يبقى في الذاكرة ويُلهم من يسمعه.' },
];

export default function AboutPage() {
  return (
    <main className="page">
      <PageHero
        src="/images/site/photo-2.webp"
        alt="فريق حاضنة رائدات بأكاديمية المرأة العُمانية"
        kicker="عن الحاضنة"
        title="اسمٌ يحمل دلالة"
        intro="يُعلن مركز الاستدامة لتطوير الأعمال، التابع لأكاديمية المرأة العُمانية، عن «حاضنة رائدات» — فضاءٌ ملهم تنمو فيه الأفكار بالإلهام المتبادل، وتُصنع فيه قادة المستقبل من النساء الرائدات. أول حاضنة نسائية متخصصة في دعم ريادة الأعمال على مستوى الوطن العربي."
      />

      <section className="section name-showcase">
        <div className="name-showcase__intro" data-reveal>
          <span className="kicker">دلالات الاسم</span>
          <h2 className="name-showcase__title">لماذا «رائدات»؟</h2>
          <p className="name-showcase__lead">
            خمس دلالات تختصر روح الحاضنة ورسالتها — اسمٌ يُلهم، ويعكس الريادة، ويعزّز الهوية النسائية.
          </p>
          <p className="name-showcase__hint">اضغطي على البطاقة لتصفّح الدلالات ↔</p>
        </div>
        <div className="name-showcase__stack">
          <CardSwap
            width={300}
            height={330}
            cardDistance={46}
            verticalDistance={52}
            skewAmount={5}
            easing="elastic"
            autoPlay={false}
          >
            {nameMeanings.map((m) => (
              <Card key={m.num} className="meaning-card">
                <span className="meaning-card__num">{m.num}</span>
                <h3>{m.t}</h3>
                <p>{m.d}</p>
              </Card>
            ))}
          </CardSwap>
        </div>
      </section>

      <section className="section closing">
        <div className="closing__profile" data-reveal>
          <span className="kicker">إشراف واعتماد</span>
          <ProfileCard
            className="closing__profile-card"
            name="د. فاطمة يوسف حمدان البلوشية"
            title="الرئيس التنفيذي لأكاديمية المرأة العُمانية"
            avatarUrl="/images/site/dr-fatma.jpg"
            iconUrl="/images/site/sparkle-pattern.svg"
            showUserInfo={false}
            enableTilt
            enableMobileTilt={false}
            behindGlowEnabled
            behindGlowColor="rgba(149, 204, 221, 0.6)"
            innerGradient="linear-gradient(145deg, rgba(41,54,129,0.62) 0%, rgba(149,204,221,0.28) 100%)"
          />
          <p className="closing__quote">«حيث تتحوّل الأفكار إلى مشاريع حقيقية، وتُصنع قادة المستقبل من النساء الرائدات.»</p>
        </div>
      </section>
    </main>
  );
}
