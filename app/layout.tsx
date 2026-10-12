import type { Metadata } from 'next';
import { Manrope, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Handyman Services and Home Renovations in Alberton | Dynamic Handyman',
  description:
    'Professional multi-trade property maintenance, repairs, renovations and alterations for residential homes and corporate facilities across Gauteng, South Africa. SANS 10142-1 certified electrical COCs, architectural painting, carpentry joinery, plumbing, and steel carports.',
  keywords: [
    'Dynamic Handyman',
    'handyman services Gauteng',
    'property maintenance Alberton',
    'electrical COC certificate Johannesburg',
    'house painting Pretoria',
    'custom carpentry joinery',
    'plumbing repairs Gauteng',
    'carports and palisades',
    'corporate office maintenance',
    'home renovations Sandton',
  ],
  authors: [{ name: 'Dynamic Handyman (PTY) LTD' }],
  metadataBase: new URL('https://dynamichandyman.co.za'),
  openGraph: {
    title: 'Handyman Services and Home Renovations in Alberton | Dynamic Handyman',
    description:
      'Dependable domestic and corporate property maintenance, repairs and renovations handled by one reliable multi-trade team across Gauteng.',
    type: 'website',
    locale: 'en_ZA',
    url: 'https://dynamichandyman.co.za',
    siteName: 'Dynamic Handyman (PTY) LTD',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Handyman Services and Home Renovations in Alberton | Dynamic Handyman',
    description:
      'Dependable domestic and corporate property maintenance, repairs and renovations across Gauteng.',
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
      'Professional multi-trade property maintenance, repairs, renovations and alterations across Gauteng.',
    slogan: 'Rely On Our Ability.',
    areaServed: [
      'Alberton',
      'Johannesburg',
      'Pretoria',
      'Sandton',
      'Randburg',
      'Centurion',
      'Bedfordview',
      'Gauteng',
    ],
    telephone: '+27-00-000-0000',
    email: 'info@dynamichandyman.co.za',
    currenciesAccepted: 'ZAR',
    paymentAccepted: 'EFT, Cash, Credit Card',
    openingHours: 'Mo,Tu,We,Th,Fr 07:30-17:00, Sa 08:00-13:00',
    priceRange: '$$',
  };

  return (
    <html lang="en" className={`scroll-smooth ${manrope.variable} ${jetbrainsMono.variable}`}>
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
