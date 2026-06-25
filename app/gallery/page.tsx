import type { Metadata } from 'next';
import DomeGallery from '@/components/DomeGallery';
import { breadcrumbSchema } from '@/lib/site';

export const metadata: Metadata = {
  title: 'معرض الصور',
  description:
    'معرضٌ تفاعلي ثلاثي الأبعاد من لحظات حاضنة رائدات — معارض رائدات الأعمال، ورش التمكين، وحفلات التكريم في أكاديمية المرأة العُمانية.',
  alternates: { canonical: '/gallery' },
};

const breadcrumb = breadcrumbSchema([
  { name: 'الرئيسية', url: '/' },
  { name: 'معرض الصور', url: '/gallery' },
]);

// every photo across the site, combined into one dome
const galleryImages = [
  { src: '/images/gallery/gallery-1.webp', alt: 'رائدة أعمال تعرض منتجاتها في معرض حاضنة رائدات' },
  { src: '/images/gallery/gallery-2.webp', alt: 'زائرات يتعرّفن على مشاريع الرائدات' },
  { src: '/images/gallery/gallery-3.webp', alt: 'ركن أزياء ضمن معرض حاضنة رائدات' },
  { src: '/images/gallery/gallery-4.webp', alt: 'منتجات حرفية وعطرية في المعرض' },
  { src: '/images/gallery/gallery-5.webp', alt: 'لحظة تواصل بين رائدة وزائر في المعرض' },
  { src: '/images/gallery/gallery-6.webp', alt: 'أجنحة عرض رائدات الأعمال' },
  { src: '/images/site/photo-1.webp', alt: 'فعالية تدريبية في حاضنة رائدات' },
  { src: '/images/site/photo-2.webp', alt: 'فريق حاضنة رائدات' },
  { src: '/images/site/photo-3.webp', alt: 'ورشة عمل ضمن البرنامج' },
  { src: '/images/site/photo-4.webp', alt: 'جلسة إرشاد وتوجيه' },
  { src: '/images/site/photo-5.webp', alt: 'مشاركات في برنامج الحاضنة' },
  { src: '/images/site/photo-6.webp', alt: 'لحظة من فعاليات الأكاديمية' },
  { src: '/images/news/unesco-cover.jpeg', alt: 'تكريم جائزة التعليم المستدام' },
  { src: '/images/news/honoring-cover.jpeg', alt: 'حفل تكريم رائدات الأعمال' },
  { src: '/images/news/honoring-2.jpeg', alt: 'تكريم المشاركات في الحاضنة' },
  { src: '/images/news/honoring-3.jpeg', alt: 'لقطة من حفل التكريم' },
  { src: '/images/news/canva-cover.jpeg', alt: 'ورشة التصميم الرقمي' },
  { src: '/images/news/canva-2.jpeg', alt: 'تدريب على أدوات التصميم' },
  { src: '/images/news/canva-3.jpeg', alt: 'مشاركات في ورشة التمكين الرقمي' },
  { src: '/images/stories/story-larimar.jpg', alt: 'مشروع Larimar للعطور' },
  { src: '/images/stories/story-marasim.jpg', alt: 'مراسم الزهراء للفنون' },
  { src: '/images/stories/story-rayahin.jpg', alt: 'الرياحين للتجارة المنوعة' },
  { src: '/images/stories/story-umwalid.jpg', alt: 'أم وليد للبخور والعطور' },
  { src: '/images/stories/story-mabakhir.jpg', alt: 'مباخر الرُّقى' },
  { src: '/images/stories/story-noha.jpg', alt: 'Noha Collection للأزياء' },
  { src: '/images/stories/story-alfan.jpg', alt: 'الفن للبخور والعطور' },
];

export default function GalleryPage() {
  return (
    <main className="page page--gallery gallery-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <div className="gallery-stage">
        <DomeGallery
          images={galleryImages}
          grayscale={false}
          overlayBlurColor="#171f38"
          imageBorderRadius="20px"
          openedImageBorderRadius="20px"
          fit={0.55}
          minRadius={420}
          padFactor={0.08}
          openedImageWidth=""
          openedImageHeight=""
        />
      </div>

      <div className="gallery-head">
        <span className="gallery-kicker">معرض رائدات</span>
        <h1 className="display gallery-title">لحظاتٌ من الحاضنة</h1>
        <p className="gallery-hint">اسحبي لاستكشاف القبّة · اضغطي على أي صورة لتكبيرها</p>
      </div>
    </main>
  );
}
