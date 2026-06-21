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
        src="/images/mesh/mesh-2.png"
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
        <div className="hero__chips">
          <span className="chip"><b>+90</b> امرأة عُمانية</span>
          <span className="chip"><b>10</b> باقات تدريبية</span>
          <span className="chip"><b>2040</b> رؤية عُمان</span>
        </div>
      </div>

      <a href="#about" className="scroll-hint" aria-label="انزلي للأسفل"><span /></a>
    </section>
  );
}
