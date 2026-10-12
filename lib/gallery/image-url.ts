import { galleryConfig } from '@/config/gallery.config';

const legacyImageHost = 'lh3.googleusercontent.com';

export function isLegacyImagePath(path: string): boolean {
  try {
    const url = new URL(path);
    return url.protocol === 'https:' && url.hostname === legacyImageHost;
  } catch {
    return false;
  }
}

export function galleryImageUrl(storage: { from(bucket: string): { getPublicUrl(path: string): { data: { publicUrl: string } } } }, path: string): string {
  return isLegacyImagePath(path) ? path : storage.from(galleryConfig.storageBucket).getPublicUrl(path).data.publicUrl;
}
