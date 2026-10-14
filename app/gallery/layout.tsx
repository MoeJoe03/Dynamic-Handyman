import type { Metadata } from 'next';
import { businessConfig } from '@/config/business';

export const metadata: Metadata = {
  title: `Our Work in Alberton | ${businessConfig.brandName}`,
  description:
    businessConfig.metadata.galleryDescription,
  alternates: {
    canonical: `${businessConfig.websiteUrl}/gallery`,
  },
  openGraph: {
    title: `Our Work in Alberton | ${businessConfig.brandName}`,
    description:
      businessConfig.metadata.gallerySocialDescription,
    type: 'website',
    url: `${businessConfig.websiteUrl}/gallery`,
    images: [{
      url: '/dynamic-handyman-our-work-og.png',
      width: 1200,
      height: 675,
      alt: 'Dynamic Handyman project portfolio for home repairs and renovations in Alberton',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Our Work in Alberton | ${businessConfig.brandName}`,
    description:
      businessConfig.metadata.gallerySocialDescription,
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
