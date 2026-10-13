import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { QuoteForm } from '@/components/QuoteForm';
import { servicesData } from '@/data/services';

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
            <div className="bg-[#0A2A44] text-white p-7 sm:p-12 lg:p-16 border border-[#0C2B44] relative shadow-xl overflow-hidden">
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
                <div className="absolute inset-0 bg-gradient-to-r from-[#071E32]/95 via-[#0A2A44]/80 to-transparent lg:via-[#0A2A44]/45" />
              </div>

              <div className="relative z-10 max-w-4xl">
                {/* Technical Eyebrow */}
                <div className="inline-flex items-center space-x-2 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-slate-300 mb-5">
                  <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0" />
                  <span>(04 — DIRECT REQUISITION &amp; ESTIMATES • JOHANNESBURG)</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-[0.98] uppercase text-white">
                  Let&apos;s Talk About Your Project.<br />
                  <span className="text-slate-300">Fast, Actionable Estimates.</span>
                </h1>

                <p className="text-slate-200 text-sm sm:text-base lg:text-lg mt-6 leading-relaxed font-normal max-w-3xl">
                  Reach out directly by phone, email, WhatsApp, or submit your project requirements below using our standard quote estimate form. We respond promptly with certified site assessments and transparent itemized pricing.
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
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
