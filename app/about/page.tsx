import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      {/* HEADER */}
      <Header />

      <main className="flex-grow">
        {/* HERO SECTION FOR ABOUT */}
        <section className="relative bg-white pt-6 pb-12 sm:pb-16 border-b border-[#D9DEE2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#0A2A44] text-white p-7 sm:p-12 lg:p-16 border border-[#0C2B44] relative shadow-xl overflow-hidden">
              {/* Background Vector Graphic */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <Image
                  src="/dynamic-handyman-about-hero.svg"
                  alt="Dynamic Handyman Architectural Structural Blueprint"
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
                  <span>(03 — ABOUT US • COMPANY BACKGROUND &amp; STANDARDS)</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-[0.98] uppercase">
                  About Dynamic Handyman:<br />
                  <span className="text-slate-300">Alberton’s Home Repair and Renovation Team</span>
                </h1>

                <p className="text-slate-200 text-sm sm:text-base lg:text-lg mt-6 leading-relaxed font-normal max-w-3xl">
                  Dynamic Handyman (PTY) LTD was established with a singular objective: replace the stress of fragmented, unreliable trade contractors with one dependable multi-trade firm that takes full accountability from site diagnostics to final handover.
                </p>

                {/* Mottos & Positionings */}
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-y-3 gap-x-8 text-[11px] font-mono tracking-wider text-sky-200 uppercase">
                  <span>Alberton Headquarters</span>
                  <span>{'// Multi-Trade Cross-Disciplinary Squads'}</span>
                  <span>{'// Zero Fragmentation'}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EDITORIAL NARRATIVE & WORKMANSHIP IMAGE */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column Narrative */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center space-x-3">
                  <span className="w-10 h-[2px] bg-[#123E61]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#123E61]">
                    OUR PHILOSOPHY
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase text-[#30323A] tracking-tight leading-tight">
                  Why A Multi-Trade Model Works Better For You
                </h2>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Traditional property maintenance usually requires dealing with four or five separate vendors: an electrician who won&apos;t touch plumbing, a carpenter who leaves plaster damaged, and a painter who cannot fix a leaking roof gutter. Coordination delays multiply, fingers get pointed, and costs balloon.
                </p>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  At Dynamic Handyman, our teams are cross-trained and accredited across multiple disciplines. When we repair built-in cupboards, our electricians can safely isolate lighting lines. When we install carports, our paving specialists ensure drainage foundations are solid. One company, transparent billing, and a neat, clean handover every time.
                </p>

                <div className="pt-2 flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="px-6 py-3 bg-[#123E61] hover:bg-[#0C2B44] text-white text-xs font-bold tracking-widest uppercase transition-colors shadow-sm"
                  >
                    Request An Estimate →
                  </Link>
                  <Link
                    href="/services"
                    className="px-6 py-3 border border-[#D9DEE2] hover:bg-neutral-50 text-[#30323A] text-xs font-bold tracking-widest uppercase transition-colors"
                  >
                    Explore Services →
                  </Link>
                </div>
              </div>

              {/* Right Column Image */}
              <div className="lg:col-span-6 space-y-3">
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#D9DEE2]/70 bg-neutral-100 group aspect-[4/3] sm:aspect-[16/11]">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBU_gfQYJFb2m2FmgnHV0RjZK7LSAUjtk1-lhmRfHpaFzNW3A3VKYSeBrVyGBsh517HezrI6-nWw-SbfhQjoNXbtb7nVllPQjKnP3zB_lYjNbxYrvf8wr26THxkthEa2P5FRycWasPsKJ8Yv0mvfIJJuJDA56L-AYKlrCEl4IufQJPPkgpF-Dd9A781D0tFEGE_dDKLfJp_DP0vzwwerqNnNmU2XO4O7H7zWB7THJdVTzJ2OebE6DIEPg"
                    alt="Handyman artisan driving screw with precision cordless drill into timber decking"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider text-center">
                  Precision timber decking fastening with cordless impact driver • Gauteng
                </p>
              </div>
            </div>

            {/* 4 Architectural Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-16 mt-16 border-t border-[#D9DEE2]">
              <div className="border-t-2 border-[#123E61] pt-6">
                <span className="text-xs font-mono font-bold text-slate-400">01</span>
                <h4 className="text-sm font-extrabold uppercase tracking-tight text-[#30323A] mt-2 mb-2">
                  Multi-Trade Expertise
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Electrical, plumbing, painting, carpentry, carports, and structural alterations unified under certified SANS oversight.
                </p>
              </div>

              <div className="border-t-2 border-[#123E61] pt-6">
                <span className="text-xs font-mono font-bold text-slate-400">02</span>
                <h4 className="text-sm font-extrabold uppercase tracking-tight text-[#30323A] mt-2 mb-2">
                  Regional Accountability
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Permanent workshop and operations dispatch anchored in Alberton, servicing properties throughout Gauteng.
                </p>
              </div>

              <div className="border-t-2 border-[#123E61] pt-6">
                <span className="text-xs font-mono font-bold text-slate-400">03</span>
                <h4 className="text-sm font-extrabold uppercase tracking-tight text-[#30323A] mt-2 mb-2">
                  Respect For Your Space
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Punctual arrivals, protective drop sheets, respectful technicians, and meticulous site clean-up before final sign-off.
                </p>
              </div>

              <div className="border-t-2 border-[#123E61] pt-6">
                <span className="text-xs font-mono font-bold text-slate-400">04</span>
                <h4 className="text-sm font-extrabold uppercase tracking-tight text-[#30323A] mt-2 mb-2">
                  One Team. Multiple Solutions.
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Single contact point, consolidated billing, transparent itemized quotes, and dependable turnaround times.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
