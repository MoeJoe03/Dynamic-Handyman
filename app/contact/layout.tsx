import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Request a Free Estimate | Dynamic Handyman (PTY) LTD',
  description:
    'Contact Dynamic Handyman (PTY) LTD for certified multi-trade repairs, electrical COCs, painting, carpentry, plumbing, and carports across Gauteng. Call or use our interactive estimate requisition form.',
  openGraph: {
    title: 'Contact Us | Dynamic Handyman (PTY) LTD',
    description:
      'Direct contact & interactive estimate requisition for multi-trade property services across Gauteng.',
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
