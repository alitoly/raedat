import Hero from '@/components/Hero';
import Goals from '@/components/Goals';
import TransitionLink from '@/components/TransitionLink';

export default function Page() {
  return (
    <main>
      <Hero />
      <Goals />

      <section className="section cta-band">
        <div className="cta-band__inner" data-reveal>
          <h2 className="display">جاهزة لتحويل فكرتك إلى مشروع؟</h2>
          <p>انضمي إلى حاضنة رائدات، واكتشفي البرنامج المتكامل ومسار قياس الأثر.</p>
          <div className="cta-band__btns">
            <TransitionLink href="/program" className="btn btn--pink">اكتشفي البرنامج</TransitionLink>
            <TransitionLink href="/about" className="btn btn--ghost">عن الحاضنة</TransitionLink>
          </div>
        </div>
      </section>
    </main>
  );
}
