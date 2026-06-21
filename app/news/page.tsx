import Image from 'next/image';
import Social from '@/components/Social';
import TransitionLink from '@/components/TransitionLink';
import { news, press } from '@/lib/data';

export default function NewsPage() {
  return (
    <main className="page">
      <header className="page-head" data-reveal>
        <span className="kicker">آخر الأخبار</span>
        <h1 className="display page-head__title">إنجازاتٌ تُروى</h1>
        <p className="page-head__intro">
          من جائزة اليونسكو للتعليم المستدام إلى ورش التمكين الرقمي وحفلات التكريم — محطات من مسيرة حاضنة رائدات.
        </p>
      </header>

      <section className="section">
        <div className="news-grid" data-reveal-group>
          {news.map((n) => (
            <TransitionLink
              key={n.slug}
              href={`/news/${n.slug}`}
              className={`ncard ncard--${n.tone}${n.feature ? ' ncard--feature' : ''}`}
            >
              <Image src={n.img} alt={n.title} fill sizes="(max-width: 560px) 100vw, 66vw" className="ncard__bg" />
              <Image src={`/images/mesh/mesh-${n.mesh}.png`} alt="" fill sizes="66vw" className="ncard__mesh" />
              <span className="ncard__tone" />
              <span className="ncard__scrim" />
              <span className="ncard__tag">{n.tag}</span>
              <div className="ncard__body">
                <h3>{n.title}</h3>
                <p>{n.summary}</p>
                <span className="ncard__more">اقرئي المزيد ←</span>
              </div>
            </TransitionLink>
          ))}
        </div>

        <h2 className="subhead" data-reveal>تغطية صحفية</h2>
        <div className="press-grid" data-reveal-group>
          {press.map((p) => (
            <a key={p.pub} className="press" href={p.url} target="_blank" rel="noopener">
              <span className="press__pub">{p.pub}</span>
              <p>{p.text}</p>
              <span className="press__link">قراءة المقال ↗</span>
            </a>
          ))}
        </div>

        <h2 className="subhead" data-reveal>من إنستغرام</h2>
        <Social />
      </section>
    </main>
  );
}
