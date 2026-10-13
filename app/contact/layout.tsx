import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Request a Free Estimate | Dynamic Handyman (PTY) LTD',
  description:
    'Contact Dynamic Handyman (PTY) LTD for electrical repairs, painting, carpentry, plumbing, and carports in Alberton, Johannesburg, and surrounding areas. Call or use our quote form.',
  openGraph: {
    title: 'Contact Us | Dynamic Handyman (PTY) LTD',
    description:
      'Contact Dynamic Handyman for multi-trade property services in Alberton, Johannesburg, and surrounding areas.',
    type: 'website',
    url: 'https://dynamichandyman.co.za/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
