import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Handyman Services in Alberton | Dynamic Handyman',
  description:
    'Explore electrical, plumbing, painting, carpentry, paving and renovation services from Dynamic Handyman in Alberton and nearby suburbs.',
  alternates: {
    canonical: 'https://dynamichandyman.co.za/services',
  },
  openGraph: {
    title: 'Handyman Services in Alberton | Dynamic Handyman',
    description:
      'Explore electrical, plumbing, painting, carpentry, paving and renovation services from Dynamic Handyman in Alberton and nearby suburbs.',
    type: 'website',
    url: 'https://dynamichandyman.co.za/services',
    images: [{
      url: '/dynamic-handyman-services-og.png',
      width: 1200,
      height: 675,
      alt: 'Dynamic Handyman services blueprint featuring electrical, plumbing, carpentry, painting, fencing and paving',
    }],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
