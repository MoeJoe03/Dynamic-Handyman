import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Gallery | Real Workmanship Across Gauteng | Dynamic Handyman',
  description:
    'Browse Dynamic Handyman\'s project gallery: certified electrical DB boards & COCs, architectural painting, custom built-in cupboards, bathroom plumbing, and custom steel carports across Johannesburg, Pretoria, and Alberton.',
  openGraph: {
    title: 'Project Gallery | Dynamic Handyman (PTY) LTD',
    description:
      'Real craftsmanship photography across Gauteng: certified electricals, architectural coatings, precision joinery, plumbing, and steel carports.',
    type: 'website',
    url: 'https://dynamichandyman.co.za/gallery',
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
