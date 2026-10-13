import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Professional Multi-Trade Contractors | Dynamic Handyman (PTY) LTD',
  description:
    'Learn about Dynamic Handyman (PTY) LTD: Alberton-based multi-trade property maintenance, repairs, and renovations in Alberton, Johannesburg, and surrounding areas. Dedicated to reliable workmanship and single-contractor accountability.',
  openGraph: {
    title: 'About Us | Dynamic Handyman (PTY) LTD',
    description:
      'One Team. Every Trade. Done Right. Learn about Dynamic Handyman\'s standards, multi-trade capabilities, and service area in Alberton, Johannesburg, and surrounding areas.',
    type: 'website',
    url: 'https://dynamichandyman.co.za/about',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
