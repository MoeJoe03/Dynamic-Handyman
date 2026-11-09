import { AreaProjectCard } from '@/components/AreaProjectCard';
import { getPublicGalleryImages } from '@/lib/gallery/queries';
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

const title = 'Handyman Services in Eden Park, Alberton | Dynamic Handyman';
const description = 'Need a handyman in Eden Park, Alberton? Contact your local Dynamic Handyman team for electrical work, plumbing, painting, property repairs and renovations.';
const url = `${businessConfig.websiteUrl}/areas-we-serve/eden-park`;


const faqs = [
  { question: 'Do you provide handyman services in Eden Park?', answer: 'Yes. Send your location and a description of the work so we can confirm availability.' },
  { question: 'Do you come to my property in Eden Park?', answer: 'Yes. Dynamic Handyman is based in Eden Park and carries out work at customer properties. Contact us to arrange a visit if your job requires one.' },
  { question: 'Can you handle small jobs in Eden Park?', answer: 'Yes. We handle small jobs such as replacing worn fittings, repairing cupboard doors and assembling furniture. Availability depends on the work and our schedule.' },
  { question: 'Can I receive a quote without a site visit?', answer: 'For clearly defined work, photos and measurements may be enough to discuss a quote. Hidden faults, uncertain measurements or larger projects may need a site assessment first.' },
  { question: 'What information should I include in my enquiry?', answer: 'Include your Eden Park location, a description of the work, photographs where possible, access information and your preferred timeframe. This helps us understand the project and discuss the appropriate next step.' },
];

export const metadata: Metadata = {
  title, description, alternates: { canonical: url },
  openGraph: { title, description, url, type: 'website', images: ['/dynamic-handyman-services-og.png'] },
  twitter: { card: 'summary_large_image', title, description, images: ['/dynamic-handyman-services-og.png'] },
};

const edenParkProjectPhotos = [
  'e7ba3a9f-83f0-4ddd-83d3-e9a5988852d9',
  '09aa3c19-3bc7-4d41-8fa2-ad40954df3b3',
];

const additionalProjectPhotos = [
  { imageUrl: '/images/projects/eden-park/carport-framing.avif', altText: 'Steel carport support posts and roof framing in Eden Park' },
  { imageUrl: '/images/projects/eden-park/carport-roof.avif', altText: 'Carport roof sheeting and beams beside the house' },
  { imageUrl: '/images/projects/eden-park/gate-street-view.avif', altText: 'Street view of the installed steel driveway gate' },
  { imageUrl: '/images/projects/eden-park/gate-driveway-view.avif', altText: 'View of the installed steel gate from inside the driveway' },
];

export default async function EdenParkPage() {
  const { images } = await getPublicGalleryImages();
  const galleryPhotos = edenParkProjectPhotos.flatMap(id => {
    const image = images.find(photo => photo.id === id);
    return image ? [{ imageUrl: image.imageUrl, altText: image.alt_text ?? 'Carport and gate project in Eden Park, Alberton' }] : [];
  });
  const photos = [...galleryPhotos, ...additionalProjectPhotos];
  const breadcrumbs = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', item: businessConfig.websiteUrl }, { name: 'Areas We Serve', item: `${businessConfig.websiteUrl}/areas-we-serve` }, { name: 'Eden Park', item: url }]
      .map((item, index) => ({ '@type': 'ListItem', position: index + 1, ...item })),
  };
  return <div className="flex min-h-screen flex-col bg-white">
    <Header />
    <main className="flex-grow">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, '\\u003c') }} />
      <section className="mx-auto max-w-7xl px-4 pt-6 pb-12 sm:px-6 lg:px-8">
        <div className="bg-[#082F51] p-7 text-white shadow-xl sm:p-12 lg:p-16">
          <nav aria-label="Breadcrumb" className="mb-5 text-xs font-bold uppercase tracking-widest text-slate-300"><ol className="flex flex-wrap gap-2"><li><Link href="/">Home</Link></li><li aria-hidden="true">/</li><li><Link href="/areas-we-serve">Areas We Serve</Link></li><li aria-hidden="true">/</li><li aria-current="page" className="text-white">Eden Park</li></ol></nav>
          <h1 className="max-w-4xl text-3xl font-extrabold uppercase tracking-tighter sm:text-5xl lg:text-6xl">Handyman Services in Eden Park, Alberton</h1>
          <p className="mt-6 max-w-3xl leading-relaxed text-slate-200">Dynamic Handyman is based in Eden Park, Alberton. We carry out on-site repairs, property maintenance and renovations for local homeowners, landlords and businesses.</p>
          <Link href="#eden-park-quote" className="mt-7 inline-block bg-white px-6 py-3 text-sm font-bold text-[#123E61] hover:bg-sky-100">Request a Quote</Link>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="bg-[#F4F7F9] p-6 sm:p-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#123E61]">Home Repairs and Maintenance in Eden Park</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-slate-700">Whether you need a leaking fitting repaired, cupboards adjusted or a rental property painted between tenants, tell us what needs attention. If your property needs several repairs or trades, send us the full list so we can discuss the work together.</p>
          <h2 className="mt-10 text-3xl font-extrabold tracking-tight text-[#123E61]">Handyman Services Available in Eden Park</h2>
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
          <h2 className="text-3xl font-extrabold tracking-tight text-[#123E61]">How We Handle Eden Park Enquiries</h2>
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
          <h3 className="text-xl font-bold text-[#123E61]">Planning a Project in Eden Park?</h3>
          <p className="mt-3 text-slate-700">Send your property location, the work required and your preferred dates so we can confirm availability.</p>
          <Link href="#eden-park-quote" className="mt-4 inline-block font-bold text-[#123E61] underline underline-offset-4">Check project availability</Link>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8" aria-labelledby="eden-park-work-heading">
        <h2 id="eden-park-work-heading" className="text-3xl font-extrabold text-[#123E61]">Our Work in Eden Park</h2>
        <div className="mt-6 grid gap-8 sm:grid-cols-2 sm:items-start">
          {photos.length > 0 && (
            <AreaProjectCard
              title="Carport and Gate Installation"
              location="Eden Park, Alberton"
              description="Custom steel carport and gate installation, with alterations to the gate frame."
              photos={photos}
            />
          )}
          <AreaProjectCard
            title="Roof Painting"
            location="Eden Park, Alberton"
            description="Restored the look of the roof by repainting the old paintwork with a fresh dark grey finish."
            photos={[
              { imageUrl: '/images/projects/eden-park/roof-painting-1.avif', altText: 'Dark grey finish on a corrugated metal roof in Eden Park' },
              { imageUrl: '/images/projects/eden-park/roof-painting-2.avif', altText: 'Second view of the painted corrugated roof in Eden Park' },
            ]}
          />
        </div>
        <Link href="/gallery" className="mt-6 inline-block font-bold text-[#123E61] underline underline-offset-4">View All Our Work <span aria-hidden="true">→</span></Link>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <h2 className="text-3xl font-extrabold text-[#123E61]">Frequently Asked Questions</h2>
          <div className="space-y-4">{faqs.map(faq => <article key={faq.question} className="bg-[#F4F7F9] p-6"><h3 className="text-lg font-bold text-[#123E61]">{faq.question}</h3><p className="mt-3 text-sm leading-relaxed text-slate-700">{faq.answer}</p></article>)}</div>
        </div>
      </section>
      <section id="eden-park-quote" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 bg-[#082F51] p-7 text-white sm:p-12 lg:grid-cols-2 lg:items-start"><div><h2 className="text-3xl font-extrabold">Request a Handyman Quote in Eden Park</h2><p className="mt-4 max-w-3xl leading-relaxed text-slate-200">Tell us what work is required at your Eden Park property, where it is located and when you would like the work completed. We will review the details and confirm whether Dynamic Handyman can assist.</p><div className="mt-7 flex flex-wrap gap-4"><a href={businessConfig.phone.telHref} className="bg-white px-6 py-3 text-sm font-bold text-[#123E61] hover:bg-sky-100">Call {businessConfig.phone.display}</a><a href={businessConfig.phone.whatsappUrl} className="bg-white px-6 py-3 text-sm font-bold text-[#123E61] hover:bg-sky-100"><WhatsAppIcon />WhatsApp Us</a></div>
          </div><AreaQuoteForm city="Eden Park, Alberton" />
        </div>
      </section>
    </main>
    <Footer />
  </div>;
}
