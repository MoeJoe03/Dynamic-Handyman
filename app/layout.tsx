import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { contactPhone } from '@/config/contact';
import { mainServiceAreas, widerServiceAreas } from '@/config/service-areas';
import './globals.css';

const siteSans = localFont({
  src: '../public/fonts/manrope-variable.ttf',
  variable: '--font-sans',
  display: 'swap',
  weight: '300 800',
});

const siteMono = localFont({
  src: '../public/fonts/jetbrains-mono-variable.ttf',
  variable: '--font-mono',
  display: 'swap',
  weight: '400 700',
});

export const metadata: Metadata = {
  title: 'Handyman Services in Alberton | Dynamic Handyman',
  description:
    'Dynamic Handyman provides reliable handyman services, home repairs and renovations in Alberton and nearby suburbs. Request a quote for electrical, plumbing, painting and more.',
  authors: [{ name: 'Dynamic Handyman (PTY) LTD' }],
  metadataBase: new URL('https://dynamichandyman.co.za'),
  openGraph: {
    title: 'Handyman Services in Alberton | Dynamic Handyman',
    description:
      'Dynamic Handyman provides reliable handyman services, home repairs and renovations in Alberton and nearby suburbs. Request a quote for electrical, plumbing, painting and more.',
    images: [{
      url: '/dynamic-handyman-home-og.png',
      width: 1730,
      height: 909,
      alt: 'Dynamic Handyman handyman services in Alberton with a bathroom project image',
    }],
    type: 'website',
    locale: 'en_ZA',
    url: 'https://dynamichandyman.co.za',
    siteName: 'Dynamic Handyman (PTY) LTD',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Handyman Services in Alberton | Dynamic Handyman',
    description:
      'Dynamic Handyman provides reliable handyman services, home repairs and renovations in Alberton and nearby suburbs. Request a quote for electrical, plumbing, painting and more.',
    images: ['/dynamic-handyman-home-og.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'Dynamic Handyman (PTY) LTD',
    description:
      'Professional handyman services, home repairs, property maintenance and renovations. Based in Alberton and serving surrounding Gauteng areas.',
    slogan: 'Rely On Our Ability.',
    areaServed: [...mainServiceAreas, ...widerServiceAreas],
    telephone: contactPhone.international,
    email: 'admin@dynamichandyman.co.za',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '10 Vauxhall Street',
      addressLocality: 'Eden Park',
      addressRegion: 'Gauteng',
      postalCode: '1458',
      addressCountry: 'ZA',
    },
    sameAs: ['https://www.facebook.com/dynamichandyman/'],
    currenciesAccepted: 'ZAR',
    paymentAccepted: 'EFT, Cash, Credit Card',
    openingHours: ['Mo-Th 08:00-17:00', 'Fr 08:00-16:00', 'Sa 09:00-14:00'],
    priceRange: '$$',
  };

  return (
    <html lang="en" className={`scroll-smooth ${siteSans.variable} ${siteMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-[#30323A] selection:bg-[#123E61] selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
