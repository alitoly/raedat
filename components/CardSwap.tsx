'use client';

import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type RefObject,
} from 'react';
import gsap from 'gsap';
import './CardSwap.css';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
));
Card.displayName = 'Card';

type Slot = { x: number; y: number; z: number; zIndex: number };

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true,
  });

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  /** when false, the stack stays still and only advances on card click */
  autoPlay?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: 'linear' | 'elastic';
  children: ReactNode;
}

const CardSwap = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  autoPlay = true,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children,
}: CardSwapProps) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2,
        };

  const childArr = useMemo(() => Children.toArray(children) as ReactElement[], [children]);
  const refs = useMemo<RefObject<HTMLDivElement | null>[]>(
    () => childArr.map(() => React.createRef<HTMLDivElement>()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length]
  );

  const order = useRef<number[]>(Array.from({ length: childArr.length }, (_, i) => i));

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number | undefined>(undefined);
  const container = useRef<HTMLDivElement | null>(null);
  // holds the latest swap fn so a card click can advance the stack manually;
  // pendingRef queues a click that lands while a swap is still animating
  const swapRef = useRef<() => void>(() => {});
  const pendingRef = useRef(false);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => {
      if (r.current) placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount);
    });

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      if (!elFront) return;
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: '+=500',
        duration: config.durDrop,
        ease: config.ease,
      });

      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        if (!el) return;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        'return'
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease,
        },
        'return'
      );

      tl.call(() => {
        order.current = [...rest, front];
        // a click arrived mid-swap — run the next one now
        if (pendingRef.current) {
          pendingRef.current = false;
          swapRef.current();
        }
      });
    };

    swapRef.current = swap;

    // click-only mode: leave the stack static and let card clicks drive it
    if (!autoPlay) {
      return;
    }

    swap();
    intervalRef.current = window.setInterval(swap, delay);

    if (pauseOnHover) {
      const node = container.current;
      if (node) {
        const pause = () => {
          tlRef.current?.pause();
          if (intervalRef.current) clearInterval(intervalRef.current);
        };
        const resume = () => {
          tlRef.current?.play();
          intervalRef.current = window.setInterval(swap, delay);
        };
        node.addEventListener('mouseenter', pause);
        node.addEventListener('mouseleave', resume);
        return () => {
          node.removeEventListener('mouseenter', pause);
          node.removeEventListener('mouseleave', resume);
          if (intervalRef.current) clearInterval(intervalRef.current);
        };
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDistance, verticalDistance, delay, pauseOnHover, autoPlay, skewAmount, easing]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child as ReactElement<Record<string, unknown>>, {
          key: i,
          ref: refs[i],
          style: { width, height, ...((child.props as { style?: React.CSSProperties }).style ?? {}) },
          onClick: (e: React.MouseEvent<HTMLDivElement>) => {
            (child.props as { onClick?: (e: React.MouseEvent<HTMLDivElement>) => void }).onClick?.(e);
            onCardClick?.(i);
            // advance to the next card on click; if a swap is mid-flight, queue one
            if (tlRef.current && tlRef.current.isActive()) {
              pendingRef.current = true;
            } else {
              swapRef.current();
            }
          },
        } as Record<string, unknown>)
      : child
  );

  return (
    <div ref={container} className="card-swap-container" style={{ width, height }}>
      {rendered}
    </div>
  );
};

export default CardSwap;
