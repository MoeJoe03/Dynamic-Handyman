import { GalleryContent } from '@/components/GalleryContent';
import { getPublicGalleryImages } from '@/lib/gallery/queries';
import { galleryConfig } from '@/config/gallery.config';

export const revalidate = 60;

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  const { images, error } = await getPublicGalleryImages();
  const params = await searchParams;
  const requestedCategory = Array.isArray(params.category) ? params.category[0] : params.category;
  const initialCategory = galleryConfig.categories.find((category) => category.value === requestedCategory)?.value ?? 'all';

  return <GalleryContent images={images} error={error} initialCategory={initialCategory} />;
}
