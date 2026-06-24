import Image from 'next/image';

type Props = {
  src: string;
  alt: string;
  kicker: string;
  title: string;
  intro: string;
  /** focus point for the cropped background, e.g. "center", "center 35%" */
  position?: string;
  priority?: boolean;
};

export default function PageHero({ src, alt, kicker, title, intro, position = 'center', priority = true }: Props) {
  return (
    <section className="page-hero">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className="page-hero__img"
        style={{ objectPosition: position }}
      />
      <span className="page-hero__scrim" />
      <div className="page-hero__inner">
        <span className="page-hero__kicker">{kicker}</span>
        <h1 className="display page-hero__title">{title}</h1>
        <p className="page-hero__intro">{intro}</p>
      </div>
    </section>
  );
}
