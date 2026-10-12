import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { servicesData } from '@/data/services';
import {
  ElectricalSvg,
  PaintingSvg,
  CarpentrySvg,
  PlumbingSvg,
  PalisadesCarportsSvg,
  PavingSvg,
  MaintenanceSvg,
  GlassWorksSvg,
  FlooringSvg,
  GuttersFasciaSvg,
  AluminiumWindowsDoorsSvg,
} from '@/components/icons/TradeSvgs';

const quoteButtonLabels: Record<string, string> = {
  electrical: 'Request an Electrical Quote',
  painting: 'Request a Painting Estimate',
  carpentry: 'Discuss Your Carpentry Project',
  plumbing: 'Request a Plumbing Quote',
  palisades: 'Get a Carport Estimate',
  paving: 'Request a Paving Quote',
  maintenance: 'Discuss Your Renovation',
  'glass-works': 'Request a Glass Quote',
  flooring: 'Request a Flooring Estimate',
  'gutters-fascia': 'Request a Gutter Quote',
  'aluminium-windows-doors': 'Request an Aluminium Quote',
};

export default function ServicesPage() {
  const getServiceSvg = (id: string) => {
    switch (id) {
      case 'electrical':
        return <ElectricalSvg className="w-16 h-12 object-contain" />;
      case 'painting':
        return <PaintingSvg className="w-16 h-12 object-contain" />;
      case 'carpentry':
        return <CarpentrySvg className="w-16 h-12 object-contain" />;
      case 'plumbing':
        return <PlumbingSvg className="w-16 h-12 object-contain" />;
      case 'palisades':
        return <PalisadesCarportsSvg className="w-16 h-12 object-contain" />;
      case 'paving':
        return <PavingSvg className="w-16 h-12 object-contain" />;
      case 'maintenance':
        return <MaintenanceSvg className="w-16 h-12 object-contain" />;
      case 'glass-works':
        return <GlassWorksSvg className="w-16 h-12 object-contain" />;
      case 'flooring':
        return <FlooringSvg className="w-16 h-12 object-contain" />;
      case 'gutters-fascia':
        return <GuttersFasciaSvg className="w-16 h-12 object-contain" />;
      case 'aluminium-windows-doors':
        return <AluminiumWindowsDoorsSvg className="w-16 h-12 object-contain" />;
      default:
        return <ElectricalSvg className="w-16 h-12 object-contain" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      {/* HEADER */}
      <Header />

      <main className="flex-grow">
        {/* HERO SECTION FOR SERVICES */}
        <section className="relative bg-white pt-6 pb-8 sm:pb-12 border-b border-[#D9DEE2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative min-h-[340px] sm:min-h-[420px] lg:min-h-[500px] overflow-hidden border border-[#0C2B44] bg-[#082F51] shadow-xl">
              <Image
                src="/dynamic-handyman-services-hero.svg"
                alt="Technical blueprint featuring symbols for electrical, plumbing, carpentry, painting, fencing, and paving services"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#062B49]/95 via-[#062B49]/85 to-[#062B49]/10" />
              <div className="relative z-10 flex min-h-[340px] sm:min-h-[420px] lg:min-h-[500px] items-center px-6 py-10 sm:px-10 lg:px-14">
            <div className="max-w-3xl">
              {/* Technical Eyebrow / Sub Heading */}
              <div className="inline-flex items-center space-x-2 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-slate-300 mb-5">
                <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0" />
                <span>(01 — COMPREHENSIVE TRADE CAPABILITIES • GAUTENG)</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-[1.02] uppercase text-white">
                Handyman, Home Repair and Renovation Services<br />
                <span className="text-slate-300">in Alberton</span>
              </h1>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base">
                Dynamic Handyman provides reliable handyman services, home repairs, property maintenance and renovation work in Alberton and selected areas of Gauteng. From electrical and plumbing repairs to painting, carpentry, paving and multi-trade renovations, we provide one practical point of contact for maintaining and improving your property.
              </p>
            </div>
              </div>
            </div>
          </div>
        </section>

        {/* FULL ARCHITECTURAL TRADE BREAKDOWNS */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
            {servicesData.map((trade, idx) => {
              const isEven = idx % 2 === 1;

              return (
                <div
                  key={trade.id}
                  id={`trade-${trade.id}`}
                  className={`scroll-mt-24 ${idx === 0 ? 'pt-2' : 'border-t border-[#D9DEE2] pt-12 sm:pt-16'}`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    {/* Content Column */}
                    <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : ''} space-y-6`}>
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 flex items-center justify-center shrink-0">
                          {getServiceSvg(trade.id)}
                        </div>
                        <div>
                          <div className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-400">
                            TRADE DIVISION // {trade.ref}
                          </div>
                          <span className="inline-block text-[11px] font-bold text-[#123E61] uppercase tracking-wider">
                            {trade.badge}
                          </span>
                        </div>
                      </div>

                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase text-[#30323A] tracking-tight leading-snug">
                        {trade.title}
                      </h2>

                      <p className="text-xs font-mono font-bold text-[#19547E] uppercase tracking-wider">
                        {trade.subtitle}
                      </p>

                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                        {trade.description}
                      </p>

                      {/* Sub-services pills */}
                      <div>
                        <span className="text-[11px] font-mono font-bold tracking-wider text-slate-500 block mb-2">
                          Services Include;
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {trade.subServices.map((sub, sIdx) => (
                            <span
                              key={sIdx}
                              className="bg-[#F8F9F9] text-[#123E61] text-xs font-semibold px-3 py-1.5 border border-[#D9DEE2]"
                            >
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 pt-2">
                        <Link
                          href="/contact"
                          className="px-6 py-3 bg-[#123E61] hover:bg-[#0C2B44] text-white text-xs font-bold tracking-widest uppercase transition-colors shadow-sm"
                        >
                          {quoteButtonLabels[trade.id]}
                        </Link>
                        <Link
                          href="/gallery"
                          className="px-6 py-3 border border-[#123E61] text-[#123E61] hover:bg-neutral-50 text-xs font-bold tracking-widest uppercase transition-colors"
                        >
                          View Completed Works
                        </Link>
                      </div>
                    </div>

                    {/* Single Main Image Column */}
                    <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : ''}`}>
                      <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] w-full rounded-sm overflow-hidden bg-neutral-900 border border-[#D9DEE2] shadow-sm group">
                        <Image
                          src={trade.images[0].url}
                          alt={trade.images[0].alt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-sm text-white text-[10px] font-mono px-3 py-1.5 tracking-wider uppercase border border-white/10">
                          {trade.complianceSpec}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
