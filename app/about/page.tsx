const nameMeanings = [
  { num: '٠١', t: 'يعكس روح الريادة', d: 'اسمٌ يختصر جوهر المبادرة ويُجسّد قيمتها.' },
  { num: '٠٢', t: 'يتناسب مع الرسالة', d: 'منسجم مع المهمة والرؤية التي قامت عليها الحاضنة.' },
  { num: '٠٣', t: 'يعزّز الهوية النسائية', d: 'مظلّة نسائية واحدة تتكاتف تحتها الخبرات.' },
  { num: '٠٤', t: 'يدعو للإلهام', d: 'محفّزٌ يدفع نحو المبادرة والإبداع.' },
  { num: '٠٥', t: 'سهل التذكّر وجذّاب', d: 'اسمٌ يبقى في الذاكرة ويُلهم من يسمعه.' },
];

export default function AboutPage() {
  return (
    <main className="page">
      <header className="page-head" data-reveal>
        <span className="kicker">عن الحاضنة</span>
        <h1 className="display page-head__title">اسمٌ يحمل دلالة</h1>
        <p className="page-head__intro">
          يُعلن مركز الاستدامة لتطوير الأعمال، التابع لأكاديمية المرأة العُمانية، عن «حاضنة رائدات» — فضاءٌ ملهم تنمو فيه الأفكار بالإلهام المتبادل، وتُصنع فيه قادة المستقبل من النساء الرائدات. أول حاضنة نسائية متخصصة في دعم ريادة الأعمال على مستوى الوطن العربي.
        </p>
      </header>

      <section className="section">
        <div className="leaf-grid" data-reveal-group>
          {nameMeanings.map((m) => (
            <article key={m.num} className="leaf">
              <span className="leaf__num">{m.num}</span>
              <h3>{m.t}</h3>
              <p>{m.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section closing">
        <div className="closing__card" data-reveal>
          <span className="kicker">إشراف واعتماد</span>
          <h2 className="display">د. فاطمة يوسف حمدان البلوشية</h2>
          <p className="closing__role">الرئيس التنفيذي لأكاديمية المرأة العُمانية</p>
          <p className="closing__quote">«حيث تتحوّل الأفكار إلى مشاريع حقيقية، وتُصنع قادة المستقبل من النساء الرائدات.»</p>
        </div>
      </section>
    </main>
  );
}
