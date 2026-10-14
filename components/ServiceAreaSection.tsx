import Link from 'next/link';
import { mainServiceAreas, widerServiceAreas } from '@/config/service-areas';

export function ServiceAreaSection() {
  return (
    <section className="bg-white pt-2 pb-14 sm:pt-3 sm:pb-20" aria-labelledby="service-area-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F4F7F9] p-6 sm:p-9 lg:p-12">
          <div className="max-w-4xl">
            <p className="mb-3 flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#19547E]">
              <span className="h-2 w-2 rounded-full bg-[#00B8E8]" aria-hidden="true" />
              Based in Alberton · Serving Gauteng
            </p>
            <h2 id="service-area-heading" className="text-3xl font-extrabold tracking-tight text-[#123E61] sm:text-4xl">
              Handyman Services in Alberton and Surrounding Areas
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">
              Dynamic Handyman is based in Alberton and provides handyman services, home repairs, property maintenance and renovations across Alberton, nearby suburbs and surrounding Gauteng areas.
            </p>
          </div>

          <div className="mt-8 space-y-7 border-t border-[#D9DEE2] pt-7">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-[#123E61]">Main service locations</h3>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Main service areas">
                {mainServiceAreas.map((area) => (
                  <li key={area} className="border border-[#D9DEE2] bg-[#F8F9F9] px-3 py-2 text-sm font-semibold text-[#123E61] transition-colors hover:border-[#19547E] hover:bg-sky-50">
                    {area}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-[#123E61]">Wider service areas</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Based in Alberton, Dynamic Handyman also travels to these areas for residential and commercial handyman, maintenance and renovation projects.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Wider service areas">
                {widerServiceAreas.map((area) => (
                  <li key={area} className="border border-[#D9DEE2] bg-white px-3 py-2 text-sm font-semibold text-[#123E61] transition-colors hover:border-[#19547E] hover:bg-sky-50">
                    {area}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-slate-700">
                <Link href="/contact" className="font-semibold text-[#123E61] underline decoration-sky-500 underline-offset-4 transition-colors hover:text-[#19547E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#123E61]">Contact us</Link> with your project details to discuss the work, scheduling and quotation process for your location.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
