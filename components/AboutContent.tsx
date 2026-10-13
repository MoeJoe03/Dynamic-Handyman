import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Building2, Check, Home, KeyRound, MapPin, MessageCircle, Phone } from 'lucide-react';
import { contactPhone } from '@/config/contact';
import { serviceAreas } from '@/config/service-areas';
import { ElectricalSvg, PlumbingSvg, PaintingSvg, CarpentrySvg, MaintenanceSvg, PalisadesCarportsSvg } from '@/components/icons/TradeSvgs';

const container = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8';
const heading = 'text-2xl font-extrabold uppercase leading-tight tracking-tight text-[#123E61] sm:text-3xl lg:text-4xl';
const button = 'inline-flex min-h-12 items-center justify-center gap-3 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500';
const trades = [
  { id: 'electrical', title: 'Electrical Services', text: 'Electrical repairs, installations and related property electrical work.', Icon: ElectricalSvg },
  { id: 'plumbing', title: 'Plumbing Services', text: 'Plumbing repairs, installations and maintenance for residential and commercial properties.', Icon: PlumbingSvg },
  { id: 'painting', title: 'Painting', text: 'Interior and exterior painting for property maintenance, improvements and renovation projects.', Icon: PaintingSvg },
  { id: 'carpentry', title: 'Carpentry', text: 'Carpentry work, repairs and improvements involving timber fixtures and fittings.', Icon: CarpentrySvg },
  { id: 'maintenance', title: 'Renovations', text: 'Property upgrades, improvements and renovation work, from smaller projects to more extensive changes.', Icon: MaintenanceSvg },
  { id: 'palisades', title: 'Palisades & Carports', text: 'Palisade and carport installation, repair and improvement services.', Icon: PalisadesCarportsSvg },
];
const clients = [
  { title: 'Homeowners', text: 'From everyday household repairs to improvements and renovations, we help homeowners keep their properties functional and well maintained.', Icon: Home },
  { title: 'Landlords & Property Owners', text: 'We assist landlords and property owners with repairs, maintenance and improvements to rental and investment properties.', Icon: KeyRound },
  { title: 'Commercial Clients', text: 'We also undertake maintenance, repair and improvement projects for commercial properties, with project requirements discussed during the quotation process.', Icon: Building2 },
];
const projects = [
  'Individual household repairs and maintenance tasks.',
  'General property upkeep and improvements.',
  'Painting, plumbing, electrical and carpentry work.',
  'Residential renovation projects.',
  'Rental property maintenance and repairs.',
  'Larger residential and commercial property projects.',
  'Work involving multiple trades.',
];
const steps = [
  { title: 'Get in Touch', text: 'Contact Dynamic Handyman by phone or WhatsApp and tell us what needs attention at your property.' },
  { title: 'Discuss Your Project', text: 'Explain the repairs, maintenance or renovation work you need. Share relevant details so we can better understand the scope of the project.' },
  { title: 'Request a Quote', text: 'We’ll discuss the work required and the quotation process for your project.' },
  { title: 'Plan the Next Steps', text: 'Once you’ve reviewed the quote, we can discuss how to proceed with the work.' },
];
const reasons = [
  { title: 'Multiple Trades Under One Company', text: 'Access a range of handyman, maintenance and renovation services without having to search for a separate provider for every task.' },
  { title: 'Small and Large Projects', text: 'From minor household repairs to substantial property improvements, we welcome enquiries across a broad range of project sizes.' },
  { title: 'Residential & Commercial Work', text: 'Our services are available to homeowners, landlords and commercial clients.' },
  { title: 'Locally Based in Alberton', text: 'Established in 2020 and operating from Eden Park, Alberton, we serve customers across the surrounding communities.' },
  { title: 'A Clear Starting Process', text: 'Get in touch, explain what you need and request a quote before deciding how to proceed.' },
];

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`mb-4 flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-widest ${light ? 'text-sky-200' : 'text-[#19547E]'}`}><span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-sky-400" />{children}</p>;
}

export function AboutContent() {
  return (
    <>
      <section className="py-16 sm:py-24">
        <div className={`${container} grid gap-10 lg:grid-cols-[1fr_320px] lg:items-center lg:gap-20`}>
          <div>
            <SectionLabel>Alberton based. Property focused.</SectionLabel>
            <h2 className={heading}>Reliable Property Maintenance &amp; Renovations in Alberton Since 2020</h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              <p>Dynamic Handyman (Pty) Ltd is an Alberton-based handyman, property maintenance and renovation company founded by Ryan in 2020.</p>
              <p>We help homeowners, landlords and commercial clients maintain, repair and improve their properties through a wide range of practical building and maintenance services.</p>
              <p>From smaller household repairs to larger renovation and commercial maintenance projects, we bring multiple trades together under one company, making it easier to get the work you need done.</p>
              <p>Based in Eden Park, Alberton, we serve clients throughout Alberton, Johannesburg South and surrounding areas.</p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/contact" className={`${button} bg-[#123E61] text-white hover:bg-[#0C2B44]`}>Request a Quote <ArrowUpRight size={16} aria-hidden="true" /></Link>
              <Link href="/services" className={`${button} border border-[#D9DEE2] text-[#123E61] hover:bg-slate-50`}>Explore Our Services</Link>
            </div>
          </div>
          <div className="relative border border-[#D9DEE2] bg-[#F4F7F9] p-8 sm:p-10">
            <span className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-[#123E61]" aria-hidden="true" />
            <span className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-[#123E61]" aria-hidden="true" />
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#19547E]">Established</p>
            <p className="mt-2 text-7xl font-extrabold leading-none tracking-tighter text-[#123E61] sm:text-8xl">2020</p>
            <div className="my-7 h-px bg-[#D9DEE2]" />
            <p className="text-2xl font-extrabold leading-tight text-[#123E61]">Rely on our Ability!</p>
            <p className="mt-4 flex items-center gap-2 text-sm text-slate-600"><MapPin size={16} aria-hidden="true" /> Eden Park, Alberton</p>
            <p className="mt-2 text-xs text-slate-500">Founded by Ryan · Dynamic Handyman (Pty) Ltd</p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#D9DEE2] bg-[#F8F9F9] py-16 sm:py-24">
        <div className={`${container} grid items-center gap-10 lg:grid-cols-2 lg:gap-16`}>
          <div>
            <SectionLabel>01 — Our Story</SectionLabel>
            <h2 className={heading}>Built Around Practical Solutions</h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              <p>Dynamic Handyman was established in 2020 by Ryan with a straightforward purpose: to provide customers with a dependable way to manage property repairs, improvements and renovations.</p>
              <p>Properties require ongoing attention. Sometimes it’s a small repair that needs sorting out. Other times, it’s a larger project involving several different trades.</p>
              <p>Dynamic Handyman brings these services together, helping customers find practical solutions without having to approach a different business for every type of work.</p>
              <p>Today, the company works with homeowners, landlords and commercial clients across Alberton and surrounding communities.</p>
            </div>
            <p className="mt-6 border-l-2 border-sky-400 pl-5 text-base font-semibold leading-relaxed text-[#123E61]">Our approach remains straightforward: understand the work required, discuss the available options and provide a quote before the project moves forward.</p>
          </div>
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden border border-[#D9DEE2] bg-slate-200">
              <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuBU_gfQYJFb2m2FmgnHV0RjZK7LSAUjtk1-lhmRfHpaFzNW3A3VKYSeBrVyGBsh517HezrI6-nWw-SbfhQjoNXbtb7nVllPQjKnP3zB_lYjNbxYrvf8wr26THxkthEa2P5FRycWasPsKJ8Yv0mvfIJJuJDA56L-AYKlrCEl4IufQJPPkgpF-Dd9A781D0tFEGE_dDKLfJp_DP0vzwwerqNnNmU2XO4O7H7zWB7THJdVTzJ2OebE6DIEPg" alt="Handyman artisan fastening timber decking with a cordless drill" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" referrerPolicy="no-referrer" />
            </div>
            <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-wider text-slate-500">Precision timber decking fastening completed in Johannesburg</figcaption>
            <Link href="/gallery" className={`${button} mt-5 border border-[#123E61] text-[#123E61] hover:bg-white`}>View Our Completed Work <span aria-hidden="true">→</span></Link>
          </figure>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className={container}>
          <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-16">
            <div><SectionLabel>02 — What We Do</SectionLabel><h2 className={heading}>One Company.<br />Multiple Trades.</h2></div>
            <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">Whether you’re maintaining a family home, preparing a rental property or planning improvements to commercial premises, Dynamic Handyman offers services across several trades.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-px border border-[#D9DEE2] bg-[#D9DEE2] sm:grid-cols-2 lg:grid-cols-3">
            {trades.map(({ id, title, text, Icon }) => (
              <Link key={id} href={`/services#trade-${id}`} className="group bg-white p-6 transition-colors hover:bg-[#F4F7F9] focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-sky-500 sm:p-8">
                <div className="mb-5 flex items-center justify-between"><Icon className="h-12 w-16" /><ArrowUpRight className="text-slate-400 transition-colors group-hover:text-[#123E61]" size={18} aria-hidden="true" /></div>
                <h3 className="text-base font-extrabold uppercase tracking-tight text-[#123E61]">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{text}</p>
              </Link>
            ))}
          </div>
          <Link href="/services" className={`${button} mt-7 bg-[#123E61] text-white hover:bg-[#0C2B44]`}>View All Services <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="bg-[#123E61] py-16 text-white sm:py-20">
        <div className={container}>
          <SectionLabel light>03 — Who We Work With</SectionLabel>
          <h2 className="max-w-2xl text-2xl font-extrabold uppercase leading-tight tracking-tight sm:text-3xl lg:text-4xl">Property Solutions for Different Needs</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-0">
            {clients.map(({ title, text, Icon }) => <div key={title} className="border-t border-white/20 pt-6 md:border-l md:border-t-0 md:px-8 md:pt-0 md:first:border-l-0 md:first:pl-0 md:last:pr-0"><Icon className="mb-5 text-sky-300" size={28} strokeWidth={1.5} aria-hidden="true" /><h3 className="text-lg font-bold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-slate-200">{text}</p></div>)}
          </div>
          <p className="mt-10 border-t border-white/20 pt-6 text-sm leading-relaxed text-sky-100">No two properties are exactly alike. We consider the work involved and the needs of each client before discussing the next steps.</p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className={`${container} grid gap-10 lg:grid-cols-2 lg:gap-20`}>
          <div><SectionLabel>04 — Projects of Every Size</SectionLabel><h2 className={heading}>From Small Repairs to Larger Renovations</h2><p className="mt-6 text-sm leading-relaxed text-slate-600 sm:text-base">Not every project needs a full renovation, and not every repair is a small job.</p><p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">Dynamic Handyman accepts enquiries for a broad range of property projects, including:</p><p className="mt-6 border-l-2 border-sky-400 pl-5 text-sm font-semibold leading-relaxed text-[#123E61]">Whether you have a single task or several improvements planned, contact us to discuss the scope of work and request a quote.</p></div>
          <ul className="divide-y divide-[#D9DEE2] border-y border-[#D9DEE2]">{projects.map((project) => <li key={project} className="flex items-start gap-4 py-4 text-sm leading-relaxed text-slate-600"><Check size={17} className="mt-0.5 shrink-0 text-[#19547E]" aria-hidden="true" />{project}</li>)}</ul>
        </div>
      </section>

      <section className="border-y border-[#D9DEE2] bg-[#F8F9F9] py-16 sm:py-24">
        <div className={container}>
          <SectionLabel>05 — How We Work</SectionLabel><h2 className={heading}>A Straightforward Way to Get Started</h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{steps.map((step, index) => <li key={step.title} className="border-t-2 border-[#123E61] pt-5"><span className="font-mono text-3xl font-bold text-[#19547E]/40" aria-hidden="true">0{index + 1}</span><h3 className="mt-4 text-lg font-bold text-[#123E61]">{step.title}</h3><p className="mt-3 text-sm leading-relaxed text-slate-600">{step.text}</p></li>)}</ol>
          <Link href="/contact" className={`${button} mt-9 bg-[#123E61] text-white hover:bg-[#0C2B44]`}>Request Your Quote <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className={`${container} grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-16`}>
          <div><SectionLabel>06 — Where We Work</SectionLabel><h2 className={heading}>Local Handyman Services in Alberton &amp; Johannesburg South</h2><p className="mt-6 text-sm leading-relaxed text-slate-600 sm:text-base">Dynamic Handyman is based at 10 Vauxhall Street, Eden Park, Alberton, 1458, serving residential and commercial clients in Alberton and surrounding areas.</p><p className="mt-5 text-sm font-semibold text-[#123E61]">Our main service locations include:</p><ul className="mt-4 flex flex-wrap gap-2">{serviceAreas.map((area) => <li key={area} className="border border-[#D9DEE2] bg-[#F8F9F9] px-3 py-2 text-sm text-[#123E61]">{area}</li>)}</ul><p className="mt-6 text-sm leading-relaxed text-slate-600">If your property is in one of these areas, contact us to discuss your project and confirm service availability.</p></div>
          <div className="self-start border border-[#D9DEE2] border-t-2 border-t-[#123E61] p-7 sm:p-8"><MapPin size={32} strokeWidth={1.5} className="text-[#19547E]" aria-hidden="true" /><h3 className="mt-6 text-xl font-bold text-[#123E61]">Based in Alberton</h3><address className="mt-4 text-sm not-italic leading-7 text-slate-600">Dynamic Handyman (Pty) Ltd<br />10 Vauxhall Street<br />Eden Park, Alberton, 1458</address><Link href="/contact" className={`${button} mt-6 w-full bg-[#123E61] text-center text-white hover:bg-[#0C2B44]`}>Contact Dynamic Handyman <ArrowUpRight className="shrink-0" size={16} aria-hidden="true" /></Link></div>
        </div>
      </section>

      <section className="border-t border-[#D9DEE2] bg-[#F8F9F9] py-16 sm:py-24">
        <div className={`${container} grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
          <div><SectionLabel>07 — Why Choose Dynamic Handyman?</SectionLabel><h2 className={heading}>One Point of Contact for Your Property Projects</h2></div>
          <div className="divide-y divide-[#D9DEE2]">{reasons.map((reason, index) => <div key={reason.title} className="flex gap-5 py-6 first:pt-0 last:pb-0"><span className="pt-1 font-mono text-xs font-bold text-[#19547E]" aria-hidden="true">0{index + 1}</span><div><h3 className="text-base font-bold text-[#123E61]">{reason.title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-600">{reason.text}</p></div></div>)}</div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className={container}>
          <div className="grid gap-8 border border-[#0C2B44] bg-[#123E61] p-7 text-white sm:p-10 lg:grid-cols-[1fr_280px] lg:items-center lg:gap-16 lg:p-14">
            <div><SectionLabel light>08 — Let’s Talk About Your Project</SectionLabel><h2 className="text-3xl font-extrabold uppercase leading-tight tracking-tight sm:text-4xl">Your Property.<br />Our Range of Skills.</h2><p className="mt-6 text-sm leading-relaxed text-slate-200">Need a handyman in Alberton? Planning renovations in Johannesburg South? Looking for property maintenance services for a home, rental property or commercial premises?</p><p className="mt-4 text-sm leading-relaxed text-slate-200">Dynamic Handyman is ready to discuss your requirements, whether the job is small, large or involves several trades.</p><p className="mt-6 text-lg font-bold text-sky-200">Rely on our Ability!</p></div>
            <div className="flex flex-col gap-3"><Link href="/contact" className={`${button} bg-white text-[#123E61] hover:bg-sky-50`}>Request a Quote <ArrowUpRight size={16} aria-hidden="true" /></Link><a href={contactPhone.telHref} className={`${button} border border-white/40 text-white hover:bg-white/10`}><Phone size={16} aria-hidden="true" /> Call Us</a><a href={contactPhone.whatsappUrl} target="_blank" rel="noopener noreferrer" className={`${button} border border-white/40 text-white hover:bg-white/10`}><MessageCircle size={16} aria-hidden="true" /> WhatsApp Us</a><p className="mt-2 text-center font-mono text-xs text-sky-200">{contactPhone.display}</p></div>
          </div>
        </div>
      </section>
    </>
  );
}
