import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Handyman, Home Repair and Renovation Services in Alberton | Dynamic Handyman',
  description:
    'Explore electrical repairs and certificates of compliance, painting, carpentry, plumbing, paving and property renovations in Alberton and across Gauteng.',
  openGraph: {
    title: 'Handyman, Home Repair and Renovation Services in Alberton | Dynamic Handyman',
    description:
      'Explore Dynamic Handyman services in Alberton and Gauteng, including electrical repairs, painting, carpentry, plumbing, paving and property renovations.',
    type: 'website',
    url: 'https://dynamichandyman.co.za/services',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
