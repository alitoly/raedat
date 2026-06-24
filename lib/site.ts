// Central site config for SEO. Override the URL per environment via
// NEXT_PUBLIC_SITE_URL (set it to your real production domain in Vercel).
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://raedat-incubator.vercel.app').replace(/\/$/, '');

export const siteName = 'حاضنة رائدات';

export const siteDescription =
  'حاضنة رائدات — أول حاضنة نسائية متخصصة في دعم ريادة الأعمال على مستوى الوطن العربي، تابعة لأكاديمية المرأة العُمانية. تدريب وإرشاد وتمويل لتحويل أفكار النساء إلى مشاريع مستدامة، انسجامًا مع رؤية عُمان 2040.';

export const siteKeywords = [
  'حاضنة رائدات',
  'رائدات',
  'حاضنة رائدات للأعمال',
  'أكاديمية المرأة العُمانية',
  'ريادة الأعمال النسائية',
  'حاضنة أعمال',
  'حاضنة أعمال نسائية',
  'حاضنة ريادة الأعمال عُمان',
  'تمكين المرأة',
  'تمكين المرأة الاقتصادي',
  'مشاريع نسائية',
  'رائدات الأعمال العُمانيات',
  'ريادة أعمال عُمان',
  'سلطنة عُمان',
  'رؤية عُمان 2040',
  'مركز الاستدامة لتطوير الأعمال',
  'جائزة اليونسكو للتعليم المستدام',
  'مشاريع صغيرة ومتوسطة عُمان',
  'Raedat',
  'Raedat Incubator',
  'Omani Women Academy',
  'women entrepreneurship Oman',
  'business incubator Oman',
];

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}
