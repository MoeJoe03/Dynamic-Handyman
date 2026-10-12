import { NextResponse } from 'next/server';
import { getAdmin } from '@/lib/gallery/auth';
import { galleryImageUrl, isLegacyImagePath } from '@/lib/gallery/image-url';
import { homeImageSlotMap } from '@/config/home-images';
import type { UploadedImage } from '@/lib/home-images/uploaded-image';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const admin = await getAdmin();
    if (!admin) return NextResponse.json({ error: 'Access denied.' }, { status: 403 });

    const [gallery, home] = await Promise.all([
      admin.supabase.from('gallery_images').select('id,image_path,alt_text').order('created_at', { ascending: false }),
      admin.supabase.from('home_images').select('slot_key,image_path,alt_text').order('updated_at', { ascending: false }),
    ]);
    if (gallery.error) throw gallery.error;
    if (home.error) throw home.error;

    const images: UploadedImage[] = [];
    const seen = new Set<string>();
    for (const image of gallery.data ?? []) {
      if (isLegacyImagePath(image.image_path)) continue;
      seen.add(image.image_path);
      images.push({
        key: `gallery-${image.id}`,
        imagePath: image.image_path,
        imageUrl: galleryImageUrl(admin.supabase.storage, image.image_path),
        altText: image.alt_text ?? '',
        source: 'Gallery',
        galleryImageId: image.id,
      });
    }
    for (const image of home.data ?? []) {
      if (!image.image_path.startsWith('home/') || seen.has(image.image_path)) continue;
      seen.add(image.image_path);
      images.push({
        key: `home-${image.image_path}`,
        imagePath: image.image_path,
        imageUrl: galleryImageUrl(admin.supabase.storage, image.image_path),
        altText: image.alt_text || homeImageSlotMap[image.slot_key]?.defaultAlt || '',
        source: 'Home page',
        galleryImageId: null,
      });
    }
    return NextResponse.json({ images });
  } catch (error) {
    console.error('Uploaded image list failed', error);
    return NextResponse.json({ error: 'Could not load uploaded images.' }, { status: 500 });
  }
}
