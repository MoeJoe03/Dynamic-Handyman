import React from 'react';
import { contactPhone } from '@/config/contact';

export function PropertyCta() {
  return (
    <div className="bg-[#123E61] text-white py-14 sm:py-16 lg:py-20 border-t border-[#0C2B44]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-300 block mb-2">
              READY TO GET STARTED?
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tighter leading-tight">
              Let&apos;s Take Care Of Your Property.
            </h2>
            <p className="text-slate-200 text-sm sm:text-base mt-4 max-w-2xl font-normal leading-relaxed">
              Tell us what needs repairing, maintaining or renovating and we&apos;ll help you find the right solution with transparent pricing and fast turnaround times.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-wrap gap-4 lg:justify-end">
            <a
              href="#quoteFormContainer"
              className="px-7 py-3.5 bg-white text-[#123E61] hover:bg-neutral-100 text-xs font-bold tracking-widest uppercase transition-all shadow-sm"
            >
              Request a Quote
            </a>
            <a
              href={contactPhone.telHref}
              className="px-7 py-3.5 border border-white text-white hover:bg-white/10 text-xs font-bold tracking-widest uppercase transition-all"
            >
              Call Us Directly
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
