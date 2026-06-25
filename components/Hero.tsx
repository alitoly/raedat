import Image from 'next/image';
import TransitionLink from './TransitionLink';

export default function Hero() {
  return (
    <section className="hero" id="top">
      {/* full-bleed photo */}
      <Image
        src="/images/site/photo-4.webp"
        alt="ورشة تدريبية في حاضنة رائدات"
        fill
        priority
        sizes="100vw"
        className="hero__photo"
      />
      {/* blue mesh recolor layer */}
      <Image
        src="/images/mesh/mesh-2.webp"
        alt=""
        fill
        sizes="100vw"
        className="hero__mesh"
      />
      <span className="hero__scrim" />

      <div className="hero__inner">
        <span className="hero__eyebrow"><span className="dot" /> جائزة اليونسكو للتعليم المستدام · 2026</span>
        <h1 className="display hero__title">حاضنة رائدات</h1>
        <p className="hero__lead">حيث تتحوّل الأفكار والأحلام إلى مشاريع حقيقية — أول حاضنة نسائية متخصصة في دعم ريادة الأعمال على مستوى الوطن العربي.</p>
        <div className="hero__cta">
          <TransitionLink href="/program" className="btn btn--pink">انضمي إلينا</TransitionLink>
          <TransitionLink href="/about" className="btn btn--glassdark">لماذا رائدات؟</TransitionLink>
        </div>
        <div className="hero__highlights">
          <span className="hero__first">
            <b>الأولى عربياً</b>
            <span>أول حاضنة نسائية على مستوى الوطن العربي</span>
          </span>
          <div className="hero__stats">
            <div className="hstat"><b>+423</b><span>شريكاً وخبيراً</span></div>
            <div className="hstat"><b>+90</b><span>رائدة عُمانية</span></div>
            <div className="hstat"><b>2040</b><span>رؤية عُمان</span></div>
          </div>
        </div>
      </div>

      <a href="#about" className="scroll-hint" aria-label="انزلي للأسفل"><span /></a>
    </section>
  );
}
