'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import TransitionLink from './TransitionLink';

const links = [
  { href: '/', label: 'الرئيسية' },
  { href: '/about', label: 'عن الحاضنة' },
  { href: '/program', label: 'البرنامج' },
  { href: '/impact', label: 'الأثر' },
  { href: '/stories', label: 'الرائدات' },
  { href: '/gallery', label: 'المعرض' },
  { href: '/news', label: 'الأخبار' },
];

// pages whose hero fills the screen behind the nav — start transparent here
const HERO_PATHS = ['/', '/about', '/program', '/impact', '/news'];

export default function Nav() {
  const pathname = usePathname();
  const overHero = HERO_PATHS.includes(pathname);
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header
      className={`nav${overHero ? '' : ' nav--solid nav--page'}${open ? ' nav--open' : ''}`}
      id="nav"
    >
      <TransitionLink className="brand" href="/" onClick={close}>
        <span className="brand__mark">رائدات</span>
        <span className="brand__sub">حاضنة</span>
      </TransitionLink>

      <nav className="nav__links" id="nav-menu">
        {links.map((l) => (
          <TransitionLink
            key={l.href}
            href={l.href}
            onClick={close}
            className={pathname === l.href ? 'is-active' : ''}
          >
            {l.label}
          </TransitionLink>
        ))}
        <TransitionLink href="/program" onClick={close} className="btn btn--pink nav__menu-cta">
          انضمي إلينا
        </TransitionLink>
      </nav>

      <TransitionLink href="/program" className="btn btn--pink nav__cta" onClick={close}>
        انضمي إلينا
      </TransitionLink>

      <button
        type="button"
        className="nav__burger"
        aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
        aria-expanded={open}
        aria-controls="nav-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span /><span /><span />
      </button>
    </header>
  );
}
