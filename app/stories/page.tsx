import type { Metadata } from 'next';
import Stories from '@/components/Stories';
import { stories } from '@/lib/stories';
import { breadcrumbSchema, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'قصص رائدات الحاضنة',
  description:
    'قصص نجاح رائدات الأعمال العُمانيات ضمن مبادرة حاضنة رائدات — من العطور والبخور والحرف اليدوية إلى الفنون التشكيلية والأزياء. شاهدي رحلاتهنّ بالفيديو.',
  alternates: { canonical: '/stories' },
  openGraph: {
    title: 'قصص رائدات الحاضنة | حاضنة رائدات',
    description:
      'سبع رائدات عُمانيات حوّلن الشغف إلى مشاريع حيّة ضمن مبادرة حاضنة رائدات — شاهدي قصصهنّ.',
    url: `${siteUrl}/stories`,
  },
};

const breadcrumb = breadcrumbSchema([
  { name: 'الرئيسية', url: '/' },
  { name: 'قصص رائدات الحاضنة', url: '/stories' },
]);

const itemList = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'قصص رائدات الحاضنة',
  itemListElement: stories.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'VideoObject',
      name: `${s.project} — ${s.name}`,
      description: s.summary,
      thumbnailUrl: `${siteUrl}${s.poster}`,
      contentUrl: `${siteUrl}${s.video}`,
      uploadDate: '2026-06-25',
    },
  })),
};

export default function StoriesPage() {
  return (
    <main className="page page--stories">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <Stories />
    </main>
  );
}
