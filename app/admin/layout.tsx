import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Gallery Manager | Dynamic Handyman', robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen bg-[#F3F5F6] text-[#30323A]">{children}</main>;
}
