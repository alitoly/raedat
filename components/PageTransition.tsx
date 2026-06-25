'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'motion/react';

/* SteviaPlease-style transition:
   click -> vertical panels slide down to cover -> route changes ->
   panels slide out, staggered from the CENTER outward (blinds opening). */

const PANELS = 9;
const CENTER = (PANELS - 1) / 2;
// palette — light pink (center) -> periwinkle -> deep navy (edges)
const COLORS = ['#304463', '#46597f', '#7d8abc', '#c79ac8', '#ffc7ed', '#c79ac8', '#7d8abc', '#46597f', '#304463'];

const COVER_MS = 460;
const REVEAL_MS = 520;
const STAGGER_MS = 55;
const MAX_DELAY = CENTER * STAGGER_MS;

const ease = [0.76, 0, 0.24, 1] as const;

const variants = {
  idle: { y: '-101%', transition: { duration: 0 } },
  cover: { y: '0%', transition: { duration: COVER_MS / 1000, ease } },
  // center panels (low |i-CENTER|) leave first
  reveal: (i: number) => ({
    y: '101%',
    transition: { duration: REVEAL_MS / 1000, ease, delay: (Math.abs(i - CENTER) * STAGGER_MS) / 1000 },
  }),
};

type Stage = 'idle' | 'cover' | 'reveal';

const Ctx = createContext<(href: string) => void>(() => {});
export const useTransitionTo = () => useContext(Ctx);

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [stage, setStage] = useState<Stage>('idle');
  const navigating = useRef(false);

  const go = useCallback(
    (href: string) => {
      if (href === pathname || navigating.current) return;
      navigating.current = true;
      setStage('cover');
      setTimeout(() => router.push(href), COVER_MS);
    },
    [pathname, router],
  );

  // when the new route has mounted, reveal it
  useEffect(() => {
    if (!navigating.current) return;
    setStage('reveal');
    window.scrollTo(0, 0);
    const t = setTimeout(() => {
      setStage('idle');
      navigating.current = false;
    }, REVEAL_MS + MAX_DELAY + 40);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <Ctx.Provider value={go}>
      {children}
      <div className="pt-overlay" aria-hidden style={{ pointerEvents: stage === 'idle' ? 'none' : 'auto' }}>
        {COLORS.map((c, i) => (
          <motion.span
            key={i}
            className="pt-panel"
            style={{ background: c }}
            custom={i}
            variants={variants}
            initial="idle"
            animate={stage}
          />
        ))}
      </div>
    </Ctx.Provider>
  );
}
