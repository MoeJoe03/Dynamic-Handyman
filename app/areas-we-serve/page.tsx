import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';
import { ServiceAreaSection } from '@/components/ServiceAreaSection';

const title = 'Areas We Serve | Dynamic Handyman';
const description = 'Find handyman service coverage in Alberton, nearby suburbs and wider Gauteng, and check availability for your project.';
const url = 'https://dynamichandyman.co.za/areas-we-serve';

export const metadata: Metadata = {
  title, description, alternates: { canonical: url },
  openGraph: { title, description, url, type: 'website' },
  twitter: { card: 'summary', title, description },
};

export default function AreasWeServePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-grow">
        <section className="mx-auto max-w-7xl px-4 pt-6 pb-8 sm:px-6 lg:px-8">
          <div className="bg-[#082F51] p-7 text-white shadow-xl sm:p-12 lg:p-16">
            <BreadcrumbNav currentPage="areas-we-serve" />
            <h1 className="text-3xl font-extrabold uppercase tracking-tighter sm:text-5xl lg:text-6xl">Areas We Serve</h1>
            <p className="mt-5 max-w-2xl leading-relaxed text-slate-200">Planning work at your property? Find your suburb below. For projects further afield, share your location and the work you need so we can confirm availability.</p>
          </div>
        </section>
        <ServiceAreaSection showAreaLink={false} />
      </main>
      <Footer />
    </div>
  );
}
