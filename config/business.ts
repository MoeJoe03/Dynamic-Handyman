/**
 * Authoritative public business facts. Keep contact details, locations and
 * claims here so pages, messages and structured data stay consistent.
 * Unknown insurance and warranty information is intentionally not advertised.
 */
const mainServiceAreas = [
  'Alberton',
  'Vauxhall',
  'Meyersdal',
  'Brackendowns',
  'Brackenhurst',
  'Randhart',
  'New Redruth',
  'Germiston',
  'Boksburg',
  'Johannesburg South',
] as const;

const widerServiceAreas = [
  'Sandton',
  'Randburg',
  'Roodepoort',
  'Randfontein',
  'Vereeniging',
  'Pretoria',
] as const;

export const businessConfig = {
  brandName: 'Dynamic Handyman',
  legalName: 'Dynamic Handyman (Pty) Ltd',
  founder: 'Ryan',
  establishedYear: 2020,
  phone: {
    display: '+27 74 263 7480',
    international: '+27742637480',
    telHref: 'tel:+27742637480',
    whatsappUrl: 'https://wa.me/27742637480',
  },
  email: {
    address: 'admin@dynamichandyman.co.za',
    href: 'mailto:admin@dynamichandyman.co.za',
  },
  address: {
    streetAddress: '10 Vauxhall Street',
    addressLocality: 'Eden Park',
    city: 'Alberton',
    addressRegion: 'Gauteng',
    postalCode: '1458',
    addressCountry: 'ZA',
    get lines() {
      return [this.streetAddress, this.addressLocality, `${this.city}, ${this.postalCode}`] as const;
    },
    get formatted() {
      return `${this.streetAddress}, ${this.addressLocality}, ${this.city}, ${this.postalCode}`;
    },
  },
  operatingHours: [
    { label: 'Mon – Thu', display: '8:00 am – 5:00 pm', schema: 'Mo-Th 08:00-17:00' },
    { label: 'Fri', display: '8:00 am – 4:00 pm', schema: 'Fr 08:00-16:00' },
    { label: 'Sat', display: '9:00 am – 2:00 pm', schema: 'Sa 09:00-14:00' },
    { label: 'Sun', display: 'Closed', schema: null },
  ],
  mainServiceAreas,
  widerServiceAreas,
  get serviceAreas() {
    return [...this.mainServiceAreas, ...this.widerServiceAreas];
  },
  serviceAreaSummary: 'Alberton and nearby suburbs',
  credentials: {
    publicClaims: [] as string[],
    note: 'No specific formal credentials have been confirmed for publication.',
  },
  insurance: {
    status: 'unconfirmed' as const,
    publicClaim: null,
  },
  warranty: {
    status: 'unconfirmed' as const,
    publicClaim: null,
  },
  approvedClaims: [
    'Based in Alberton and serving nearby suburbs and selected Gauteng areas.',
    'Founded by Ryan in 2020.',
    'Provides handyman services, home repairs, property maintenance and renovations.',
    'Offers free, no-obligation estimates.',
    'Coordinates multiple trades through one practical point of contact.',
  ],
  facebookUrl: 'https://www.facebook.com/dynamichandyman/',
  websiteUrl: 'https://dynamichandyman.co.za',
  businessDescription:
    'Professional handyman services, home repairs, property maintenance and renovations. Based in Alberton and serving surrounding Gauteng areas.',
  metadata: {
    homeDescription:
      'Dynamic Handyman provides reliable handyman services, home repairs and renovations in Alberton and nearby suburbs. Request a quote for electrical, plumbing, painting and more.',
    contactDescription:
      'Contact Dynamic Handyman for handyman services, repairs, maintenance and renovations in Alberton and nearby suburbs. Call, WhatsApp or request a quote online.',
    contactSocialDescription:
      'Request a quote for handyman services, repairs, maintenance and renovations in Alberton and nearby suburbs.',
    servicesDescription:
      'Explore electrical, plumbing, painting, carpentry, paving and renovation services from Dynamic Handyman in Alberton and nearby suburbs.',
    galleryDescription:
      'View Dynamic Handyman projects in Alberton, including electrical repairs, plumbing, painting, carpentry, paving and property renovations.',
    gallerySocialDescription:
      'See completed Dynamic Handyman work in Alberton, from electrical repairs and plumbing to painting, carpentry, paving and renovations.',
    aboutDescription:
      'Learn about Dynamic Handyman, an Alberton-based contractor providing multi-trade repairs, property maintenance and renovations in Alberton and nearby suburbs.',
    aboutSocialDescription:
      'Meet Dynamic Handyman, an Alberton-based contractor helping homeowners, landlords and businesses with repairs, maintenance and renovations.',
  },
} as const;

export const operatingHoursSchema = businessConfig.operatingHours
  .flatMap(({ schema }) => schema ? [schema] : []);
