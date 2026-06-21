'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Gallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState<number | null>(null);

  // Esc to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <div className="gallery">
        {images.map((src, i) => (
          <motion.figure
            layoutId={`ph-${i}`}
            key={src}
            className={`gphoto${i === 0 ? ' gphoto--lg' : ''}`}
            onClick={() => setActive(i)}
            transition={{ duration: 0.5, ease }}
          >
            <Image src={src} alt={`${title} — صورة ${i + 1}`} fill sizes="(max-width: 640px) 100vw, 50vw" className="gphoto__img" />
            <span className="gphoto__zoom" aria-hidden>⤢</span>
          </motion.figure>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => setActive(null)}
          >
            <motion.figure layoutId={`ph-${active}`} className="lightbox__fig" transition={{ duration: 0.5, ease }}>
              <Image src={images[active]} alt={`${title} — صورة ${active + 1}`} fill sizes="92vw" className="lightbox__img" priority />
            </motion.figure>
            <button className="lightbox__close" aria-label="إغلاق" onClick={() => setActive(null)}>×</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
