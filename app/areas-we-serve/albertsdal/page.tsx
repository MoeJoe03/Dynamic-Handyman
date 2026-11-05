import { AreaQuoteForm } from '@/components/AreaQuoteForm';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { businessConfig } from '@/config/business';
import { servicesData } from '@/data/services';

import { ElectricalSvg, PaintingSvg, CarpentrySvg, PlumbingSvg, PalisadesCarportsSvg, PavingSvg, MaintenanceSvg, GlassWorksSvg, FlooringSvg, GuttersFasciaSvg, AluminiumWindowsDoorsSvg } from '@/components/icons/TradeSvgs';

const serviceIcons = {
  electrical: ElectricalSvg, painting: PaintingSvg, carpentry: CarpentrySvg,
  plumbing: PlumbingSvg, palisades: PalisadesCarportsSvg, paving: PavingSvg,
  maintenance: MaintenanceSvg, 'glass-works': GlassWorksSvg, flooring: FlooringSvg,
  'gutters-fascia': GuttersFasciaSvg, 'aluminium-windows-doors': AluminiumWindowsDoorsSvg,
};

const title = 'Handyman Services in Albertsdal | Dynamic Handyman';
const description = 'Request handyman repairs, property maintenance and renovations in Albertsdal. Contact Dynamic Handyman to discuss your project and check availability.';
const url = `${businessConfig.websiteUrl}/areas-we-serve/albertsdal`;


const faqs = [
  { question: 'Do you provide handyman services in Albertsdal?', answer: 'Yes. Send your location and a description of the work so we can confirm availability.' },
  { question: 'Do you travel from Alberton to Albertsdal?', answer: 'Yes. Our base is in Eden Park, Alberton. Visits to Albertsdal depend on the work and our schedule.' },
  { question: 'Can you handle small jobs in Albertsdal?', answer: 'We consider small jobs such as cupboard repairs, fitting replacements and assembly. If you have several tasks at one property, send them together so we can assess the scope.' },
  { question: 'Can I receive a quote without a site visit?', answer: 'For clearly defined work, photos and measurements may be enough to discuss a quote. Hidden faults, uncertain measurements or larger projects may need a site assessment first.' },
  { question: 'What information should I include in my enquiry?', answer: 'Include your Albertsdal location, a description of the work, photographs where possible, access information and your preferred timeframe. This helps us understand the project and discuss the appropriate next step.' },
];

export const metadata: Metadata = {
  title, description, alternates: { canonical: url },
  openGraph: { title, description, url, type: 'website', images: ['/dynamic-handyman-services-og.png'] },
  twitter: { card: 'summary_large_image', title, description, images: ['/dynamic-handyman-services-og.png'] },
};

export default function AlbertsdalPage() {
  const breadcrumbs = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', item: businessConfig.websiteUrl }, { name: 'Areas We Serve', item: `${businessConfig.websiteUrl}/areas-we-serve` }, { name: 'Albertsdal', item: url }]
      .map((item, index) => ({ '@type': 'ListItem', position: index + 1, ...item })),
  };
  return <div className="flex min-h-screen flex-col bg-white">
    <Header />
    <main className="flex-grow">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, '\u003c') }} />
      <section className="mx-auto max-w-7xl px-4 pt-6 pb-12 sm:px-6 lg:px-8">
        <div className="bg-[#082F51] p-7 text-white shadow-xl sm:p-12 lg:p-16">
          <nav aria-label="Breadcrumb" className="mb-5 text-xs font-bold uppercase tracking-widest text-slate-300"><ol className="flex flex-wrap gap-2"><li><Link href="/">Home</Link></li><li aria-hidden="true">/</li><li><Link href="/areas-we-serve">Areas We Serve</Link></li><li aria-hidden="true">/</li><li aria-current="page" className="text-white">Albertsdal</li></ol></nav>
          <h1 className="max-w-4xl text-3xl font-extrabold uppercase tracking-tighter sm:text-5xl lg:text-6xl">Handyman Services in Albertsdal</h1>
          <p className="mt-6 max-w-3xl leading-relaxed text-slate-200">Albertsdal is one of the nearby areas served by Dynamic Handyman. We assist homeowners, landlords and businesses with practical repairs, maintenance and renovation projects, subject to the scope of work and current scheduling.</p>
          <Link href="/contact" className="mt-7 inline-block bg-white px-6 py-3 text-sm font-bold text-[#123E61] hover:bg-sky-100">Request a Quote</Link>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="bg-[#F4F7F9] p-6 sm:p-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#123E61]">Home Repairs and Maintenance in Albertsdal</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-slate-700">We provide repairs and maintenance for homeowners, landlords and businesses in Albertsdal, including work on rental properties. The appropriate quotation process depends on the type of work, access, materials and whether a site assessment is required.</p>
          <h2 className="mt-10 text-3xl font-extrabold tracking-tight text-[#123E61]">Handyman Services Available in Albertsdal</h2>
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
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#123E61]">How We Handle Albertsdal Enquiries</h2>
          <ol role="list" className="mt-7 grid grid-cols-1 list-none gap-4">
            {[
              'Send your suburb and project details.',
              'Include photographs where possible.',
              'Explain the type of work and your preferred timeframe.',
              'Dynamic Handyman reviews the scope and location.',
              'We confirm availability and the appropriate quotation process.',
              'A site visit or assessment is arranged where necessary.',
            ].map((step, index) => (
              <li key={step} className="flex items-start gap-4 border border-[#D9DEE2] bg-white p-5">
                <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center bg-[#123E61] font-mono text-sm font-bold text-white">{String(index + 1).padStart(2, '0')}</span>
                <p className="pt-1 text-sm leading-relaxed text-slate-700">{step}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-8 border border-[#D9DEE2] p-6">
          <h3 className="text-xl font-bold text-[#123E61]">Planning a Project in Albertsdal?</h3>
          <p className="mt-3 text-slate-700">Send your property location, the work required and your preferred dates so we can confirm availability.</p>
          <Link href="/contact" className="mt-4 inline-block font-bold text-[#123E61] underline underline-offset-4">Check project availability</Link>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <h2 className="text-3xl font-extrabold text-[#123E61]">Frequently Asked Questions</h2>
          <div className="space-y-4">{faqs.map(faq => <article key={faq.question} className="bg-[#F4F7F9] p-6"><h3 className="text-lg font-bold text-[#123E61]">{faq.question}</h3><p className="mt-3 text-sm leading-relaxed text-slate-700">{faq.answer}</p></article>)}</div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 bg-[#082F51] p-7 text-white sm:p-12 lg:grid-cols-2 lg:items-start"><div><h2 className="text-3xl font-extrabold">Request a Handyman Quote in Albertsdal</h2><p className="mt-4 max-w-3xl leading-relaxed text-slate-200">Tell us what work is required at your Albertsdal property, where it is located and when you would like the work completed. We will review the details and confirm whether Dynamic Handyman can assist.</p><div className="mt-7 flex flex-wrap gap-4"><a href={businessConfig.phone.telHref} className="bg-white px-6 py-3 text-sm font-bold text-[#123E61] hover:bg-sky-100">Call {businessConfig.phone.display}</a><a href={businessConfig.phone.whatsappUrl} className="bg-white px-6 py-3 text-sm font-bold text-[#123E61] hover:bg-sky-100"><WhatsAppIcon />WhatsApp Us</a></div>
          </div><AreaQuoteForm city="Albertsdal" />
        </div>
      </section>
    </main>
    <Footer />
  </div>;
}
