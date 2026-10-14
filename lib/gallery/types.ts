import type { GalleryCategory } from '@/config/gallery.config';

export interface GalleryImage {
  id: string;
  image_path: string;
  category: GalleryCategory;
  alt_text: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type GalleryImageView = GalleryImage & {
  imageUrl: string;
  projectDetails?: { summary: string; location: string };
};
