'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { homeServicesData, ServiceItem } from '../data/services';
import { getHomeImage, type HomeImageOverrides } from '@/config/home-images';
import {
  ElectricalSvg,
  PaintingSvg,
  CarpentrySvg,
  PlumbingSvg,
  PalisadesCarportsSvg,
  PavingSvg,
} from './icons/TradeSvgs';

function ServiceImageCarousel({ service, homeImages }: { service: ServiceItem; homeImages: HomeImageOverrides }) {
  const slides = service.images.slice(0, 4).map((image, index) => {
    const selected = getHomeImage(homeImages, `service-${service.id}-${index + 1}`);
    return { url: selected.imageUrl, alt: selected.altText };
  });

  const loopSlides = [...slides, ...slides];

  return (
    <div className="relative min-w-0 lg:col-span-8" aria-label="Service image carousel">
      <div className="overflow-hidden rounded-lg border border-[#D9DEE2]/60 bg-transparent sm:rounded-2xl">
        <div
          className="animate-marquee flex w-[400%] motion-reduce:animate-none"
          style={{ animationDuration: '24s' }}
        >
          {loopSlides.map((img, imgIdx) => (
            <div
              key={`${img.url}-${imgIdx}`}
              className="w-[12.5%] shrink-0 px-1.5 first:pl-0 last:pr-0 sm:px-2"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-transparent sm:rounded-xl">
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500">
          Service images • Auto-rotating
        </span>
      </div>
    </div>
  );
}

export function ServiceAccordion({ homeImages }: { homeImages: HomeImageOverrides }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggleService = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

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
    <section className="py-20 lg:py-28 bg-white border-t border-[#D9DEE2]" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-20">
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 block mb-3">
            (01 — SERVICES)
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-[#30323A] mb-5">
            Handyman, Maintenance and Renovation Services
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            From small home repairs to larger renovation projects, Dynamic Handyman provides practical maintenance and handyman services for homeowners, landlords, offices and businesses in Alberton and surrounding Johannesburg areas.
          </p>
        </div>

        {/* Architectural Service Accordion */}
        <div
          className="border-t border-[#D9DEE2] divide-y divide-[#D9DEE2]"
          data-purpose="services-accordion-container"
        >
          {homeServicesData.map((service: ServiceItem) => {
            const isOpen = activeId === service.id;

            return (
              <div
                key={service.id}
                className={`transition-colors duration-200 ${
                  isOpen ? 'bg-neutral-50/70' : 'hover:bg-neutral-50/50'
                }`}
              >
                {/* Header Row */}
                <button
                  type="button"
                  onClick={() => toggleService(service.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left py-6 sm:py-7 px-2 sm:px-4 flex items-center justify-between gap-4 focus:outline-none focus:bg-neutral-50 cursor-pointer"
                >
                  <div className="flex items-center space-x-4 sm:space-x-8">
                    {/* Isometric Blueprint SVG */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shrink-0">
                      {getServiceSvg(service.id)}
                    </div>

                    <div className="max-w-3xl">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 block">
                        TRADE REF: {service.ref}
                      </span>
                      <h3 className="text-sm sm:text-lg md:text-xl font-extrabold text-[#30323A] uppercase tracking-tight">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
                    <span className="hidden sm:inline-block text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                      {service.badge}
                    </span>
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#123E61] text-white flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 ${
                        isOpen ? 'bg-[#0C2B44]' : 'group-hover:scale-105'
                      }`}
                    >
                      <span
                        className={`text-lg leading-none font-bold transition-transform duration-300 ${
                          isOpen ? 'rotate-45' : ''
                        }`}
                      >
                        +
                      </span>
                    </div>
                  </div>
                </button>

                {/* Expanded Content Drawer */}
                {isOpen && (
                  <div className="pb-8 sm:pb-10 pt-2 px-2 sm:pl-24 sm:pr-8 border-t border-[#D9DEE2]/70 animate-in fade-in duration-200">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      {/* Left: Sub-services and CTAs */}
                      <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
                        <div className="flex flex-wrap gap-2">
                          {service.subServices.map((sub, idx) => (
                            <span
                              key={idx}
                              className="bg-slate-100 hover:bg-slate-200 text-[#123E61] text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#D9DEE2]/70 transition-colors"
                            >
                              {sub}
                            </span>
                          ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                          <a
                            href="#contact"
                            className="px-6 py-3 bg-[#123E61] hover:bg-[#0C2B44] text-white text-xs font-bold tracking-widest uppercase rounded-lg transition-all shadow-sm"
                          >
                            Request A Quote
                          </a>
                          <a
                            href="#gallery"
                            className="px-6 py-3 border border-[#123E61] text-[#123E61] hover:bg-neutral-100 text-xs font-bold tracking-widest uppercase rounded-lg transition-all"
                          >
                            View Works
                          </a>
                        </div>
                      </div>

                      {/* Right: Auto-moving four-image workmanship carousel */}
                      <ServiceImageCarousel service={service} homeImages={homeImages} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Section Action Footer */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="mx-auto mb-6 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            We also provide property maintenance, renovations, glass and glazing, flooring, gutter repairs, and aluminium window and door services.
          </p>
          <Link
            href="/services"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-[#123E61] hover:bg-[#0C2B44] text-white text-xs font-bold tracking-widest uppercase transition-all duration-200 shadow-sm border border-transparent hover:border-[#123E61]"
          >
            <span>View All Services</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
