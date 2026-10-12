import { projectsData } from '@/data/projects';
import { homeServicesData, servicesData } from '@/data/services';

export const showcasePanels = servicesData.map((service) => ({
  key: `showcase-${service.id}`,
  ref: `${service.ref} / ${service.id.toUpperCase()}`,
  title: service.title,
  defaultImageUrl: service.images[0].url,
  defaultAlt: service.images[0].alt,
}));

export type HomeImageSlot = {
  key: string;
  section: 'Hero carousel' | 'Service carousels' | 'Featured projects' | 'Review project photos' | 'Other home sections';
  label: string;
  defaultImageUrl: string;
  defaultAlt: string;
  optional?: boolean;
};

export const reviewPhotoSlotKeys = ['reviews-photo', 'reviews-photo-2', 'reviews-photo-3', 'reviews-photo-4'] as const;

export const homeImageSlots: HomeImageSlot[] = [
  ...showcasePanels.map((panel) => ({ key: panel.key, section: 'Hero carousel' as const, label: panel.title, defaultImageUrl: panel.defaultImageUrl, defaultAlt: panel.defaultAlt })),
  ...homeServicesData.flatMap((service) => service.images.slice(0, 4).map((photo, index) => ({ key: `service-${service.id}-${index + 1}`, section: 'Service carousels' as const, label: `${service.title} — image ${index + 1}`, defaultImageUrl: photo.url, defaultAlt: photo.alt }))),
  ...projectsData.slice(0, 6).map((project, index) => ({ key: `featured-project-${index + 1}`, section: 'Featured projects' as const, label: `Project ${index + 1}: ${project.title}`, defaultImageUrl: project.image, defaultAlt: project.subtitle })),
  { key: 'about-workmanship', section: 'Other home sections', label: 'About section workmanship photo', defaultImageUrl: projectsData[7].image, defaultAlt: 'Skilled handyman artisan driving screw with precision cordless drill into timber decking' },
  { key: 'reviews-photo', section: 'Review project photos', label: 'Project photo 1', defaultImageUrl: projectsData[3].image, defaultAlt: 'Finished bathroom renovation' },
  ...reviewPhotoSlotKeys.slice(1).map((key, index) => ({ key, section: 'Review project photos' as const, label: `Project photo ${index + 2} (optional)`, defaultImageUrl: '', defaultAlt: '', optional: true })),
  { key: 'projects-cta', section: 'Other home sections', label: 'Projects call-to-action photo', defaultImageUrl: homeServicesData[1].images[0].url, defaultAlt: 'High craftsmanship handover' },
];

export const homeImageSlotMap: Record<string, HomeImageSlot> = Object.fromEntries(homeImageSlots.map((slot) => [slot.key, slot]));

export type HomeImageOverride = {
  slot_key: string;
  image_path: string;
  gallery_image_id: string | null;
  alt_text: string;
  imageUrl: string;
};

export type HomeImageOverrides = Record<string, HomeImageOverride>;

export function getHomeImage(overrides: HomeImageOverrides, key: string) {
  const slot = homeImageSlotMap[key];
  if (!slot) throw new Error(`Unknown home image slot: ${key}`);
  const override = overrides[key];
  return { imageUrl: override?.imageUrl ?? slot.defaultImageUrl, altText: override?.alt_text ?? slot.defaultAlt };
}

export function getReviewProjectPhotos(overrides: HomeImageOverrides): { imageUrl: string; altText: string }[] {
  const seen = new Set<string>();
  return reviewPhotoSlotKeys.flatMap((key, index) => {
    const override = overrides[key];
    const photo = index === 0
      ? getHomeImage(overrides, key)
      : override && { imageUrl: override.imageUrl, altText: override.alt_text };
    if (!photo?.imageUrl || seen.has(photo.imageUrl)) return [];
    seen.add(photo.imageUrl);
    return [photo];
  });
}
