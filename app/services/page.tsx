'use client';

import React from 'react';
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
} from '@/components/icons/TradeSvgs';

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
        <section className="relative bg-white pt-12 sm:pt-16 pb-6 sm:pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto text-center">
              {/* Technical Eyebrow / Sub Heading */}
              <div className="inline-flex items-center justify-center space-x-2 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#123E61] shrink-0" />
                <span>(01 — COMPREHENSIVE TRADE CAPABILITIES • GAUTENG)</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-5xl lg:text-[50px] font-extrabold tracking-tighter leading-[1.05] uppercase text-[#30323A] text-center">
                Complete Handyman Services<br />
                <span className="text-[#123E61]">in Johannesburg</span>
              </h1>
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
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-2">
                          Specialized Operations:
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

                      {/* Key Deliverables */}
                      <div className="bg-[#F8F9F9] p-5 border border-[#D9DEE2]">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#123E61] block mb-2">
                          Engineered Deliverables:
                        </span>
                        <ul className="space-y-1.5 text-xs text-slate-700">
                          {trade.keyDeliverables.map((item, dIdx) => (
                            <li key={dIdx} className="flex items-start space-x-2">
                              <span className="text-[#123E61] font-bold">›</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 pt-2">
                        <Link
                          href="/contact"
                          className="px-6 py-3 bg-[#123E61] hover:bg-[#0C2B44] text-white text-xs font-bold tracking-widest uppercase transition-colors shadow-sm"
                        >
                          Book {trade.title.split(' ')[0]} Inspection →
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
                      <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] w-full rounded-sm overflow-hidden bg-neutral-900 border border-[#D9DEE2] shadow-sm group">
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
