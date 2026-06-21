import TransitionLink from './TransitionLink';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__brand">
        <span className="display footer__logo">رائدات</span>
        <p>حاضنة رائدات — أكاديمية المرأة العُمانية. مركز الاستدامة لتطوير الأعمال.</p>
      </div>
      <nav className="footer__links">
        <TransitionLink href="/about">عن الحاضنة</TransitionLink>
        <TransitionLink href="/program">البرنامج</TransitionLink>
        <TransitionLink href="/impact">الأثر</TransitionLink>
        <TransitionLink href="/news">الأخبار</TransitionLink>
      </nav>
      <p className="footer__copy">© 2026 حاضنة رائدات. جميع الحقوق محفوظة.</p>
    </footer>
  );
}
