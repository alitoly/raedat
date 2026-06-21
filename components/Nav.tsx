'use client';

import { usePathname } from 'next/navigation';
import TransitionLink from './TransitionLink';

const links = [
  { href: '/', label: 'الرئيسية' },
  { href: '/about', label: 'عن الحاضنة' },
  { href: '/program', label: 'البرنامج' },
  { href: '/impact', label: 'الأثر' },
  { href: '/news', label: 'الأخبار' },
];

export default function Nav() {
  const pathname = usePathname();
  const onHome = pathname === '/';

  return (
    <header className={`nav${onHome ? '' : ' nav--solid nav--page'}`} id="nav">
      <TransitionLink className="brand" href="/">
        <span className="brand__mark">رائدات</span>
        <span className="brand__sub">حاضنة</span>
      </TransitionLink>
      <nav className="nav__links">
        {links.map((l) => (
          <TransitionLink key={l.href} href={l.href} className={pathname === l.href ? 'is-active' : ''}>
            {l.label}
          </TransitionLink>
        ))}
      </nav>
      <TransitionLink href="/program" className="btn btn--pink nav__cta">انضمي إلينا</TransitionLink>
    </header>
  );
}
