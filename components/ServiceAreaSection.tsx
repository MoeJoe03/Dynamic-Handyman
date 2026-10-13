import { serviceAreas } from '@/config/service-areas';

export function ServiceAreaSection() {
  return (
    <section className="border-t border-[#D9DEE2] bg-[#f5f8fa] py-16 lg:py-24" aria-labelledby="service-area-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 id="service-area-heading" className="text-3xl font-extrabold tracking-tight text-[#123E61] sm:text-4xl">
            Handyman Services in Alberton and Surrounding Areas
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-700 sm:text-lg">
            Dynamic Handyman is based in Alberton and provides home repairs, property maintenance and renovation services to customers in Alberton and selected surrounding areas of Gauteng.
          </p>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            <a href="/contact" className="font-semibold text-[#123E61] underline underline-offset-4 hover:text-[#0C2B44] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#123E61]">Contact us</a> to confirm whether we cover your suburb.
          </p>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-[#D9DEE2] pt-8 sm:grid-cols-3 lg:grid-cols-5" aria-label="Areas served">
          {serviceAreas.map((area) => (
            <li key={area} className="border-l-2 border-sky-500 py-1 pl-3 text-sm font-semibold text-[#30323A] sm:text-base">
              {area}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
