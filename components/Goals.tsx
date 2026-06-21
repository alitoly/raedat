import Image from 'next/image';
import { goals } from '@/lib/data';
import { icons } from './Icons';

export default function Goals() {
  return (
    <section className="section" id="goals">
      <div className="section__head" data-reveal>
        <span className="kicker">أهدافنا</span>
        <h2 className="display section__title">ثمانية أهداف تصنع الأثر</h2>
        <p className="section__intro">
          من تعزيز الابتكار إلى بناء الشبكات المهنية — منظومة متكاملة تُمكّن المرأة العُمانية من تحويل فكرتها إلى مشروع مستدام.
        </p>
      </div>

      <div className="goal-grid" data-reveal-group>
        {goals.map((g) => (
          <article key={g.idx} className={`goal-card goal-card--span${g.span} goal-card--shape${(+g.idx) % 4}`}>
            <Image
              src={g.img}
              alt=""
              fill
              sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
              className="goal-card__bg"
            />
            <span className="goal-card__scrim" />
            <span className="goal-card__icon">{icons[g.icon]}</span>
            <span className="goal-card__idx">{g.idx}</span>
            <div className="goal-card__text">
              <h3>{g.title}</h3>
              <p>{g.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
