import type { Metadata } from 'next';
import Impact from '@/components/Impact';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'قياس الأثر والاستدامة',
  description:
    'كيف تقيس حاضنة رائدات أثرها: مؤشر استدامة المشاريع، ومعايير اعتبار المشروع مستدامًا، وأبعاد قياس الأثر الاقتصادي والاجتماعي والمؤسسي.',
  alternates: { canonical: '/impact' },
};

export default function ImpactPage() {
  return (
    <main className="page">
      <PageHero
        src="/images/site/photo-1.webp"
        alt="مشاركات في فعاليات حاضنة رائدات"
        kicker="قياس الأثر"
        title="أثرٌ يُقاس باستدامة المشاريع"
        intro="نقيس التحوّل من فكرة إلى مشروع، والعائد الاقتصادي والاجتماعي، واستدامة المشاريع بعد عامٍ من التخرّج من الحاضنة."
      />

      <Impact />
    </main>
  );
}
