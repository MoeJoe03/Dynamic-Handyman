import { GalleryContent } from '@/components/GalleryContent';
import { getPublicGalleryImages } from '@/lib/gallery/queries';
import { galleryConfig } from '@/config/gallery.config';
import { projectsData } from '@/data/projects';

export const revalidate = 60;

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  const { images, error } = await getPublicGalleryImages();
  const projectByImage = new Map(projectsData.map((project) => [project.image, project]));
  const imagesWithProjectDetails = images.map((image) => {
    const project = projectByImage.get(image.image_path);

    return {
      ...image,
      projectDetails: project
        ? { summary: project.cardSummary, location: project.location }
        : undefined,
    };
  });
  const params = await searchParams;
  const requestedCategory = Array.isArray(params.category) ? params.category[0] : params.category;
  const initialCategory = galleryConfig.categories.find((category) => category.value === requestedCategory)?.value ?? 'all';

  return <GalleryContent images={imagesWithProjectDetails} error={error} initialCategory={initialCategory} />;
}
