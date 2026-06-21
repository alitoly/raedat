'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

export default function Effects() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  // once: smooth scroll, progress line, nav state, in-page anchor links
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let lenis: Lenis | null = null;
    let rafId = 0;
    if (!reduce) {
      lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      lenisRef.current = lenis;
      const raf = (t: number) => { lenis!.raf(t); rafId = requestAnimationFrame(raf); };
      rafId = requestAnimationFrame(raf);
    }

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const el = document.querySelector(a.getAttribute('href')!);
      if (el) { e.preventDefault(); lenis ? lenis.scrollTo(el as HTMLElement, { offset: -80 }) : el.scrollIntoView({ behavior: 'smooth' }); }
    };
    document.addEventListener('click', onClick);

    const line = document.getElementById('scrollLine');
    const nav = document.getElementById('nav');
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (line) line.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
      // only the home hero drives the transparent->solid nav
      if (nav && document.querySelector('.hero')) {
        nav.classList.toggle('nav--solid', window.scrollY > window.innerHeight * 0.7);
      }
    };
    lenis ? lenis.on('scroll', onScroll) : window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      document.removeEventListener('click', onClick);
      if (!lenis) window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  // per navigation: reset scroll, (re)wire reveal + count-up for the new page
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('[data-reveal], [data-reveal-group]').forEach((el) => io.observe(el));

    const cio = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target as HTMLElement;
        const target = +(el.dataset.count || '0');
        let n = 0;
        const step = () => {
          n += Math.ceil(target / 28);
          if (n >= target) { el.textContent = String(target); return; }
          el.textContent = String(n); requestAnimationFrame(step);
        };
        step();
        cio.unobserve(el);
      });
    }, { threshold: 0.6 });
    document.querySelectorAll('[data-count]').forEach((c) => cio.observe(c));

    return () => { io.disconnect(); cio.disconnect(); };
  }, [pathname]);

  return null;
}
