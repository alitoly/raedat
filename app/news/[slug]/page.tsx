import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import TransitionLink from '@/components/TransitionLink';
import Gallery from '@/components/Gallery';
import { news } from '@/lib/data';

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.summary,
    alternates: { canonical: `/news/${item.slug}` },
    openGraph: {
      type: 'article',
      title: item.title,
      description: item.summary,
      url: `/news/${item.slug}`,
      images: [{ url: item.img, alt: item.title }],
    },
    twitter: { card: 'summary_large_image', title: item.title, description: item.summary, images: [item.img] },
  };
}

export default async function NewsDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);
  if (!item) notFound();

  return (
    <main className="page article">
      <header className="article__head" data-reveal>
        <TransitionLink href="/news" className="article__back">→ كل الأخبار</TransitionLink>
        <span className="kicker">{item.tag}</span>
        <h1 className="display article__title">{item.title}</h1>
      </header>

      <div className={`article__hero ncard--${item.tone}`} data-reveal>
        <Image src={item.img} alt={item.title} fill priority sizes="100vw" className="ncard__bg" />
        <Image src={`/images/mesh/mesh-${item.mesh}.png`} alt="" fill sizes="100vw" className="ncard__mesh" />
        <span className="ncard__tone" />
        <span className="ncard__scrim" />
      </div>

      <article className="article__body" data-reveal>
        {item.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </article>

      <section className="article__gallery" data-reveal>
        <h2 className="subhead">معرض الصور</h2>
        <Gallery images={item.images} title={item.title} />
      </section>

      <div className="article__foot" data-reveal>
        <TransitionLink href="/news" className="btn btn--ghost">← العودة للأخبار</TransitionLink>
      </div>
    </main>
  );
}
