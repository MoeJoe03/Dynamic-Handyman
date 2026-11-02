import type { Metadata } from 'next';
import type { ComponentType } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { businessConfig } from '@/config/business';
import { mainServiceAreas, widerServiceAreas } from '@/config/service-areas';
import { servicesData } from '@/data/services';
import { ElectricalSvg, PaintingSvg, CarpentrySvg, PlumbingSvg, PalisadesCarportsSvg, PavingSvg, MaintenanceSvg, GlassWorksSvg, FlooringSvg, GuttersFasciaSvg, AluminiumWindowsDoorsSvg } from '@/components/icons/TradeSvgs';

const slugs: Record<string, string> = {
  electrical: 'electrical',
};

function getService(slug: string) {
  const entry = Object.entries(slugs).find(([, value]) => value === slug);
  return entry ? servicesData.find((service) => service.id === entry[0]) : undefined;
}

function serviceIcon(id: string) {
  const icons: Record<string, ComponentType<{ className?: string }>> = { electrical: ElectricalSvg, painting: PaintingSvg, carpentry: CarpentrySvg, plumbing: PlumbingSvg, palisades: PalisadesCarportsSvg, paving: PavingSvg, maintenance: MaintenanceSvg, 'glass-works': GlassWorksSvg, flooring: FlooringSvg, 'gutters-fascia': GuttersFasciaSvg, 'aluminium-windows-doors': AluminiumWindowsDoorsSvg };
  const Icon = icons[id] ?? MaintenanceSvg;
  return <Icon className="h-12 w-16" />;
}

export function generateStaticParams() {
  return Object.values(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const title = `${service.title} Services in Alberton | ${businessConfig.brandName}`;
  const description = `${service.title} for homes and businesses in Alberton and nearby suburbs. Request a quote from ${businessConfig.brandName}.`;
  const image = service.images[0];
  return {
    title,
    description,
    alternates: { canonical: `${businessConfig.websiteUrl}/services/${slug}` },
    openGraph: { title, description, url: `${businessConfig.websiteUrl}/services/${slug}`, type: 'website', images: [{ url: image.url, alt: image.alt }] },
    twitter: { card: 'summary_large_image', title, description, images: [image.url] },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const image = service.images[0];
  const faqs = [
    ['What electrical work does Dynamic Handyman provide?', 'We provide selected electrical installations, repairs, fault finding, distribution board work, lighting, power points, surge protection and generator or inverter changeovers.'],
    ['When is an electrical assessment required?', 'An assessment may be needed for recurring trips, rewiring, distribution board changes, compliance inspections, unknown faults or work where the existing installation needs to be checked first.'],
    ['Do you provide Certificates of Compliance?', 'Yes, compliance-related electrical work can include a Certificate of Compliance where the installation and inspection meet the applicable requirements. We will explain what is needed for your property.'],
    ['Who is this service for?', 'We assist homeowners, landlords, property owners and selected residential and commercial clients with planned electrical work and repairs.'],
    ['How do I request an electrical quote?', 'Send your location, a description of the issue or planned installation, photographs of the distribution board or affected area where safe, and your preferred timeframe through our Contact page.'],
  ];

  return <div className="min-h-screen flex flex-col bg-white overflow-x-clip">
    <Header />
    <main className="flex-grow">
      <section className="bg-white py-6 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative min-h-[380px] overflow-hidden rounded-2xl border border-[#0C2B44] bg-[#123E61] text-white shadow-xl sm:min-h-[440px] lg:min-h-[500px]">
            <div className="grid items-center lg:grid-cols-12">
              <div className="z-10 flex flex-col justify-center p-7 sm:p-10 lg:col-span-8 lg:p-14">
                <BreadcrumbNav currentPage="electrical" />
                <h1 className="mb-4 text-3xl font-extrabold uppercase leading-tight tracking-tight sm:text-4xl lg:text-5xl">Electrical Installations, Repairs and Certificates of Compliance (COC) Services in Alberton</h1>
                <p className="mb-6 max-w-2xl text-xs font-normal leading-relaxed text-slate-200 sm:text-sm">Dynamic Handyman provides practical electrical installations, repairs, fault finding and compliance-related work for homes, rental properties and businesses in Alberton and nearby suburbs.</p>
                <Link href="/contact?service=electrical" className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-[#123E61] shadow-sm transition-all hover:bg-neutral-100 sm:px-8 sm:py-4">Request an Electrical Quote <span aria-hidden="true">→</span></Link>
              </div>
              <div className="relative h-56 overflow-hidden bg-[#0C2B44] sm:h-64 lg:col-span-4 lg:h-full lg:min-h-[500px]">
                <Image src={image.url} alt={image.alt} fill sizes="(max-width: 1024px) 100vw, 35vw" className="object-cover opacity-40 mix-blend-luminosity" priority />
            </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl overflow-hidden border-y border-[#D9DEE2] bg-white py-4" aria-label="Electrical services included">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white via-white/90 to-transparent backdrop-blur-sm sm:w-12" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white via-white/90 to-transparent backdrop-blur-sm sm:w-12" aria-hidden="true" />
        <div className="flex w-max animate-marquee service-marquee items-center">
          {[...service.subServices, ...service.subServices].map((item, index) => (
            <div key={`${item}-${index}`} className="flex shrink-0 items-center gap-3 px-5 sm:px-8">
              <ElectricalSvg className="h-10 w-12 sm:h-12 sm:w-14" />
              <span className="whitespace-nowrap text-xs font-bold uppercase tracking-wider text-[#123E61] sm:text-sm">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-16">
        <div className="space-y-14 text-slate-600 sm:text-base">
          <div><h2 className="text-2xl font-extrabold uppercase text-[#123E61] sm:text-3xl">Electrical Services for Homes and Businesses</h2><p className="mt-5 leading-relaxed">Our electrical service helps property owners resolve faults, improve safety and complete planned installation work through one practical point of contact.</p></div>
          <div><h2 className="text-2xl font-extrabold uppercase text-[#123E61] sm:text-3xl">What Our Electrical Work Includes</h2><ul className="mt-5 grid gap-3 sm:grid-cols-2">{service.subServices.map((item) => <li key={item} className="border-l-2 border-sky-400 pl-4 leading-relaxed">{item}</li>)}</ul></div>
          <div><h2 className="text-2xl font-extrabold uppercase text-[#123E61] sm:text-3xl">Common Electrical Problems We Help With</h2><p className="mt-5 leading-relaxed">We help with tripping circuits, faulty plugs or lights, outdated distribution boards, damaged wiring, power-point additions and electrical work that needs inspection or certification.</p></div>
          <div><h2 className="text-2xl font-extrabold uppercase text-[#123E61] sm:text-3xl">When an Assessment May Be Required</h2><p className="mt-5 leading-relaxed">A site assessment may be required when the fault is intermittent, the existing wiring is unknown, access is restricted or the project involves a larger installation or compliance inspection.</p></div>
          <div><h2 className="text-2xl font-extrabold uppercase text-[#123E61] sm:text-3xl">How Our Electrical Quote Process Works</h2><p className="mt-5 leading-relaxed">Send your location, project details and photographs where possible. We review the information, clarify the scope and discuss the appropriate quotation process before work starts.</p></div>
          <div><h2 className="text-2xl font-extrabold uppercase text-[#123E61] sm:text-3xl">Electrical Services in Alberton and Nearby Areas</h2><p className="mt-5 leading-relaxed">Dynamic Handyman is based in Eden Park, Alberton. We serve {mainServiceAreas.join(', ')} and consider selected wider-area projects in {widerServiceAreas.join(', ')}, depending on scope, scheduling and travel requirements.</p></div>
        </div>
        <aside className="self-start lg:sticky lg:top-28">
          <div className="border border-[#D9DEE2] border-t-2 border-t-[#123E61] bg-[#F4F7F9] p-6 sm:p-8">
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#19547E]">Electrical quote request</p>
            <h2 className="mt-3 text-2xl font-extrabold uppercase leading-tight text-[#123E61]">Get a Free Electrical Quote</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">Tell us what you need and we will review the request.</p>
            <form action="/api/quote" method="post" className="mt-6 space-y-4">
              <input type="hidden" name="serviceCategory" value={service.title} />
              <input type="hidden" name="website" value="" />
              <label className="block text-xs font-bold uppercase tracking-wider text-[#123E61]">Full name<input name="fullName" required autoComplete="name" className="mt-1.5 w-full border border-[#D9DEE2] bg-white px-3 py-2.5 text-sm" /></label>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#123E61]">Phone number<input name="phoneNumber" required autoComplete="tel" className="mt-1.5 w-full border border-[#D9DEE2] bg-white px-3 py-2.5 text-sm" /></label>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#123E61]">Email address <span className="font-normal normal-case tracking-normal text-slate-500">(optional)</span><input type="email" name="emailAddress" autoComplete="email" className="mt-1.5 w-full border border-[#D9DEE2] bg-white px-3 py-2.5 text-sm" /></label>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#123E61]">Project details<textarea name="projectDetails" rows={4} className="mt-1.5 w-full resize-y border border-[#D9DEE2] bg-white px-3 py-2.5 text-sm" /></label>
              <button type="submit" className="inline-flex w-full items-center justify-center bg-[#123E61] px-5 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#0C2B44]">Get a Free Electrical Quote →</button>
            </form>
            <p className="mt-4 text-center text-xs text-slate-500">Or call {businessConfig.phone.display}</p>
          </div>
        </aside>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-14 text-slate-600 sm:text-base">
          <div><h2 className="text-2xl font-extrabold uppercase text-[#123E61] sm:text-3xl">Our Electrical Work</h2><div className="mt-8 grid grid-cols-2 gap-5">{service.images.slice(0, 4).map((projectImage) => <figure key={projectImage.url} className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100"><Image src={projectImage.url} alt={projectImage.alt} fill sizes="(max-width: 640px) 50vw, 420px" className="object-cover" /></figure>)}</div></div>
          <div className="bg-[#F4F7F9] p-7 sm:p-10"><h2 className="text-2xl font-extrabold uppercase text-[#123E61] sm:text-3xl">Request a Quote for Electrical Work</h2><p className="mt-5 leading-relaxed">Contact us with your location, the work required and any useful photographs. We will discuss the scope, scheduling and quotation process for your property.</p><Link href="/contact?service=electrical" className="mt-7 inline-flex bg-[#123E61] px-6 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#0C2B44]">Request an Electrical Quote →</Link></div>
          <div><h2 className="text-2xl font-extrabold uppercase text-[#123E61] sm:text-3xl">Frequently Asked Questions About Electrical Services</h2><div className="mt-8 divide-y divide-[#D9DEE2] border-y border-[#D9DEE2]">{faqs.map(([question, answer]) => <article key={question} className="py-6"><h3 className="text-lg font-bold text-[#123E61]">{question}</h3><p className="mt-3 leading-relaxed">{answer}</p></article>)}</div><p className="mt-10 font-mono text-[11px] font-bold uppercase tracking-widest text-[#19547E]">(Other Services)</p><h2 className="mt-4 text-2xl font-extrabold uppercase text-[#123E61] sm:text-3xl">What We Do</h2><div className="mt-8 grid gap-px border border-[#D9DEE2] bg-[#D9DEE2] sm:grid-cols-2 lg:grid-cols-3">{servicesData.filter((item) => item.id !== 'electrical').map((item) => <Link key={item.id} href={`/services#trade-${item.id}`} className="group bg-white p-6 transition-colors hover:bg-[#F4F7F9] sm:p-8"><div className="mb-5 flex items-center justify-between">{serviceIcon(item.id)}<ArrowUpRight className="text-slate-400 transition-colors group-hover:text-[#123E61]" size={18} aria-hidden="true" /></div><h3 className="text-base font-extrabold uppercase tracking-tight text-[#123E61]">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-slate-600">{item.description}</p></Link>)}</div></div>
        </div>
      </section>
    </main>
    <Footer />
  </div>;
}
