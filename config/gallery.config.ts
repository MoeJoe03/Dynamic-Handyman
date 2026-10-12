export const galleryConfig = {
  businessName: 'Dynamic Handyman',
  logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKkZ_INuTkuoMKtJU54inW3RnBE6dbNExV82R9qL1JHyyv4dfaamB2UkW4p-1xAnF1WMyQvVn07q_yDfbz-cWyydE3QDD8Wn-j_TukWRpJ2_MnWI6ttR7qspK_ayRrwbQZ7snrEB6ouS5u2gQC0zIoC9zIbuhi4fVSge9vx-KVVQpGFNDis0NOm6vmFmCneDdB7DXFxFTpKGo6fNotG4Iadbx310P2wU1BPE2R5-mLpvnWIry6L-lD96iiOLOAiNbALQ8',
  storageBucket: 'gallery',
  categories: [
    { value: 'electrical', label: 'Electrical Repairs and Certificates of Compliance', filterLabel: 'Electrical' },
    { value: 'painting', label: 'Painting, Roof Coatings and Damp-Proofing', filterLabel: 'Painting' },
    { value: 'carpentry', label: 'Carpentry, Cupboards, Doors and Ceilings', filterLabel: 'Carpentry' },
    { value: 'plumbing', label: 'Plumbing Repairs and Geyser Services', filterLabel: 'Plumbing' },
    { value: 'palisades', label: 'Palisade Fencing, Gates and Carports', filterLabel: 'Palisade' },
    { value: 'paving', label: 'Paving and Property Alterations', filterLabel: 'Paving' },
    { value: 'maintenance', label: 'Property Maintenance and Renovations', filterLabel: 'Maintenance' },
    { value: 'glass-works', label: 'Glass and Glazing Repairs', filterLabel: 'Glass' },
    { value: 'flooring', label: 'Tiling, Flooring and Carpets', filterLabel: 'Flooring' },
    { value: 'gutters-fascia', label: 'Gutter, Downpipe and Fascia Repairs', filterLabel: 'Gutter' },
    { value: 'aluminium-windows-doors', label: 'Aluminium Windows and Doors', filterLabel: 'Aluminium' },
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
