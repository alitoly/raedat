import type { Metadata } from 'next';
import { Tajawal } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import Effects from './effects';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { siteUrl, siteName, siteDescription, siteKeywords } from '@/lib/site';

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
  metadataBase: new URL(siteUrl),
  title: {
    default: 'حاضنة رائدات — حيث تتحوّل الأفكار إلى مشاريع حقيقية',
    template: '%s | حاضنة رائدات',
  },
  description: siteDescription,
  keywords: siteKeywords,
  applicationName: siteName,
  authors: [{ name: 'أكاديمية المرأة العُمانية' }],
  creator: 'أكاديمية المرأة العُمانية',
  publisher: 'أكاديمية المرأة العُمانية',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'ar_OM',
    url: siteUrl,
    siteName,
    title: 'حاضنة رائدات — حيث تتحوّل الأفكار إلى مشاريع حقيقية',
    description: siteDescription,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'حاضنة رائدات' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'حاضنة رائدات — حيث تتحوّل الأفكار إلى مشاريع حقيقية',
    description: siteDescription,
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'حاضنة رائدات',
    alternateName: ['Raedat', 'حاضنة رائدات للأعمال', 'Raedat Incubator'],
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
    image: `${siteUrl}/og.png`,
    description: siteDescription,
    inLanguage: 'ar',
    areaServed: 'OM',
    parentOrganization: { '@type': 'EducationalOrganization', name: 'أكاديمية المرأة العُمانية' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'حاضنة رائدات',
    url: siteUrl,
    inLanguage: 'ar',
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} ${milan.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
