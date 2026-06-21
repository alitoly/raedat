import Impact from '@/components/Impact';

export default function ImpactPage() {
  return (
    <main className="page">
      <header className="page-head" data-reveal>
        <span className="kicker">قياس الأثر</span>
        <h1 className="display page-head__title">أثرٌ يُقاس باستدامة المشاريع</h1>
        <p className="page-head__intro">
          نقيس التحوّل من فكرة إلى مشروع، والعائد الاقتصادي والاجتماعي، واستدامة المشاريع بعد عامٍ من التخرّج من الحاضنة.
        </p>
      </header>

      <Impact />
    </main>
  );
}
