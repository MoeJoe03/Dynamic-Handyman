import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Work in Alberton | Dynamic Handyman',
  description:
    'View Dynamic Handyman projects in Alberton, including electrical repairs, plumbing, painting, carpentry, paving and property renovations.',
  alternates: {
    canonical: 'https://dynamichandyman.co.za/gallery',
  },
  openGraph: {
    title: 'Our Work in Alberton | Dynamic Handyman',
    description:
      'See completed Dynamic Handyman work in Alberton, from electrical repairs and plumbing to painting, carpentry, paving and renovations.',
    type: 'website',
    url: 'https://dynamichandyman.co.za/gallery',
    images: [{
      url: '/dynamic-handyman-our-work-og.png',
      width: 1200,
      height: 675,
      alt: 'Dynamic Handyman project portfolio for home repairs and renovations in Alberton',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Work in Alberton | Dynamic Handyman',
    description:
      'See completed Dynamic Handyman work in Alberton, from electrical repairs and plumbing to painting, carpentry, paving and renovations.',
    images: ['/dynamic-handyman-our-work-og.png'],
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
