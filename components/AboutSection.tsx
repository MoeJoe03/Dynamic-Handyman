import React from 'react';
import Image from 'next/image';
import { getHomeImage, type HomeImageOverrides } from '@/config/home-images';

export function AboutSection({ homeImages }: { homeImages: HomeImageOverrides }) {
  return (
    <section className="py-20 lg:py-28 bg-white border-t border-[#D9DEE2]" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Eyebrow matching Stitch design */}
        <div className="flex items-center space-x-3 mb-8 sm:mb-12">
          <span className="w-10 h-[2px] bg-[#123E61]" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#123E61] font-mono">
            ABOUT US
          </span>
        </div>

        {/* Two-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16 lg:mb-20">
          {/* Left Column: Statement Headline */}
          <div className="lg:col-span-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-[#30323A] leading-[1.12]">
              An Alberton-based handyman helping homeowners keep their homes{' '}
              <span className="text-[#123E61]">in top shape.</span>
            </h2>
          </div>

          {/* Right Column: Paragraph narrative & Workmanship Photo */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal mb-8">
              Dynamic Handyman (PTY) LTD provides dependable property maintenance, repairs and renovations across Gauteng. From everyday repairs to larger improvements, our goal is simple: provide reliable workmanship through one team that can handle multiple trades.
            </p>

            {/* Workmanship photograph (artisan driving screw with precision cordless drill into timber decking) */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#D9DEE2]/70 bg-neutral-100 group aspect-[16/10] sm:aspect-[16/9]">
              <Image
                src={getHomeImage(homeImages, 'about-workmanship').imageUrl}
                alt={getHomeImage(homeImages, 'about-workmanship').altText}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* 4 Architectural Benefit Pillars (Separated by thin lines, strictly NO cards) */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-12 border-t border-[#D9DEE2]"
          data-purpose="about-benefit-pillars"
        >
          <div className="border-t-2 border-[#123E61] pt-6">
            <span className="text-xs font-mono font-bold text-slate-400">01</span>
            <h4 className="text-sm font-extrabold uppercase tracking-tight text-[#30323A] mt-2 mb-2">
              Multi-Trade Expertise
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Eliminate the confusion of multiple vendors. Complete electrical, plumbing, carpentry, and building services under one roof.
            </p>
          </div>

          <div className="border-t-2 border-[#123E61] pt-6">
            <span className="text-xs font-mono font-bold text-slate-400">02</span>
            <h4 className="text-sm font-extrabold uppercase tracking-tight text-[#30323A] mt-2 mb-2">
              Domestic & Corporate
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Scalable solutions tailored for individual private homeowners, sectional titles, office complexes, and retail stores.
            </p>
          </div>

          <div className="border-t-2 border-[#123E61] pt-6">
            <span className="text-xs font-mono font-bold text-slate-400">03</span>
            <h4 className="text-sm font-extrabold uppercase tracking-tight text-[#30323A] mt-2 mb-2">
              Quality Workmanship
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              From preliminary site assessments to final cleaning and handover, our standard is high-spec finish and durable results.
            </p>
          </div>

          <div className="border-t-2 border-[#123E61] pt-6">
            <span className="text-xs font-mono font-bold text-slate-400">04</span>
            <h4 className="text-sm font-extrabold uppercase tracking-tight text-[#30323A] mt-2 mb-2">
              One Team. Multiple Solutions.
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              A single point of contact, consolidated billing, transparent quotes, and reliable turnarounds on every single project.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
