import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Dynamic Handyman | Alberton Contractor',
  description:
    'Learn about Dynamic Handyman, an Alberton-based contractor providing multi-trade repairs, property maintenance and renovations in Alberton and nearby suburbs.',
  alternates: {
    canonical: 'https://dynamichandyman.co.za/about',
  },
  openGraph: {
    title: 'About Dynamic Handyman | Alberton Contractor',
    description:
      'Meet Dynamic Handyman, an Alberton-based contractor helping homeowners, landlords and businesses with repairs, maintenance and renovations.',
    type: 'website',
    url: 'https://dynamichandyman.co.za/about',
    images: ['/dynamic-handyman-about-og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Dynamic Handyman | Alberton Contractor',
    description:
      'Meet Dynamic Handyman, an Alberton-based contractor helping homeowners, landlords and businesses with repairs, maintenance and renovations.',
    images: ['/dynamic-handyman-about-og.png'],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
