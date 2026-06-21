'use client';

import { useTransitionTo } from './PageTransition';

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export default function TransitionLink({ href, onClick, children, ...rest }: Props) {
  const go = useTransitionTo();
  const internal = href.startsWith('/');

  return (
    <a
      href={href}
      onClick={(e) => {
        onClick?.(e);
        // only intercept plain left-clicks on internal routes
        if (internal && !e.defaultPrevented && e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
          e.preventDefault();
          go(href);
        }
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
