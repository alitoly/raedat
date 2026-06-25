'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { CSSProperties } from 'react';
import { stories, categories, type Story, type StoryCategory } from '@/lib/stories';
import './Stories.css';

type Filter = StoryCategory | 'الكل';

/** A single reel card. Lazily plays a muted preview on hover (desktop). */
function ReelCard({ story, index, onOpen }: { story: Story; index: number; onOpen: (s: Story) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  const preview = useCallback(
    (on: boolean) => {
      const v = videoRef.current;
      if (!v || reduce) return;
      if (on) {
        v.currentTime = 0;
        void v.play().catch(() => {});
      } else {
        v.pause();
        v.currentTime = 0;
      }
    },
    [reduce],
  );

  return (
    <motion.button
      type="button"
      layoutId={`reel-${story.id}`}
      className={`reel${story.feature ? ' reel--feature' : ''}`}
      style={{ '--accent': story.accent, '--accent-soft': story.accentSoft } as CSSProperties}
      onMouseEnter={() => preview(true)}
      onMouseLeave={() => preview(false)}
      onFocus={() => preview(true)}
      onBlur={() => preview(false)}
      onClick={() => onOpen(story)}
      aria-label={`شاهدي قصة ${story.name} — ${story.project}`}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <video
        ref={videoRef}
        className="reel__media"
        src={story.video}
        poster={story.poster}
        muted
        loop
        playsInline
        preload="none"
        tabIndex={-1}
      />
      <span className="reel__grain" aria-hidden />
      <span className="reel__scrim" aria-hidden />
      <span className="reel__index" aria-hidden>{String(index + 1).padStart(2, '0')}</span>

      <span className="reel__chip">{story.category}</span>

      <span className="reel__play" aria-hidden>
        <svg viewBox="0 0 24 24" width="22" height="22"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
      </span>

      <span className="reel__body">
        {story.badge && <span className="reel__badge">{story.badge}</span>}
        <span className="reel__project">{story.project}</span>
        <span className="reel__name">{story.name}</span>
        <span className="reel__tagline">{story.tagline}</span>
        <span className="reel__more">القصة كاملة ←</span>
      </span>
    </motion.button>
  );
}

/** Immersive lightbox: full video + the entrepreneur's story. */
function Lightbox({
  story,
  onClose,
  onNav,
}: {
  story: Story;
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
}) {
  const reduce = useReducedMotion();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNav(-1); // RTL: right = previous
      if (e.key === 'ArrowLeft') onNav(1);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, onNav]);

  return (
    <motion.div
      className="lb"
      role="dialog"
      aria-modal="true"
      aria-label={`قصة ${story.name}`}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ '--accent': story.accent, '--accent-soft': story.accentSoft } as CSSProperties}
    >
      <button type="button" className="lb__close" aria-label="إغلاق" onClick={onClose}>
        <svg viewBox="0 0 24 24" width="22" height="22"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
      </button>

      <button type="button" className="lb__nav lb__nav--prev" aria-label="السابقة" onClick={(e) => { e.stopPropagation(); onNav(-1); }}>
        <svg viewBox="0 0 24 24" width="26" height="26"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <button type="button" className="lb__nav lb__nav--next" aria-label="التالية" onClick={(e) => { e.stopPropagation(); onNav(1); }}>
        <svg viewBox="0 0 24 24" width="26" height="26"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>

      <motion.div
        key={story.id}
        className="lb__panel"
        onClick={(e) => e.stopPropagation()}
        initial={reduce ? false : { y: 24, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={reduce ? undefined : { y: 12, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="lb__stage">
          <video
            className="lb__video"
            src={story.video}
            poster={story.poster}
            controls
            autoPlay
            playsInline
            preload="metadata"
          />
        </div>

        <div className="lb__content">
          <span className="lb__chip">{story.category}</span>
          {story.badge && <span className="lb__badge">{story.badge}</span>}
          <h3 className="lb__project">{story.project}</h3>
          <p className="lb__name">{story.name}</p>
          <p className="lb__summary">{story.summary}</p>

          <div className="lb__story">
            {story.story.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="lb__meta">
            {story.since && (
              <span className="lb__metaItem">
                <span className="lb__metaLabel">انطلقت</span>
                <span className="lb__metaValue">{story.since}</span>
              </span>
            )}
            <a className="lb__metaItem lb__contact" href={`tel:${story.phone}`}>
              <span className="lb__metaLabel">للتواصل</span>
              <span className="lb__metaValue" dir="ltr">{story.phone}</span>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Stories() {
  const [filter, setFilter] = useState<Filter>('الكل');
  const [active, setActive] = useState<Story | null>(null);

  const shown = filter === 'الكل' ? stories : stories.filter((s) => s.category === filter);

  const nav = useCallback(
    (dir: 1 | -1) => {
      setActive((cur) => {
        if (!cur) return cur;
        const list = filter === 'الكل' ? stories : stories.filter((s) => s.category === filter);
        const i = list.findIndex((s) => s.id === cur.id);
        const next = (i + dir + list.length) % list.length;
        return list[next];
      });
    },
    [filter],
  );

  return (
    <section className="stories" id="stories">
      <div className="stories__aurora" aria-hidden>
        <span className="stories__blob stories__blob--1" />
        <span className="stories__blob stories__blob--2" />
        <span className="stories__blob stories__blob--3" />
      </div>

      <div className="stories__inner">
        <header className="stories__head">
          <span className="stories__kicker">قصص من الحاضنة</span>
          <h2 className="stories__title display">رائداتٌ صنعن الفرق</h2>
          <p className="stories__intro">
            من العطور والبخور إلى الفنون والأزياء — سبع رائداتٍ عُمانيات حوّلن الشغف إلى مشاريع حيّة
            ضمن مبادرة حاضنة رائدات. شاهدي قصصهنّ بأصواتهنّ.
          </p>
        </header>

        <div className="stories__filters" role="tablist" aria-label="تصفية حسب المجال">
          {categories.map((c) => (
            <button
              key={c.key}
              type="button"
              role="tab"
              aria-selected={filter === c.key}
              className={`fpill${filter === c.key ? ' is-active' : ''}`}
              style={{ '--accent': c.accent } as CSSProperties}
              onClick={() => setFilter(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <motion.div layout className="stories__grid">
          <AnimatePresence mode="popLayout">
            {shown.map((s, i) => (
              <ReelCard key={s.id} story={s} index={i} onOpen={setActive} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {active && <Lightbox story={active} onClose={() => setActive(null)} onNav={nav} />}
      </AnimatePresence>
    </section>
  );
}
