import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AreaProjectCard } from '@/components/AreaProjectCard';
import { getPublicHomeImages } from '@/lib/home-images/queries';
import { businessConfig } from '@/config/business';
import { servicesData } from '@/data/services';

import { ElectricalSvg, PaintingSvg, CarpentrySvg, PlumbingSvg, PalisadesCarportsSvg, PavingSvg, MaintenanceSvg, GlassWorksSvg, FlooringSvg, GuttersFasciaSvg, AluminiumWindowsDoorsSvg } from '@/components/icons/TradeSvgs';
import { mainServiceAreas } from '@/config/service-areas';

const serviceIcons = {
  electrical: ElectricalSvg, painting: PaintingSvg, carpentry: CarpentrySvg,
  plumbing: PlumbingSvg, palisades: PalisadesCarportsSvg, paving: PavingSvg,
  maintenance: MaintenanceSvg, 'glass-works': GlassWorksSvg, flooring: FlooringSvg,
  'gutters-fascia': GuttersFasciaSvg, 'aluminium-windows-doors': AluminiumWindowsDoorsSvg,
};

const title = 'Handyman Services in Alberton | Dynamic Handyman';
const description = 'Dynamic Handyman provides repairs, maintenance and renovation services in Alberton, Eden Park and nearby suburbs. Request a project quote.';
const url = `${businessConfig.websiteUrl}/areas-we-serve/alberton`;


const faqs = [
  { question: 'Do you provide handyman services throughout Alberton?', answer: 'Yes, we work across Alberton. Tell us your suburb and what needs doing, and we can confirm availability for your project.' },
  { question: 'Do you handle small handyman jobs in Alberton?', answer: 'Yes, subject to availability and the work required. Tell us about the repair or assembly job and send photographs where possible. If you have several small tasks at one property, include them together so we can review the full scope.' },
  { question: 'Do you provide quotes before visiting?', answer: 'Photographs, measurements and a clear description may help us discuss an initial estimate. Hidden faults, uncertain measurements or larger renovation work may require a site assessment before we can prepare a quote. We will explain the appropriate quotation process for your project.' },
  { question: 'Do you serve areas outside Alberton?', answer: 'Yes. We also serve nearby suburbs and consider selected projects elsewhere in Gauteng, depending on the scope, schedule and travel distance. Visit our Areas We Serve page or contact us to check your location.' },
];

export const metadata: Metadata = {
  title, description, alternates: { canonical: url },
  openGraph: { title, description, url, type: 'website', images: ['/dynamic-handyman-services-og.png'] },
  twitter: { card: 'summary_large_image', title, description, images: ['/dynamic-handyman-services-og.png'] },
};

export default async function AlbertonPage() {
  const images = await getPublicHomeImages();
  const photos = ['reviews-photo', 'reviews-photo-2', 'reviews-photo-3'].map(key => images[key])
    .filter(photo => photo && /trampoline|patio|lounger/i.test(photo.alt_text))
    .map(photo => ({ imageUrl: photo.imageUrl, altText: photo.alt_text }));
  const breadcrumbs = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', item: businessConfig.websiteUrl }, { name: 'Areas We Serve', item: `${businessConfig.websiteUrl}/areas-we-serve` }, { name: 'Alberton', item: url }]
      .map((item, index) => ({ '@type': 'ListItem', position: index + 1, ...item })),
  };
  return <div className="flex min-h-screen flex-col bg-white">
    <Header />
    <main className="flex-grow">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, '\u003c') }} />
      <section className="mx-auto max-w-7xl px-4 pt-6 pb-12 sm:px-6 lg:px-8">
        <div className="bg-[#082F51] p-7 text-white shadow-xl sm:p-12 lg:p-16">
          <nav aria-label="Breadcrumb" className="mb-5 text-xs font-bold uppercase tracking-widest text-slate-300"><ol className="flex flex-wrap gap-2"><li><Link href="/">Home</Link></li><li aria-hidden="true">/</li><li><Link href="/areas-we-serve">Areas We Serve</Link></li><li aria-hidden="true">/</li><li aria-current="page" className="text-white">Alberton</li></ol></nav>
          <h1 className="max-w-4xl text-3xl font-extrabold uppercase tracking-tighter sm:text-5xl lg:text-6xl">Handyman Services in Alberton</h1>
          <p className="mt-6 max-w-3xl leading-relaxed text-slate-200">Dynamic Handyman provides home repairs, property maintenance and renovation services in Alberton and nearby southern Gauteng suburbs. Based in Eden Park, we assist homeowners, landlords and businesses with practical multi-trade work, subject to project scope and scheduling.</p>
          <Link href="/contact" className="mt-7 inline-block bg-white px-6 py-3 text-sm font-bold text-[#123E61] hover:bg-sky-100">Request a Quote</Link>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="bg-[#F4F7F9] p-6 sm:p-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#123E61]">Local Repairs, Maintenance and Renovations in Alberton</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-slate-700">We assist with repairs and planned improvements at Alberton houses, townhouses, rental properties and business premises. You may need help with worn cupboard fittings, plumbing repairs, painting between tenancies or several maintenance tasks at one property. Share the property type and access arrangements so we can discuss a practical scope of work.</p>
          <h2 className="mt-10 text-3xl font-extrabold tracking-tight text-[#123E61]">Areas We Serve in and Around Alberton</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-slate-700">Our main operating area covers the Alberton suburbs listed below and extends to nearby areas. Availability depends on the type of work, access, scheduling and project requirements.</p>
          <ul className="mt-5 flex flex-wrap gap-2">{mainServiceAreas.filter(area => area !== 'Alberton').map(area => <li key={area} className="border border-[#D9DEE2] bg-white px-3 py-2 text-sm font-semibold text-[#123E61]">{area}</li>)}</ul>
          <Link href="/areas-we-serve" className="mt-5 inline-block text-sm font-bold text-[#123E61] underline underline-offset-4">See our main and wider service areas</Link>
          <h2 className="mt-10 text-3xl font-extrabold tracking-tight text-[#123E61]">Handyman Services Available in Alberton</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-slate-700">Explore the work below and tell us what your Alberton property needs. Service availability depends on the project, site conditions and scheduling.</p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{servicesData.map(service => {
              const Icon = serviceIcons[service.id as keyof typeof serviceIcons];
              return (
              <li key={service.id}>
                <Link href={`/services/${service.id}`} className="flex h-full items-center justify-between gap-4 border border-[#D9DEE2] bg-[#F4F7F9] p-5 text-sm font-bold text-[#123E61] transition-colors hover:border-[#19547E] hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#19547E]">
                  <span className="flex items-center gap-3">{Icon && <span aria-hidden="true" className="shrink-0"><Icon className="h-10 w-12" /></span>}<span>{service.title}</span></span><span aria-hidden="true" className="text-[#19547E]">→</span>
                </Link>
              </li>
            ); })}</ul>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div><h2 className="text-3xl font-extrabold text-[#123E61]">Our Work in Alberton</h2><p className="mt-4 leading-relaxed text-slate-700">In Brackenhurst, our team assembled a backyard trampoline, an outdoor dining set and pool loungers. This is one example of the practical assembly and maintenance work we undertake for local households.</p><Link href="/gallery" className="mt-6 inline-block font-bold text-[#123E61] underline underline-offset-4">View All Our Work →</Link></div>
          {photos.length > 0 && <AreaProjectCard title="Trampoline and Outdoor Furniture Assembly" location="Brackenhurst, Alberton" description="Trampoline, outdoor dining set and pool lounger assembly." photos={photos} />}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <h2 className="text-3xl font-extrabold text-[#123E61]">Frequently Asked Questions</h2>
          <div className="space-y-4">{faqs.map(faq => <article key={faq.question} className="bg-[#F4F7F9] p-6"><h3 className="text-lg font-bold text-[#123E61]">{faq.question}</h3><p className="mt-3 text-sm leading-relaxed text-slate-700">{faq.answer}</p></article>)}</div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="bg-[#082F51] p-7 text-white sm:p-12"><h2 className="text-3xl font-extrabold">Request a Handyman Quote in Alberton</h2><p className="mt-4 max-w-3xl leading-relaxed text-slate-200">Tell us your Alberton suburb, the property type and the work required. Include photographs, approximate measurements where relevant, access arrangements and your preferred timeframe. For rental properties or complexes, let us know who will provide access and whether permission or booking arrangements are needed. We will review the details and discuss the quotation process.</p><div className="mt-7 flex flex-wrap gap-4"><Link href="/contact" className="bg-white px-6 py-3 text-sm font-bold text-[#123E61]">Request a Quote</Link><a href={businessConfig.phone.telHref} className="border border-white/40 px-6 py-3 text-sm font-bold">Call {businessConfig.phone.display}</a><a href={businessConfig.phone.whatsappUrl} className="border border-white/40 px-6 py-3 text-sm font-bold"><WhatsAppIcon />WhatsApp Us</a></div></div>
      </section>
    </main>
    <Footer />
  </div>;
}
