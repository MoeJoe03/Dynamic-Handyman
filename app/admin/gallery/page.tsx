import { redirect } from 'next/navigation';
import { GalleryManager } from '@/components/admin/GalleryManager';
import { getAdmin } from '@/lib/gallery/auth';
import { galleryImageUrl } from '@/lib/gallery/image-url';
import type { GalleryImage, GalleryImageView } from '@/lib/gallery/types';

export const dynamic = 'force-dynamic';

export default async function AdminGalleryPage() {
  let admin;
  try {
    admin = await getAdmin();
  } catch {
    return <div className="mx-auto max-w-2xl p-8 text-sm">Supabase is not configured. Add the required environment variables to use the gallery manager.</div>;
  }
  if (!admin) redirect('/admin/login');

  const { data, error } = await admin.supabase
    .from('gallery_images')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });
  const images: GalleryImageView[] = ((data ?? []) as GalleryImage[]).map((image) => ({
    ...image,
    imageUrl: galleryImageUrl(admin.supabase.storage, image.image_path),
  }));

  return <GalleryManager userId={admin.userId} initialImages={images} initialError={error ? 'Could not load gallery images. Refresh to try again.' : null} />;
}
