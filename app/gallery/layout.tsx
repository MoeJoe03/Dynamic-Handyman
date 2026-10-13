import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Gallery | Alberton and Johannesburg | Dynamic Handyman',
  description:
    'Browse Dynamic Handyman\'s project gallery: electrical repairs, painting, carpentry, plumbing and custom steel carports in Alberton, Johannesburg, and surrounding areas.',
  openGraph: {
    title: 'Project Gallery | Dynamic Handyman (PTY) LTD',
    description:
      'Real project photography featuring electrical work, painting, joinery, plumbing and steel carports in Alberton, Johannesburg, and surrounding areas.',
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
