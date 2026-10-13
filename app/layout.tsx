import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { contactPhone } from '@/config/contact';
import { serviceAreas } from '@/config/service-areas';
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
    'Dynamic Handyman provides home repairs, maintenance and renovations in Alberton, Johannesburg and surrounding areas. Request a quote for electrical, plumbing, painting, carpentry and more.',
  authors: [{ name: 'Dynamic Handyman (PTY) LTD' }],
  metadataBase: new URL('https://dynamichandyman.co.za'),
  openGraph: {
    title: 'Handyman Services in Alberton | Dynamic Handyman',
    description:
      'Dynamic Handyman provides home repairs, maintenance and renovations in Alberton, Johannesburg and surrounding areas. Request a quote for electrical, plumbing, painting, carpentry and more.',
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
      'Dynamic Handyman provides home repairs, maintenance and renovations in Alberton, Johannesburg and surrounding areas. Request a quote for electrical, plumbing, painting, carpentry and more.',
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
      'Professional multi-trade property maintenance, repairs, renovations and alterations across Johannesburg.',
    slogan: 'Rely On Our Ability.',
    areaServed: serviceAreas,
    telephone: contactPhone.international,
    email: 'info@dynamichandyman.co.za',
    currenciesAccepted: 'ZAR',
    paymentAccepted: 'EFT, Cash, Credit Card',
    openingHours: 'Mo,Tu,We,Th,Fr 07:30-17:00, Sa 08:00-13:00',
    priceRange: '$$',
  };

  return (
    <html lang="en" className={`scroll-smooth ${siteSans.variable} ${siteMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-[#30323A] selection:bg-[#123E61] selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
