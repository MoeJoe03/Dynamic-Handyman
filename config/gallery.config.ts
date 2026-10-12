export const galleryConfig = {
  businessName: 'Dynamic Handyman',
  logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKkZ_INuTkuoMKtJU54inW3RnBE6dbNExV82R9qL1JHyyv4dfaamB2UkW4p-1xAnF1WMyQvVn07q_yDfbz-cWyydE3QDD8Wn-j_TukWRpJ2_MnWI6ttR7qspK_ayRrwbQZ7snrEB6ouS5u2gQC0zIoC9zIbuhi4fVSge9vx-KVVQpGFNDis0NOm6vmFmCneDdB7DXFxFTpKGo6fNotG4Iadbx310P2wU1BPE2R5-mLpvnWIry6L-lD96iiOLOAiNbALQ8',
  storageBucket: 'gallery',
  categories: [
    { value: 'electrical', label: "Electrical & COC's" },
    { value: 'painting', label: 'Painting & Coatings' },
    { value: 'carpentry', label: 'Carpentry & Joinery' },
    { value: 'plumbing', label: 'Plumbing & Hydraulics' },
    { value: 'palisades', label: 'Palisades & Carports' },
    { value: 'renovations', label: 'Renovations' },
    { value: 'maintenance', label: 'Domestic & Corporate Maintenance' },
    { value: 'glass-works', label: 'Glass Works' },
    { value: 'flooring', label: 'Flooring' },
    { value: 'gutters-fascia', label: 'Gutters, Down Pipes & Fascia' },
    { value: 'aluminium-windows-doors', label: 'Aluminium Windows & Doors' },
  ],
  upload: {
    maxFileSizeMB: 8,
    maxFilesPerBatch: 10,
    acceptedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  },
} as const;

export type GalleryCategory = (typeof galleryConfig.categories)[number]['value'];

export function getCategoryLabel(value: string) {
  return galleryConfig.categories.find((category) => category.value === value)?.label ?? value;
}
