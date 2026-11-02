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
import { getPublicGalleryImages } from '@/lib/gallery/queries';
import { ElectricalSvg, PaintingSvg, CarpentrySvg, PlumbingSvg, PalisadesCarportsSvg, PavingSvg, MaintenanceSvg, GlassWorksSvg, FlooringSvg, GuttersFasciaSvg, AluminiumWindowsDoorsSvg } from '@/components/icons/TradeSvgs';
import { ServiceQuoteForm } from '@/components/services/ServiceQuoteForm';

const slugs: Record<string, string> = {
  electrical: 'electrical',
  painting: 'painting',
  carpentry: 'carpentry',
  plumbing: 'plumbing',
  palisades: 'palisades',
  paving: 'paving',
  maintenance: 'maintenance',
  'glass-works': 'glass-works',
  flooring: 'flooring',
  'gutters-fascia': 'gutters-fascia',
  'aluminium-windows-doors': 'aluminium-windows-doors',
};

export const revalidate = 60;
const galleryShowcaseServices = new Set(['painting', 'electrical', 'carpentry', 'plumbing', 'palisades', 'maintenance', 'flooring']);

const metadataOverrides: Record<string, { title: string; description: string }> = {
  palisades: { title: 'Palisade Fencing, Gates & Carports in Alberton', description: 'Palisade fencing, sliding gate repairs and carport installation for Alberton homes and businesses. Request a site-based quote from Dynamic Handyman.' },
  paving: { title: 'Driveway & Walkway Paving in Alberton', description: 'Driveway and walkway paving, sunken paving repairs and drainage-related preparation in Alberton. Request a quote from Dynamic Handyman.' },
  maintenance: { title: 'Property Maintenance & Renovations | Alberton', description: 'Property maintenance, repairs and renovations for Alberton homes and businesses. Request a quote from Dynamic Handyman.' },
  'glass-works': { title: 'Glass & Glazing Repairs | Alberton', description: 'Broken window glass, glazing repairs and pane replacement in Alberton. Send photos and measurements to Dynamic Handyman for a quote.' },
  flooring: { title: 'Tiling, Flooring & Carpets in Alberton', description: 'Floor and wall tiling, carpet and laminate installation, and damaged flooring repairs in Alberton. Request a quote from Dynamic Handyman.' },
  'gutters-fascia': { title: 'Gutter, Downpipe & Fascia Repairs | Alberton', description: 'Gutter leaks, blocked downpipes and fascia repairs in Alberton. Request a quote from Dynamic Handyman.' },
  'aluminium-windows-doors': { title: 'Aluminium Windows & Doors | Alberton', description: 'Aluminium window and door installation and repairs in Alberton, including alignment, rollers, locks, seals and glazing. Request a quote.' },
};

const additionalFaqs: Record<string, [string, string][]> = {
  palisades: [
    ['What should I measure for a new gate or carport?', 'Approximate width, height and access details help with an initial discussion. Final dimensions and fixing conditions need a site check.'],
    ['Can a gate be repaired instead of replaced?', 'That depends on frame condition, rollers, track and corrosion. Photos help us decide whether an assessment is needed.'],
  ],
  maintenance: [
    ['Can one quote cover several repairs?', 'Yes. List each task and send photos so the combined scope can be discussed before quoting.'],
    ['Do renovations need a site visit?', 'Larger work or hidden defects often require an assessment before materials, trades and scheduling can be agreed.'],
  ],
  carpentry: [
    ['Should I repair or replace a damaged cupboard?', 'That depends on the condition of the panels, fittings and surrounding structure. Photos and measurements help us discuss whether a repair is practical.'],
    ['Which cupboard materials can be used?', 'Material choice depends on the location, existing cabinetry, finish and budget. We confirm materials in the quotation rather than promising one specification for every job.'],
    ['Can you replace door hardware without replacing the door?', 'Sometimes. We check the door, frame and existing fitting before recommending a handle, hinge or lock repair or replacement.'],
    ['What causes ceiling damage to return?', 'A leak or movement above the ceiling may need attention first. We assess the visible damage and discuss whether another trade or inspection is needed.'],
  ],
  paving: [
    ['Can sunken paving be repaired without relaying the whole area?', 'Often a local repair is possible, but the cause of settlement and the condition of the surrounding base need to be checked first.'],
    ['How do you assess the base and drainage?', 'We review existing levels, water runoff and the condition of the paving base before proposing preparation or relaying.'],
    ['Does driveway paving need different preparation from a walkway?', 'Vehicle use can change the preparation and material requirements. Tell us what vehicles use the area so we can assess the site and quote appropriately.'],
  ],
  'glass-works': [
    ['What glass type will you use?', 'The suitable glass depends on the opening, location, frame and applicable requirements. We confirm the specification after assessment.'],
    ['Can you board up broken glass?', 'Keep people away from broken glass and tell us if the opening needs urgent securing. We will confirm whether temporary boarding is available for your location and schedule before promising attendance.'],
    ['Do you inspect the frame as well as the pane?', 'Yes. A damaged or misaligned frame can affect the replacement, so we check the fitting method and frame condition.'],
    ['Do you work on shopfront glazing?', 'Send photographs, dimensions and access details for a shopfront enquiry. We will confirm whether the scope is suitable for our service.'],
    ['How soon can replacement glass be fitted?', 'Scheduling depends on site measurement, the required glass specification, material availability and access. We discuss timing after reviewing your enquiry.'],
  ],
  flooring: [
    ['Can you replace only damaged tiles or flooring?', 'A local repair may be possible if matching material is available and the underlying surface is sound.'],
    ['What preparation is needed before new flooring?', 'We assess the existing finish, levels and moisture concerns before discussing preparation and material choice.'],
    ['Do you remove old flooring?', 'Removal can be included when agreed in the scope. Send photographs so we can discuss disposal and preparation.'],
    ['Can you install laminate flooring or carpet?', 'We discuss laminate and carpet installation after checking the room measurements, existing floor and preferred material.'],
    ['Can you repair grout, trims or floor transitions?', 'We can assess damaged grout, edges and transitions. The repair depends on the condition of the surrounding finish and substrate.'],
    ['How long does flooring work take?', 'Timing depends on the room size, removal work, subfloor preparation, material availability and drying time where relevant. We discuss a schedule after assessing the scope.'],
  ],
  'gutters-fascia': [
    ['Can a leaking gutter joint be repaired?', 'Sometimes. We check the joint, alignment, fixings and surrounding gutter condition before proposing a repair.'],
    ['Do you clear blocked downpipes?', 'Describe where water backs up or overflows and send photos. We can then discuss access and whether clearing or repair is suitable.'],
    ['When should fascia boards be replaced?', 'Replacement depends on the extent of damage and the condition of the supporting roofline. A site assessment may be needed.'],
    ['Why does my gutter overflow during rain?', 'Possible causes include a blockage, poor alignment, insufficient fall or a downpipe problem. We need to inspect the roofline before recommending a repair.'],
    ['Can you change where the downpipe discharges?', 'We can discuss the outlet position and runoff route after checking the existing gutters, drainage and site access. The scope depends on the property.'],
    ['Will you need roof access for a gutter repair?', 'Often, but the access method depends on height, roofline layout and ground conditions. Send photos so we can discuss a safe assessment.'],
  ],
  'aluminium-windows-doors': [
    ['Can worn rollers be replaced?', 'We can assess the door or window, identify the fitting and discuss whether a compatible replacement is available.'],
    ['Can you fix a door that does not close or lock properly?', 'Alignment, hinges, rollers, locks and frame condition may all contribute. We check the cause before recommending work.'],
    ['Do you replace seals and glazing?', 'We can discuss weather seals and glazing after checking the frame, opening and suitable materials.'],
    ['Should I repair or replace an aluminium frame?', 'That depends on frame condition, alignment, available parts and the cost of the proposed repair. A site assessment helps clarify the options.'],
    ['Can you replace handles or locks on existing frames?', 'We can check the existing fitting and discuss a compatible handle or lock if replacement parts are available.'],
    ['What should I send for a new aluminium window or door quote?', 'Send the opening dimensions, photos of the inside and outside, your location and any preferred opening style. Final measurements are confirmed on site.'],
    ['How long will an aluminium repair or installation take?', 'Timing depends on measurements, parts or frame availability, access and the work required. We discuss scheduling after reviewing the scope.'],
  ],
};

const serviceGuidance: Record<string, { heading: string; text: string }> = {
  painting: { heading: 'Preparation before painting', text: 'We review peeling paint, cracks, surface condition and visible moisture before choosing preparation or coating work. Recurring damp can have a separate cause such as a leak or drainage problem. Based in Alberton, we discuss access, weather exposure and drying time for each property before quoting; a coating alone is not presented as a cure for water entry.' },
  carpentry: { heading: 'Repair or replacement', text: 'We consider the condition of the existing cupboard, door, hardware or ceiling before recommending a repair or replacement. Materials and measurements are confirmed for the individual project.' },
  paving: { heading: 'Ground and drainage checks', text: 'Sunken areas may need a local repair or broader relaying, depending on the base. Driveways also need preparation suited to vehicle use. We check levels, runoff and ground condition before defining the scope.' },
  flooring: { heading: 'Choosing a floor finish', text: 'A suitable floor finish depends on the room, expected use and the condition of the existing surface. Uneven or damp subfloors may need preparation before tiles, laminate or carpet are installed. We discuss materials and repair options after reviewing the site.' },
};

const remainingServiceCopy: Record<string, { problem: string; assessment: string; process: string; question: string; answer: string }> = {
  palisades: { problem: 'We help with damaged palisade fencing, gates that do not run smoothly, worn rollers, corroded steelwork and carport installations or repairs.', assessment: 'New fencing, gates and carports usually need site measurements, ground and fixing checks, and a discussion of the required materials.', process: 'Send photos, approximate dimensions, your location and the type of fencing, gate or carport work required.', question: 'Can you repair an existing gate or palisade fence?', answer: 'Yes. Share photographs of the damage and we can discuss repairs, replacement parts and whether a site visit is needed.' },
  paving: { problem: 'We help with uneven or sunken paving, damaged walkways, driveway improvements and areas where drainage needs attention.', assessment: 'New paving or substantial repairs may need measurements and an assessment of the ground, existing base and water runoff.', process: 'Send the approximate area, photos, your location and whether the paving will carry vehicles or foot traffic.', question: 'Can you repair sunken paving?', answer: 'Yes. We can assess the affected area and discuss the base preparation and relaying required.' },
  maintenance: { problem: 'We help with recurring property repairs, worn finishes, general upkeep and projects that need more than one trade.', assessment: 'Larger renovations or work with hidden defects may need a site assessment before we can define the scope.', process: 'List the tasks, share photographs, your location and any access or scheduling requirements.', question: 'Can you coordinate more than one trade?', answer: 'Yes. We can discuss multi-trade maintenance and renovation work through one point of contact.' },
  'glass-works': { problem: 'We help with broken glass, damaged glazing seals and window or door glass that needs replacement.', assessment: 'Glass replacement normally requires accurate measurements and an inspection of the frame and fitting method.', process: 'Send safe photographs of the pane and frame, approximate measurements, your location and any access details.', question: 'Can you replace a broken window pane?', answer: 'Yes. We can discuss replacement after checking the size, glass requirements and frame condition.' },
  flooring: { problem: 'We help with damaged tiles, worn carpets, uneven floor finishes and rooms needing new flooring.', assessment: 'Flooring work may require measurements and a check of the subfloor, moisture and existing finish before materials are selected.', process: 'Send room dimensions, photographs, your preferred floor finish and the property location.', question: 'Can you replace damaged floor finishes?', answer: 'Yes. We can discuss removing damaged finishes and fitting a suitable replacement after reviewing the floor.' },
  'gutters-fascia': { problem: 'We help with leaking or misaligned gutters, blocked downpipes, damaged fascia boards and poor rainwater runoff.', assessment: 'Roofline work may require an inspection of access, fixings, fall and the condition of adjoining surfaces.', process: 'Send photos of the gutter or fascia, your location and a description of where water leaks or overflows.', question: 'Can you repair a leaking gutter?', answer: 'Yes. We can inspect the affected joint, alignment and fixings before recommending a repair.' },
  'aluminium-windows-doors': { problem: 'We help with misaligned aluminium windows and doors, worn rollers, faulty handles, locks and weather seals.', assessment: 'New frames and glazing normally require accurate opening measurements and a check of the existing structure.', process: 'Send photographs, approximate opening measurements, your location and a description of the fitting or repair.', question: 'Can you adjust an aluminium door or window?', answer: 'Yes. We can review alignment, rollers, locks and seals to determine the appropriate repair.' },
};

const detailCopy = {
  electrical: { title: 'Electrical Services in Alberton | Repairs & COCs', description: 'Electrical repairs, installations, fault finding and compliance-related work for Alberton homes and businesses. Request a quote.', name: 'Electrical Services', h1: 'Electrical Services in Alberton', intro: 'Dynamic Handyman provides practical electrical installations, repairs, fault finding and compliance-related work for homes, rental properties and businesses in Alberton and nearby suburbs.', quote: 'Get a Free Electrical Quote', cta: 'Request an Electrical Quote', work: 'Electrical', type: ['Electrical installations', 'Electrical repairs', 'Fault finding', 'Compliance-related electrical work'], audience: 'Our electrical service helps property owners resolve faults, improve safety and complete planned installation work through one practical point of contact.', problems: 'We help with tripping circuits, faulty plugs or lights, outdated distribution boards, damaged wiring, power-point additions and electrical work that needs inspection or certification.', assessment: 'A site assessment may be required when the fault is intermittent, the existing wiring is unknown, access is restricted or the project involves a larger installation or compliance inspection.', process: 'Send your location, project details and photographs where possible. We review the information, clarify the scope and discuss the appropriate quotation process before work starts.', faqs: [
    ['What electrical work does Dynamic Handyman provide?', 'We provide selected electrical installations, repairs, fault finding, distribution board work, lighting, power points, surge protection and generator or inverter changeovers.'],
    ['When is an electrical assessment required?', 'An assessment may be needed for recurring trips, rewiring, distribution board changes, compliance inspections, unknown faults or work where the existing installation needs to be checked first.'],
    ['Does Dynamic Handyman issue electrical Certificates of Compliance?', 'Yes. Dynamic Handyman issues electrical COCs after a registered person has inspected and tested the installation and confirmed it meets the applicable requirements. Any faults that prevent certification must be addressed before a COC can be issued.'],
    ['Who is this service for?', 'We assist homeowners, landlords, property owners and selected residential and commercial clients with planned electrical work and repairs.'],
    ['How do I request an electrical quote?', 'Send your location, a description of the issue or planned installation, photographs of the affected area where safe, and your preferred timeframe.'],
  ] },
  painting: { title: 'Painting, Roof Coatings & Damp-Proofing in Alberton', description: 'Interior and exterior painting, roof coatings, crack repairs and damp-proofing for Alberton homes, rentals and businesses. Request a quote.', name: 'Painting, Roof Coatings and Damp-Proofing', h1: 'Painting, Roof Coatings and Damp-Proofing in Alberton', intro: 'Dynamic Handyman provides interior and exterior painting, roof coatings, crack repairs and damp-proofing for homes, rentals and businesses in Alberton and nearby suburbs.', quote: 'Get a Free Painting Quote', cta: 'Request a Painting Quote', work: 'Painting and Coating', type: ['Interior painting', 'Exterior painting', 'Roof coatings', 'Damp-proofing'], audience: 'We help homeowners, landlords and businesses refresh and maintain interior, exterior and roof surfaces. The appropriate preparation and coating depend on each surface and the cause of any damage.', problems: 'We help with faded or peeling paint, weathered exterior walls, cracked finishes and roof surfaces needing recoating. Painting or coating alone may not solve recurring damp. The source of moisture, such as plumbing leaks, roof defects, drainage problems or rising damp, may need to be assessed before the correct preparation or treatment is selected.', assessment: 'A site assessment may be needed where surfaces have extensive cracking, peeling, moisture damage, difficult access or an uncertain roof condition. We cannot confirm a damp-proofing treatment from appearance alone.', process: 'Send your location, photos, approximate surface sizes and a description of the finish or problem. We discuss any assessment needed and agree the scope before work starts.', faqs: [
    ['What painting work do you provide?', 'We paint interior and exterior surfaces, doors, frames and trims, and undertake surface preparation and touch-ups.'],
    ['Do you repair cracks before painting?', 'We assess and prepare suitable cracks before coating. More extensive damage or persistent moisture may require a site assessment.'],
    ['Do you offer roof coatings and damp-proofing?', 'Yes, subject to an assessment of the affected area. A coating will not necessarily stop recurring water entry; the moisture source may require a separate repair or treatment.'],
    ['How long does painting usually take?', 'Timing depends on the area, preparation, weather and coating system. We discuss a schedule once the scope is clear.'],
    ['How do I request a painting quote?', 'Send your location, photos, approximate dimensions and a description of the surfaces or problem.'],
  ] },
  carpentry: { title: 'Carpentry, Cupboards, Doors & Ceilings in Alberton', description: 'Carpentry repairs, built-in cupboards, door fitting and ceiling work for Alberton homes and businesses. Discuss your project with Dynamic Handyman.', name: 'Carpentry, Cupboards, Doors and Ceilings', h1: 'Carpentry, Cupboards, Doors and Ceilings in Alberton', intro: 'Dynamic Handyman helps homeowners, landlords and businesses with carpentry repairs, cupboard improvements, door fitting and ceiling work across Alberton and nearby suburbs.', quote: 'Get a Free Carpentry Quote', cta: 'Request a Carpentry Quote', work: 'Carpentry', type: ['Carpentry repairs', 'Built-in cupboards', 'Door fitting', 'Ceiling installation'], audience: 'We repair and improve timber fixtures, storage, doors and ceilings in homes, rental properties and commercial spaces.', problems: 'We help with damaged cupboards, loose hinges, doors that do not close properly, worn shelving, damaged trim and ceiling repairs.', assessment: 'Custom cupboards, replacement doors, ceiling changes and work involving uneven openings usually need measurements and a site assessment before quoting.', process: 'Send photos, approximate dimensions, your location and a description of the repair or installation. We clarify materials, measurements and access before providing a quote.', faqs: [
    ['Can you repair existing cupboards?', 'Yes. We assess hinges, handles, shelves and damaged panels and discuss a practical repair or replacement.'],
    ['Do you fit new doors?', 'We can discuss hanging and adjusting doors, including related locks and fittings. Measurements may be needed.'],
    ['Do you install built-in cupboards?', 'Built-in cupboard work depends on the available space, design, materials and measurements. Contact us with your requirements.'],
    ['Can you repair ceilings?', 'We discuss ceiling repairs and installations after reviewing the damage, structure and access.'],
    ['What should I send for a carpentry quote?', 'Share photos, approximate measurements, materials or finish preferences, your location and a description of the work.'],
  ] },
  plumbing: { title: 'Plumbing Repairs, Geysers & Sanitaryware in Alberton', description: 'Plumbing repairs, geyser work and sanitaryware fitting for Alberton homes and businesses. Contact Dynamic Handyman for a project quote.', name: 'Plumbing Repairs, Geysers and Sanitaryware', h1: 'Plumbing Repairs, Geysers and Sanitaryware in Alberton', intro: 'Dynamic Handyman provides plumbing repairs and maintenance for bathrooms, kitchens, geysers, pipes and drainage systems in Alberton and nearby suburbs.', quote: 'Get a Free Plumbing Quote', cta: 'Request a Plumbing Quote', work: 'Plumbing', type: ['Plumbing repairs', 'Geyser work', 'Sanitaryware fitting', 'Leak repairs'], audience: 'We assist homeowners, landlords and businesses with plumbing repairs, fitting replacements and planned bathroom or kitchen improvements.', problems: 'We help with leaking taps, burst or leaking pipes, toilet and cistern faults, blocked traps and drainage issues, and geyser-related problems.', assessment: 'Hidden leaks, geyser replacements, pressure issues, drainage faults and installations involving new pipework may require an assessment before a quote.', process: 'Tell us where the problem is, when it started and whether water can be isolated. Send safe photos and your location so we can discuss the next step and quotation.', faqs: [
    ['What plumbing repairs do you handle?', 'We discuss taps, mixers, toilets, sinks, leaks, pipes, waste lines and other selected repair and maintenance work.'],
    ['Can you help with a geyser problem?', 'Yes. Describe the symptoms and send photos where safe. We can discuss assessment and the appropriate repair or replacement scope.'],
    ['Do you fit sanitaryware?', 'We can discuss taps, mixers, shower sets, toilets and related fittings for bathrooms and kitchens.'],
    ['How soon can plumbing work be scheduled?', 'Availability depends on the work, location and current schedule. Call or WhatsApp for urgent enquiries so we can discuss the next step.'],
    ['What information helps with a plumbing quote?', 'Send your location, a description of the problem, photos where safe, access details and your preferred timeframe.'],
  ] },
} as const;

function getService(slug: string) {
  const entry = Object.entries(slugs).find(([, value]) => value === slug);
  return entry ? servicesData.find((service) => service.id === entry[0]) : undefined;
}

const serviceIcons: Record<string, ComponentType<{ className?: string }>> = { electrical: ElectricalSvg, painting: PaintingSvg, carpentry: CarpentrySvg, plumbing: PlumbingSvg, palisades: PalisadesCarportsSvg, paving: PavingSvg, maintenance: MaintenanceSvg, 'glass-works': GlassWorksSvg, flooring: FlooringSvg, 'gutters-fascia': GuttersFasciaSvg, 'aluminium-windows-doors': AluminiumWindowsDoorsSvg };

function getDetailCopy(slug: string, service: (typeof servicesData)[number]) {
  if (slug in detailCopy) return detailCopy[slug as keyof typeof detailCopy];
  const extra = remainingServiceCopy[slug];
  return {
    title: metadataOverrides[slug]?.title ?? `${service.title} in Alberton | Dynamic Handyman`,
    description: metadataOverrides[slug]?.description ?? `${service.description} Request a quote in Alberton.`,
    name: service.title,
    h1: `${service.title} in Alberton`,
    intro: `${service.description} Dynamic Handyman assists homes, rental properties and businesses in Alberton and nearby suburbs.`,
    quote: `Get a Free ${service.badge} Quote`,
    cta: `Request a ${service.badge} Quote`,
    work: service.badge,
    type: service.subServices,
    audience: `${service.description} We discuss each property's requirements before defining the work.`,
    problems: extra.problem,
    assessment: extra.assessment,
    process: extra.process,
    faqs: [
      [extra.question, extra.answer],
      [`What does ${service.title.toLowerCase()} include?`, `Work may include ${service.subServices.slice(0, 3).join(', ')}. The exact scope depends on your property and quotation.`],
      ['Who can request this service?', 'We welcome enquiries from homeowners, landlords and businesses in our service areas.'],
      ['When can the work be scheduled?', 'Scheduling depends on the scope, materials, location and current availability. We discuss timing during the quotation process.'],
      ['What should I send for a quote?', extra.process],
      ...(additionalFaqs[slug] ?? []),
    ],
  };
}

function serviceIcon(id: string) {
  const Icon = serviceIcons[id] ?? MaintenanceSvg;
  return <Icon className="h-12 w-16" />;
}

export function generateStaticParams() {
  return Object.values(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const copy = getDetailCopy(slug, service);
  const { title, description } = copy;
  const image = service.images[0];
  return {
    title,
    description,
    alternates: { canonical: `${businessConfig.websiteUrl}/services/${slug}` },
    openGraph: { title, description, url: `${businessConfig.websiteUrl}/services/${slug}`, type: 'website', images: [{ url: image.url, alt: image.alt }] },
    twitter: { card: 'summary_large_image', title, description, images: [image.url] },
  };
}

export default async function ServiceDetailPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ quote?: string | string[] }> }) {
  const { slug } = await params;
  const query = await searchParams;
  const quoteStatus = Array.isArray(query.quote) ? query.quote[0] : query.quote;
  const service = getService(slug);
  if (!service) notFound();

  const image = service.images[0];
  const copy = getDetailCopy(slug, service);
  const serviceName = copy.name;
  const quoteLabel = copy.quote;
  const quoteHref = `/contact?service=${service.id}`;
  const TradeIcon = serviceIcons[service.id] ?? MaintenanceSvg;
  const galleryImages = galleryShowcaseServices.has(service.id)
    ? (await getPublicGalleryImages()).images.filter((item) => item.category === service.id).slice(0, 2)
    : [];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${businessConfig.websiteUrl}/services/${slug}#service`,
    name: service.title,
    description: copy.description,
    url: `${businessConfig.websiteUrl}/services/${slug}`,
    image: image.url,
    provider: {
      '@type': 'HomeAndConstructionBusiness',
      name: businessConfig.legalName,
      url: businessConfig.websiteUrl,
      telephone: businessConfig.phone.international,
      address: {
        '@type': 'PostalAddress',
        streetAddress: businessConfig.address.streetAddress,
        addressLocality: businessConfig.address.addressLocality,
        addressRegion: businessConfig.address.addressRegion,
        postalCode: businessConfig.address.postalCode,
        addressCountry: businessConfig.address.addressCountry,
      },
    },
    areaServed: businessConfig.serviceAreas.map((area) => ({ '@type': 'Place', name: area })),
    serviceType: copy.type,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: copy.faqs.map(([question, answer]) => ({
      '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: businessConfig.websiteUrl },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${businessConfig.websiteUrl}/services` },
      { '@type': 'ListItem', position: 3, name: service.title, item: `${businessConfig.websiteUrl}/services/${slug}` },
    ],
  };

  return <div className="min-h-screen flex flex-col bg-white overflow-x-clip">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, '\\u003c') }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }} />
    <Header />
    <main className="flex-grow">
      {quoteStatus === 'received' && <p role="status" className="mx-auto max-w-7xl px-4 pt-4 text-sm font-semibold text-[#123E61] sm:px-6 lg:px-8">Your quote request has been received. We usually respond during business hours.</p>}
      {quoteStatus === 'error' && <p role="alert" className="mx-auto max-w-7xl px-4 pt-4 text-sm font-semibold text-red-700 sm:px-6 lg:px-8">Your quote request could not be sent. Please try again, call or WhatsApp us.</p>}
      {quoteStatus === 'limited' && <p role="alert" className="mx-auto max-w-7xl px-4 pt-4 text-sm font-semibold text-red-700 sm:px-6 lg:px-8">Too many requests were sent from this connection. Please try again later or call us.</p>}
      <section className="bg-white py-6 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative min-h-[380px] overflow-hidden rounded-2xl border border-[#0C2B44] bg-[#123E61] text-white shadow-xl sm:min-h-[440px] lg:min-h-[500px]">
            <div className="grid items-center lg:grid-cols-12">
              <div className="z-10 flex flex-col justify-center p-7 sm:p-10 lg:col-span-8 lg:p-14">
                <BreadcrumbNav currentPage={slug as 'electrical' | 'painting' | 'carpentry' | 'plumbing' | 'palisades' | 'paving' | 'maintenance' | 'glass-works' | 'flooring' | 'gutters-fascia' | 'aluminium-windows-doors'} />
                <h1 className="mb-4 text-3xl font-extrabold uppercase leading-tight tracking-tight sm:text-4xl lg:text-5xl">{copy.h1}</h1>
                <p className="mb-6 max-w-2xl text-xs font-normal leading-relaxed text-slate-200 sm:text-sm">{copy.intro}</p>
                <Link href={quoteHref} className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-[#123E61] shadow-sm transition-all hover:bg-neutral-100 sm:px-8 sm:py-4">{copy.cta} <span aria-hidden="true">→</span></Link>
              </div>
              <div className="relative h-56 overflow-hidden bg-[#0C2B44] sm:h-64 lg:col-span-4 lg:h-full lg:min-h-[500px]">
                <Image src={image.url} alt={image.alt} fill sizes="(max-width: 1024px) 100vw, 35vw" className="object-cover opacity-40 mix-blend-luminosity" priority />
            </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl overflow-hidden border-y border-[#D9DEE2] bg-white py-4" aria-label={`${serviceName} included`}>
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white via-white/90 to-transparent backdrop-blur-sm sm:w-12" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white via-white/90 to-transparent backdrop-blur-sm sm:w-12" aria-hidden="true" />
        <div className="flex w-max animate-marquee service-marquee items-center">
          {[...service.subServices, ...service.subServices].map((item, index) => (
            <div key={`${item}-${index}`} className="flex shrink-0 items-center gap-3 px-5 sm:px-8">
              <TradeIcon className="h-10 w-12 sm:h-12 sm:w-14" />
              <span className="whitespace-nowrap text-xs font-bold uppercase tracking-wider text-[#123E61] sm:text-sm">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-16">
        <div className="space-y-14 text-slate-600 sm:text-base">
          <div><h2 className="text-2xl font-extrabold uppercase text-[#123E61] sm:text-3xl">{serviceName} for Homes and Businesses</h2><p className="mt-5 leading-relaxed">{copy.audience}</p></div>
          <div><h2 className="text-2xl font-extrabold uppercase text-[#123E61] sm:text-3xl">What Our {copy.work} Work Includes</h2><ul className="mt-5 grid gap-3 sm:grid-cols-2">{service.subServices.map((item) => <li key={item} className="border-l-2 border-sky-400 pl-4 leading-relaxed">{item}</li>)}</ul></div>
          <div><h2 className="text-2xl font-extrabold uppercase text-[#123E61] sm:text-3xl">Common {copy.work} Problems We Help With</h2><p className="mt-5 leading-relaxed">{copy.problems}</p></div>
          {serviceGuidance[slug] && <div><h2 className="text-2xl font-extrabold uppercase text-[#123E61] sm:text-3xl">{serviceGuidance[slug].heading}</h2><p className="mt-5 leading-relaxed">{serviceGuidance[slug].text}</p></div>}
          <div><h2 className="text-2xl font-extrabold uppercase text-[#123E61] sm:text-3xl">When an Assessment May Be Required</h2><p className="mt-5 leading-relaxed">{copy.assessment}</p></div>
          <div><h2 className="text-2xl font-extrabold uppercase text-[#123E61] sm:text-3xl">How Our {copy.work} Quote Process Works</h2><p className="mt-5 leading-relaxed">{copy.process}</p></div>
          <div><h2 className="text-2xl font-extrabold uppercase text-[#123E61] sm:text-3xl">{serviceName} in Alberton and Nearby Areas</h2><p className="mt-5 leading-relaxed">Dynamic Handyman is based in Eden Park, Alberton. We serve {mainServiceAreas.join(', ')} and consider selected wider-area projects in {widerServiceAreas.join(', ')}, depending on scope, scheduling and travel requirements.</p></div>
        </div>
        <aside className="self-start lg:sticky lg:top-28">
          <div className="border border-[#D9DEE2] border-t-2 border-t-[#123E61] bg-[#F4F7F9] p-6 sm:p-8">
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#19547E]">{copy.work} quote request</p>
            <h2 className="mt-3 text-2xl font-extrabold uppercase leading-tight text-[#123E61]">{quoteLabel}</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">Tell us what you need and we will review the request.</p>
            <ServiceQuoteForm serviceId={service.id} serviceTitle={service.title} quoteLabel={quoteLabel} />
          </div>
        </aside>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-14 text-slate-600 sm:text-base">
          <div>
            <h2 className="text-2xl font-extrabold uppercase text-[#123E61] sm:text-3xl">Our {copy.work} Work</h2>
            {galleryImages.length > 0 ? <div className="mt-8 grid grid-cols-2 gap-5">{galleryImages.map((projectImage) => <figure key={projectImage.id} className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100"><Image src={projectImage.imageUrl} alt={projectImage.alt_text || `${service.title} project by Dynamic Handyman`} fill sizes="(max-width: 640px) 50vw, 420px" className="object-cover" /></figure>)}</div> : <p className="mt-5 leading-relaxed">No project photos are available here for this service yet. You can browse other completed projects or <Link href={quoteHref} className="font-semibold text-[#19547E] underline underline-offset-2">send us your project details</Link> so we can discuss the work you need.</p>}
            <Link href={galleryImages.length > 0 ? `/gallery?category=${service.id}` : '/gallery'} className="mt-5 inline-block text-sm font-semibold text-[#19547E] underline underline-offset-2">Explore completed {copy.work.toLowerCase()} projects</Link>
          </div>
          <div className="bg-[#F4F7F9] p-7 sm:p-10"><h2 className="text-2xl font-extrabold uppercase text-[#123E61] sm:text-3xl">Request a Quote for {copy.work} Work</h2><p className="mt-5 leading-relaxed">Contact us with your location, the work required and any useful photographs. We will discuss the scope, scheduling and quotation process for your property.</p><Link href={quoteHref} className="mt-7 inline-flex bg-[#123E61] px-6 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#0C2B44]">{copy.cta} →</Link></div>
          <div><h2 className="text-2xl font-extrabold uppercase text-[#123E61] sm:text-3xl">Frequently Asked Questions About {serviceName}</h2><div className="mt-8 divide-y divide-[#D9DEE2] border-y border-[#D9DEE2]">{copy.faqs.map(([question, answer]) => <article key={question} className="py-6"><h3 className="text-lg font-bold text-[#123E61]">{question}</h3><p className="mt-3 leading-relaxed">{answer}</p></article>)}</div><p className="mt-10 font-mono text-[11px] font-bold uppercase tracking-widest text-[#19547E]">(Other Services)</p><h2 className="mt-4 text-2xl font-extrabold uppercase text-[#123E61] sm:text-3xl">What We Do</h2><div className="mt-8 grid gap-px border border-[#D9DEE2] bg-[#D9DEE2] sm:grid-cols-2 lg:grid-cols-3">{servicesData.filter((item) => item.id !== service.id).map((item) => <Link key={item.id} href={slugs[item.id] ? `/services/${slugs[item.id]}` : `/services#trade-${item.id}`} className="group bg-white p-6 transition-colors hover:bg-[#F4F7F9] sm:p-8"><div className="mb-5 flex items-center justify-between">{serviceIcon(item.id)}<ArrowUpRight className="text-slate-400 transition-colors group-hover:text-[#123E61]" size={18} aria-hidden="true" /></div><h3 className="text-base font-extrabold uppercase tracking-tight text-[#123E61]">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-slate-600">{item.description}</p></Link>)}</div></div>
        </div>
      </section>
    </main>
    <Footer />
  </div>;
}
