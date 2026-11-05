import { NearbyServiceAreas } from '@/components/NearbyServiceAreas';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import type { Metadata } from 'next';
import { businessConfig } from '@/config/business';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';
import Link from 'next/link';
import { AreaProjectCard } from '@/components/AreaProjectCard';
import { getPublicGalleryImages } from '@/lib/gallery/queries';
import { getPublicHomeImages } from '@/lib/home-images/queries';
import { ElectricalSvg, PaintingSvg, CarpentrySvg, PlumbingSvg, PalisadesCarportsSvg, PavingSvg, MaintenanceSvg, GlassWorksSvg, FlooringSvg, GuttersFasciaSvg, AluminiumWindowsDoorsSvg } from '@/components/icons/TradeSvgs';
import { servicesData } from '@/data/services';
import { mainServiceAreas, widerServiceAreas } from '@/config/service-areas';

const serviceIcons = {
  electrical: ElectricalSvg, painting: PaintingSvg, carpentry: CarpentrySvg,
  plumbing: PlumbingSvg, palisades: PalisadesCarportsSvg, paving: PavingSvg,
  maintenance: MaintenanceSvg, 'glass-works': GlassWorksSvg, flooring: FlooringSvg,
  'gutters-fascia': GuttersFasciaSvg, 'aluminium-windows-doors': AluminiumWindowsDoorsSvg,
};

const title = 'Areas We Serve | Handyman Services in Alberton and Nearby Areas';
const description = 'Dynamic Handyman provides repairs, maintenance and renovation services in Alberton, nearby suburbs and selected Gauteng areas. Check availability.';
const url = `${businessConfig.websiteUrl}/areas-we-serve`;

export const metadata: Metadata = {
  title, description, alternates: { canonical: url },
  openGraph: { title, description, url, type: 'website' },
  twitter: { card: 'summary', title, description },
};

const areaFaqs = [
  { question: 'Where is Dynamic Handyman based?', answer: 'We are based in Eden Park, Alberton, and provide on-site services at customer properties.' },
  { question: 'Do you work outside Alberton?', answer: 'Yes, we serve nearby suburbs and consider selected projects in wider Gauteng areas. Availability depends on the work, project size, schedule and travel distance.' },
  { question: 'Can you help if my suburb is not listed?', answer: 'Contact us with your suburb and a description of the work. We will review the requirements and confirm whether we can assist.' },
  { question: 'Does travel affect the quotation?', answer: 'Location and travel requirements may affect the quotation and scheduling. Send your property location so we can discuss the appropriate quotation process before work starts.' },
  { question: 'Do you regularly work in all the areas listed?', answer: 'We primarily serve Alberton and nearby suburbs, and consider selected projects in wider Gauteng areas. How often we visit each area depends on project demand and scheduling. Contact us with your location and project details to confirm availability.' },
];

export default async function AreasWeServePage() {
  const homeImages = await getPublicHomeImages();
  const localPhotos = ['reviews-photo', 'reviews-photo-2', 'reviews-photo-3']
    .map(key => homeImages[key])
    .filter(photo => photo && /trampoline|patio|lounger/i.test(photo.alt_text));
  const { images: galleryImages } = await getPublicGalleryImages();
  const tilingPhoto = galleryImages.find(photo => photo.id === 'f5597623-03ea-491a-935f-fabd2d257c21');
  const bathroomPhoto = homeImages['featured-project-6'] || homeImages['services-page-plumbing'];
  const bedfordviewPhotos = [
    ...(bathroomPhoto ? [{ imageUrl: bathroomPhoto.imageUrl, altText: bathroomPhoto.alt_text }] : []),
    ...(tilingPhoto ? [{ imageUrl: tilingPhoto.imageUrl, altText: tilingPhoto.alt_text || 'Floor tiling in Bedfordview' }] : []),
    { imageUrl: '/images/projects/bedfordview-tiling-painting.webp', altText: 'Floor tiling and interior painting at a Bedfordview property' },
    { imageUrl: '/images/projects/bedfordview-kitchen-cupboards.webp', altText: 'Kitchen cupboards and tiled splashback at a Bedfordview property' },
  ];
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-grow">
        <section className="mx-auto max-w-7xl px-4 pt-6 pb-8 sm:px-6 lg:px-8">
          <div className="bg-[#082F51] p-7 text-white shadow-xl sm:p-12 lg:p-16">
            <BreadcrumbNav currentPage="areas-we-serve" />
            <h1 className="text-3xl font-extrabold uppercase tracking-tighter sm:text-5xl lg:text-6xl">Areas We Serve<span className="mt-3 block text-2xl text-slate-300 sm:text-3xl lg:text-4xl">Handyman Services in Alberton and Nearby Areas</span></h1>
            <p className="mt-5 max-w-3xl leading-relaxed text-slate-200">Dynamic Handyman is based in Eden Park, Alberton, and provides handyman, property maintenance, repair and renovation services to homeowners, landlords and businesses in Alberton and nearby areas.</p>
            <p className="mt-4 max-w-3xl leading-relaxed text-slate-200">We also consider selected projects in wider Gauteng areas. Availability depends on the type of work, project size, scheduling requirements and travel distance. <Link href="/contact" className="underline underline-offset-4 hover:text-sky-200">Contact us</Link> with your location and project details so we can confirm whether we can assist.</p>
          </div>
        </section>
        <section className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8" aria-labelledby="main-areas-heading">
          <div className="space-y-10 bg-[#F4F7F9] p-6 sm:p-9 lg:p-12">
            <div>
              <h2 id="main-areas-heading" className="text-3xl font-extrabold tracking-tight text-[#123E61]">Our Main Service Areas</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {mainServiceAreas.map(area => <li key={area} className="border border-[#D9DEE2] bg-white px-3 py-2 text-sm font-semibold text-[#123E61]">{area === 'Alberton' ? <Link href="/areas-we-serve/alberton" className="underline underline-offset-4 hover:text-[#19547E]">{area}</Link> : area === 'Albertsdal' ? <Link href="/areas-we-serve/albertsdal" className="underline underline-offset-4 hover:text-[#19547E]">{area}</Link> : area}</li>)}
              </ul>
            </div>
            <div>
              <NearbyServiceAreas headingLevel={2} />
<h2 className="mt-6 font-bold text-[#123E61]">Wider Service Areas</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">Based in Alberton, we also consider projects in these areas, subject to scope, scheduling and travel requirements.</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {widerServiceAreas.map(area => <li key={area} className="border border-[#D9DEE2] bg-white px-3 py-2 text-sm font-semibold text-[#123E61]">{area}</li>)}
              </ul>
              <Link href="/contact" className="mt-6 inline-block font-bold text-[#123E61] underline underline-offset-4">Contact us to confirm availability</Link>
            </div>
          </div>
        </section>
        <section className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8" aria-labelledby="available-services-heading">
          <h2 id="available-services-heading" className="max-w-3xl text-3xl font-extrabold tracking-tight text-[#123E61] sm:text-4xl">Services Available in Our Service Areas</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-slate-700">We provide repairs, maintenance and renovation work for homes, rental properties and businesses. Availability depends on the service required, project scope, location and schedule. Explore the services below, then contact us with your project details to confirm whether we can assist.</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {servicesData.map(service => {
              const Icon = serviceIcons[service.id as keyof typeof serviceIcons];
              return (
              <li key={service.id}>
                <Link href={`/services/${service.id}`} className="flex h-full items-center justify-between gap-4 border border-[#D9DEE2] bg-[#F4F7F9] p-5 text-sm font-bold text-[#123E61] transition-colors hover:border-[#19547E] hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#19547E]">
                  <span className="flex items-center gap-3">{Icon && <span aria-hidden="true" className="shrink-0"><Icon className="h-10 w-12" /></span>}<span>{service.title}</span></span><span aria-hidden="true" className="text-[#19547E]">→</span>
                </Link>
              </li>
            ); })}
          </ul>
        </section>
        <section className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8" aria-labelledby="local-projects-heading">
          <h2 id="local-projects-heading" className="text-3xl font-extrabold tracking-tight text-[#123E61] sm:text-4xl">Work Completed in the Areas We Serve</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-slate-700">Our portfolio includes work in Alberton and other Gauteng locations. These examples describe completed projects; contact us to check availability for new work in your area.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {localPhotos.length > 0 && <AreaProjectCard title="Trampoline and Outdoor Furniture Assembly" location="Brackenhurst, Alberton" description="Assembly of a backyard trampoline, outdoor dining set and pool loungers." photos={localPhotos.map(photo => ({ imageUrl: photo.imageUrl, altText: photo.alt_text }))} />}
            <AreaProjectCard title="Home Renovation" location="Bedfordview, Germiston" description="Tiling, kitchen cupboard work, electrical work, plumbing, painting and refurbishment of built-in cupboards." photos={bedfordviewPhotos} />
            {!localPhotos.length && !bathroomPhoto && <Link href="/gallery" className="font-bold text-[#123E61] underline underline-offset-4">Explore our completed work</Link>}
          </div>
          <Link href="/gallery" className="mt-8 inline-flex items-center gap-3 bg-[#123E61] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#19547E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#19547E]">View All Our Work <span aria-hidden="true">→</span></Link>
        </section>
        <section className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8" aria-labelledby="area-faq-heading">
          <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-12">
            <h2 id="area-faq-heading" className="text-3xl font-extrabold tracking-tight text-[#123E61]">Frequently Asked Questions About Our Service Areas</h2>
            <div className="space-y-6">
              {areaFaqs.map(faq => <article key={faq.question} className="bg-[#F4F7F9] p-6"><h3 className="text-lg font-bold text-[#123E61]">{faq.question}</h3><p className="mt-3 text-sm leading-relaxed text-slate-700">{faq.answer}</p></article>)}
            </div>
          </div>
        </section>
        <section className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8" aria-labelledby="availability-heading">
          <div className="bg-[#082F51] p-7 text-white sm:p-12">
            <h2 id="availability-heading" className="text-3xl font-extrabold tracking-tight sm:text-4xl">Check Availability for Your Area</h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-slate-200">Tell us where the property is located, what work is required and when you would like the work completed. We will review the project and confirm whether Dynamic Handyman can assist.</p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Link href="/contact" className="bg-white px-6 py-3 text-sm font-bold text-[#123E61] hover:bg-sky-100">Discuss Your Project</Link>
              <a href={businessConfig.phone.telHref} className="border border-white/40 px-6 py-3 text-sm font-bold hover:bg-white/10">Call {businessConfig.phone.display}</a>
              <a href={businessConfig.phone.whatsappUrl} target="_blank" rel="noopener noreferrer" className="border border-white/40 px-6 py-3 text-sm font-bold hover:bg-white/10"><WhatsAppIcon />WhatsApp Us</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
