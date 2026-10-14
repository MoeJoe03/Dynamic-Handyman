import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { businessConfig, operatingHoursSchema } from '@/config/business';
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
  title: `Handyman Services in Alberton | ${businessConfig.brandName}`,
  description: businessConfig.metadata.homeDescription,
  authors: [{ name: businessConfig.legalName }],
  metadataBase: new URL(businessConfig.websiteUrl),
  openGraph: {
    title: `Handyman Services in Alberton | ${businessConfig.brandName}`,
    description: businessConfig.metadata.homeDescription,
    images: [{
      url: '/dynamic-handyman-home-og.png',
      width: 1730,
      height: 909,
      alt: 'Dynamic Handyman handyman services in Alberton with a bathroom project image',
    }],
    type: 'website',
    locale: 'en_ZA',
    url: businessConfig.websiteUrl,
    siteName: businessConfig.legalName,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Handyman Services in Alberton | ${businessConfig.brandName}`,
    description: businessConfig.metadata.homeDescription,
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
    name: businessConfig.legalName,
    description: businessConfig.businessDescription,
    foundingDate: String(businessConfig.establishedYear),
    founder: { '@type': 'Person', name: businessConfig.founder },
    slogan: 'Rely On Our Ability.',
    areaServed: businessConfig.serviceAreas,
    telephone: businessConfig.phone.international,
    email: businessConfig.email.address,
    address: {
      '@type': 'PostalAddress',
      streetAddress: businessConfig.address.streetAddress,
      addressLocality: businessConfig.address.addressLocality,
      addressRegion: businessConfig.address.addressRegion,
      postalCode: businessConfig.address.postalCode,
      addressCountry: businessConfig.address.addressCountry,
    },
    sameAs: [businessConfig.facebookUrl],
    openingHours: operatingHoursSchema,
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
