import type { Metadata } from 'next';
import { businessConfig } from '@/config/business';

export const metadata: Metadata = {
  title: `Handyman Services in Alberton | ${businessConfig.brandName}`,
  description:
    businessConfig.metadata.servicesDescription,
  alternates: {
    canonical: `${businessConfig.websiteUrl}/services`,
  },
  openGraph: {
    title: `Handyman Services in Alberton | ${businessConfig.brandName}`,
    description:
      businessConfig.metadata.servicesDescription,
    type: 'website',
    url: `${businessConfig.websiteUrl}/services`,
    images: [{
      url: '/dynamic-handyman-services-og.png',
      width: 1200,
      height: 675,
      alt: 'Dynamic Handyman services blueprint featuring electrical, plumbing, carpentry, painting, fencing and paving',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Handyman Services in Alberton | ${businessConfig.brandName}`,
    description:
      businessConfig.metadata.servicesDescription,
    images: ['/dynamic-handyman-services-og.png'],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
