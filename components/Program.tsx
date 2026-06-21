import { packages } from '@/lib/data';

export default function Program() {
  return (
    <section className="section" id="program">
      <div className="section__head" data-reveal>
        <span className="kicker">البرنامج المتكامل</span>
        <h2 className="display section__title">رحلة من عشر محطات</h2>
        <p className="section__intro">
          مسارٌ متّصل يربط محطات البرنامج من أول فكرة إلى التوسّع والاستدامة — كل محطة تبني على التي قبلها.
        </p>
      </div>

      <div className="journey" data-reveal-group>
        <span className="journey__spine" aria-hidden />
        {packages.map((p, i) => (
          <div key={p.no} className={`jnode ${i % 2 ? 'jnode--end' : 'jnode--start'}`}>
            <span className="jnode__dot">{p.no}</span>
            <div className="jnode__content">
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          </div>
        ))}
        <span className="journey__cap" aria-hidden>الاستدامة</span>
      </div>
    </section>
  );
}
