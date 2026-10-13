import Image from 'next/image';
import { AboutContent } from '@/components/AboutContent';
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
                  About Dynamic Handyman,<br />
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

        <AboutContent />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
