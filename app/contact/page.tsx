import Image from 'next/image';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { QuoteForm } from '@/components/QuoteForm';
import { servicesData } from '@/data/services';
import { mainServiceAreas, widerServiceAreas } from '@/config/service-areas';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';

export const metadata: Metadata = {
  title: 'Contact Dynamic Handyman | Alberton Quotes',
  description:
    'Contact Dynamic Handyman for handyman services, repairs, maintenance and renovations in Alberton and nearby suburbs. Call, WhatsApp or request a quote online.',
  alternates: {
    canonical: 'https://dynamichandyman.co.za/contact',
  },
  openGraph: {
    title: 'Contact Dynamic Handyman | Alberton Quotes',
    description:
      'Request a quote for handyman services, repairs, maintenance and renovations in Alberton and nearby suburbs.',
    type: 'website',
    url: 'https://dynamichandyman.co.za/contact',
    images: ['/dynamic-handyman-contact-og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Dynamic Handyman | Alberton Quotes',
    description:
      'Request a quote for handyman services, repairs, maintenance and renovations in Alberton and nearby suburbs.',
    images: ['/dynamic-handyman-contact-og.png'],
  },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string | string[] }>;
}) {
  const params = await searchParams;
  const requestedService = Array.isArray(params.service) ? params.service[0] : params.service;
  const initialServiceId = servicesData.some((service) => service.id === requestedService) ? requestedService : undefined;

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      {/* HEADER */}
      <Header />

      <main className="flex-grow">
        {/* CONTACT HERO WITH ARCHITECTURAL BLUEPRINT ASSET */}
        <section className="relative bg-white pt-6 pb-12 sm:pb-16 border-b border-[#D9DEE2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#082F51] text-white p-7 sm:p-12 lg:p-16 border border-[#0C2B44] relative shadow-xl overflow-hidden">
              {/* Background Vector Graphic */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <Image
                  src="/dynamic-handyman-contact-hero.svg"
                  alt="Dynamic Handyman Technical Dispatch Blueprint"
                  fill
                  priority
                  className="object-cover object-right opacity-90"
                  referrerPolicy="no-referrer"
                />
                {/* Gradient wash to ensure razor-sharp text contrast on left content */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#062B49]/95 via-[#062B49]/85 to-[#062B49]/10" />
              </div>

              <div className="relative z-10 max-w-4xl">
                <BreadcrumbNav currentPage="contact" />

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-[0.98] uppercase text-white">
                  Let&apos;s Talk About Your Project.<br />
                  <span className="text-slate-300">Fast, Actionable Estimates.</span>
                </h1>

                <p className="text-slate-200 text-sm sm:text-base lg:text-lg mt-6 leading-relaxed font-normal max-w-3xl">
                  Reach out directly by phone, email, WhatsApp, or submit your project requirements below. Dynamic Handyman provides handyman services, repairs, maintenance and renovations in Alberton and nearby suburbs. We will discuss the work required and the appropriate quotation process for your project.
                </p>

                {/* Quick Contact Micro-Anchor Badges */}
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-y-3 gap-x-6 text-[11px] font-mono tracking-wider text-sky-200 uppercase">
                  <span className="flex items-center space-x-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span>Fast Turnaround Diagnostics</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span>Direct Artisan Dispatch</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span>No Obligation Requisitions</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT ESTIMATE REQUISITION (SAME AS HOME PAGE) */}
        <section id="contact" className="bg-white">
          <QuoteForm initialServiceId={initialServiceId} />
        </section>

        <section className="py-16 sm:py-24" aria-labelledby="contact-areas-heading">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_500px] lg:gap-16 lg:px-8">
            <div>
              <span className="mb-3 block font-mono text-[11px] font-bold uppercase tracking-widest text-[#19547E]">Where We Work</span>
              <h2 id="contact-areas-heading" className="text-3xl font-extrabold tracking-tight text-[#123E61] sm:text-4xl">
                Areas We Serve
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-slate-600 sm:text-base">
                Dynamic Handyman is based at 10 Vauxhall Street, Eden Park, Alberton, 1458, serving residential and commercial clients in Alberton and surrounding areas.
              </p>
              <h3 className="mt-5 text-sm font-bold text-[#123E61]">Main Service Locations</h3>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Areas served">
                {mainServiceAreas.map((area) => (
                  <li key={area} className="border border-[#D9DEE2] bg-[#F8F9F9] px-3 py-2 text-sm text-[#123E61]">{area}</li>
                ))}
              </ul>
              <h3 className="mt-8 text-sm font-bold leading-relaxed text-[#123E61]">Wider Service Areas</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Based in Alberton, Dynamic Handyman also travels to:
              </p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Selected project areas in Gauteng">
                {widerServiceAreas.map((area) => (
                  <li key={area} className="border border-[#D9DEE2] bg-[#F8F9F9] px-3 py-2 text-sm text-[#123E61]">{area}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                Contact us with your project details to discuss the work, scheduling and a quote for your location.
              </p>
            </div>
            <div className="self-start overflow-hidden border border-[#D9DEE2] border-t-2 border-t-[#123E61] bg-[#F8F9F9]">
              <iframe
                title="Map showing Dynamic Handyman in Eden Park, Alberton"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3574.3120721831256!2d28.124960669348297!3d-26.381103654208978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e951dea742589e3%3A0x7545b2471eeae154!2sDynamic%20Handyman%20(Pty)%20Ltd!5e0!3m2!1sen!2sza!4v1791984196083!5m2!1sen!2sza"
                width="600"
                height="450"
                className="block h-[300px] w-full lg:h-[420px] xl:h-[460px]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
