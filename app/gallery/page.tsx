import { GalleryContent } from '@/components/GalleryContent';
import { getPublicGalleryImages } from '@/lib/gallery/queries';

export const revalidate = 60;

export default async function GalleryPage() {
  const { images, error } = await getPublicGalleryImages();
  return <GalleryContent images={images} error={error} />;
}
