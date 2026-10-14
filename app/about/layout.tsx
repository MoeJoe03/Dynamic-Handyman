import type { Metadata } from 'next';
import { businessConfig } from '@/config/business';

export const metadata: Metadata = {
  title: `About ${businessConfig.brandName} | Alberton Contractor`,
  description:
    businessConfig.metadata.aboutDescription,
  alternates: {
    canonical: `${businessConfig.websiteUrl}/about`,
  },
  openGraph: {
    title: `About ${businessConfig.brandName} | Alberton Contractor`,
    description:
      businessConfig.metadata.aboutSocialDescription,
    type: 'website',
    url: `${businessConfig.websiteUrl}/about`,
    images: ['/dynamic-handyman-about-og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `About ${businessConfig.brandName} | Alberton Contractor`,
    description:
      businessConfig.metadata.aboutSocialDescription,
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
