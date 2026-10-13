import { redirect } from 'next/navigation';
import { HomeImagesManager } from '@/components/admin/HomeImagesManager';
import type { HomeImageOverrides } from '@/config/home-images';
import { getAdmin } from '@/lib/gallery/auth';
import { galleryImageUrl } from '@/lib/gallery/image-url';

export const dynamic = 'force-dynamic';

export default async function AdminHomeImagesPage() {
  let admin;
  try {
    admin = await getAdmin();
  } catch {
    return <div className="mx-auto max-w-2xl p-8 text-sm">Supabase is not configured. Add the required environment variables to use the home image manager.</div>;
  }
  if (!admin) redirect('/admin/login');

  const { data, error } = await admin.supabase.from('home_images').select('slot_key,image_path,gallery_image_id,alt_text');
  const overrides: HomeImageOverrides = Object.fromEntries((data ?? []).map((row) => [row.slot_key, {
    ...row,
    imageUrl: galleryImageUrl(admin.supabase.storage, row.image_path),
  }]));
  return <HomeImagesManager userId={admin.userId} initialOverrides={overrides} initialError={error ? 'Could not load saved home images. Refresh before making changes.' : null} />;
}
