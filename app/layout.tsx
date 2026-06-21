import type { Metadata } from 'next';
import { Tajawal } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import Effects from './effects';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-tajawal',
  display: 'swap',
});

const milan = localFont({
  src: '../public/fonts/Milan-Display-Black.otf',
  variable: '--font-milan',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'حاضنة رائدات — حيث تتحوّل الأفكار إلى مشاريع حقيقية',
  description:
    'حاضنة رائدات: أول حاضنة نسائية متخصصة في ريادة الأعمال على مستوى الوطن العربي، تابعة لأكاديمية المرأة العُمانية.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} ${milan.variable}`}>
      <body>
        <div className="scroll-line" id="scrollLine" />
        <PageTransition>
          <Nav />
          {children}
          <Footer />
        </PageTransition>
        <Effects />
      </body>
    </html>
  );
}
