import React from 'react';

export function Hero() {
  return (
    <div className="bg-[#123E61] text-white p-6 sm:p-10 lg:p-14 xl:p-16 border border-[#0C2B44] relative shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
        {/* Left Column: Primary Typography */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center space-x-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-slate-300 mb-5 sm:mb-6">
            <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0" />
            <span>(00 — PROPERTY MAINTENANCE • REPAIRS • RENOVATIONS)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-6xl font-extrabold tracking-tighter leading-[0.95] uppercase">
            Handyman Services<br />
            and Home Renovations<br />
            <span className="text-slate-300">in Alberton</span>
          </h1>
        </div>

        {/* Right Column: Supporting Copy & CTAs */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 sm:space-y-8">
          <p className="text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed font-normal">
            Dynamic Handyman provides reliable home repairs, property maintenance and renovation services in Alberton, Johannesburg and surrounding areas. From electrical and plumbing repairs to painting, carpentry, paving and multi-trade renovations, we give homeowners, landlords and businesses one practical point of contact.
          </p>

          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
            <a
              href="#contact"
              className="px-6 sm:px-7 py-3.5 bg-white text-[#123E61] hover:bg-neutral-100 text-xs font-bold tracking-widest uppercase transition-all duration-200 shadow-sm border border-white"
            >
              Get a Quote
            </a>
            <a
              href="#gallery"
              className="px-6 sm:px-7 py-3.5 border border-white/30 text-white hover:bg-white/10 text-xs font-bold tracking-widest uppercase inline-flex items-center space-x-2 transition-all duration-200"
            >
              <span>View Our Work</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Sub-grid: 4 Architectural Trust Anchors */}
      <div
        className="mt-10 sm:mt-12 lg:mt-14 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        data-purpose="hero-trust-metrics"
      >
        {/* Anchor 1 */}
        <div className="flex items-start space-x-3.5">
          <div className="w-8 h-8 border border-white/20 flex items-center justify-center shrink-0 text-sky-300 bg-white/5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold tracking-wider uppercase text-white">Multi-Trade Services</p>
            <p className="text-[11px] text-slate-300 mt-0.5">Comprehensive Single Contractor</p>
          </div>
        </div>

        {/* Anchor 2 */}
        <div className="flex items-start space-x-3.5">
          <div className="w-8 h-8 border border-white/20 flex items-center justify-center shrink-0 text-sky-300 bg-white/5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold tracking-wider uppercase text-white">Domestic & Corporate</p>
            <p className="text-[11px] text-slate-300 mt-0.5">Homes, Offices & Retail</p>
          </div>
        </div>

        {/* Anchor 3 */}
        <div className="flex items-start space-x-3.5">
          <div className="w-8 h-8 border border-white/20 flex items-center justify-center shrink-0 text-sky-300 bg-white/5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeWidth="1.5" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold tracking-wider uppercase text-white">Repairs & Renovations</p>
            <p className="text-[11px] text-slate-300 mt-0.5">Minor Fixes to Full Builds</p>
          </div>
        </div>

        {/* Anchor 4 */}
        <div className="flex items-start space-x-3.5">
          <div className="w-8 h-8 border border-white/20 flex items-center justify-center shrink-0 text-sky-300 bg-white/5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold tracking-wider uppercase text-white">Reliable Workmanship</p>
            <p className="text-[11px] text-slate-300 mt-0.5">Precision & Clean Handovers</p>
          </div>
        </div>
      </div>
    </div>
  );
}
