import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Multi-Trade Services & Capabilities | Dynamic Handyman (PTY) LTD',
  description:
    'Comprehensive property maintenance, repairs, renovations and alterations across Gauteng. SANS 10142-1 certified electrical COCs, interior/exterior painting, custom carpentry joinery, plumbing hydraulics, and engineered carports & palisades.',
  openGraph: {
    title: 'Multi-Trade Services & Capabilities | Dynamic Handyman (PTY) LTD',
    description:
      'Explore Dynamic Handyman\'s accredited multi-trade capabilities across Gauteng. SANS 10142-1 Electrical COCs, Architectural Painting, Custom Carpentry BICs, Plumbing Hydraulics, and Engineered Palisades & Carports.',
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
