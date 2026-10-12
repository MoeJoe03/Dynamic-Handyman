import { z } from 'zod';
import { galleryConfig } from '@/config/gallery.config';

const categoryValues = new Set<string>(galleryConfig.categories.map((category) => category.value));

export const categorySchema = z.string().refine((value) => categoryValues.has(value), 'Select a valid category.');
export const altTextSchema = z.string().trim().max(300, 'Alt text must be 300 characters or less.');
export const editImageSchema = z.object({
  category: categorySchema,
  altText: altTextSchema,
});
export const reorderSchema = z.object({
  imageIds: z.array(z.string().uuid()).max(1000),
});

export function detectImageType(bytes: Uint8Array) {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { mime: 'image/jpeg', extension: 'jpg' };
  }
  if (bytes.length >= 8 && [137, 80, 78, 71, 13, 10, 26, 10].every((byte, index) => bytes[index] === byte)) {
    return { mime: 'image/png', extension: 'png' };
  }
  if (bytes.length >= 12 && String.fromCharCode(...bytes.slice(0, 4)) === 'RIFF' && String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP') {
    return { mime: 'image/webp', extension: 'webp' };
  }
  return null;
}
